import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ApartmentStatus } from '@prisma/client';

export const createApartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, price, bedrooms, bathrooms, sizeSqm, listingType, existingImages, videoUrl } = req.body;
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let images: string[] = [];
    
    if (files && files['images']) {
      images = files['images'].map(file => `/uploads/${file.filename}`);
    }
    
    if (existingImages) {
      const parsedExisting = JSON.parse(existingImages);
      images = [...parsedExisting, ...images];
    }

    let finalVideoUrl = videoUrl || null;
    if (files && files['video'] && files['video'][0]) {
      finalVideoUrl = `/uploads/${files['video'][0].filename}`;
    }

    const apartment = await prisma.apartment.create({
      data: { 
        title, 
        description, 
        price: Number(price), 
        bedrooms: Number(bedrooms), 
        bathrooms: Number(bathrooms), 
        sizeSqm: Number(sizeSqm), 
        images, 
        videoUrl: finalVideoUrl,
        status: ApartmentStatus.AVAILABLE, 
        listingType: listingType || 'RENT' 
      },
    });
    
    res.status(201).json({ message: 'Apartment created', apartment });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Error creating apartment', details: error.message });
  }
};

export const updateApartment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, price, bedrooms, bathrooms, sizeSqm, listingType, existingImages, videoUrl } = req.body;
    
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    let images: string[] = [];
    
    // Process new files
    if (files && files['images']) {
      images = files['images'].map(file => `/uploads/${file.filename}`);
    }
    
    // Process existing images (this will be an empty array if all were deleted by the user)
    if (existingImages) {
      const parsedExisting = JSON.parse(existingImages);
      images = [...parsedExisting, ...images];
    }

    let finalVideoUrl = videoUrl || null;
    if (files && files['video'] && files['video'][0]) {
      finalVideoUrl = `/uploads/${files['video'][0].filename}`;
    }

    const updated = await prisma.apartment.update({
      where: { id },
      data: {
        title, 
        description, 
        price: Number(price), 
        bedrooms: Number(bedrooms), 
        bathrooms: Number(bathrooms), 
        sizeSqm: Number(sizeSqm),
        listingType,
        images: images, // <-- FIXED: Always update images array
        videoUrl: finalVideoUrl
      }
    });
    res.status(200).json({ message: 'Apartment updated', apartment: updated });
  } catch (error: any) { 
    console.error(error);
    res.status(500).json({ message: 'Error updating', details: error.message }); 
  }
};

export const getAllApartments = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartments = await prisma.apartment.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json(apartments);
  } catch (error: any) { res.status(500).json({ message: 'Error', details: error.message }); }
};

export const getApartmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const apartment = await prisma.apartment.findUnique({ where: { id: req.params.id } });
    if (!apartment) { res.status(404).json({ message: 'Not found' }); return; }
    res.status(200).json(apartment);
  } catch (error: any) { res.status(500).json({ message: 'Error', details: error.message }); }
};

export const deleteApartment = async (req: Request, res: Response): Promise<void> => {
  try {
    await prisma.apartment.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: 'Apartment deleted' });
  } catch (error: any) { res.status(500).json({ message: 'Error deleting', details: error.message }); }
};