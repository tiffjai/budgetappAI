import axios from 'axios';

const API_URL = 'http://localhost:3000/api';
let authToken: string;

const testEndpoints = async () => {
  try {
    console.log('Testing API endpoints...\n');

    // Test health check
    console.log('1. Testing health check endpoint...');
    const healthResponse = await axios.get(`${API_URL.replace('/api', '')}/health`);
    console.log('Health check response:', healthResponse.data);
    console.log('✅ Health check successful\n');

    // Test registration
    console.log('2. Testing user registration...');
    const registerResponse = await axios.post(`${API_URL}/auth/register`, {
      email: 'test@example.com',
      password: 'testpassword123',
      name: 'Test User'
    });
    authToken = registerResponse.data.token;
    console.log('Registration response:', registerResponse.data);
    console.log('✅ Registration successful\n');

    // Test Plaid link token creation
    console.log('3. Testing Plaid link token creation...');
    const plaidResponse = await axios.post(
      `${API_URL}/plaid/create-link-token`,
      {},
      {
        headers: { Authorization: `Bearer ${authToken}` }
      }
    );
    console.log('Plaid link token response:', plaidResponse.data);
    console.log('✅ Plaid link token creation successful\n');

    // Test financial advice endpoint (without bank connection)
    console.log('4. Testing financial advice endpoint...');
    try {
      await axios.get(`${API_URL}/advice/analysis`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
    } catch (error: any) {
      if (error.response?.status === 400 && error.response?.data?.error === 'No linked bank account found') {
        console.log('✅ Financial advice endpoint correctly requires bank connection\n');
      } else {
        throw error;
      }
    }

    console.log('All basic endpoint tests completed successfully! 🎉');
    console.log('\nNote: Some features require additional setup:');
    console.log('- Plaid integration requires valid API credentials');
    console.log('- OpenAI integration requires a valid API key');
    console.log('- Bank account connection requires completing the Plaid Link flow');

  } catch (error) {
    console.error('Error during testing:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response data:', error.response?.data);
    }
  }
};

// Run tests
testEndpoints();
