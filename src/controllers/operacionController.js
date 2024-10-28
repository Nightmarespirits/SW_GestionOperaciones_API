import OperacionModel from "../models/OperacionModel.js";
import ProcesoModel from "../models/ProcesoModel.js";

export const getAllOperaciones = async (req, res) => {
    try {
        const operacion = await OperacionModel.find()
        .populate({
            path: 'procesos',
            select: 'tipo fecha hora sede responsable estado detalles'
        })

        res.json(operacion)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Para insertar o actualizar proceso no secuencial (sin seguimiento)
export const createUnsequentialOperacion = async (procesoData) => {
    if (!procesoData.tipo) {
        throw new Error('El campo "tipo" es obligatorio.');
    }

    const proceso = new ProcesoModel(procesoData);

    const estadoProceso = procesoData.estado;
    
    //Creamos operacion finalizamos si el proceso ya finalizo
    const operacion = new OperacionModel({
        procesos: [proceso._id],
        estadoOperacion: estadoProceso
    });

    proceso.operacion = operacion._id;

    try {
        await Promise.all([proceso.save(), operacion.save()]);
    } catch (error) {
        throw new Error('Error al guardar la operación y el proceso: ' + error.message);
    }

    return { operacion, proceso };
};

//Para insertar o actualizar proceso secuencial (seguimiento de stages)
export const createSequentialOperacion = async (procesoData) => {
    const stages =['lavado', 'secado', 'doblado'];

    let operacion;

    if (procesoData.tipo === 'lavado') {
        operacion = new OperacionModel({ currentStage: 'lavado' });
    } else {
        const precesorStage = obtenerStage(stages, procesoData.tipo, -1);

        operacion = await OperacionModel.findOne({
            estadoOperacion: false,
            currentStage: precesorStage
        }).sort({ createdAt: 1 });

        if (!operacion) {
            throw new Error(`No se encontró una operación con el predecesor "${precesorStage}"`);
        }
    }

    const proceso = new ProcesoModel(procesoData);

    operacion.currentStage = obtenerStage(stages, procesoData.tipo, +1)
    operacion.procesos.push(proceso._id);
    
    proceso.operacion = operacion._id;

    await Promise.all([proceso.save(), operacion.save()]);

    return { operacion, proceso};
};

// Función de utilidad para obtener stages
const obtenerStage = (stages, tipo, desplazamiento) => {
    const index = stages.indexOf(tipo) + desplazamiento;
    if (index < 0 || index >= stages.length) {
        throw new Error(`El tipo de proceso "${tipo}" es inválido o no tiene stage válido.`);
    }
    return stages[index];
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