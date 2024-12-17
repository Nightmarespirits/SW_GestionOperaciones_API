import express from "express";
import { getEmpleados, createEmpleado, getEmpById, updateEmp, deleteEmp } from "../controller/empController.js";
import authMiddleware from "../../middleware/authMiddleware.js";
import planMiddleware from "../../middleware/planMiddleware.js";

const router = express.Router({mergeParams: true})
router.use(authMiddleware)

router.get('/', planMiddleware(['root', 'pro', 'basic']), getEmpleados)
router.post('/:sucursalId/', planMiddleware(['root', 'pro', 'basic']), createEmpleado);
router.get('/:id', planMiddleware(['root', 'pro', 'basic']), getEmpById);
router.delete('/:id', planMiddleware(['root', 'pro', 'basic']), deleteEmp);
router.put('/:id', planMiddleware(['root', 'pro', 'basic']), updateEmp)

export default router   