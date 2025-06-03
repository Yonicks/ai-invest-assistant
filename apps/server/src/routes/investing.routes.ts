import { Router } from 'express';
import multer from 'multer';
import { uploadPortfolio } from '../controllers/investing.controller';
import { authenticateToken } from '../middleware/authenticateToken';

const router: Router = Router();
const upload = multer(); // memory storage by default

router.post('/upload',authenticateToken,upload.single('file'), uploadPortfolio);

export default router;
