export const demoCustomerDataset = {
  'DEMO-CUSTOMER-001': {
    customerReference: 'DEMO-CUSTOMER-001',
    displayName: 'Pelanggan Demo RKK',
    email: 'demo.pelanggan@rumahkukonstruksi.id',
    phone: '0812-0000-0000',
    type: 'Customer Demo',
    status: 'Aktif (Sintetis)',
    joinedDate: '2026-07-29',
    projectReferences: ['DEMO-PROJECT-001'],
    notes: 'Akun sintetis khusus presentasi dan pengujian alur Portal Konsumen.'
  }
};

export const demoProjectDataset = {
  'DEMO-PROJECT-001': {
    projectReference: 'DEMO-PROJECT-001',
    customerReference: 'DEMO-CUSTOMER-001',
    title: 'Proyek Simulasi Rumah Kontemporer RKK',
    location: 'Jakarta Selatan (Sintetis)',
    status: 'Perencanaan & Persiapan (Simulasi)',
    phase: 'Fase 01: Inisiasi & Konsultasi Perancangan',
    progressPercentage: 15,
    lastUpdated: '2026-07-29',
    estimatedCompletion: '2027-02-15 (Proyeksi Demo)',
    isSynthetic: true
  }
};

export function getDemoCustomerProfile(customerRef = 'DEMO-CUSTOMER-001') {
  return demoCustomerDataset[customerRef] || demoCustomerDataset['DEMO-CUSTOMER-001'];
}

export function getDemoProjectSummary(projectRef = 'DEMO-PROJECT-001') {
  return demoProjectDataset[projectRef] || demoProjectDataset['DEMO-PROJECT-001'];
}
