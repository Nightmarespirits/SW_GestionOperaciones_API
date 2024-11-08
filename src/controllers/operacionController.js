import OperacionModel from "../models/OperacionModel.js";
import ProcesoModel from "../models/ProcesoModel.js";

export const getAllOperaciones = async (req, res) => {
    try {
        const operaciones = await OperacionModel.find()
        .populate({
            path: 'procesos',
            populate: [
                { 
                    path: 'responsable',
                    select: 'nombres apellidos'
                },
                {
                    path: 'sede',
                    select: 'nombre'
                }
            ]
        })
        .sort({ createdAt: -1 });

        res.json(operaciones)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getOperacionesByEstado = async (req, res) => {
    try {
        const { estado } = req.params; 
        
        // Convertir el string 'true'/'false' a booleano
        const estadoBoolean = estado === 'true';

        const operaciones = await OperacionModel.find({ estadoOperacion: estadoBoolean })
            .populate({
                path: 'procesos',
                populate: [
                    { 
                        path: 'responsable',
                        select: 'nombres apellidos'
                    },
                    {
                        path: 'sede',
                        select: 'nombre'
                    }
                ]
            })
            .sort({ createdAt: -1 });

        res.json(operaciones);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Para insertar o actualizar proceso no secuencial (sin seguimiento)
export const createOperacionByProceso = async (procesoData) => {
    if (!procesoData.tipo) {
        throw new Error('El campo "tipo" es obligatorio.');
    }
    const proceso = new ProcesoModel(procesoData);
    let date = new Date()
    //Creamos operacion 
    const operacion = new OperacionModel({
        fecInicio : date.toLocaleDateString(),
        fecFinal : procesoData.isSequential ? '' : procesoData.estado ? date.toLocaleDateString(): '',
        currentStage: procesoData.tipo,
        estadoOperacion: procesoData.isSequential ? false : procesoData.isSequential,
        procesos: [
            proceso._id
        ]
    });

    proceso.operacion = operacion._id;

    try {
        await Promise.all([ operacion.save(), proceso.save(),]);
    } catch (error) {
        throw new Error('Error al guardar la operación y el proceso: ' + error.message);
    }

    return { operacion, proceso };
};

//Crud
export const createOperacion = async (req, res) => {
    try {
        const {
            fecInicio, 
            fecFinal, 
            estadoOperacion, 
            procesos
        } = req.body

        const operacion = new OperacionModel({
            fecInicio, 
            fecFinal, 
            estadoOperacion, 
            procesos
        })
        await operacion.save()
        res.status(201).json({message:'operacion registrada exitosamente'})  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getOperacionById = async (req, res) => {
    try {
        const operacion  = await OperacionModel.findById(req.params.id)

        if(!operacion ){
            return res.status(404).json({message: "No se econtro el registro de operacion"})
        }
        res.json(operacion )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateOperacion= async (req, res) => {
    try {
        const {
            fecInicio, 
            fecFinal, 
            estadoOperacion, 
            procesos
        } = req.body
        const operacion = await OperacionModel.findByIdAndUpdate(
            req.params.id,
            {
                fecInicio, 
                fecFinal, 
                estadoOperacion, 
                procesos
            },
            {new: true}
        )

        if(!operacion){
            return res.status(404).json({message: "No se econtro el registro de operacion"})
        }
        res.status(201).json({message:'proceso actualizado exitosamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteOperacion= async (req, res) => {
    try {
        const operacion = await OperacionModel.findByIdAndDelete(req.params.id)

        if(!operacion){
            return res.status(404).json({message: "No se econtro el registro de operacion"})
        }
        res.status(201).json({message:'Registro eliminado correctamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getActiveOperaciones = async ()=>{
    return await OperacionModel.find({ 
        estadoOperacion: false,
        currentStage: { $ne: 'finalizado' }
    }).sort({ createdAt: -1 })
}