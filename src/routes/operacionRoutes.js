import express from "express";
import { getAllOperaciones, createOperacion, getOperacionById, updateOperacion, deleteOperacion } from "../controllers/operacionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import planMiddleware from "../middleware/planMiddleware.js";

const router = express.Router()
router.use(authMiddleware)

router.get('/', planMiddleware(['pro', 'basic']), getAllOperaciones)
router.get('/:id', planMiddleware(['pro', 'basic']), getOperacionById);
router.post('/', planMiddleware(['pro', 'basic']), createOperacion);
router.delete('/:id', planMiddleware(['pro', 'basic']), deleteOperacion);
router.put('/:id', planMiddleware(['pro', 'basic']), updateOperacion)

export default router   