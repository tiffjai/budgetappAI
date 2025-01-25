import { Request, Response } from 'express';
import { plaidService } from '../services/plaid.service';
import { openaiService } from '../services/openai.service';
import { store } from '../services/store.service';

export const getFinancialAdvice = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = store.getUserById(userId);

    if (!user?.plaidAccessToken) {
      return res.status(400).json({ error: 'No linked bank account found' });
    }

    // Get last 30 days of transactions
    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    const transactionsResponse = await plaidService.getTransactions(
      user.plaidAccessToken,
      startDate,
      endDate
    );

    // Analyze transactions with OpenAI
    const advice = await openaiService.analyzeTransactions(transactionsResponse.transactions);

    res.json({ advice });
  } catch (error) {
    console.error('Error getting financial advice:', error);
    res.status(500).json({ error: 'Failed to generate financial advice' });
  }
};

export const getSavingsChallenge = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const user = store.getUserById(userId);

    if (!user?.plaidAccessToken) {
      return res.status(400).json({ error: 'No linked bank account found' });
    }

    // Get last 30 days of transactions
    const endDate = new Date().toISOString().slice(0, 10);
    const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);

    const transactionsResponse = await plaidService.getTransactions(
      user.plaidAccessToken,
      startDate,
      endDate
    );

    // Generate savings challenge based on transaction history
    const challenge = await openaiService.getSavingsChallenge(transactionsResponse.transactions);

    res.json({ challenge });
  } catch (error) {
    console.error('Error generating savings challenge:', error);
    res.status(500).json({ error: 'Failed to generate savings challenge' });
  }
};
