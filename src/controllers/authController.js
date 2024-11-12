import jsonwebtoken from "jsonwebtoken";
import CompanyModel from "../models/CompanyModel.js";

export const register = async(req, res) => {
    try {
        const {nombreLegal, ruc, companyPassword, companyName, plan, sedes, estado} = req.body;
        const company = new CompanyModel({
            nombreLegal, 
            ruc, 
            companyPassword, 
            companyName, 
            plan, 
            sedes,
            estado
        })

        await company.save();
        res.status(201).json({message:'Usuario Registrado Exitosamente'})       
        
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

export const login = async(req, res) => {
    try {
        const {companyName, companyPassword} = req.body
        const company = await CompanyModel.findOne({companyName})

        //Revisar linea 31
        if(!company || !(await company.comparePassword(companyPassword))){
            return res.status(401).json({message: 'Credenciales Invalidas Contraseña incorrecta'})
        }

        const token = jsonwebtoken.sign(
            {   
                companyId: company._id, 
                nombreLegal: company.nombreLegal,
                ruc: company.ruc,
                companyName: company.companyName, 
                plan: company.plan,
            },
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        )

        res.json({token})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}