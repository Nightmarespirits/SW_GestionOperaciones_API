import { body, param } from 'express-validator';
import mongoose from 'mongoose';

// Validación para crear una nueva operación
export const createOperacionValidation = [
    param('companyId')
        .notEmpty().withMessage('La compañía es requerida')
        .isMongoId().withMessage('ID de compañía inválido'),
    
    param('sucursalId')
        .notEmpty().withMessage('La sucursal es requerida')
        .isMongoId().withMessage('ID de sucursal inválido'),
    
    body('fecInicio')
        .optional()
        .isISO8601().withMessage('Formato de fecha de inicio inválido')
        .toDate(),
    
    body('fecFinal')
        .optional()
        .isISO8601().withMessage('Formato de fecha final inválido')
        .toDate(),
    
    body('estadoOperacion')
        .optional()
        .isBoolean().withMessage('El estado de operación debe ser un valor booleano'),
    
    body('currentStage')
        .optional()
        .isIn(['lavado', 'secado', 'doblado', 'planchado', 'tenido', 'cc', 'finalizado'])
        .withMessage('Etapa actual inválida'),
    
    body('procesos')
        .optional()
        .isArray().withMessage('Los procesos deben ser un arreglo')
];

// Validación para actualizar una operación
export const updateOperacionValidation = [
    param('id')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID de operación inválido');
            }
            return true;
        }),
    
    body('company')
        .optional()
        .isMongoId().withMessage('ID de compañía inválido'),
    
    body('sucursal')
        .optional()
        .isMongoId().withMessage('ID de sucursal inválido'),
    
    body('fecInicio')
        .optional()
        .isISO8601().withMessage('Formato de fecha de inicio inválido')
        .toDate(),
    
    body('fecFinal')
        .optional()
        .isISO8601().withMessage('Formato de fecha final inválido')
        .toDate(),
    
    body('estadoOperacion')
        .optional()
        .isBoolean().withMessage('El estado de operación debe ser un valor booleano'),
    
    body('currentStage')
        .optional()
        .isIn(['lavado', 'secado', 'doblado', 'planchado', 'tenido', 'cc', 'finalizado'])
        .withMessage('Etapa actual inválida')
];

// Validación para agregar un proceso
export const addProcesoValidation = [
    param('id')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID de operación inválido');
            }
            return true;
        }),
    
    body('tipo')
        .notEmpty().withMessage('Tipo de proceso es requerido')
        .isIn(['lavado', 'secado', 'planchado', 'cc', 'doblado', 'tenido'])
        .withMessage('Tipo de proceso inválido'),
    
    body('fecha')
        .optional()
        .isISO8601().withMessage('Formato de fecha inválido')
        .toDate(),
    
    body('hora')
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Formato de hora inválido. Use HH:MM'),
    
    body('responsable')
        .notEmpty().withMessage('Responsable es requerido')
        .isMongoId().withMessage('ID de responsable inválido'),
    
    body('estado')
        .optional()
        .isBoolean().withMessage('El estado debe ser un valor booleano'),
    
    body('isSequential')
        .optional()
        .isBoolean().withMessage('La propiedad isSequential debe ser un valor booleano'),
    
    body('detalles')
        .optional()
        .isArray().withMessage('Los detalles deben ser un arreglo')
        .custom((detalles) => {
            detalles.forEach(detalle => {
                // Validaciones para cada detalle
                if (!detalle.numOrden) {
                    throw new Error('Número de orden es requerido en los detalles');
                }
                
                if (!mongoose.Types.ObjectId.isValid(detalle.maquina)) {
                    throw new Error('ID de máquina inválido en los detalles');
                }
                
                if (!detalle.cantidad || detalle.cantidad < 1) {
                    throw new Error('Cantidad inválida en los detalles');
                }
            });
            return true;
        })
];

// Validación para actualizar etapa
export const updateStageValidation = [
    param('id')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID de operación inválido');
            }
            return true;
        }),
    
    body('newStage')
        .notEmpty().withMessage('Nueva etapa es requerida')
        .isIn(['lavado', 'secado', 'doblado', 'planchado', 'tenido', 'cc', 'finalizado'])
        .withMessage('Etapa inválida')
];

// Nueva validación para actualizar proceso
export const updateProcesoValidation = [
    param('operacionId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID de operación inválido');
            }
            return true;
        }),
    
    param('procesoId')
        .custom((value) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
                throw new Error('ID de proceso inválido');
            }
            return true;
        }),
    
    body('tipo')
        .optional()
        .isIn(['Lavado', 'Secado', 'Planchado', 'CC', 'Doblado', 'Teñido'])
        .withMessage('Tipo de proceso inválido'),
    
    body('fecha')
        .optional()
        .isISO8601().withMessage('Formato de fecha inválido')
        .toDate(),
    
    body('hora')
        .optional()
        .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .withMessage('Formato de hora inválido. Use HH:MM'),
    
    body('responsable')
        .optional()
        .isMongoId().withMessage('ID de responsable inválido'),
    
    body('estado')
        .optional()
        .isBoolean().withMessage('El estado debe ser un valor booleano'),
    
    body('detalles')
        .optional()
        .isArray().withMessage('Los detalles deben ser un arreglo')
];