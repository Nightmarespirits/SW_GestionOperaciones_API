import mongoose from "mongoose";
import { Types } from "mongoose";

const sedeSchema = new mongoose.Schema({
    nombre: { 
        type: String,
         required: true     
    },
    direccion: { 
        type: String,
         required: true    
     },
    telefono: { 
        type: String     
    },
    empresa: { 
        type: Types.ObjectId,
         ref: 'CompanyModel'     
    },
    maquinas: [{ 
        type: Types.ObjectId, 
        ref: 'MaquinaModel'     
    }]
},{
    timestamps: true //Para agregar propiedades createdAt y updatedAt Automaticamente
})

export default mongoose.model('SedeModel', sedeSchema)