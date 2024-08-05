import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass
} from '../controllers/classController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();
router.post('/', adminMiddleware, createClass);
router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.put('/:id', updateClass);
router.delete('/:id', adminMiddleware, deleteClass);

export default router;
