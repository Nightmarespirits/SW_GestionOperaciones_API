import OperacionModel from "../models/OperacionModel.js";
import ProcesoModel from "../models/ProcesoModel.js";

export const getAllOperaciones = async (req, res) => {
    try {
        const operacion = await OperacionModel.find()
        res.json(operacion)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Para insertar o actualizar proceso automaticamente
export const createOrUpdateOperacion = async (procesoData) => {

    const stages = ['lavado', 'secado', 'planchado', 'cc', 'doblado']
        let operacion

        // Buscar la operación más reciente que no esté finalizada
        operacion = await OperacionModel.findOne({ 
            estadoOperacion: false,
            currentStage: { $ne: 'finalizado' }
        }).sort({ createdAt: 1 })

        if (!operacion) {
            // Si no hay operación en curso, crear una nueva solo si es un proceso de lavado
            if (procesoData.tipo !== 'lavado') {
                throw new Error('Debe iniciar una nueva operación con un proceso de lavado')
            }
            operacion = new OperacionModel({ currentStage: 'lavado' })
        } else {
            // Verificar que el nuevo proceso sea el siguiente en la secuencia
            const currentStageIndex = stages.indexOf(operacion.currentStage)
            if (stages.indexOf(procesoData.tipo) !== currentStageIndex + 1) {
                throw new Error(`Proceso inválido. Se espera ${stages[currentStageIndex + 1]}, pero se recibió ${procesoData.tipo}`)
            }
        }

        // Crear el nuevo proceso
        const proceso = new ProcesoModel(procesoData)
        await proceso.save()

        // Añadir el proceso a la operación
        operacion.procesos.push(proceso._id)

        // Actualizar la etapa actual
        operacion.currentStage = procesoData.tipo

        // Si es el último proceso (doblado), finalizar la operación
        if (procesoData.tipo === 'doblado') {
            operacion.currentStage = 'finalizado'
            operacion.estadoOperacion = true
        }

        await operacion.save()

        return { operacion, proceso }
}

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