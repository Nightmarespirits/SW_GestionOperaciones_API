import SucursalModel from "../model/SucursalModel.js";
import mongoose from "mongoose";

export const getSucursales = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const { estado } = req.query;
        
        let query = { company: companyId };
        if (estado) query.estado = estado;
        
        const sucursales = await SucursalModel.find(query);
        
        if (sucursales.length === 0) {
            return res.status(404).json({ message: 'No se encontraron sucursales' });
        }
        
        res.json(sucursales);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getSucursalById = async (req, res) => {
    try {
        const companyId = req.params.companyId
        const sucursalId = req.params.id

        const sucursal = await SucursalModel.findById({
            _id : sucursalId,
            company: companyId
        })

        if(!sucursal){
            return res.status(404).json({message: `No se Encontro la Sucursal con el ID ${req.params.id}`})
        }
        res.json(sucursal)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const createSucursal = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const {
            nombre,
            direccion,
            telefono,
            email,
            estado,
            horarioAtencion,
            ubicacionGPS,
            capacidadMaxima,
            maquinas,
            encargado
        } = req.body

        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: 'ID de compañía inválido' });
        }

        const sucursal = new SucursalModel({
            company: companyId,
            nombre,
            direccion, 
            telefono,
            email,
            estado,
            horarioAtencion,
            ubicacionGPS,
            capacidadMaxima,
            maquinas,
            encargado
        })
        await sucursal.save()
        res.status(201).json({message:'Sucursal Regitrada Exitosamente'})  
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateSucursal = async (req, res) => {
    try {
        const {
            nombre,
            direccion,
            telefono,
            email,
            estado,
            horarioAtencion,
            ubicacionGPS,
            capacidadMaxima,
            maquinas,
            encargado
        } = req.body

        const sucursal = await SucursalModel.findByIdAndUpdate(
            req.params.id,
            {
                nombre,
                direccion,
                telefono,
                email,
                estado,
                horarioAtencion,
                ubicacionGPS,
                capacidadMaxima,
                maquinas,
                encargado
            },
            {new: true}
        )

        if(!sucursal){
            return res.status(404).json({message: `No se encontró la sucursal con ID: ${req.params.id}`})
        }
        res.status(201).json({message:'Sucursal Actualizada Exitosamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteSucursal= async (req, res) => {
    try {
        const companyId = req.params.id
        const sucursalId = req.params.id
        const sucursal = await SucursalModel.findByIdAndDelete({
            _id : sucursalId,
            company : companyId
        })

        if(!sucursal){
            return res.status(404).json({message: "No se encontro la sucursal con el ID req.paramas.id"})
        }
        res.status(201).json({message:'Sucursal Eliminada Exitosamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

