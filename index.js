import express from 'express';
import dotenv from 'dotenv';
import usersRoutes from './routes/users.routes.js';
import connectToDatabase from "./database/connection.js";
import classRoutes from './routes/class.routes.js';
import fileRoutes from './routes/file.routes.js';
import enrollmentRoutes from './routes/enrollments.routes.js';
import withdrawalRoutes from './routes/withdrawal.routes.js';
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
app.use('/users', usersRoutes);
app.use('/classes', classRoutes);
app.use('/files', fileRoutes);
app.use('/enrollments', enrollmentRoutes);
app.use('/withdrawals', withdrawalRoutes);
app.use('/uploads', express.static('uploads'));
app.listen(8080, () => {
  console.log('Server running on port 8080');
  connectToDatabase();
});
