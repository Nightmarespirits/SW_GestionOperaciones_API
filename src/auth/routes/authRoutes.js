import express from "express";
import { register, login } from "../controller/authController.js";
import { requestVerificationCode, verifyCode } from '../controller/authController.js';

const router = express.Router();
router.post('/register', register)
router.post('/login', login)
router.post('/request-verification-code', requestVerificationCode);
router.post('/verify', verifyCode);

export default router;