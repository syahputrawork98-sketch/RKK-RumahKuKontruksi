const API_URL = 'http://localhost:4000/api';

async function testAlreadyActive() {
  try {
    const res = await fetch(`${API_URL}/projects`);
    const data = await res.json();
    const projects = data.data;
    
    // Find an active project
    const activePrj = projects.find(p => ['active', 'ongoing', 'Berjalan'].includes(p.status));
    
    if (!activePrj) {
      console.log("No active project found for test.");
      return;
    }

    console.log(`Testing re-activation for: ${activePrj.projectCode}`);
    
    const activateRes = await fetch(`${API_URL}/projects/${activePrj.id}/activate`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        adminId: activePrj.adminId
      })
    });
    
    const activateData = await activateRes.json();
    console.log("Activation result (Status " + activateRes.status + "):", activateData);

  } catch (error) {
    console.error("Test failed:", error.message);
  }
}

testAlreadyActive();
