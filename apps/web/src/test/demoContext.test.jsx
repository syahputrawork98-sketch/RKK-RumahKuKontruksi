import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { DemoContextProvider, useDemoContext } from '../context/DemoContext';
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

function ContextTestConsumer() {
  const { demoContext, isDemoActive, startDemo, clearDemo } = useDemoContext();
  return (
    <div>
      <span data-testid="active-status">{isDemoActive ? 'ACTIVE' : 'INACTIVE'}</span>
      <span data-testid="customer-ref">{demoContext?.customerReference || 'NONE'}</span>
      <button data-testid="start-btn" onClick={() => startDemo()}>
        Start
      </button>
      <button data-testid="clear-btn" onClick={() => clearDemo()}>
        Clear
      </button>
    </div>
  );
}

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

  it('syncs clearDemo callback with React provider state', () => {
    render(
      <DemoContextProvider>
        <ContextTestConsumer />
      </DemoContextProvider>
    );

    expect(screen.getByTestId('active-status')).toHaveTextContent('INACTIVE');
    expect(screen.getByTestId('customer-ref')).toHaveTextContent('NONE');

    act(() => {
      screen.getByTestId('start-btn').click();
    });

    expect(screen.getByTestId('active-status')).toHaveTextContent('ACTIVE');
    expect(screen.getByTestId('customer-ref')).toHaveTextContent('DEMO-CUSTOMER-001');
    expect(window.sessionStorage.getItem(DEMO_STORAGE_KEY)).not.toBeNull();

    act(() => {
      screen.getByTestId('clear-btn').click();
    });

    expect(screen.getByTestId('active-status')).toHaveTextContent('INACTIVE');
    expect(screen.getByTestId('customer-ref')).toHaveTextContent('NONE');
    expect(window.sessionStorage.getItem(DEMO_STORAGE_KEY)).toBeNull();
  });
});
