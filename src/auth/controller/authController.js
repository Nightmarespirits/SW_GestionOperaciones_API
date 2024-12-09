import jsonwebtoken from "jsonwebtoken";
import CompanyModel from "../../company/model/CompanyModel.js";
import {
    generateAndSendVerificationCode,
    verifyEmailCode,
  } from '../services/verificationService.js';

export const register = async(req, res) => {
    try {
        const {nombreLegal, ruc, companyPassword, companyName, plan, sedes, estado, logoUrl, descripcion, telefono, email, direccion} = req.body;
        const company = new CompanyModel({
            nombreLegal, 
            ruc, 
            companyPassword, 
            companyName, 
            plan, 
            sedes,
            estado,
            logoUrl,
            descripcion,
            telefono,
            email,
            direccion
        })

        await company.save();
        res.status(201).json({message:'Empresa Registrada Exitosamente'})       
        
    } catch (error) {

        if (error.code === 11000) {
            if(error.keyPattern && error.keyPattern.ruc){
                return res.status(400).json({ message: 'El RUC ingresado ya está registrado. Por favor, ingrese un RUC único.'});
            }else if(error.keyPattern && error.keyPattern.nombreLegal){
               return res.status(400).json({ message: `El Nombre de la Empresa ya está registrado. Por favor, ingrese un nombre de empresa unico`});
            }else if(error.keyPattern && error.keyPattern.companyName){
                return res.status(400).json({ message: `El Nombre de usuario de la empresa ya esta en uso, Por favor Ingresa otro.`});
            }
        }

        if (error.name === 'ValidationError') {
        return res.status(400).json({ message: error.message });
        }
      
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
                logoUrl: company.logoUrl,
                descripcion: company.descripcion,
                telefono: company.telefono,
                email: company.email,
                direccion: company.direccion
            },
            process.env.JWT_SECRET,
            {expiresIn: '12h'}
        )

        res.json({token})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//Verification
export const requestVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await generateAndSendVerificationCode(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const verifyCode = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const result = await verifyEmailCode(email, verificationCode);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};