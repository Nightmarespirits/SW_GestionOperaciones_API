import mongoose from "mongoose";
import { Types } from "mongoose";
import OperacionModel from "./OperacionModel.js";
const detallesSchema = new mongoose.Schema({
    numOrden: { 
        type: String,
         required: true
     },
    maquina: { 
        type: Types.ObjectId,
        ref: 'MaquinaModel'
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
        enum: ['lavado', 'secado', 'planchado', 'cc', 'doblado', 'tenido'], 
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

const stages =['lavado', 'secado', 'planchado', 'cc', 'doblado', 'finalizado'];

const getNextStage = (currentStage) => {
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
};

procesoSchema.pre('save', async function(next) {
    const date = new Date();
    this.fecha = date.toLocaleDateString();
    this.hora = date.toLocaleTimeString();

    if (this.isModified('estado') && this.estado === true) {
        const nextStage = getNextStage(this.tipo);
        
        if (nextStage) {
            try {
                const successorProcess = new this.constructor({
                    tipo: nextStage,
                    sede: this.sede,
                    operacion: this.operacion,
                    detalles: this.detalles.map(detalle => ({
                        numOrden: detalle.numOrden,
                        cantidad: detalle.cantidad,
                        obs: detalle.obs
                    }))
                });

                const op = await OperacionModel.findById(this.operacion)
                op.procesos.push(successorProcess)

                console.log(successorProcess)
                await successorProcess.save();
            } catch (error) {
                console.error('Error creating successor process:', error);
                return next(error);
            }
        } else {
            // Si es el último stage, actualiza el estado de la operación
            try {
                await OperacionModel.findByIdAndUpdate(this.operacion, { estado: true });
            } catch (error) {
                console.error('Error updating operation status:', error);
                return next(error);
            }
        }
    }
    next();
});

export default mongoose.model('ProcesoModel', procesoSchema)