import express from "express";
import { getAllProcesos, 
    getProcesoById, 
    createProceso, 
    deleteProceso, 
    updateProceso, 
    getProcesosByTipo,
    getProcesosByEstado
} from "../controllers/procesosController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import planMiddleware from "../middleware/planMiddleware.js";

const router = express.Router()
router.use(authMiddleware)

router.get('/', planMiddleware(['pro', 'basic']), getAllProcesos);
router.get('/get/:id', planMiddleware(['pro', 'basic']), getProcesoById);
router.get('/filter', planMiddleware(['pro', 'basic']), getProcesosByTipo);
router.get('/status', planMiddleware(['pro', 'basic']), getProcesosByEstado);

router.post('/', planMiddleware(['pro', 'basic']), createProceso);

router.delete('/:id', planMiddleware(['pro', 'basic']), deleteProceso);
router.put('/:id', planMiddleware(['pro', 'basic']), updateProceso)

export default router   