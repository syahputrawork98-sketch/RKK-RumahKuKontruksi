import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRouter, { AppRoutes } from '../app/AppRouter';

describe('PublicAppShell', () => {
  it('renders Beranda route correctly', () => {
    render(<AppRouter />);
    
    // Check if main header exists
    expect(screen.getByRole('banner')).toBeInTheDocument();
    
    // Check if hero title exists
    expect(screen.getByText(/Membangun dengan terencana dan terkendali/i)).toBeInTheDocument();
  });

  it('renders unavailable state for /tentang', () => {
    render(
      <MemoryRouter initialEntries={['/tentang']}>
        <AppRoutes />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Sedang disiapkan')).toBeInTheDocument();
    expect(screen.getByText('Halaman Tentang sedang disiapkan.')).toBeInTheDocument();
  });

  it('renders unavailable state for /cara-kerja', () => {
    render(
      <MemoryRouter initialEntries={['/cara-kerja']}>
        <AppRoutes />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Sedang disiapkan')).toBeInTheDocument();
    expect(screen.getByText('Halaman Cara Kerja sedang disiapkan.')).toBeInTheDocument();
  });

  it('renders unavailable state for /sign-in', () => {
    render(
      <MemoryRouter initialEntries={['/sign-in']}>
        <AppRoutes />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Sedang disiapkan')).toBeInTheDocument();
    expect(screen.getByText('Akses akun belum tersedia pada tahap ini.')).toBeInTheDocument();
  });

  it('renders 404 state for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown-route-123']}>
        <AppRoutes />
      </MemoryRouter>
    );
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Halaman tidak ditemukan')).toBeInTheDocument();
  });
  
  it('opens and closes drawer', async () => {
    render(<AppRouter />);
    
    // Mobile menu button
    const menuBtn = screen.getByLabelText('Buka menu navigasi');
    fireEvent.click(menuBtn);
    
    // Drawer should be open
    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('open');
    
    // Close using close button
    const closeBtn = screen.getByLabelText('Tutup menu');
    fireEvent.click(closeBtn);
    
    // Wait for drawer to close
    await waitFor(() => {
      expect(drawer).not.toHaveClass('open');
    });
  });

  it('closes drawer with Escape key', () => {
    render(<AppRouter />);
    
    const menuBtn = screen.getByLabelText('Buka menu navigasi');
    fireEvent.click(menuBtn);
    
    const drawer = screen.getByRole('dialog');
    expect(drawer).toHaveClass('open');
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    expect(drawer).not.toHaveClass('open');
  });
});
