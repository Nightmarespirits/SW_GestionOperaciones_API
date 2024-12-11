import CompanyModel from '../model/CompanyModel.js';
import bcrypt from 'bcryptjs';

/** NO ESTA SIENDO USADO
 * Cambia la contraseña de la empresa.
 * @param {string} companyId - El ID de la empresa.
 * @param {string} currentPassword - La contraseña actual de la empresa.
 * @param {string} newPassword - La nueva contraseña de la empresa.
 * @returns {Promise<object>} - La empresa con la contraseña actualizada.
 */
export const changePassword = async (companyId, currentPassword, newPassword) => {
  // Buscar la compañía por ID
  const company = await CompanyModel.findById(companyId);
  
  if (!company) {
    throw new Error(`No se encontro registro de empresa con el ID: ${companyId}`);
  }

  const isMatch = await company.comparePassword(currentPassword)
  
  if (!isMatch) {
    throw new Error('La contraseña actual es incorrecta, Vuelve a Intentarlo');
  }

  // Si la contraseña es válida, actualizarla
  company.companyPassword = await bcrypt.hash(newPassword, 10);

  // Guardar los cambios
  await company.save();
  return company;
};