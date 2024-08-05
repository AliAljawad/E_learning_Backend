import User from '../models/User.js';

export const getAllUsers = async (req, res,next) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  };
  
  export const deleteUser = async (req, res,next) => {
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting user" });
    }
  };
  