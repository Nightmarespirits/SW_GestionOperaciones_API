import express from "express";
import {getSucursales, getSucursalById, createSucursal, updateSucursal, deleteSucursal} from "../controller/sucursalController.js"
import authMiddleware from "../../auth/middleware/authMiddleware.js";
import planMiddleware from "../../auth/middleware/planMiddleware.js";

const router = express.Router({mergeParams : true})
router.use(authMiddleware)


router.get('/:id', planMiddleware(['premium', 'basic']), getSucursalById);
router.get('/', planMiddleware(['premium', 'basic']), getSucursales)
router.post('/', planMiddleware(['premium', 'basic']), createSucursal);
router.put('/:id', planMiddleware(['premium', 'basic']), updateSucursal)
router.delete('/:id', planMiddleware(['premium', 'basic']), deleteSucursal);

export default router   