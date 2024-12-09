import express from "express";
import { 
    getMaquinas,
    getMaquinaById,
    getMaquinaByCodigoFabrica,
    createMaquina,
    updateMaquina,
    deleteMaquina
} from "../controller/maquinaController.js";
import authMiddleware from "../../auth/middleware/authMiddleware.js";
import planMiddleware from "../../auth/middleware/planMiddleware.js";

const router = express.Router({ mergeParams: true })
router.use(authMiddleware)

router.get('/codigo/:codigoFabrica', planMiddleware(['premium', 'basic']), getMaquinaByCodigoFabrica)
router.get('/:id', planMiddleware(['premium', 'basic']), getMaquinaById)
router.get('/', planMiddleware(['premium', 'basic']), getMaquinas)
router.post('/', planMiddleware(['premium', 'basic']), createMaquina)
router.put('/:id', planMiddleware(['premium', 'basic']), updateMaquina)
router.delete('/:id', planMiddleware(['premium', 'basic']), deleteMaquina)

export default router   
