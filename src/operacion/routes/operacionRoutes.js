import { Router } from 'express';
import OperacionController from '../controller/OperacionController.js';
// import authMiddleware from '../../auth/middleware/authMiddleware.js';
import validationMiddleware from '../../middleware/validationMiddleware.js';
import { 
    createOperacionValidation,
    updateOperacionValidation,
    addProcesoValidation,
    updateProcesoValidation
} from '../validations/operacionValidation.js';

const router = Router();

// Rutas protegidas por middleware de autenticación
// router.use(authMiddleware);

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
    '/:id', 
    OperacionController.getOperacionById
);

// Actualizar operación
router.put(
    '/:id', 
    validationMiddleware(updateOperacionValidation),
    OperacionController.updateOperacion
);

// Eliminar operación
router.delete(
    '/:id', 
    OperacionController.deleteOperacion
);

// Agregar proceso a operación
router.post(
    '/:sucursalId/:operacionId/procesos', 
    validationMiddleware(addProcesoValidation),
    OperacionController.addProceso
);

// Actualizar etapa actual de la operación
router.patch(
    '/:id/stage', 
    OperacionController.updateCurrentStage
);

// Nuevas rutas
router.patch(
    '/:operacionId/procesos/:procesoId',
    validationMiddleware(updateProcesoValidation),
    OperacionController.updateProceso
);

router.get(
    '/procesos/filter',
    OperacionController.getProcesosByFilters
);

router.get(
    '/procesos/by-orden',
    OperacionController.filterProcesosByNumOrden
);

export default router;