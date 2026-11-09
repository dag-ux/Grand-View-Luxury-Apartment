import { Router } from 'express';
import { createApartment, getAllApartments, getApartmentById, updateApartment, deleteApartment } from '../controllers/apartment.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
  }
});

const upload = multer({ storage });

const router = Router();

router.get('/', getAllApartments);
router.get('/:id', getApartmentById);

// Accept up to 10 images, and 1 video
router.post(
  '/', 
  protect, 
  authorizeRoles('SUPER_ADMIN', 'MANAGER'), 
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), 
  createApartment
);

router.put(
  '/:id', 
  protect, 
  authorizeRoles('SUPER_ADMIN', 'MANAGER'), 
  upload.fields([{ name: 'images', maxCount: 10 }, { name: 'video', maxCount: 1 }]), 
  updateApartment
);

router.delete('/:id', protect, authorizeRoles('SUPER_ADMIN', 'MANAGER'), deleteApartment);

export default router;