import mongoose from "mongoose";
import { Types } from "mongoose";
const detallesSchema = new mongoose.Schema({
    numOrden: { 
        type: String,
         required: true
     },
    maquina: { 
        type: String,
         required: true
     },
    cantidad: { 
        type: Number,
         required: true
     },
    colorMarcado: { 
        type: String
     },
    obs: { 
        type: String
     }
})

const procesoSchema = new mongoose.Schema({
    tipo: {
        type: String,
        enum: ['lavado', 'secado', 'planchado', 'doblado', 'tenido'], 
        default: 'lavado'    
    },
    fecha: {
        type:String    
    },
    hora: {
        type:String    
    },
    sede: { 
        type: Types.ObjectId,
         ref: 'SedeModel'     
    },
    responsable:{
        type: Types.ObjectId,
        ref: 'EmpleadoModel'  
    },
    operacion: {
        type: Types.ObjectId,
        ref: 'OperacionModel'    
    },
    detalles:[ detallesSchema],
    estado:{type: Boolean}
})

procesoSchema.pre('save', async function(next){
    let date = new Date
    this.fecha = date.toLocaleDateString()
    this.hora = date.toLocaleTimeString()
})
export default mongoose.model('ProcesoModel', procesoSchema)