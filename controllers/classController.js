import Class from '../models/Class.js';
import { validationResult } from 'express-validator';

export const createClass = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description } = req.body;

  try {
    const newClass = new Class({
      name,
      description,
    });

    await newClass.save();
    res.status(201).json(newClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.json(classes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getClassById = async (req, res) => {
  const { id } = req.params;

  try {
    const singleClass = await Class.findById(id);
    if (!singleClass) {
      return res.status(404).json({ msg: 'Class not found' });
    }
    res.json(singleClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const updateClass = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedClass) {
      return res.status(404).json({ msg: 'Class not found' });
    }
    res.json(updatedClass);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedClass = await Class.findByIdAndDelete(id);
    if (!deletedClass) {
      return res.status(404).json({ msg: 'Class not found' });
    }
    res.json({ msg: 'Class removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
