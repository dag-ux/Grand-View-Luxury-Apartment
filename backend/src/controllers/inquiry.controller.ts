import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const createInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, message, apartmentId } = req.body;
    
    // If an apartmentId is provided, link it. Otherwise, just create a general inquiry.
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        ...(apartmentId && { apartmentId }), 
      },
    });

    res.status(201).json({ message: 'Inquiry sent successfully', inquiry });
  } catch (error: any) {
    console.error("INQUIRY ERROR:", error);
    res.status(500).json({ message: 'Error sending inquiry', details: error.message });
  }
};