import mongoose from 'mongoose';
const { Schema } = mongoose;

// Detalle Schema
const detallesSchema = new Schema({
    numOrden: {
        type: String,
        required: [true, 'Número de orden es requerido'],
        trim: true
    },
    maquina: {
        type: Schema.Types.ObjectId,
        ref: 'MaquinaModel',
        required: [true, 'La máquina es requerida']
    },
    cantPrendas: {
        type: Number,
        required: [true, 'Cantidad es requerida'],
        min: [1, 'La cantidad debe ser mayor a 0']
    },
    etiqueta: {
        type: String,
        trim: true
    },
    observaciones: {
        type: String,
        trim: true,
        maxlength: [800, 'La observación no puede exceder 500 caracteres']
    }
}, { _id: false });

// Proceso Schema
const procesoSchema = new Schema({
    tipo: {
        type: String,
        enum: {
            values: ['Lavado', 'Secado', 'Planchado', 'CC', 'Doblado', 'Teñido'],
            message: '{VALUE} no es un tipo de proceso válido'
        },
        default: 'Lavado'
    },
    fecha: {
        type: Date
    },
    hora: {
        type: String,
        match: [/^([01]\d|2[0-3]):([0-5]\d)$/, 'Formato de hora inválido. Use HH:MM']
    },
    responsable: {
        type: Schema.Types.ObjectId,
        ref: 'EmpleadoModel',
        required: [true, 'Responsable es requerido']
    },
    detalles: [detallesSchema],
    estado: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Operacion Schema
const operacionSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'CompanyModel',
        required: [true, 'Compañía es requerida']
    },
    sucursal: {
        type: Schema.Types.ObjectId,
        ref: 'SucursalModel',
        required: [true, 'Sucursal es requerida']
    },
    fecInicio: {
        type: Date
    },
    fecFinal: {
        type: Date
    },
    estadoOperacion: {
        type: Boolean,
        default: false
    },
    currentStage: {
        type: String,
        enum: {
            values: ['lavado', 'secado', 'doblado', 'planchado', 'tenido', 'cc', 'finalizado'],
            message: '{VALUE} no es una etapa válida'
        }
    },
    nextStage: {
        type: String,
        enum: {
            values: ['lavado', 'secado', 'doblado', 'planchado', 'tenido', 'cc', 'finalizado'],
            message: '{VALUE} no es una etapa válida'
        }
    },
    procesos: [procesoSchema]
}, { timestamps: true });

// Validación de fechas
operacionSchema.pre('validate', function(next) {
    if (this.fecInicio && this.fecFinal && this.fecInicio > this.fecFinal) {
        this.invalidate('fecInicio', 'La fecha de inicio no puede ser posterior a la fecha final');
    }
    next();
});

export default mongoose.model('Operacion', operacionSchema);