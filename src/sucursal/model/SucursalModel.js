import mongoose from "mongoose";
import { Types } from "mongoose";

const sucursalSchema = new mongoose.Schema({
    company: {
        type: Types.ObjectId,
        ref: 'CompanyModel',
        required: true
    },
    nombre: { 
        type: String,
        required: true,
        trim: true
    },
    direccion: { 
        type: String,
        required: true,
        trim: true
    },
    telefono: { 
        type: String,
        trim: true,
        match: [/^\+?[\d\s-]+$/, 'Por favor ingrese un número de teléfono válido']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingrese un email válido']
    },
    estado: {
        type: Boolean,
        default: true
    },
    horarioAtencion: {
        apertura: String,
        cierre: String
    },
    ubicacionGPS: {
        latitude: Number,
        longitude: Number
    },
    capacidadMaxima: {
        type: Number
    },
    maquinas: [{ 
        type: Types.ObjectId, 
        ref: 'MaquinaModel'     
    }],
    encargado: {
        nombre: String,
        telefono: String,
        email: String
    }
},{
    timestamps: true
})

sucursalSchema.index({ company: 1, nombre: 1 }, { unique: true })

export default mongoose.model('SucursalModel', sucursalSchema)

