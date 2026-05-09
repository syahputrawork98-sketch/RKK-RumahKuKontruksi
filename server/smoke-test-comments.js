const API_URL = 'http://localhost:4000/api';

async function runSmokeTest() {
  console.log('🚀 Starting Smoke Test: Project Stage Public Comments (Improved)');

  try {
    // 1. Get an active project
    const projectsRes = await fetch(`${API_URL}/projects`);
    const projectsData = await projectsRes.json();
    const activeProject = projectsData.data.find(p => p.status === 'Berjalan');
    if (!activeProject) throw new Error('No active project found');

    // 2. Fetch project detail to get stages
    const detailRes = await fetch(`${API_URL}/projects/${activeProject.id}`);
    const detailData = await detailRes.json();
    const project = detailData.data;
    
    const stage = project.stages[0];
    if (!stage) throw new Error(`No stages found for project ${project.projectCode}`);

    console.log(`✅ Using Project: ${project.projectCode}, Stage: ${stage.code}`);

    // 3. Admin posts an official update
    const adminPayload = {
      projectId: project.id,
      authorRole: 'admin',
      authorId: 'admin-001',
      authorName: 'Admin RKK',
      message: 'Pekerjaan pondasi telah selesai 100%. Tim sekarang mulai persiapan dinding.',
      isOfficial: true
    };

    const postRes = await fetch(`${API_URL}/project-stage-comments/stage/${stage.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminPayload)
    });
    const postData = await postRes.json();
    if (!postData.success) throw new Error(postData.message);
    const parentComment = postData.data;
    console.log('✅ Admin Official Update posted:', parentComment.id);

    // 4. Customer replies
    const customerPayload = {
      projectId: project.id,
      authorRole: 'customer',
      authorId: 'customer-001',
      authorName: 'Budi Santoso',
      message: 'Wah cepat sekali. Apakah besok bisa saya tinjau lokasinya?',
      parentId: parentComment.id
    };

    const replyRes = await fetch(`${API_URL}/project-stage-comments/stage/${stage.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(customerPayload)
    });
    const replyData = await replyRes.json();
    if (!replyData.success) throw new Error(replyData.message);
    const replyComment = replyData.data;
    console.log('✅ Customer Reply posted:', replyComment.id);

    // 5. Fetch and verify thread
    const fetchRes = await fetch(`${API_URL}/project-stage-comments/stage/${stage.id}`);
    const fetchData = await fetchRes.json();
    const comments = fetchData.data;
    
    const foundParent = comments.find(c => c.id === parentComment.id);
    if (foundParent && foundParent.replies.some(r => r.id === replyComment.id)) {
      console.log('✅ Thread verification successful: Parent and Reply found in hierarchy');
    } else {
      throw new Error('Thread verification failed');
    }

    console.log('🎉 Smoke Test Completed Successfully!');
  } catch (error) {
    console.error('❌ Smoke Test Failed:', error.message);
    process.exit(1);
  }
}

runSmokeTest();
