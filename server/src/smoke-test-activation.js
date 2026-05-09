const API_URL = 'http://localhost:4000/api';

async function testActivation() {
  try {
    // 1. Get projects
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    const projects = data.data;
    
    // Find a planning project
    const planningPrj = projects.find(p => p.status === 'planning');
    
    if (!planningPrj) {
      console.log("No planning project found for test.");
      return;
    }

    console.log(`Testing activation for: ${planningPrj.projectCode}`);
    
    // 2. Try to activate (should fail if not ready)
    const activateRes = await fetch(`${API_URL}/projects/${planningPrj.id}/activate`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminId: planningPrj.adminId || 'admin-001'
      })
    });
    
    const activateData = await activateRes.json();
    console.log("Activation result (Status " + activateRes.status + "):", activateData);

  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testActivation();
