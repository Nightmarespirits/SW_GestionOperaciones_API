import CompanyModel from "../models/CompanyModel.js";

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
            return  res.status(404).json({message: 'Compania No encontrada'})
        }
        res.json(company)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateCompany = async (req, res) => {
    try {
        const {nombreLegal, ruc, companyName, Plan, estado} = req.body;
        const company = await CompanyModel.findByIdAndUpdate(
            req.params.id,
            {nombreLegal, ruc, companyName, Plan, estado },
            {new: true}
        ).select('-companyPassword')

        if(!company){
            return res.status(404).json({message: 'Compania No encontrado'})
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
            return res.status(404).json({message: 'Compañia no encontrada'})
        }
        res.json({message: 'Compañia eliminada exitosamente'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}