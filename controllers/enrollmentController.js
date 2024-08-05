import Enrollment from '../models/Enrollment.js';
import User from '../models/User.js';
import Class from '../models/Class.js';

export const enrollUser = async (req, res) => {
  const { userId, classId } = req.body;

  try {
    const user = await User.findById(userId);
    const classItem = await Class.findById(classId);

    if (!user || !classItem) {
      return res.status(404).json({ msg: 'User or Class not found' });
    }

    const enrollment = new Enrollment({ userId, classId });
    await enrollment.save();

    res.status(201).json({ msg: 'User enrolled successfully', enrollment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getUserClasses = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrollment.find({ userId }).populate('classId');
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getClassUsers = async (req, res) => {
  const { classId } = req.params;

  try {
    const enrollments = await Enrollment.find({ classId }).populate('userId');
    res.json(enrollments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const    dropUser = async (req, res) => {
  const { userId, classId } = req.body;

  try {
    const enrollment = await Enrollment.findOneAndDelete({ userId, classId });
    
    if (!enrollment) {
      return res.status(404).json({ msg: 'Enrollment not found' });
    }

    res.json({ msg: 'User dropped successfully', enrollment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
