import fetch from 'node-fetch';

const API_BASE = 'http://localhost:5000/api';

const testEndpoints = [
  { name: 'Health Check', url: `${API_BASE}/health`, method: 'GET' },
  { name: 'CORS Test', url: `${API_BASE}/debug/cors`, method: 'GET' },
];

const testAPI = async () => {
  console.log('🧪 Testing API endpoints...\n');

  for (const test of testEndpoints) {
    try {
      console.log(`Testing ${test.name}...`);
      const response = await fetch(test.url, { method: test.method });
      const data = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${test.name}: SUCCESS`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Response:`, data);
      } else {
        console.log(`❌ ${test.name}: FAILED`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Error:`, data);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: CONNECTION ERROR`);
      console.log(`   Error:`, error.message);
    }
    console.log('');
  }
};

testAPI();