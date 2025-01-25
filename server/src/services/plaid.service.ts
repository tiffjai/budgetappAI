import { Configuration, PlaidApi, PlaidEnvironments, Products, CountryCode } from 'plaid';
import { config } from '../config/config';

class PlaidService {
  private client: PlaidApi;

  constructor() {
    const configuration = new Configuration({
      basePath: PlaidEnvironments[config.plaid.env as keyof typeof PlaidEnvironments],
      baseOptions: {
        headers: {
          'PLAID-CLIENT-ID': config.plaid.clientId,
          'PLAID-SECRET': config.plaid.secret,
        },
      },
    });

    this.client = new PlaidApi(configuration);
  }

  async createLinkToken(userId: string) {
    try {
      const response = await this.client.linkTokenCreate({
        user: { client_user_id: userId },
        client_name: 'Budget App AI',
        products: [Products.Transactions],
        country_codes: [CountryCode.Us],
        language: 'en',
      });

      return response.data;
    } catch (error) {
      console.error('Error creating link token:', error);
      throw error;
    }
  }

  async exchangePublicToken(publicToken: string) {
    try {
      const response = await this.client.itemPublicTokenExchange({
        public_token: publicToken,
      });

      return {
        accessToken: response.data.access_token,
        itemId: response.data.item_id,
      };
    } catch (error) {
      console.error('Error exchanging public token:', error);
      throw error;
    }
  }

  async getTransactions(accessToken: string, startDate: string, endDate: string) {
    try {
      const response = await this.client.transactionsGet({
        access_token: accessToken,
        start_date: startDate,
        end_date: endDate,
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  }
}

export const plaidService = new PlaidService();
