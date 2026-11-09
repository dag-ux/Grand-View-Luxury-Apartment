import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path'; // <-- Add this
import authRoutes from './routes/auth.routes';
import apartmentRoutes from './routes/apartment.routes';
import inquiryRoutes from './routes/inquiry.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded images and videos
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads'))); // <-- Add this

app.use('/api/auth', authRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/inquiries', inquiryRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Grand View Backend is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});