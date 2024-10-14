import ProcesoModel from "../models/ProcesoModel.js"
import SedeModel from "../models/SedeModel.js"
import EmpleadoModel from "../models/EmpleadoModel.js"
import { createOrUpdateOperacion } from "./operacionController.js"

export const getAllProcesos = async (req, res) => {
    try {
        const procesos = await ProcesoModel.find()
        .populate('sede', 'nombre')
        .populate('responsable', 'nombres apellidos')

        res.json(procesos)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Crud
export const createProceso = async (req, res) => {
    try {
        const {
            tipo, 
            sede,
            responsable,
            detalles,
            estado
        } = req.body


        const {operacion, proceso} = await createOrUpdateOperacion({
            tipo, 
            sede,
            responsable,
            detalles,
            estado
        })
        res.status(201).json({message:'Proceso Agregado exitosamente', operacion, proceso })  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getProcesoById = async (req, res) => {
    try {
        const proceso = await ProcesoModel.findById(req.params.id)
        .pupulate('responsable','nombres apellidos')
        .populate('sede', 'nombre')

        if(!proceso){
            return res.status(404).json({message: "No se econtro el Proceso"})
        }
        res.json(proceso)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProceso= async (req, res) => {
    try {
        const {
            tipo, 
            sedeNombre, 
            responsableNombre, 
            operacion,
            detalles,
            estado
        } = req.body

        // Buscar el ID de la sede a partir del nombre
        const sede = await SedeModel.findOne({ nombre: sedeNombre });
        if (!sede) {
            return res.status(404).json({ message: 'Sede no encontrada' });
        }

        // Buscar el ID del empleado responsable a partir del nombre
        const responsable = await EmpleadoModel.findOne({ nombres: responsableNombre });
        if (!responsable) {
            return res.status(404).json({ message: 'Responsable no encontrado' });
        }

        const proceso = await ProcesoModel.findByIdAndUpdate(
            req.params.id,
            {
                tipo, 
                sede: sede._id, // Usar el ID de la sede
                responsable: responsable._id, // Usar el ID del responsable
                operacion, // Usar el ID de la operación
                detalles,
                estado
            },
            {new: true}
        )

        if(!proceso){
            return res.status(404).json({message: "No se econtro el Proceso"})
        }
        res.status(201).json({message:'Proceso actualizado exitosamente'}) 
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
