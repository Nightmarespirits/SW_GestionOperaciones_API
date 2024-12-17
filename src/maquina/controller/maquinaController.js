import MaquinaModel from "../model/MaquinaModel.js";
import mongoose from "mongoose";

export const getMaquinas = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const { sucursal, tipo } = req.query;
        
        let query = { company: companyId };
        
        if (sucursal) query.sucursal = sucursal;
        if (tipo) query.tipo = tipo;
        
        const maquinas = await MaquinaModel.find(query).populate('sucursal', 'nombre');
        
        if (maquinas.length === 0) {
            return res.status(404).json({ message: 'No se encontraron máquinas' });
        }
        
        res.json(maquinas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getMaquinaByCodigoFabrica = async (req, res) => {
    try {
        const companyId = req.params.companyId;
        const codigoFabrica = req.params.codigoFabrica;
        
        // Validar que el companyId sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: 'ID de compañía inválido' });
        }

        const maquinas = await MaquinaModel.find({
            company: companyId,
            codigoFabrica: codigoFabrica
        }).populate('sucursal', 'nombre');
        
        if (maquinas.length === 0) {
            return res.status(404).json({ message: 'No se encontró la máquina' });
        }
        
        res.json(maquinas);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createMaquina = async (req, res) => {
    try {
        const companyId = req.params.companyId
        const sucursalId = req.params.sucursalId

        const {
            tipo,
            modelo,
            marca,
            codigoFabrica,
            nombreMaquina,
            caracteristicas,
            fechaInstalacion,
            ultimoMantenimiento,
            proximoMantenimiento,
            horasUso
        } = req.body

        // Validar que el companyId sea un ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(companyId)) {
            return res.status(400).json({ message: 'ID de compañía inválido' });
        }
        if (!mongoose.Types.ObjectId.isValid(sucursalId)) {
            return res.status(400).json({ message: 'ID de sucursal inválido' });
        }
        
        const maquina = new MaquinaModel({ 
            company: {_id: companyId},
            sucursal : {_id: sucursalId},
            tipo,
            modelo,
            marca,
            codigoFabrica,
            nombreMaquina,
            caracteristicas,
            fechaInstalacion,
            ultimoMantenimiento,
            proximoMantenimiento,
            horasUso
        });

        await maquina.save();
        
        res.status(201).json({message: 'Máquina registrada exitosamente'});
    } catch (error) {
        res.status(500).json({message: error.message});
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
        const {companyId} =  req.params
        const {
            tipo,
            modelo,
            marca,
            codigoFabrica,
            nombreMaquina,
            caracteristicas,
            fechaInstalacion,
            ultimoMantenimiento,
            proximoMantenimiento,
            horasUso,
            sucursal
        } = req.body
        const maquina = await MaquinaModel.findByIdAndUpdate(
            req.params.id,
            {
                company :  {_id : companyId},
                tipo,
                modelo,
                marca,
                codigoFabrica,
                nombreMaquina,
                caracteristicas,
                fechaInstalacion,
                ultimoMantenimiento,
                proximoMantenimiento,
                horasUso,
                sucursal
            },
            {new: true}
        )

        if(!maquina){
            return res.status(404).json({message: `No se econtro la maquina con ID : ${req.params.id}`})
        }
        res.status(201).json({message:'Maquina actualizada exitosamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteMaquina= async (req, res) => {
    try {
        const maquina = await MaquinaModel.findByIdAndDelete(req.params.id)

        if(!maquina){
            return res.status(404).json({message: `No se econtro la maquina con ID : ${req.params.id}`})
        }
        res.status(201).json({message:'Registro eliminado correctamente'}) 
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}
