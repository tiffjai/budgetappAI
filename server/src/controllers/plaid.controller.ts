import { Request, Response } from 'express';
import { plaidService } from '../services/plaid.service';
import { store } from '../services/store.service';

export const createLinkToken = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const linkToken = await plaidService.createLinkToken(userId);
    res.json(linkToken);
  } catch (error) {
    console.error('Error creating link token:', error);
    res.status(500).json({ error: 'Failed to create link token' });
  }
};

export const setAccessToken = async (req: Request, res: Response) => {
  try {
    const { public_token } = req.body;
    const userId = req.user.id;

    // Exchange public token for access token
    const { accessToken, itemId } = await plaidService.exchangePublicToken(public_token);

    // Update user with Plaid tokens
    store.updateUser(userId, {
      plaidAccessToken: accessToken,
      plaidItemId: itemId
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Error setting access token:', error);
    res.status(500).json({ error: 'Failed to set access token' });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = store.getUserById(userId);

    if (!user?.plaidAccessToken) {
      return res.status(400).json({ error: 'No linked bank account found' });
    }

    // Default to last 30 days if no dates provided
    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    const transactions = await plaidService.getTransactions(
      user.plaidAccessToken,
      startDate,
      endDate
    );

    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
