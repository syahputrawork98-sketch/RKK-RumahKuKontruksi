import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { PageMeta } from '../components/ui/PageMeta';

describe('PageMeta Component', () => {
  let initialTitle;

  beforeEach(() => {
    initialTitle = document.title;
    // Clean up head tags before each test
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.remove();

    const canon = document.querySelector('link[rel="canonical"]');
    if (canon) canon.remove();

    const rob = document.querySelector('meta[name="robots"]');
    if (rob) rob.remove();
  });

  afterEach(() => {
    document.title = initialTitle;
  });

  it('1. creates robots meta tag when provided', () => {
    render(<PageMeta robots="noindex, nofollow" />);
    const metaRobots = document.querySelector('meta[name="robots"]');
    expect(metaRobots).not.toBeNull();
    expect(metaRobots.content).toBe('noindex, nofollow');
  });

  it('2. updates existing robots meta content', () => {
    const existing = document.createElement('meta');
    existing.name = 'robots';
    existing.content = 'index, follow';
    document.head.appendChild(existing);

    render(<PageMeta robots="noindex, nofollow" />);
    const metaRobots = document.querySelector('meta[name="robots"]');
    expect(metaRobots.content).toBe('noindex, nofollow');
  });

  it('3. restores previous robots meta on unmount', () => {
    const existing = document.createElement('meta');
    existing.name = 'robots';
    existing.content = 'index, follow';
    document.head.appendChild(existing);

    const { unmount } = render(<PageMeta robots="noindex, nofollow" />);
    expect(document.querySelector('meta[name="robots"]').content).toBe('noindex, nofollow');

    unmount();
    expect(document.querySelector('meta[name="robots"]').content).toBe('index, follow');
  });

  it('4. removes created robots meta tag on unmount', () => {
    const { unmount } = render(<PageMeta robots="noindex, nofollow" />);
    expect(document.querySelector('meta[name="robots"]')).not.toBeNull();

    unmount();
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('5. does not alter robots if robots prop is undefined', () => {
    const existing = document.createElement('meta');
    existing.name = 'robots';
    existing.content = 'index, follow';
    document.head.appendChild(existing);

    render(<PageMeta title="Sample Title" />);
    expect(document.querySelector('meta[name="robots"]').content).toBe('index, follow');
  });

  it('6. handles title, description, and canonical path correctly', () => {
    render(
      <PageMeta
        title="Test Page Title"
        description="Test Page Description"
        path="/test-path"
      />
    );

    expect(document.title).toBe('Test Page Title');

    const desc = document.querySelector('meta[name="description"]');
    expect(desc).not.toBeNull();
    expect(desc.content).toBe('Test Page Description');

    const canon = document.querySelector('link[rel="canonical"]');
    expect(canon).not.toBeNull();
    expect(canon.href).toContain('/test-path');
  });

  it('7. restores previous title, description, and canonical on unmount', () => {
    const { unmount } = render(
      <PageMeta
        title="Temporary Title"
        description="Temporary Description"
        path="/temp-path"
      />
    );

    unmount();
    expect(document.title).toBe(initialTitle);
    expect(document.querySelector('meta[name="description"]')).toBeNull();
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
  });
});
