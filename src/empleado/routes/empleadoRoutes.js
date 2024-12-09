import express from "express";
import { getAllEmpleados, createEmpleado, getEmpById, updateEmp, deleteEmp } from "../controller/empController.js";
import authMiddleware from "../../auth/middleware/authMiddleware.js";
import planMiddleware from "../../auth/middleware/planMiddleware.js";

const router = express.Router()
router.use(authMiddleware)

router.get('/', planMiddleware(['pro', 'basic']), getAllEmpleados)
router.post('/', planMiddleware(['pro', 'basic']), createEmpleado);
router.get('/:id', planMiddleware(['pro', 'basic']), getEmpById);
router.delete('/:id', planMiddleware(['pro', 'basic']), deleteEmp);
router.put('/:id', planMiddleware(['pro', 'basic']), updateEmp)

export default router   