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
- `MONGODB_URI`: MongoDB connection string
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
  - Requires authentication header: `Authorization: Bearer <token>`

### Health Check

- `GET /health`
  - Check server status
  - Returns: `{ "status": "ok" }`

## Authentication

Protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400`: Bad Request - Invalid input
- `401`: Unauthorized - Missing or invalid authentication
- `404`: Not Found - Resource doesn't exist
- `500`: Internal Server Error - Server-side error

## Development Notes

- TypeScript for type safety
- MongoDB with Mongoose for data storage
- JWT for authentication
- Express.js middleware for security (helmet, cors)
- Error handling middleware
- Environment-based configuration

## Coming Soon

- Plaid integration for bank account linking
- Transaction synchronization
- OpenAI integration for financial advice
- Budget analysis and recommendations
