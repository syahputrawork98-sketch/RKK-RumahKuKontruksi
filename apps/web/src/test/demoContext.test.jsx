import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
  createDemoContext,
  readDemoContext,
  validateDemoContext,
  isDemoContextExpired,
  clearDemoContext,
  resetDemoContext,
  exitDemoMode,
  DEMO_SCHEMA_VERSION,
  DEMO_STORAGE_KEY
} from '../utils/demoContext';

describe('Demo Context Utilities & Invariants', () => {
  beforeEach(() => {
    clearDemoContext();
    window.sessionStorage.clear();
  });

  afterEach(() => {
    clearDemoContext();
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('creates valid Demo Context with schemaVersion 1 and 4-hour TTL', () => {
    const ctx = createDemoContext({ persona: 'customer', returnPath: '/portal' });

    expect(ctx).not.toBeNull();
    expect(ctx.schemaVersion).toBe(DEMO_SCHEMA_VERSION);
    expect(ctx.mode).toBe('demo');
    expect(ctx.persona).toBe('customer');
    expect(ctx.displayName).toBe('Pelanggan Demo RKK');
    expect(ctx.customerReference).toBe('DEMO-CUSTOMER-001');
    expect(ctx.projectReferences).toEqual(['DEMO-PROJECT-001']);
    expect(ctx.sessionId).toMatch(/^demo-sys-/);
    expect(ctx.token).toBeUndefined(); // no auth token

    const createdTime = new Date(ctx.createdAt).getTime();
    const expiresTime = new Date(ctx.expiresAt).getTime();
    const diffHours = (expiresTime - createdTime) / (1000 * 60 * 60);

    expect(diffHours).toBeCloseTo(4, 1);
    expect(validateDemoContext(ctx)).toBe(true);
    expect(isDemoContextExpired(ctx)).toBe(false);
  });

  it('reads stored Demo Context from sessionStorage', () => {
    const created = createDemoContext();
    const read = readDemoContext();

    expect(read).not.toBeNull();
    expect(read.sessionId).toBe(created.sessionId);
    expect(read.customerReference).toBe('DEMO-CUSTOMER-001');
  });

  it('rejects invalid or unsupported schema versions', () => {
    const invalidSchemaCtx = {
      schemaVersion: 99,
      mode: 'demo',
      persona: 'customer',
      sessionId: 'demo-sys-invalid',
      displayName: 'Invalid Schema',
      customerReference: 'DEMO-001',
      projectReferences: ['P-1'],
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 10000).toISOString()
    };

    expect(validateDemoContext(invalidSchemaCtx)).toBe(false);
  });

  it('rejects expired Demo Context and clears it', () => {
    const expiredCtx = {
      schemaVersion: 1,
      mode: 'demo',
      persona: 'customer',
      sessionId: 'demo-sys-expired',
      displayName: 'Expired Context',
      customerReference: 'DEMO-001',
      projectReferences: ['P-1'],
      createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
      expiresAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
    };

    window.sessionStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(expiredCtx));

    expect(validateDemoContext(expiredCtx)).toBe(false);
    expect(isDemoContextExpired(expiredCtx)).toBe(true);
    expect(readDemoContext()).toBeNull();
    expect(window.sessionStorage.getItem(DEMO_STORAGE_KEY)).toBeNull();
  });

  it('resets and clears Demo Context correctly', () => {
    const ctx1 = createDemoContext();
    expect(readDemoContext()).not.toBeNull();

    const ctx2 = resetDemoContext();
    expect(readDemoContext()).not.toBeNull();
    expect(ctx2.sessionId).not.toBe(ctx1.sessionId);

    const exitRes = exitDemoMode();
    expect(exitRes.success).toBe(true);
    expect(readDemoContext()).toBeNull();
  });

  it('handles storage unavailability with in-memory fallback', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError / Storage Blocked');
    });

    const ctx = createDemoContext();
    expect(ctx).not.toBeNull();
    const read = readDemoContext();
    expect(read).not.toBeNull();
    expect(read.sessionId).toBe(ctx.sessionId);
  });
});
