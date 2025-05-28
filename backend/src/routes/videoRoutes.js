import express from 'express';
import multer from 'multer';
import { addVideo, getAllVideos } from '../controllers/videoController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload video
router.post('/', verifyToken, upload.single('video'), addVideo);

// Get all videos
router.get('/', verifyToken, getAllVideos);

export default router;
