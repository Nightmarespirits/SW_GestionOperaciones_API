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
        enum: ['lavado', 'secado', 'planchado', 'cc', 'doblado', 'finalizado']
    },
    procesos: [{ 
        type: Types.ObjectId, 
        ref: 'ProcesoModel' 
    }]
},{
    timestamps: true 
})

operacionSchema.pre('save', async function(next) {
    this.estadoOperacion = false
    
    let date = new Date()
    if (!this.fecInicio) {
        this.fecInicio = date.toLocaleDateString()
    }
    if (this.currentStage === 'finalizado' && !this.fecFinal) {
        this.fecFinal = date.toLocaleDateString()
        this.estadoOperacion = true
    }
    
    next()
})
export default mongoose.model('OperacionModel' , operacionSchema)