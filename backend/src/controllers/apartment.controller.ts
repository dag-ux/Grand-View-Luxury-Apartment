import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApartmentStatus } from '@prisma/client';

export const createApartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, bedrooms, bathrooms, sizeSqm, images } = req.body;
    
    const apartment = await prisma.apartment.create({
      data: { title, description, price, bedrooms, bathrooms, sizeSqm, images, status: ApartmentStatus.AVAILABLE },
    });
    
    res.status(201).json({ message: 'Apartment created successfully', apartment });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating apartment', details: error.message });
  }
};

export const getAllApartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bedrooms, status } = req.query;
    const apartments = await prisma.apartment.findMany({
      where: {
        ...(bedrooms && { bedrooms: Number(bedrooms) }),
        ...(status && { status: status as ApartmentStatus }),
      },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json(apartments);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching apartments', details: error.message });
  }
};

export const getApartmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const apartment = await prisma.apartment.findUnique({ where: { id } });
    
    if (!apartment) {
      res.status(404).json({ message: 'Apartment not found' });
      return;
    }
    res.status(200).json(apartment);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching apartment', details: error.message });
  }
};