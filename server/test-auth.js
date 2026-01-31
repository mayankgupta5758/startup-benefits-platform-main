const http = require('http');

// Test Register
const registerData = JSON.stringify({
  name: 'Rahul Vyas',
  email: 'rahul@startup.com',
  password: 'password123',
  role: 'founder'
});

const opts = {
  hostname: 'localhost',
  port: 4000,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': registerData.length
  }
};

console.log('Testing Registration...');
const req = http.request(opts, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    console.log('\n✅ REGISTRATION RESPONSE:');
    console.log(data);
    
    // Parse response to extract token
    try {
      const response = JSON.parse(data);
      if (response.token) {
        console.log('\n🔐 JWT TOKEN:', response.token);
        testLogin(response.token);
      }
    } catch (e) {
      console.error('Error parsing response');
    }
  });
});

req.on('error', (e) => console.error('Error:', e.message));
req.write(registerData);
req.end();

// Test Login
function testLogin(token) {
  setTimeout(() => {
    const loginData = JSON.stringify({
      email: 'rahul@startup.com',
      password: 'password123'
    });

    const loginOpts = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
      }
    };

    console.log('\n\nTesting Login...');
    const loginReq = http.request(loginOpts, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log('\n✅ LOGIN RESPONSE:');
        console.log(data);
      });
    });

    loginReq.on('error', (e) => console.error('Error:', e.message));
    loginReq.write(loginData);
    loginReq.end();
  }, 500);
}
