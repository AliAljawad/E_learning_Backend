import File from '../models/File.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

const upload = multer({
  dest: 'uploads/', 
  limits: { fileSize: 10000000 }, 
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

export const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { classId } = req.body;
    if (!file || !classId) {
      return res.status(400).json({ msg: 'No file uploaded or class ID not provided' });
    }

    const newFile = new File({
      filename: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
      classId,
    });

    await newFile.save();
    res.status(201).json(newFile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getAllFiles = async (req, res) => {
  try {
    const files = await File.find().populate('classId');
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getFilesByClassId = async (req, res) => {
  try {
    const files = await File.find({ classId: req.params.classId });
    res.json(files);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id).populate('classId');
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }
    res.json(file);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    fs.unlinkSync(file.path);

    await file.remove();
    res.json({ msg: 'File removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
