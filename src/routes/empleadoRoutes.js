import express from "express";
import { getAllEmpleados, createEmpleado, getEmpById, updateEmp, deleteEmp } from "../controllers/empController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import planMiddleware from "../middleware/planMiddleware.js";

const router = express.Router()
router.use(authMiddleware)

router.get('/', planMiddleware(['pro', 'basic']), getAllEmpleados)
router.post('/', planMiddleware(['pro', 'basic']), createEmpleado);
router.get('/:id', planMiddleware(['pro', 'basic']), getEmpById);
router.delete('/:id', planMiddleware(['pro', 'basic']), deleteEmp);
router.put('/:id', planMiddleware(['pro', 'basic']), updateEmp)

export default router   