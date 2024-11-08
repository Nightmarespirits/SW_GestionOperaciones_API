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
    estado:{type: Boolean},
    isSequential: { type: Boolean}
},{
    timestamps: true //Para agregar propiedades createdAt y updatedAt Automaticamente
})

const stages =['lavado', 'secado', 'doblado'];

const getNextStage = (currentStage) => {
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : 0;
};

procesoSchema.pre('save', async function(next) {
    const date = new Date();
    this.fecha = date.toLocaleDateString();
    this.hora = date.toLocaleTimeString();
    
    if (this.isModified('estado') && this.estado === true && this.isSequential === true) {
        const nextStage = getNextStage(this.tipo);
        if (nextStage) {
            // Si tiene un siguiente en la secuencia, crear sucesor
            try {
                const successorProcess = new this.constructor({
                    tipo: nextStage,
                    sede: this.sede,
                    operacion: this.operacion,
                    detalles: this.detalles.map(detalle => ({
                        numOrden: detalle.numOrden,
                        cantidad: detalle.cantidad,
                        obs: detalle.obs,
                        colorMarcado: detalle.colorMarcado
                    }))
                });

                // Intentar encontrar la operación
                const operacion = await OperacionModel.findById(this.operacion);
                
                if (!operacion) {
                    throw new Error(`Operation with ID ${this.operacion} not found`);
                }

                operacion.procesos.push(successorProcess._id);
                await Promise.all([successorProcess.save(), operacion.save()]);

            } catch (error) {
                console.error('Error creating successor process:', error);
                return next(error);
            }
        } else {
            // Si es el último stage, actualizar el estado de la operación a Finalizado
            try {
                await OperacionModel.findByIdAndUpdate(this.operacion, { estadoOperacion: true });
            } catch (error) {
                console.error('Error updating operation status:', error);
                return next(error);
            }
        }
    }
    next();
});

export default mongoose.model('ProcesoModel', procesoSchema)