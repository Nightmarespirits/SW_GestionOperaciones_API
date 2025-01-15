import { Router } from 'express';
import OperacionController from '../controllers/OperacionController.js';
import validationMiddleware from '../../middleware/validationMiddleware.js';
import { 
    createOperacionValidation,
    updateOperacionValidation,
    addProcesoValidation,
    updateProcesoValidation
} from '../validations/operacionValidation.js';

const router = Router({ mergeParams: true });

// Crear nueva operación
router.post(
    '/:sucursalId/', 
    validationMiddleware(createOperacionValidation),
    OperacionController.createOperacion
);

// Obtener todas las operaciones
router.get(
    '/:sucursalId/', 
    OperacionController.getAllOperaciones
);

// Obtener operación por ID
router.get(
    '/:sucursalId/:id', 
    OperacionController.getOperacionById
);

// Actualizar operación
router.put(
    '/:sucursalId/:id', 
    validationMiddleware(updateOperacionValidation),
    OperacionController.updateOperacion
);

// Eliminar operación
router.delete(
    '/:sucursalId/:id', 
    OperacionController.deleteOperacion
);

// Agregar proceso a operación
router.post(
    '/:sucursalId/:operacionId/procesos', 
    validationMiddleware(addProcesoValidation),
    OperacionController.addProcesoToOperacion
);

// Actualizar etapa actual de la operación
router.patch(
    '/:sucursalId/:id/stage', 
    OperacionController.updateCurrentStage
);

//Actualizar Proceso (Notese la diferencia con el endpoint de actualizar operacion que es mas generico)
router.patch(
    '/:sucursalId/:operacionId/procesos/:procesoId',
    validationMiddleware(updateProcesoValidation),
    OperacionController.updateProceso
);

//Obtener Procesos por filtros
router.get(
    '/:sucursalId/procesos/filter',
    OperacionController.getProcesosByFilters
);

//Obtener Procesos por numero de orden
router.get(
    '/:sucursalId/procesos/by-orden',
    OperacionController.filterProcesosByNumOrden
);

export default router;