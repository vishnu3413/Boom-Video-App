import express from 'express';
import { getWallet } from '../controllers/walletController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get wallet details of user
router.get('/', verifyToken, getWallet);

export default router;