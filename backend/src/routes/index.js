/*
 * File: src/routes/index.js
 * Description:
 * This module defines the main routing for the application, connecting various 
 * sub-routes for different resources such as organizations, plans, features, 
 * tenants, subscriptions, roles, and users. Each route module handles its specific 
 * operations and database interactions, utilizing Prisma as the ORM.
*/

import express from 'express'; 
import authRoutes from './authRoutes.js';
import videoRoutes from './videoRoutes.js';
import purchaseRoutes from './purchaseRoutes.js';
import commentRoutes from './commentRoutes.js';
import walletRoutes from './walletRoutes.js';
import giftRoutes from './giftRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/videos', videoRoutes);
router.use('/purchases', purchaseRoutes);
router.use('/comments', commentRoutes);
router.use('/gifts', giftRoutes);
router.use('/wallet', walletRoutes);

export default router;