# Budget App Backend Server

Express.js backend server for the Budget App with Plaid integration and OpenAI-powered financial advice.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory using `.env.example` as a template:
```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT token generation
- `PLAID_CLIENT_ID`: Your Plaid client ID
- `PLAID_SECRET`: Your Plaid secret key
- `PLAID_ENV`: Plaid environment (sandbox/development/production)
- `OPENAI_API_KEY`: Your OpenAI API key

## Development

Start the development server with hot reload:
```bash
npm run dev
```

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register`
  - Register a new user
  - Body: `{ "email": string, "password": string, "name": string }`

- `POST /api/auth/login`
  - Login user
  - Body: `{ "email": string, "password": string }`

- `GET /api/auth/profile`
  - Get user profile
  - Requires authentication

### Plaid Integration

- `POST /api/plaid/create-link-token`
  - Create a Plaid Link token for bank account connection
  - Requires authentication

- `POST /api/plaid/set-access-token`
  - Exchange public token for access token
  - Body: `{ "public_token": string }`
  - Requires authentication

- `GET /api/plaid/transactions`
  - Get user's transactions for the last 30 days
  - Requires authentication

### Financial Advice

- `GET /api/advice/analysis`
  - Get AI-powered analysis of spending patterns and financial advice
  - Requires authentication and connected bank account

- `GET /api/advice/savings-challenge`
  - Get personalized 30-day savings challenge
  - Requires authentication and connected bank account

### Health Check

- `GET /health`
  - Check server status
  - Returns: `{ "status": "ok" }`

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Missing or invalid authentication
- `404`: Not Found - Resource doesn't exist
- `500`: Internal Server Error - Server-side error

## Development Notes

- TypeScript for type safety
- JWT for authentication
- Express.js middleware for security (helmet, cors)
- In-memory storage for development (can be extended to use MongoDB)
- Plaid integration for bank account data
- OpenAI integration for financial advice
- Error handling middleware
- Environment-based configuration

## Features

- User authentication and authorization
- Bank account connection via Plaid
- Transaction history retrieval
- AI-powered financial analysis
- Personalized savings challenges
- Secure API endpoints
- Comprehensive error handling

## Coming Soon

- Transaction categorization improvements
- Budget goal setting
- Spending alerts
- Investment advice
- Detailed financial reports
