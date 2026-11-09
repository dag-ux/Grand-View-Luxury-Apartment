import { Router } from 'express';
import { createInquiry, getAllInquiries, updateInquiryStatus } from '../controllers/inquiry.controller';
import { protect, authorizeRoles } from '../middleware/auth.middleware';

const router = Router();

// Public route (from the website)
router.post('/', createInquiry);

// Protected routes (Only Admins/Managers can view and update)
router.get('/', protect, authorizeRoles('SUPER_ADMIN', 'MANAGER'), getAllInquiries);
router.put('/:id/status', protect, authorizeRoles('SUPER_ADMIN', 'MANAGER'), updateInquiryStatus);

export default router;