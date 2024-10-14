import mongoose from "mongoose";
import { Types } from "mongoose";

const empSchema = new mongoose.Schema({
    apellidos:{
        type:String,
        required: true,
        trim:true,
        lowercase: true
    },
    nombres:{
        type:String,
        required: true,
        trim:true,
        lowercase: true
    },
    dni:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    puesto: { 
        type: String, 
        required: false 
    },
    sede: { 
        type: Types.ObjectId, 
        ref: 'SedeModel' 
    }
},{
    timestamps: true //Para agregar propiedades createdAt y updatedAt Automaticamente
})

export default mongoose.model('EmpleadoModel', empSchema)