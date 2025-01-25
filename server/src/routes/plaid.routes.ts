import express, { Router } from 'express';
import { createLinkToken, setAccessToken, getTransactions } from '../controllers/plaid.controller';
import { auth } from '../middleware/auth.middleware';

const router: Router = express.Router();

// All Plaid routes require authentication
router.use(auth);

// Create link token for Plaid Link initialization
router.post('/create-link-token', createLinkToken as express.RequestHandler);

// Exchange public token for access token
router.post('/set-access-token', setAccessToken as express.RequestHandler);

// Get user transactions
router.get('/transactions', getTransactions as express.RequestHandler);

export default router;
