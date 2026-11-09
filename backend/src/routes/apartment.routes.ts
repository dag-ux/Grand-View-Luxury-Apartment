import { Router } from 'express';
import { createApartment, getAllApartments, getApartmentById } from '../controllers/apartment.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware'; // Import the bouncer

const router = Router();

// Public routes
router.get('/', getAllApartments);
router.get('/:id', getApartmentById);

// Protected routes (Only logged-in Super Admins and Managers can create)
router.post(
  '/', 
  protect, 
  authorizeRoles('SUPER_ADMIN', 'MANAGER'), 
  createApartment
);

export default router;