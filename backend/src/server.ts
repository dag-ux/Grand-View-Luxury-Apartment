import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import apartmentRoutes from './routes/apartment.routes';
import inquiryRoutes from './routes/inquiry.routes'; // <-- ADD THIS

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/apartments', apartmentRoutes);
app.use('/api/inquiries', inquiryRoutes); // <-- ADD THIS

app.get('/', (req: Request, res: Response) => {
  res.send('Grand View Backend is running successfully!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});