import mongoose from "mongoose";
import { Types } from "mongoose";
const maquinaSchema = new mongoose.Schema({
    company: {
        type: Types.ObjectId,
        ref: 'CompanyModel'
    },  
    tipo: {
        type: String,
        enum: ['Lavadora', 'Secadora', 'Plancha'],
        required: true
    },
    estado: {
        type: String,
        enum: ['Activo', 'En Mantenimiento', 'Fuera de Servicio', 'Retirado'],
        default: 'Activo'
    },
    modelo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        required: true
    },
    codigoFabrica: {
        type: String,
        unique: true,
        required: true
    },
    nombreMaquina: {
        type: String,
        required: true
    },
    caracteristicas: {
        capacidad: {
            type: Number,
            required: true
        },
        unidadCapacidad: {
            type: String,
            enum: ['kg', 'lb', 'l'],
            required: true
        },
        consumoEnergetico: Number,
        dimensiones: {
            alto: Number,
            ancho: Number,
            profundidad: Number
        }
    },
    fechaInstalacion: {
        type: Date,
        default: Date.now
    },
    ultimoMantenimiento: {
        fecha: Date,
        descripcion: String,
        tecnico: String
    },
    proximoMantenimiento: {
        type: Date
    },
    horasUso: {
        type: Number,
        default: 0
    },
    sucursal:{
        
        type: Types.ObjectId,
        ref: 'SucursalModel',
        required: true
    }
},{
    timestamps: true,
    versionKey: false
})

maquinaSchema.index({ company: 1, sede: 1 });
maquinaSchema.index({ codigoFabrica: 1 });

export default mongoose.model('MaquinaModel', maquinaSchema)



