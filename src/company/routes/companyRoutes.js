import express from "express";
import { getAllCompanies, getCompanyById, updateCompany, deleteCompany, changeCompanyPassword, validateCompanyPassword } from "../controller/companyController.js";
import authMiddleware from "../../auth/middleware/authMiddleware.js";
import planMiddleware from "../../auth/middleware/planMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get('/', planMiddleware(['root']), getAllCompanies)
router.get('/:id', planMiddleware(['root','premium', 'basic']), getCompanyById);
router.put('/:id', planMiddleware(['root','premium', 'basic']), updateCompany);
router.delete('/:id', planMiddleware(['root']), deleteCompany);
router.post('/change-password', planMiddleware(['root','premium', 'basic']), changeCompanyPassword )
router.post('/validate-password', planMiddleware(['root','premium', 'basic']), validateCompanyPassword )


export default router   