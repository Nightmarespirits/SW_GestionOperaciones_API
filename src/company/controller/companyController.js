import CompanyModel from "../model/CompanyModel.js";

export const getAllCompanies = async (req, res) => {
    try {
        const companies = await CompanyModel.find().select('-companyPassword')
        res.json(companies)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const company = await CompanyModel.findById(req.params.id).select('-companyPassword')
        if(!company){
            return  res.status(404).json({message: 'Empresa No encontrada'})
        }
        res.json(company)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {nombreLegal, ruc, companyName, Plan, estado, logoUrl, descripcion, telefono, email, direccion} = req.body;
        
        const company = await CompanyModel.findByIdAndUpdate(
            req.params.id,
            {nombreLegal, ruc, companyName, Plan, estado, logoUrl, descripcion, telefono, email, direccion},
            {new: true}
        ).select('-companyPassword')

        if(!company){
            return res.status(404).json({message: 'Empresa No encontrada'})
        }
        res.json(company)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const deleteCompany = async (req, res) => {
    try {
        const company = await CompanyModel.findByIdAndDelete(req.params.id);
        if(!company){
            return res.status(404).json({message: 'Empresa no encontrada'})
        }
        res.json({message: 'Empresa Elimiada exitosamente'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Cambiar contraseña
export const changeCompanyPassword = async (req, res) => {
    try{
        const {companyId} = req.params
        const {companyPassword, newPassword} = req.body

        const company = await CompanyModel.findById(companyId);

        if (!company) {
            return res.status(404).json({ message: 'Empresa no encontrada' });
        }

        const passwordChanged = await company.changePassword(companyPassword, newPassword);
        
        if (passwordChanged) {
            await company.save(); // Importante: guardar los cambios
            return res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
        } else {
            return res.status(400).json({ message: 'Contraseña incorrecta, Intente de Nuevo' });
        }
    }catch (error) {
        res.status(400).json({message: error.message})
    }
}

//Validador de contraseña simple
export const validateCompanyPassword = async (req, res) => {
    try {
        const { companyId } = req.params;  
        const { attempPassword } = req.body;  
        
        const company = await CompanyModel.findById(companyId);
  
        if (!company) {
            throw new Error('Empresa no encontrada');
        }

        const isMatch = await company.validatePassword(attempPassword)

        if (isMatch) {
            res.status(200).json({ message: 'Contraseña Correcta' });
        } else {
            res.status(400).json({ message: 'La contraseña es Incorrecta intente de nuevo' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};