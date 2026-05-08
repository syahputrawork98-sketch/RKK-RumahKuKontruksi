const API_URL = 'http://localhost:4001/api';
const PROJECT_ID = 'cmox22mxn0003uyr88fjkjxvw'; // From the previous test
const ADMIN_ID = 'admin-test'; // New test admin with 0 projects

async function testActivation() {
  console.log(`--- Testing Project Activation Gate for Project: ${PROJECT_ID} ---`);
  
  try {
    // 1. Assign Admin first (since bridge might not have assigned it)
    console.log('Ensuring Admin is assigned to project...');
    const assignRes = await fetch(`${API_URL}/projects/${PROJECT_ID}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId: ADMIN_ID })
    });
    const assignData = await assignRes.json();
    if (!assignRes.ok) {
        console.log('Assignment Failed:', assignRes.status, assignData.message);
    } else {
        console.log('Assignment Success. Project Admin:', assignData.data.adminId);
    }

    console.log('Attempting to activate project (expecting failure due to missing requirements)...');
    const response = await fetch(`${API_URL}/projects/${PROJECT_ID}/activate`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId: ADMIN_ID })
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.log('EXPECTED FAILURE:', response.status);
      console.log('Message:', data.message);
      console.log('Missing Requirements:', data.missing);
    } else {
      console.log('UNEXPECTED SUCCESS:', data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testActivation();
