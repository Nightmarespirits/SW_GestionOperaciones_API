import CompanyModel from '../../company/model/CompanyModel.js'
import crypto from 'crypto';
import nodemailer from 'nodemailer';

// Generar un código de verificación (6 dígitos)
export const generateVerificationCode = () => crypto.randomInt(100000, 999999).toString();

// Enviar un correo electrónico con el código de verificación
export const sendVerificationEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"SLC" <tu-email@gmail.com>',
    to: email,
    subject: 'Código de verificación',
    html: `<p>Tu código de verificación es: <strong>${verificationCode}</strong></p>`,
  });
};

// Generar y enviar un nuevo código de verificación
export const generateAndSendVerificationCode = async (email) => {
  const company = await CompanyModel.findOne({ email });
  if (!company) throw new Error('Empresa no encontrada.');

  if (company.isVerified) throw new Error('El correo ya ha sido verificado.');

  const verificationCode = generateVerificationCode();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // Código válido por 15 minutos

  company.verificationCode = verificationCode;
  company.verificationCodeExpiresAt = expiresAt;
  await company.save();

  await sendVerificationEmail(email, verificationCode);

  return { message: 'Código de verificación enviado.' };
};

// Verificar el código de verificación
export const verifyEmailCode = async (email, code) => {
  const company = await CompanyModel.findOne({ email });

  if (!company) throw new Error('Empresa no encontrada.');
  if (company.isVerified) throw new Error('El correo ya ha sido verificado.');

  if (company.verificationCode !== code) throw new Error('Código de verificación inválido.');
  if (new Date() > company.verificationCodeExpiresAt) throw new Error('El código de verificación ha expirado.');

  company.isVerified = true;
  company.verificationCode = undefined;
  company.verificationCodeExpiresAt = undefined;
  await company.save();

  return { message: 'Correo electrónico verificado exitosamente.' };
};
