import { Router } from 'express';
import { check } from 'express-validator';
import { register, login } from '../controllers/authController.js';
import { getAllUsers, deleteUser } from '../controllers/userController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = Router();
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  register
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login
);

router.get('/', adminMiddleware,getAllUsers);
router.delete('/:id',adminMiddleware, deleteUser);

export default router;
