import CompanyModel from '../company/model/CompanyModel.js';

export const verifyEmail = async (verificationToken) => {
    try {
        // Buscar empresa con el token de verificación
        const company = await CompanyModel.findOne({ 
            emailVerificationToken: verificationToken,
            emailVerified: false
        });

        if (!company) {
            throw new Error('Token de verificación inválido o ya utilizado');
        }

        // Actualizar empresa como verificada
        company.emailVerified = true;
        company.estado = true; // Activar empresa
        company.emailVerificationToken = undefined;
        
        await company.save();

        return {
            success: true,
            message: 'Email verificado exitosamente'
        };

    } catch (error) {
        throw new Error('Error al verificar email: ' + error.message);
    }
}
