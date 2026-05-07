const BASE_URL = 'http://localhost:4000/api';
const projectId = 'project-008';
const foremanId = 'foreman-003';
const supervisorId = 'supervisor-002';

async function runTests() {
  let journalId;

  try {
    console.log('1. Testing Create Draft (Mandor Assigned)...');
    const createRes = await fetch(`${BASE_URL}/weekly-journals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actorRole: 'mandor',
        actorId: foremanId,
        projectId,
        weekStartDate: '2026-05-11',
        weekEndDate: '2026-05-17',
        summary: 'Tes jurnal minggu ke-20',
        claimedProgress: 40,
        activities: [
          { workTitle: 'Pasangan Bata', description: 'Dinding lantai 1 selesai.' }
        ]
      })
    });
    const createData = await createRes.json();
    if (!createRes.ok) throw new Error(JSON.stringify(createData));
    console.log('✅ Create Draft Success:', createData.message);
    journalId = createData.data.id;

    console.log('\n2. Testing Duplicate Period (Should Fail)...');
    const dupRes = await fetch(`${BASE_URL}/weekly-journals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actorRole: 'mandor',
        actorId: foremanId,
        projectId,
        weekStartDate: '2026-05-11',
        weekEndDate: '2026-05-17'
      })
    });
    const dupData = await dupRes.json();
    if (!dupRes.ok) {
      console.log('✅ Duplicate Period Blocked (Expected):', dupData.message);
    } else {
      console.log('❌ Duplicate Period NOT Blocked');
    }

    console.log('\n3. Testing Update Draft...');
    const updateRes = await fetch(`${BASE_URL}/weekly-journals/${journalId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actorRole: 'mandor',
        actorId: foremanId,
        summary: 'Tes jurnal minggu ke-20 (Updated)'
      })
    });
    const updateData = await updateRes.json();
    if (!updateRes.ok) throw new Error(JSON.stringify(updateData));
    console.log('✅ Update Success:', updateData.message);

    console.log('\n4. Testing Submit Journal...');
    const submitRes = await fetch(`${BASE_URL}/weekly-journals/${journalId}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actorRole: 'mandor',
        actorId: foremanId
      })
    });
    const submitData = await submitRes.json();
    if (!submitRes.ok) throw new Error(JSON.stringify(submitData));
    console.log('✅ Submit Success:', submitData.message);

    console.log('\n5. Testing Review (Approve by Supervisor)...');
    const reviewRes = await fetch(`${BASE_URL}/weekly-journals/${journalId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        actorRole: 'pengawas',
        actorId: supervisorId,
        action: 'approve',
        note: 'Mantap, lanjut.'
      })
    });
    const reviewData = await reviewRes.json();
    if (!reviewRes.ok) throw new Error(JSON.stringify(reviewData));
    console.log('✅ Review Approve Success:', reviewData.message);

    console.log('\n6. Testing Get Detail...');
    const detailRes = await fetch(`${BASE_URL}/weekly-journals/${journalId}?actorRole=admin&actorId=admin-1`);
    const detailData = await detailRes.json();
    if (!detailRes.ok) throw new Error(JSON.stringify(detailData));
    console.log('✅ Get Detail Success:', detailData.data.status);
    console.log('Review Logs Count:', detailData.data.reviewLogs.length);

    console.log('\n7. Testing Access Control (Wrong Foreman)...');
    const wrongRes = await fetch(`${BASE_URL}/weekly-journals/${journalId}?actorRole=mandor&actorId=foreman-other`);
    const wrongData = await wrongRes.json();
    if (!wrongRes.ok) {
      console.log('✅ Access Blocked (Expected):', wrongData.message);
    } else {
      console.log('❌ Access NOT Blocked');
    }

  } catch (error) {
    console.error('❌ Test Failed:', error.message);
  }
}

runTests();
