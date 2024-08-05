import express from 'express';
import { enrollUser, getUserClasses, getClassUsers, dropUser } from '../controllers/enrollmentController.js';

const router = express.Router();
router.post('/enroll', enrollUser);
router.get('/:userId/classes', getUserClasses);
router.get('/:classId/users', getClassUsers);
router.delete('/drop', dropUser);

export default router;
