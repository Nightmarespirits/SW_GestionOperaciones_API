import SedeModel from "../models/SedeModel.js";

export const getAllSedes = async (req, res) => {
    try {
        const Sedes = await SedeModel.find()
        res.json(Sedes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//Crud
export const createSede = async (req, res) => {
    try {
        const {nombre, direccion, telefono, empresa, maquinas} = req.body
        const sede = new SedeModel({
            nombre,
            direccion, 
            telefono,
            empresa,
            maquinas
        })
        await sede.save()
        res.status(201).json({message:'Sede registrado exitosamente'})  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getSedeById = async (req, res) => {
    try {
        const sede = await SedeModel.findById(req.params.id)

        if(!sede){
            return res.status(404).json({message: "No se econtro el Sede"})
        }
        res.json(sede)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateSede= async (req, res) => {
    try {
        const  {nombre, direccion, telefono, empresa, maquinas} = req.body
        const sede = await SedeModel.findByIdAndUpdate(
            req.params.id,
            {nombre, direccion, telefono, empresa, maquinas},
            {new: true}
        )

        if(!sede){
            return res.status(404).json({message: "No se econtro el Sede"})
        }
        res.status(201).json({message:'Sede actualizado exitosamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteSede= async (req, res) => {
    try {
        const sede = await SedeModel.findByIdAndDelete(req.params.id)

        if(!sede){
            return res.status(404).json({message: "No se econtro el Sede"})
        }
        res.status(201).json({message:'Registro eliminado correctamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
