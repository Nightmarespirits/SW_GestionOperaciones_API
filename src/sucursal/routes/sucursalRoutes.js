import express from "express";
import {getSucursales, getSucursalById, createSucursal, updateSucursal, deleteSucursal} from "../controller/sucursalController.js"
import authMiddleware from "../../auth/middleware/authMiddleware.js";
import planMiddleware from "../../auth/middleware/planMiddleware.js";

const router = express.Router({mergeParams : true})
router.use(authMiddleware)


router.get('/:id', planMiddleware([ 'root', 'premium', 'basic', 'free']), getSucursalById);
router.get('/', planMiddleware([ 'root', 'premium', 'basic', 'free']), getSucursales)
router.post('/', planMiddleware([ 'root', 'premium', 'basic']), createSucursal);
router.put('/:id', planMiddleware([ 'root', 'premium', 'basic']), updateSucursal)
router.delete('/:id', planMiddleware([ 'root', 'premium', 'basic']), deleteSucursal);

export default router   