import express from 'express';
import { giftCreator } from '../controllers/giftController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Gift the creator
router.post('/', verifyToken, giftCreator);

export default router;
