import express, { Router } from 'express';
import { getFinancialAdvice, getSavingsChallenge } from '../controllers/advice.controller';
import { auth } from '../middleware/auth.middleware';

const router: Router = express.Router();

// All advice routes require authentication
router.use(auth);

// Get AI-powered financial advice based on transaction history
router.get('/analysis', getFinancialAdvice as express.RequestHandler);

// Get personalized savings challenge
router.get('/savings-challenge', getSavingsChallenge as express.RequestHandler);

export default router;
