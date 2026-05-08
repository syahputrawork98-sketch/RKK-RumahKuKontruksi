const API_URL = 'http://localhost:4000/api';

async function runContinuationTest() {
  console.log('--- Starting Project Setup Continuation Smoke Test ---');
  
  try {
    // 1. Get a customer for setup
    const customersRes = await fetch(`${API_URL}/customers`).then(r => r.json());
    const customerId = customersRes.data[0].id;
    const adminId = 'admin-001'; // Mock admin

    // 2. Create and Approve a DesignRequest
    console.log('Step 2: Preparing Approved Design Request...');
    const createRes = await fetch(`${API_URL}/design-requests`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Bridge Continuation Project',
        buildingType: 'Residential',
        location: 'Tangerang',
        estimatedBudget: 500000000,
        customerId: customerId
      })
    }).then(r => r.json());
    
    const requestId = createRes.data.id;
    await fetch(`${API_URL}/design-requests/${requestId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'approved' })
    });

    // 3. Convert to Project
    console.log('Step 3: Converting to Project...');
    const convertRes = await fetch(`${API_URL}/design-requests/${requestId}/convert-to-project`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId })
    }).then(r => r.json());
    
    const projectId = convertRes.data.project.id;
    console.log(`Project Created: ${projectId}`);

    // 4. Verify in List (Filtered by Admin)
    console.log('Step 4: Verifying visibility in Project List...');
    const listRes = await fetch(`${API_URL}/projects?adminId=${adminId}`).then(r => r.json());
    const found = listRes.data.find(p => p.id === projectId);
    if (found) {
      console.log(`Success: Project found in list with status: ${found.status}`);
    } else {
      console.error('ERROR: Project not found in list!');
    }

    // 5. Verify in Detail (with DesignRequest include)
    console.log('Step 5: Verifying visibility in Project Detail...');
    const detailRes = await fetch(`${API_URL}/projects/${projectId}`).then(r => r.json());
    const project = detailRes.data;
    
    console.log(`Project Name: ${project.name}`);
    console.log(`Customer: ${project.customer?.name}`);
    console.log(`Budget: ${project.budgetTotal}`);
    
    if (project.designRequests && project.designRequests.length > 0) {
      console.log(`Success: Source Design Request Linked: ${project.designRequests[0].title}`);
    } else {
      console.error('ERROR: Source Design Request NOT linked or NOT included in fetch!');
    }

    // 6. Verify Readiness (should NOT be ready yet)
    console.log('Step 6: Verifying Readiness (expecting NOT READY)...');
    try {
        const activeRes = await fetch(`${API_URL}/projects/${projectId}/activate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ adminId })
        }).then(r => r.json());
        
        if (!activeRes.success) {
            console.log(`Success: Correctly blocked activation. Missing: ${activeRes.missing.join(', ')}`);
        } else {
            console.error('ERROR: Project should NOT have been activatable!');
        }
    } catch (err) {
        console.log('Activation correctly failed/blocked.');
    }

    console.log('--- Continuation Smoke Test Completed Successfully! ---');
  } catch (error) {
    console.error('--- Continuation Smoke Test Failed! ---');
    console.error(error.message);
  }
}

runContinuationTest();
