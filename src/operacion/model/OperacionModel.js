import mongoose from "mongoose"
import ProcesoModel from "./ProcesoModel.js"
import { Types } from "mongoose"

const operacionSchema = new mongoose.Schema({
    company: {
        type: Types.ObjectId,
        ref: 'CompanyModel'
    },
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
        enum: ['lavado', 'secado', 'doblado', 'planchado','tenido', 'cc','finalizado']
    },
    procesos: [{ 
        type: Types.ObjectId, 
        ref: 'ProcesoModel' 
    }]
},{
    timestamps: true 
})


//Midleware pre para eliminar todos los procesos de la operacion 
operacionSchema.pre('findOneAndDelete', async function(next) {
    const operacion = await this.model.findOne(this.getFilter());
    if (operacion) {
      await ProcesoModel.deleteMany({ _id: { $in: operacion.procesos } });
    }
    next();
  });
operacionSchema.index({ estadoOperacion: 1, currentStage: 1 });
export default mongoose.model('OperacionModel' , operacionSchema)