import Withdrawal from '../models/Withdrawal.js';
import User from '../models/User.js';
import Class from '../models/Class.js';

export const requestWithdrawal = async (req, res) => {
  const { userId, classId, reason } = req.body;

  try {
    const user = await User.findById(userId);
    const classItem = await Class.findById(classId);

    if (!user || !classItem) {
      return res.status(404).json({ msg: 'User or Class not found' });
    }

    const withdrawal = new Withdrawal({ userId, classId, reason });
    await withdrawal.save();

    res.status(201).json({ msg: 'Withdrawal request submitted successfully', withdrawal });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().populate('userId').populate('classId');
    res.json(withdrawals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
export const getUserWithdrawals = async (req, res) => {
  const { userId } = req.params;

  try {
    const withdrawals = await Withdrawal.find({ userId })
      .populate('userId')
      .populate('classId');
    res.json(withdrawals);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const approveWithdrawal = async (req, res) => {
  const { id } = req.params;

  try {
    const withdrawal = await Withdrawal.findById(id);

    if (!withdrawal) {
      return res.status(404).json({ msg: 'Withdrawal request not found' });
    }

    withdrawal.status = 'approved';
    await withdrawal.save();

    res.json({ msg: 'Withdrawal request approved', withdrawal });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

export const rejectWithdrawal = async (req, res) => {
  const { id } = req.params;

  try {
    const withdrawal = await Withdrawal.findById(id);

    if (!withdrawal) {
      return res.status(404).json({ msg: 'Withdrawal request not found' });
    }

    withdrawal.status = 'rejected';
    await withdrawal.save();

    res.json({ msg: 'Withdrawal request rejected', withdrawal });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
