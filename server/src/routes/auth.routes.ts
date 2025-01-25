import express, { Router } from 'express';
import { register, login, getProfile } from '../controllers/auth.controller';
import { auth } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Public routes
router.post('/register', register as express.RequestHandler);
router.post('/login', login as express.RequestHandler);

// Protected routes
router.get('/profile', auth, getProfile as express.RequestHandler);

export default router;
