export const DEMO_SCHEMA_VERSION = 1;
export const DEMO_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours
export const DEMO_STORAGE_KEY = 'rkk_demo_context_v1';

let memoryStore = null;

export function isStorageAvailable() {
  try {
    const testKey = '__rkk_test_storage__';
    window.sessionStorage.setItem(testKey, '1');
    window.sessionStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function generateSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `demo-sys-${crypto.randomUUID()}`;
  }
  return `demo-sys-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
}

export function validateDemoContext(context) {
  if (!context || typeof context !== 'object') {
    return false;
  }
  if (context.schemaVersion !== DEMO_SCHEMA_VERSION) {
    return false;
  }
  if (context.mode !== 'demo' || context.persona !== 'customer') {
    return false;
  }
  if (!context.sessionId || typeof context.sessionId !== 'string') {
    return false;
  }
  if (!context.customerReference || !Array.isArray(context.projectReferences)) {
    return false;
  }
  if (!context.createdAt || !context.expiresAt) {
    return false;
  }

  const expiresTime = new Date(context.expiresAt).getTime();
  if (Number.isNaN(expiresTime)) {
    return false;
  }

  if (Date.now() >= expiresTime) {
    return false;
  }

  return true;
}

export function isDemoContextExpired(context) {
  if (!context || !context.expiresAt) {
    return true;
  }
  const expiresTime = new Date(context.expiresAt).getTime();
  if (Number.isNaN(expiresTime)) {
    return true;
  }
  return Date.now() >= expiresTime;
}

export function createDemoContext(options = {}) {
  const now = new Date();
  const expires = new Date(now.getTime() + DEMO_TTL_MS);

  const context = {
    schemaVersion: DEMO_SCHEMA_VERSION,
    mode: 'demo',
    persona: options.persona || 'customer',
    sessionId: generateSessionId(),
    displayName: options.displayName || 'Pelanggan Demo RKK',
    customerReference: options.customerReference || 'DEMO-CUSTOMER-001',
    projectReferences: options.projectReferences || ['DEMO-PROJECT-001'],
    createdAt: now.toISOString(),
    expiresAt: expires.toISOString(),
    returnPath: options.returnPath || '/portal'
  };

  if (!validateDemoContext(context)) {
    throw new Error('Gagal memvalidasi Demo Context yang baru dibuat.');
  }

  if (isStorageAvailable()) {
    try {
      window.sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(context));
    } catch {
      memoryStore = context;
    }
  } else {
    memoryStore = context;
  }

  return context;
}

export function readDemoContext() {
  let raw = null;

  if (isStorageAvailable()) {
    try {
      raw = window.sessionStorage.getItem(DEMO_STORAGE_KEY);
    } catch {
      raw = null;
    }
  }

  let context = null;
  if (raw) {
    try {
      context = JSON.parse(raw);
    } catch {
      context = null;
    }
  } else if (memoryStore) {
    context = memoryStore;
  }

  if (!context) {
    return null;
  }

  if (!validateDemoContext(context)) {
    clearDemoContext();
    return null;
  }

  return context;
}

export function clearDemoContext() {
  memoryStore = null;
  if (isStorageAvailable()) {
    try {
      window.sessionStorage.removeItem(DEMO_STORAGE_KEY);
    } catch {
      // ignore storage error
    }
  }
}

export function resetDemoContext(options = {}) {
  clearDemoContext();
  return createDemoContext(options);
}

export function exitDemoMode() {
  clearDemoContext();
  return { success: true, mode: 'public' };
}
