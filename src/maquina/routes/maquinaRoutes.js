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

router.get('/codigo/:codigoFabrica', planMiddleware([ 'root', 'premium', 'basic']), getMaquinaByCodigoFabrica)
router.get('/:id', planMiddleware([ 'root', 'premium', 'basic']), getMaquinaById)
router.get('/', planMiddleware([ 'root', 'premium', 'basic']), getMaquinas)
router.post('/:sucursalId/', planMiddleware([ 'root', 'premium', 'basic']), createMaquina)
router.put('/:id', planMiddleware([ 'root', 'premium', 'basic']), updateMaquina)
router.delete('/:id', planMiddleware([ 'root', 'premium', 'basic']), deleteMaquina)


export default router   
