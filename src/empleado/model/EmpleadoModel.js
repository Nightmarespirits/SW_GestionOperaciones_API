import mongoose from "mongoose";
import { Types } from "mongoose";
import validator from 'validator';

const empSchema = new mongoose.Schema({
    company: {
        type: Types.ObjectId,
        ref: 'CompanyModel',
        required: true
    },
    sucursal: {
        type: Types.ObjectId,
        ref: 'SucursalModel',
        required: true
    },

    // Personal Information
    apellidos: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Los apellidos deben tener como minimo 2 caracteres'],
        maxlength: [50, 'Los apellidos no pueden exceder los 50 caracteres'],
        validate: {
            validator: function(v) {
                return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(v);
            },
            message: 'Los apellidos solo pueden contener letras'
        }
    },
    nombres: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Los nombres deben tener como minimo 2 caracteres'],
        maxlength: [50, 'Los nombres no pueden exceder los 50 caracteres'],
        validate: {
            validator: function(v) {
                return /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(v);
            },
            message: 'Nombres can only contain letters and spaces'
        }
    },
    dni: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return /^\d{8}$/.test(v);
            },
            message: 'El DNI debe tener 8 digitos'
        }
    },
    fechaNacimiento: {
        type: Date,
        required: true,
        validate: {
            validator: function(v) {
                const age = ((Date.now() - new Date(v).getTime()) / (1000 * 3600 * 24 * 365.25));
                return age >= 18 && age <= 70;
            },
            message: 'Employee must be between 18 and 70 years old'
        }
    },
    genero: {
        type: String,
        enum: ['Masculino', 'Femenino', 'Otro'],
        required: true
    },

    // Contact Information
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: 'Por favor ingrese un email valido'
        }
    },
    telefonoPrincipal: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\+?51\d{9}$/.test(v);
            },
            message: 'Please provide a valid Peruvian phone number (+51 and 9 digits)'
        }
    },
    telefonoSecundario: {
        type: String,
        validate: {
            validator: function(v) {
                return v ? /^\+?51\d{9}$/.test(v) : true;
            },
            message: 'Please provide a valid Peruvian phone number (+51 and 9 digits)'
        }
    },

    // Professional Information
    puesto: {
        type: String,
        required: true,
        trim: true,
        minlength: [2, 'Puesto must be at least 2 characters long'],
        maxlength: [50, 'Puesto cannot exceed 50 characters']
    },
    areaTrabajo: {
        type: String,
        required: true,
        trim: true,
        enum: ['Recursos Humanos', 'Ventas', 'Marketing', 'Finanzas', 'Tecnología', 'Operaciones', 'Servicio al Cliente', 'Logística', 'Otro']
    },
    tipoContrato: {
        type: String,
        required: true,
        enum: ['Plazo Fijo', 'Tiempo Completo', 'Tiempo Parcial', 'Practicante', 'Consultor']
    },
    fechaIngreso: {
        type: Date,
        required: true
    },
    salario: {
        type: Number,
        required: true,
        min: [0, 'Salario cannot be negative']
    },

    // Additional Information
    direccion: {
        calle: {
            type: String,
            required: true,
            trim: true
        },
        ciudad: {
            type: String,
            required: true,
            trim: true
        },
        provincia: {
            type: String,
            required: true,
            trim: true
        },
        codigoPostal: {
            type: String,
            required: true,
            trim: true,
            validate: {
                validator: function(v) {
                    return /^\d{5}$/.test(v);
                },
                message: 'Codigo Postal must be 5 digits'
            }
        }
    },

    // Employment Status
    activo: {
        type: Boolean,
        default: true
    },
    estadoCivil: {
        type: String,
        enum: ['Soltero', 'Casado', 'Divorciado', 'Viudo', 'Conviviente']
    }
}, {
    timestamps: true
});

// Middleware para transformar a Camel Case
empSchema.pre('save', async function(next) {
    this.apellidos = toCamelCase(this.apellidos);
    this.nombres = toCamelCase(this.nombres);
    next();
});

// Método para calcular la edad
empSchema.methods.calcularEdad = function() {
    const today = new Date();
    const birthDate = new Date(this.fechaNacimiento);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

// Método para verificar si el empleado está activo
empSchema.methods.estaActivo = function() {
    return this.activo;
};

// Método para calcular tiempo en la empresa
empSchema.methods.tiempoEnEmpresa = function() {
    const today = new Date();
    const ingreso = new Date(this.fechaIngreso);
    const diffTime = Math.abs(today - ingreso);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    
    return {
        years,
        months,
        totalDays: diffDays
    };
};

// Función para convertir a Camel Case
const toCamelCase = (str) => {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

export default mongoose.model('EmpleadoModel', empSchema);