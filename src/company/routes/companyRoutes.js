import express from "express";
import { getAllCompanies, getCompanyById, updateCompany, deleteCompany, changeCompanyPassword, validateCompanyPassword } from "../controller/companyController.js";
import authMiddleware from "../../middleware/planMiddleware.js";
import planMiddleware from "../../middleware/planMiddleware.js";

const router = express.Router({mergeParams: true});

router.use(authMiddleware);

router.get('/', planMiddleware(['root']), getAllCompanies)
router.post('/:companyId/validate-password', planMiddleware(['root','premium', 'basic']), validateCompanyPassword)
router.post('/:companyId/change-password', planMiddleware(['root','premium', 'basic']), changeCompanyPassword )
router.get('/:id', planMiddleware(['root','premium', 'basic']), getCompanyById);
router.put('/:id', planMiddleware(['root','premium', 'basic']), updateCompany);
router.delete('/:id', planMiddleware(['root']), deleteCompany);


export default router   