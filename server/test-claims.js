const http = require('http');

// Token from earlier test
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzhlMzBkNTVjZmY2MmE3Y2UzNjM3NSIsImVtYWlsIjoicmFodWxAc3RhcnR1cC5jb20iLCJpc1ZlcmlmaWVkIjpmYWxzZSwiaWF0IjoxNzY5NTMwMTI1LCJleHAiOjE3NzAxMzQ5MjV9.tJXbHOvsbAwAC-vMo6h9MZE5KmIZOZ6LDgO1vG1-VuU';

// First get a deal ID
function claimDeal() {
  console.log('🎯 Step 1: Getting deal ID...\n');
  http.get('http://localhost:4000/api/deals', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const response = JSON.parse(data);
      if (response.deals.length > 0) {
        const unlockedDeal = response.deals.find(d => !d.isLocked);
        if (unlockedDeal) {
          console.log(`Found unlocked deal: ${unlockedDeal.title}`);
          console.log(`Deal ID: ${unlockedDeal._id}\n`);
          
          // Claim the deal
          setTimeout(() => postClaim(unlockedDeal._id, TOKEN), 500);
        }
      }
    });
  });
}

function postClaim(dealId, token) {
  console.log('🎯 Step 2: Claiming deal...\n');
  const opts = {
    hostname: 'localhost',
    port: 4000,
    path: `/api/claims/${dealId}`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Content-Length': 0
    }
  };

  const req = http.request(opts, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log(`Status: ${res.statusCode}`);
      console.log('✅ CLAIM RESPONSE:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
      
      // Get user's claims
      setTimeout(() => getUserClaims(token), 500);
    });
  });

  req.on('error', (e) => console.error('Error:', e.message));
  req.end();
}

function getUserClaims(token) {
  setTimeout(() => {
    console.log('\n\n🎯 Step 3: Getting user claims...\n');
    const opts = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/claims/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const req = http.request(opts, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);
        const response = JSON.parse(data);
        console.log(`✅ User has ${response.claims.length} claims:`);
        response.claims.forEach((claim, i) => {
          console.log(`\n${i + 1}. Deal: ${claim.deal.title}`);
          console.log(`   Status: ${claim.status}`);
          console.log(`   Created: ${claim.createdAt}`);
        });
      });
    });

    req.on('error', (e) => console.error('Error:', e.message));
    req.end();
  }, 1000);
}

claimDeal();
