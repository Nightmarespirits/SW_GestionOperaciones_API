import mongoose from "mongoose";
import { Types } from "mongoose";
const maquinaSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['Lavadora', 'Secadora', 'Plancha'],
    },
    modelo:{
        type: String
    },
    marca:{
        type: String
    },
    codigoFabrica:{
        type: String,
    },
    nombre:{
        type: String
    },
    caracteristicas:{
        type: String
    },
    sede:{
        
        type: Types.ObjectId,
        ref: 'SedeModel',
        required: true
    }
},{
    timestamps: true //Para agregar propiedades createdAt y updatedAt Automaticamente
})

export default mongoose.model('MaquinaModel', maquinaSchema)