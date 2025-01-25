export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/budgetapp',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  plaid: {
    clientId: process.env.PLAID_CLIENT_ID,
    secret: process.env.PLAID_SECRET,
    env: process.env.PLAID_ENV || 'sandbox'
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY
  }
};
