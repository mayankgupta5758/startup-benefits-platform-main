const http = require('http');

// Test GET /api/deals
function getDeals() {
  console.log('📦 Fetching all deals...\n');
  http.get('http://localhost:4000/api/deals', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      const response = JSON.parse(data);
      console.log(`✅ Found ${response.deals.length} deals:\n`);
      response.deals.forEach((deal, i) => {
        console.log(`${i + 1}. ${deal.title}`);
        console.log(`   Category: ${deal.category} | Locked: ${deal.isLocked}`);
        console.log(`   Partner: ${deal.partnerName}`);
        console.log();
      });
    });
  });
}

// Test GET /api/deals/:id (get first deal)
function getDealById() {
  setTimeout(() => {
    console.log('\n\n🔍 Testing GET /api/deals/:id...\n');
    http.get('http://localhost:4000/api/deals', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const response = JSON.parse(data);
        if (response.deals.length > 0) {
          const dealId = response.deals[0]._id;
          console.log(`Fetching deal: ${response.deals[0].title} (ID: ${dealId})\n`);
          
          http.get(`http://localhost:4000/api/deals/${dealId}`, (res2) => {
            let data2 = '';
            res2.on('data', (chunk) => data2 += chunk);
            res2.on('end', () => {
              const dealResponse = JSON.parse(data2);
              console.log('✅ SINGLE DEAL RESPONSE:');
              console.log(JSON.stringify(dealResponse.deal, null, 2));
            });
          });
        }
      });
    });
  }, 1000);
}

// Test filtering deals
function testFilters() {
  setTimeout(() => {
    console.log('\n\n🔍 Testing GET /api/deals?category=Design...\n');
    http.get('http://localhost:4000/api/deals?category=Design', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        const response = JSON.parse(data);
        console.log(`✅ Found ${response.deals.length} deals in Design category:`);
        response.deals.forEach((deal) => {
          console.log(`   - ${deal.title}`);
        });
      });
    });
  }, 2000);
}

getDeals();
getDealById();
testFilters();
