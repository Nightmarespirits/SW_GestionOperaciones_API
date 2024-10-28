import ProcesoModel from "../models/ProcesoModel.js"
import { createSequentialOperacion } from "./operacionController.js"
import { createUnsequentialOperacion } from "./operacionController.js"

export const getAllProcesos = async (req, res) => {
    try {
        const procesos = await ProcesoModel.find()
        .populate('sede', 'nombre')
        .populate('responsable', 'nombres apellidos')
        .populate('detalles.maquina', 'nombre marca')
        .sort({ createdAt: -1 });

        res.json(procesos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProcesosByTipo = async(req, res) => {
    try {
        const {tipo} = req.query;
        const procesos = await ProcesoModel.find({tipo})
        .populate('sede', 'nombre')
        .populate('responsable', 'nombres apellidos')
        .populate('detalles.maquina', 'nombre marca');

        if (procesos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron Procesos del tipo'});
        }
        
        return res.json(procesos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getProcesosByEstado = async(req, res) => {
    try {
        const {estado} = req.query;
        const procesos = await ProcesoModel.find({estado})
        .populate('sede', 'nombre')
        .populate('responsable', 'nombres apellidos')
        .populate('detalles.maquina', 'nombre marca');

        if (procesos.length === 0) {
            return res.status(404).json({ message: 'No se encontraron Procesos del estado'});
        }
        
        return res.json(procesos);
    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
}
//Crud
export const createSequenceProceso = async (req, res) => {
    try {
        const {
            tipo, 
            sede,
            responsable,
            detalles,
            estado,
            isSequential
        } = req.body

        const {operacion, proceso} = await createSequentialOperacion({
            tipo, 
            sede,
            responsable,
            detalles,
            estado,
            isSequential
        })
        res.status(201).json({message:'Proceso con seguimiento secuencial Agregado exitosamente', operacion, proceso })  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createProceso = async (req, res) => {
    try {
        const { tipo, sede, responsable, detalles, estado } = req.body;

        // Validación básica para evitar procesar datos incompletos
        if (!tipo || !sede || !responsable || !estado) {
            return res.status(400).json({ message: 'Datos incompletos' });
        }

        // Crear la operación
        const { operacion, proceso } = await createUnsequentialOperacion({
            tipo,
            sede,
            responsable,
            detalles,
            estado
        });

        // Responder con éxito incluyendo algún dato relevante
        res.status(201).json({
            message: 'Proceso agregado exitosamente',
            procesoId: proceso?._id || null,
            operacionId: operacion?._id || null,
        });

    } catch (error) {
        // Manejo más específico de errores
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        // Error genérico del servidor
        res.status(500).json({ message: 'Error en el servidor: ' + error.message });
    }
};

export const getProcesoById = async (req, res) => {
    try {
        const proceso = await ProcesoModel.findById(req.params.id)

        if(!proceso){
            return res.status(404).json({message: "No se econtro el Proceso"})
        }
        res.json(proceso)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProceso= async (req, res) => {
        const {
            tipo, 
            sede, 
            responsable,
            detalles,
            estado,
            isSequential
        } = req.body

        const proceso = await ProcesoModel.findById(req.params.id);

        if (!proceso) {
            return res.status(404).json({ message: 'Proceso no encontrado' });
        }
        // Actualizar los campos manualmente
        proceso.tipo = tipo;
        proceso.sede = sede;
        proceso.responsable = responsable;
        proceso.detalles = detalles;
        proceso.estado = estado
        proceso.isSequential = isSequential
    try {
        const updatedProceso =  await proceso.save();

        res.status(201).json({message:'Proceso actualizado exitosamente', updatedProceso}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteProceso= async (req, res) => {
    try {
        const proceso = await ProcesoModel.findByIdAndDelete(req.params.id)

        if(!proceso){
            return res.status(404).json({message: "No se econtro el Proceso"})
        }
        res.status(201).json({message:'Registro eliminado correctamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
