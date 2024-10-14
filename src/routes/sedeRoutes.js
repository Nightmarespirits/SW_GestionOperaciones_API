import express from "express";
import { getAllSedes, getSedeById, createSede, deleteSede, updateSede } from "../controllers/sedeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import planMiddleware from "../middleware/planMiddleware.js";

const router = express.Router()
router.use(authMiddleware)

router.get('/', planMiddleware(['pro', 'basic']), getAllSedes)
router.get('/:id', planMiddleware(['pro', 'basic']), getSedeById);
router.post('/', planMiddleware(['pro', 'basic']), createSede);
router.delete('/:id', planMiddleware(['pro', 'basic']), deleteSede);
router.put('/:id', planMiddleware(['pro', 'basic']), updateSede)

export default router   