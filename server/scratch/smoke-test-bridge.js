const API_URL = 'http://localhost:4000/api';

async function runSmokeTest() {
  console.log('--- Starting Manual Design-to-Project Bridge Smoke Test ---');
  
  try {
    // 1. Get a customer for setup
    const customersRes = await fetch(`${API_URL}/customers`).then(r => r.json());
    
    if (!customersRes.data || customersRes.data.length === 0) {
      throw new Error('Need at least one customer in DB to run test.');
    }
    
    const customerId = customersRes.data[0].id;
    console.log(`Using Customer: ${customerId}`);

    // 2. Create a DesignRequest
    console.log('Step 2: Creating Design Request...');
    const createRes = await fetch(`${API_URL}/design-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Smoke Test Bridge Project',
        description: 'Project created via smoke test',
        buildingType: 'Residential',
        location: 'Jakarta',
        estimatedBudget: 750000000,
        customerId: customerId
      })
    }).then(r => r.json());
    
    const requestId = createRes.data.id;
    console.log(`Created Design Request ID: ${requestId}`);

    // 3. Try to convert (should fail as it is 'submitted')
    console.log('Step 3: Trying to convert non-approved request (expecting failure)...');
    const failRes = await fetch(`${API_URL}/design-requests/${requestId}/convert-to-project`, {
      method: 'POST'
    }).then(r => r.json());
    
    if (!failRes.success) {
      console.log(`Success: Correctly failed with message: ${failRes.message}`);
    } else {
      console.error('ERROR: Should have failed but succeeded!');
    }

    // 4. Update status to 'approved'
    console.log('Step 4: Approving Design Request...');
    await fetch(`${API_URL}/design-requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' })
    });
    console.log('Status updated to approved.');

    // 5. Convert to Project
    console.log('Step 5: Converting to Project...');
    const convertRes = await fetch(`${API_URL}/design-requests/${requestId}/convert-to-project`, {
      method: 'POST'
    }).then(r => r.json());
    
    if (convertRes.success) {
      const project = convertRes.data.project;
      console.log('Conversion Successful!');
      console.log(`New Project ID: ${project.id}`);
      console.log(`Project Code: ${project.projectCode}`);
      console.log(`Project Status: ${project.status}`);
    } else {
      console.error(`ERROR: Conversion failed: ${convertRes.message}`);
      process.exit(1);
    }

    // 6. Verify link in DesignRequest
    console.log('Step 6: Verifying link in DesignRequest...');
    const verifyRes = await fetch(`${API_URL}/design-requests/${requestId}`).then(r => r.json());
    if (verifyRes.data.projectId) {
      console.log('Link Verified: DesignRequest correctly references a Project ID.');
    } else {
      console.error('ERROR: DesignRequest does not reference a Project ID!');
    }

    // 7. Try to convert again (should fail - duplicate check)
    console.log('Step 7: Trying to convert again (expecting duplicate failure)...');
    const dupRes = await fetch(`${API_URL}/design-requests/${requestId}/convert-to-project`, {
      method: 'POST'
    }).then(r => r.json());
    
    if (!dupRes.success) {
      console.log(`Success: Correctly failed duplicate check with message: ${dupRes.message}`);
    } else {
      console.error('ERROR: Should have failed duplicate check but succeeded!');
    }

    console.log('--- Smoke Test Completed Successfully! ---');
  } catch (error) {
    console.error('--- Smoke Test Failed! ---');
    console.error(error.message);
  }
}

runSmokeTest();
