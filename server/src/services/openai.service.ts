import OpenAI from 'openai';
import { config } from '../config/config';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey
    });
  }

  async analyzeTransactions(transactions: any[]) {
    try {
      const prompt = this.createTransactionAnalysisPrompt(transactions);
      
      const response = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a financial advisor analyzing transaction data to provide personalized advice on budgeting and saving money. Focus on identifying spending patterns, suggesting areas for cost reduction, and providing actionable recommendations."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error analyzing transactions:', error);
      throw error;
    }
  }

  private createTransactionAnalysisPrompt(transactions: any[]): string {
    // Calculate total spending
    const totalSpent = transactions.reduce((sum, t) => sum + Math.abs(t.amount), 0);
    
    // Group transactions by category
    const categorySpending = transactions.reduce((acc: { [key: string]: number }, t) => {
      const category = t.category[0] || 'Uncategorized';
      acc[category] = (acc[category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

    // Format the prompt
    const prompt = `
      Please analyze these transaction patterns and provide financial advice:

      Total Spending: $${totalSpent.toFixed(2)}

      Spending by Category:
      ${Object.entries(categorySpending)
        .map(([category, amount]) => `${category}: $${amount.toFixed(2)}`)
        .join('\n')}

      Please provide:
      1. Analysis of spending patterns
      2. Areas where the user could potentially save money
      3. Specific, actionable recommendations for budget improvement
      4. Long-term savings strategies based on the spending habits
      5. Comparison with typical spending patterns in these categories
    `;

    return prompt;
  }

  async getSavingsChallenge(transactions: any[]) {
    try {
      const monthlySpending = this.calculateMonthlySpending(transactions);
      
      const response = await this.client.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a financial advisor creating personalized savings challenges. Based on the user's spending patterns, suggest realistic and achievable savings goals."
          },
          {
            role: "user",
            content: `
              Based on the following monthly spending patterns, create a personalized 30-day savings challenge:

              Monthly Spending Overview:
              ${Object.entries(monthlySpending)
                .map(([category, amount]) => `${category}: $${amount.toFixed(2)}`)
                .join('\n')}

              Please provide:
              1. A specific 30-day savings goal
              2. Weekly mini-challenges
              3. Category-specific saving tips
              4. Alternative spending suggestions
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Error generating savings challenge:', error);
      throw error;
    }
  }

  private calculateMonthlySpending(transactions: any[]): { [key: string]: number } {
    return transactions.reduce((acc: { [key: string]: number }, t) => {
      const category = t.category[0] || 'Uncategorized';
      acc[category] = (acc[category] || 0) + Math.abs(t.amount);
      return acc;
    }, {});
  }
}

export const openaiService = new OpenAIService();
