import express from 'express';
import { requestWithdrawal, getAllWithdrawals, approveWithdrawal, rejectWithdrawal } from '../controllers/withdrawalController.js';

const router = express.Router();
router.post('/request', requestWithdrawal);
router.get('/', getAllWithdrawals);
router.put('/approve/:id', approveWithdrawal);
router.put('/reject/:id', rejectWithdrawal);

export default router;
