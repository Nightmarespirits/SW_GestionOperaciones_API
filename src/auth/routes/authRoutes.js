import express from "express";
import { register, login } from "../controller/authController.js";
import { requestVerificationCode, verifyCode, forgetPassword} from '../controller/authController.js';

const router = express.Router();
router.post('/register', register)
router.post('/login', login)
router.post('/request-verification-code', requestVerificationCode);
router.post('/verify', verifyCode);
router.post('/forget-password', forgetPassword)

export default router;