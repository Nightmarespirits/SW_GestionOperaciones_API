import MaquinaModel from "../models/MaquinaModel.js";

export const getAllEMaquinas = async (req, res) => {
    try {
        const maquina = await MaquinaModel.find()
        res.json(maquina)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Crud
export const createMaquina = async (req, res) => {
    try {
        const {
            tipo, 
            modelo, 
            marca, 
            codigoFabrica, 
            nombre, 
            caracteirsticas, 
            sede
        } = req.body

        const maquina = new MaquinaModel({
            tipo, 
            modelo, 
            marca, 
            codigoFabrica, 
            nombre, 
            caracteirsticas, 
            sede
        })
        await maquina.save()
        res.status(201).json({message:'Maquina registrada exitosamente'})  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getMaquinaById = async (req, res) => {
    try {
        const maquina  = await MaquinaModel.findById(req.params.id)

        if(!maquina ){
            return res.status(404).json({message: "No se econtro el registro de maquina"})
        }
        res.json(maquina )
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateMaquina= async (req, res) => {
    try {
        const {
            tipo, 
            modelo, 
            marca, 
            codigoFabrica, 
            nombre, 
            caracteristicas, 
            sede
        } = req.body
        const maquina = await MaquinaModel.findByIdAndUpdate(
            req.params.id,
            {
                tipo, 
                modelo, 
                marca, 
                codigoFabrica, 
                nombre, 
                caracteristicas, 
                sede
            },
            {new: true}
        )

        if(!maquina){
            return res.status(404).json({message: "No se econtro el registro de maquina"})
        }
        res.status(201).json({message:'Empleado actualizado exitosamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteMaquina= async (req, res) => {
    try {
        const maquina = await MaquinaModel.findByIdAndDelete(req.params.id)

        if(!maquina){
            return res.status(404).json({message: "No se econtro el registro de maquina"})
        }
        res.status(201).json({message:'Registro eliminado correctamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
