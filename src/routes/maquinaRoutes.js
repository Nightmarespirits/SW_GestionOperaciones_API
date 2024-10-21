import express from "express";
import { getAllEMaquinas, 
    createMaquina, 
    getMaquinaById, 
    updateMaquina, 
    deleteMaquina,
    getMaquinasBySedeYTipo
} from "../controllers/maquinaController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import planMiddleware from "../middleware/planMiddleware.js";

const router = express.Router()
router.use(authMiddleware)

router.get('/', planMiddleware(['pro', 'basic']), getAllEMaquinas)
router.get('/get/:id', planMiddleware(['pro', 'basic']), getMaquinaById);
router.get('/filter', planMiddleware(['pro', 'basic']), getMaquinasBySedeYTipo)
router.post('/', planMiddleware(['pro', 'basic']), createMaquina);
router.delete('/:id', planMiddleware(['pro', 'basic']), deleteMaquina);
router.put('/:id', planMiddleware(['pro', 'basic']), updateMaquina)

export default router   