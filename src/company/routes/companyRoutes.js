import express from "express";
import { getAllCompanies, getCompanyById, updateCompany, deleteCompany } from "../controller/companyController.js";
import authMiddleware from "../../auth/middleware/authMiddleware.js";
import planMiddleware from "../../auth/middleware/planMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', planMiddleware(['premium', 'basic']), getAllCompanies)
router.get('/:id', planMiddleware(['premium', 'basic']), getCompanyById);
router.put('/:id', planMiddleware(['premium', 'basic']), updateCompany);
router.delete('/:id', planMiddleware(['root']), deleteCompany);

export default router   