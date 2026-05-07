import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDevAuth } from '../../context/DevAuthContext';
import devAuthService from '../../services/devAuthService';

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn, isSignedIn, session, signOut, getDashboardPath } = useDevAuth();

  const [selectedRole, setSelectedRole] = useState('');
  const [personas, setPersonas] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const roles = [
    { id: 'admin', name: 'Admin', icon: '🔑', color: '#3b82f6' },
    { id: 'superadmin', name: 'Superadmin', icon: '⚡', color: '#6366f1' },
    { id: 'pengawas', name: 'Pengawas', icon: '🔍', color: '#10b981' },
    { id: 'mandor', name: 'Mandor', icon: '👷', color: '#f59e0b' },
    { id: 'arsitek', name: 'Arsitek', icon: '📐', color: '#ec4899' },
    { id: 'konsumen', name: 'Konsumen', icon: '🏠', color: '#8b5cf6' },
  ];

  useEffect(() => {
    if (selectedRole) {
      fetchPersonas(selectedRole);
    } else {
      setPersonas([]);
      setSelectedPersona(null);
    }
  }, [selectedRole]);

  const fetchPersonas = async (role) => {
    setLoading(true);
    setError(null);
    try {
      const data = await devAuthService.getPersonasByRole(role);
      setPersonas(data);
    } catch {
      setError(`Gagal mengambil data persona untuk role ${role}. Pastikan server backend berjalan.`);
      setPersonas([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    if (selectedRole && selectedPersona) {
      signIn(selectedRole, selectedPersona);
      navigate(getDashboardPath(selectedRole));
    }
  };

  const handleReset = () => {
    setSelectedRole('');
    setPersonas([]);
    setSelectedPersona(null);
    setError(null);
  };

  if (isSignedIn) {
    return (
      <div style={styles.container}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>RKK Dev Access</h1>
            <p style={styles.subtitle}>Sesi aktif ditemukan</p>
          </div>
          
          <div style={styles.sessionInfo}>
            <div style={styles.sessionBadge}>
              {roles.find(r => r.id === session.role)?.icon} {session.role.toUpperCase()}
            </div>
            <div style={styles.sessionName}>{session.personaName}</div>
            <div style={styles.sessionEmail}>{session.personaEmail}</div>
          </div>

          <div style={styles.buttonGroup}>
            <button 
              style={styles.primaryButton}
              onClick={() => navigate(getDashboardPath(session.role))}
            >
              Lanjut ke Dashboard
            </button>
            <button 
              style={styles.outlineButton}
              onClick={() => signOut()}
            >
              Sign Out / Ganti Persona
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>RKK Dev Sign-In</h1>
          <p style={styles.subtitle}>Lingkungan Pengembangan Lokal • Tanpa Password</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {!selectedRole ? (
          <div style={styles.section}>
            <h3 style={styles.sectionLabel}>Pilih Role:</h3>
            <div style={styles.grid}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  style={styles.roleCard}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <span style={styles.roleIcon}>{role.icon}</span>
                  <span style={styles.roleName}>{role.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.section}>
            <div style={styles.breadcrumb}>
              <button onClick={handleReset} style={styles.backLink}>← Pilih Role Lain</button>
              <div style={styles.currentStep}>
                Role: <strong>{roles.find(r => r.id === selectedRole)?.name}</strong>
              </div>
            </div>

            <h3 style={styles.sectionLabel}>Pilih Persona:</h3>
            
            {loading ? (
              <div style={styles.loadingState}>
                <div style={styles.spinner}></div>
                <span>Mengambil data dari database...</span>
              </div>
            ) : personas.length === 0 ? (
              <div style={styles.emptyState}>
                <span style={styles.emptyIcon}>📭</span>
                <p>Tidak ada data persona untuk <strong>{selectedRole}</strong>.</p>
                <p style={styles.emptyHint}>Pastikan Anda sudah menjalankan <code>npm run db:seed</code>.</p>
                <button style={styles.textButton} onClick={handleReset}>Kembali</button>
              </div>
            ) : (
              <div style={styles.personaContainer}>
                {personas.map((persona) => (
                  <div
                    key={persona.id}
                    style={{
                      ...styles.personaCard,
                      ...(selectedPersona?.id === persona.id ? styles.personaCardActive : {})
                    }}
                    onClick={() => setSelectedPersona(persona)}
                  >
                    <div style={styles.personaDetails}>
                      <div style={styles.personaNameMain}>{persona.name}</div>
                      <div style={styles.personaEmailSub}>{persona.email || '(No Email)'}</div>
                    </div>
                    {selectedPersona?.id === persona.id && (
                      <div style={styles.checkIcon}>✓</div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div style={styles.actionGroup}>
              <button
                style={{
                  ...styles.primaryButton,
                  ...(!selectedPersona ? styles.disabledButton : {})
                }}
                disabled={!selectedPersona}
                onClick={handleSignIn}
              >
                Masuk sebagai {selectedPersona?.name || selectedRole}
              </button>
              <button style={styles.ghostButton} onClick={handleReset}>
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    padding: '24px',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
    padding: '48px',
    width: '100%',
    maxWidth: '540px',
    border: '1px solid rgba(255, 255, 255, 0.5)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 12px 0',
    letterSpacing: '-0.02em',
  },
  subtitle: {
    fontSize: '15px',
    color: '#64748b',
    margin: 0,
    lineHeight: '1.5',
  },
  error: {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '12px',
    padding: '16px',
    color: '#dc2626',
    fontSize: '14px',
    marginBottom: '24px',
    textAlign: 'center',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionLabel: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 16px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  roleCard: {
    padding: '24px 16px',
    borderRadius: '20px',
    border: '2px solid #f1f5f9',
    backgroundColor: '#fff',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.05)',
      borderColor: '#3b82f6',
    }
  },
  roleIcon: {
    fontSize: '32px',
  },
  roleName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#1e293b',
  },
  breadcrumb: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f1f5f9',
  },
  backLink: {
    background: 'none',
    border: 'none',
    color: '#3b82f6',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: 0,
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  currentStep: {
    fontSize: '14px',
    color: '#64748b',
  },
  personaContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '320px',
    overflowY: 'auto',
    marginBottom: '32px',
    paddingRight: '8px',
  },
  personaCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderRadius: '16px',
    border: '2px solid #f1f5f9',
    cursor: 'pointer',
    transition: 'all 0.2s',
    backgroundColor: '#fff',
  },
  personaCardActive: {
    borderColor: '#3b82f6',
    backgroundColor: '#eff6ff',
  },
  personaDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  personaNameMain: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#0f172a',
  },
  personaEmailSub: {
    fontSize: '13px',
    color: '#64748b',
  },
  checkIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
  },
  actionGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  primaryButton: {
    padding: '16px',
    borderRadius: '16px',
    border: 'none',
    backgroundColor: '#0f172a',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)',
  },
  outlineButton: {
    padding: '16px',
    borderRadius: '16px',
    border: '2px solid #e2e8f0',
    backgroundColor: 'transparent',
    color: '#475569',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  ghostButton: {
    background: 'none',
    border: 'none',
    color: '#64748b',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    padding: '8px',
  },
  disabledButton: {
    backgroundColor: '#cbd5e1',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  loadingState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    padding: '48px 0',
    color: '#64748b',
    fontSize: '14px',
  },
  spinner: {
    width: '32px',
    height: '32px',
    border: '4px solid #f1f5f9',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 24px',
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
    marginBottom: '24px',
  },
  emptyIcon: {
    fontSize: '40px',
    display: 'block',
    marginBottom: '16px',
  },
  emptyHint: {
    fontSize: '12px',
    color: '#94a3b8',
    marginTop: '8px',
  },
  sessionInfo: {
    background: 'rgba(59, 130, 246, 0.03)',
    border: '1px solid rgba(59, 130, 246, 0.1)',
    borderRadius: '20px',
    padding: '32px',
    marginBottom: '40px',
    textAlign: 'center',
  },
  sessionBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '99px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    fontSize: '12px',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '16px',
  },
  sessionName: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: '6px',
  },
  sessionEmail: {
    fontSize: '15px',
    color: '#64748b',
  }
};

export default SignInPage;
