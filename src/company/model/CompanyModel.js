import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { Types } from "mongoose";

const companySchema = new mongoose.Schema({
  nombreLegal: { 
    type: String, 
    required: true,
    trim: true,
    unique: true
  },
  companyName: { 
    type: String, 
    required: true,
    unique: true
  },
  companyPassword: { 
    type: String, 
    required: true,
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido'],
    unique: true,
  },
  ruc: { 
    type: String,
    match: [/^[0-9]{11}$/, 'Por favor ingrese un RUC válido de 11 dígitos']
  },
  plan: { 
    type: String, 
    enum: ['free', 'basic', 'premium', 'root'], 
    default: 'free' 
  },
  sucursales: [{
    type: Types.ObjectId, 
    ref: 'SucursalModel'
  }],
  estado:{
    type: Boolean,
    default: true
  },
  logoUrl: {
    type: String
  },
  descripcion:{
    type: String
  },
  telefono:{
    type: String,
  },
  direccion: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String
  },
  verificationCodeExpiresAt: {
    type: Date
  },
},{
    timestamps: true //Para agregar propiedades createdAt y updatedAt Automaticamente
})


//Indice parcial para el campo ruc 
companySchema.index({ ruc: 1 }, { unique: true, partialFilterExpression: { ruc: { $exists: true } } });

companySchema.pre('save', async function(next) {
    if(!this.isModified('companyPassword')) return next;
    this.companyPassword = await bcrypt.hash(this.companyPassword, 10)
    this.estado = true
})

companySchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.companyPassword)
}

export default mongoose.model('CompanyModel', companySchema);