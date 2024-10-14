import express from "express";
import { getAllCompanies, getCompanyById, updateCompany, deleteCompany } from "../controllers/companyController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import planMiddleware from "../middleware/planMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', planMiddleware(['pro']), getAllCompanies)
router.get('/:id', planMiddleware(['pro', 'basic']), getCompanyById);
router.put('/:id', planMiddleware(['pro']), updateCompany);
router.delete('/:id', planMiddleware(['pro']), deleteCompany);

export default router   