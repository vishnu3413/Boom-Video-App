import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add comment
router.post('/:videoId', verifyToken, addComment);

// Get all comment for a video
router.get('/:videoId', verifyToken, getComments);

export default router;