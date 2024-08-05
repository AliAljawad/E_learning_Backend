import express from 'express';
import { uploadFile, getAllFiles, getFilesByClassId, getFileById, deleteFile } from '../controllers/fileController.js';
import multer from 'multer';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload',adminMiddleware, upload.single('file'), uploadFile);
router.get('/', getAllFiles);
router.get('/class/:classId', getFilesByClassId);
router.get('/:id', getFileById);
router.delete('/:id', adminMiddleware,deleteFile);

export default router;
