import express from "express";
import { getAllOperaciones,getOperacionesByEstado, createOperacion, getOperacionById, updateOperacion, deleteOperacion } from "../controllers/operacionController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import planMiddleware from "../middleware/planMiddleware.js";

const router = express.Router()
router.use(authMiddleware)

router.get('/all', planMiddleware(['pro', 'basic']), getAllOperaciones)
router.get('/estado/:estado', planMiddleware(['pro', 'basic']), getOperacionesByEstado)
router.get('/id/:id', planMiddleware(['pro', 'basic']), getOperacionById);
router.post('/', planMiddleware(['pro', 'basic']), createOperacion);
router.delete('/:id', planMiddleware(['pro', 'basic']), deleteOperacion);
router.put('/:id', planMiddleware(['pro', 'basic']), updateOperacion)

export default router   