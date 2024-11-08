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

const stages = ['lavado', 'secado', 'doblado'];

const getNextStage = (currentStage) => {
    const currentIndex = stages.indexOf(currentStage);
    return currentIndex < stages.length - 1 ? stages[currentIndex + 1] : null;
};

// Función de reintento
const retryOperation = async (operation, maxRetries = 3, delay = 1000) => {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
        try {
            const result = await operation();
            return result;
        } catch (error) {
            lastError = error;
            console.log(`Intento ${i + 1} fallido, reintentando en ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw lastError;
};

procesoSchema.pre('save', async function(next) {
    try {
        const date = new Date();
        this.fecha = date.toLocaleDateString();
        this.hora = date.toLocaleTimeString();

        if (this.isModified('estado') && this.estado === true && this.isSequential === true) {
            const nextStage = getNextStage(this.tipo);
            
            if (nextStage) {
                await retryOperation(async () => {
                    // Usar una sesión de MongoDB para garantizar la atomicidad
                    const session = await mongoose.startSession();
                    
                    try {
                        await session.withTransaction(async () => {
                            // Buscar la operación con lock optimista
                            const operacion = await OperacionModel.findById(
                                this.operacion,
                                null,
                                { session }
                            ).select('+__v');

                            if (!operacion) {
                                throw new Error(`Operation with ID ${this.operacion} not found`);
                            }

                            // Verificar si ya existe un proceso sucesor
                            const existingSuccessor = await this.constructor.findOne({
                                operacion: this.operacion,
                                tipo: nextStage
                            }).session(session);

                            if (!existingSuccessor) {
                                // Crear el proceso sucesor
                                const successorProcess = new this.constructor({
                                    tipo: nextStage,
                                    sede: this.sede,
                                    operacion: this.operacion,
                                    isSequential: true,
                                    detalles: this.detalles.map(detalle => ({
                                        numOrden: detalle.numOrden,
                                        cantidad: detalle.cantidad,
                                        obs: detalle.obs,
                                        colorMarcado: detalle.colorMarcado
                                    }))
                                });

                                // Guardar el proceso sucesor
                                await successorProcess.save({ session });

                                // Actualizar la operación con el nuevo proceso
                                operacion.procesos.push(successorProcess._id);
                                operacion.currentStage = nextStage;
                                await operacion.save({ session });
                            }
                        });
                    } finally {
                        session.endSession();
                    }
                });
            } else {
                // Si es el último stage, actualizar el estado de la operación a Finalizado
                await retryOperation(async () => {
                    const session = await mongoose.startSession();
                    try {
                        await session.withTransaction(async () => {
                            const operacion = await OperacionModel.findById(
                                this.operacion,
                                null,
                                { session }
                            );

                            if (!operacion) {
                                throw new Error(`Operation with ID ${this.operacion} not found`);
                            }

                            operacion.estadoOperacion = true;
                            operacion.fecFinal = new Date().toLocaleDateString();
                            await operacion.save({ session });
                        });
                    } finally {
                        session.endSession();
                    }
                });
            }
        }
        next();
    } catch (error) {
        console.error('Error in pre save middleware:', error);
        next(error);
    }
});


//Agregar Indices
procesoSchema.index({ operacion: 1, tipo: 1 });
export default mongoose.model('ProcesoModel', procesoSchema);