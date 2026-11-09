import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const createInquiry = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, message, apartmentId, intent } = req.body;
    
    const inquiry = await prisma.inquiry.create({
      data: {
        name,
        email,
        phone,
        message,
        intent: intent || 'RENT',
        ...(apartmentId && { apartmentId }), 
      },
    });

    res.status(201).json({ message: 'Inquiry sent successfully', inquiry });
  } catch (error: any) {
    res.status(500).json({ message: 'Error sending inquiry', details: error.message });
  }
};

// NEW: Get all inquiries for the Dashboard
export const getAllInquiries = async (req: Request, res: Response): Promise<void> => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      include: {
        apartment: { select: { title: true } } // Include the apartment title if it exists
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(inquiries);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching inquiries', details: error.message });
  }
};

// NEW: Update the status of an inquiry
export const updateInquiryStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body; // NEW, CONTACTED, CLOSED

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status }
    });

    res.status(200).json({ message: 'Status updated', inquiry: updated });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating status', details: error.message });
  }
};