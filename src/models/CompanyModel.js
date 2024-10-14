import mongoose from "mongoose";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import { Types } from "mongoose";
const companySchema = new mongoose.Schema({
  nombreLegal: { 
    type: String, 
    required: true 
  },
  ruc: { 
    type: String, 
    required: true 
  },
  companyPassword: { 
    type: String, 
    required: true 
  },
  companyName: { 
    type: String, 
    required: true, 
    unique: true 
  },
  plan: { 
    type: String, 
    enum: ['pro', 'basic'], 
    default: 'basic' 
  },
  sedes: [{
    type: Types.ObjectId, 
    ref: 'SedeModel'
  }],
  estado:{
    type:Boolean
  }
},{
    timestamps: true //Para agregar propiedades createdAt y updatedAt Automaticamente
})

companySchema.pre('save', async function(next) {
    if(!this.isModified('companyPassword')) return next;
    this.companyPassword = await bcrypt.hash(this.companyPassword, 10)
    this.estado = true
})

companySchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.companyPassword)
}

export default mongoose.model('CompanyModel', companySchema);