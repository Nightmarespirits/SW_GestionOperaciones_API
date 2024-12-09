import mongoose from "mongoose";
import { Types } from "mongoose";

const empSchema = new mongoose.Schema({
    company: {
        type: Types.ObjectId,
        ref: 'CompanyModel'
    },
    apellidos:{
        type:String,
        required: true,
        trim:true
    },
    nombres:{
        type:String,
        required: true,
        trim:true
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


// Middleware para transformar a Camel Case
empSchema.pre('save',async function(next) {
    this.apellidos = toCamelCase(this.apellidos);
    this.nombres = toCamelCase(this.nombres);
    next();
});

// Función para convertir a Camel Case
const toCamelCase = (str) => {
    return str
        .toLowerCase() // Convierte toda la cadena a minúsculas
        .split(' ') // Divide la cadena en palabras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
        .join(' '); // Une las palabras de nuevo en una cadena
};
export default mongoose.model('EmpleadoModel', empSchema)