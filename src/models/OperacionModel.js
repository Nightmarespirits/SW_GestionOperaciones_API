import mongoose from "mongoose"
import { Types } from "mongoose"
const operacionSchema = new mongoose.Schema({
    fecInicio: {
        type:String
    },
    fecFinal: {
        type:String
    },
    estadoOperacion : {
        type:Boolean
    },
    currentStage:{
        type: String,
        enum: ['lavado', 'secado', 'doblado', 'planchado', 'cc','finalizado']
    },
    procesos: [{ 
        type: Types.ObjectId, 
        ref: 'ProcesoModel' 
    }]
},{
    timestamps: true 
})

operacionSchema.index({ estadoOperacion: 1, currentStage: 1 });
export default mongoose.model('OperacionModel' , operacionSchema)