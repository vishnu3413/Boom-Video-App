import express from 'express';
import { purchaseVideo, getPurchasedVideos } from '../controllers/purchaseController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Purchase video
router.post('/:videoId', verifyToken, purchaseVideo);

// Purchase video
router.get('/', verifyToken, getPurchasedVideos);

export default router;
