import { useState, useEffect, useRef } from 'react';
import ActionLink from '../components/ui/ActionLink';

export default function SignInPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const identifierRef = useRef(null);

  useEffect(() => {
    document.title = 'Masuk — Rumahku Konstruksi';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const trimmedIdentifier = identifier.trim();
    if (!trimmedIdentifier) {
      newErrors.identifier = 'Email atau nomor telepon wajib diisi.';
    }
    if (!password) {
      newErrors.password = 'Password wajib diisi.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmittedMessage(false);
      if (newErrors.identifier && identifierRef.current) {
        identifierRef.current.focus();
      }
      return;
    }

    setErrors({});
    setSubmittedMessage(true);
  };

  return (
    <div className="access-page__container">
      <div className="access-page__panel">
        <h1 className="access-page__title">Masuk ke Akun RKK</h1>
        <p className="access-page__description">
          Struktur resmi antarmuka masuk Rumahku Konstruksi.
        </p>

        <form className="access-page__form" onSubmit={handleSubmit} noValidate>
          <div className="access-page__field">
            <label htmlFor="signin-identifier" className="access-page__label">
              Email atau nomor telepon
            </label>
            <div className="access-page__input-wrapper">
              <input
                ref={identifierRef}
                type="text"
                id="signin-identifier"
                name="identifier"
                className="access-page__input"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                autoComplete="username"
                aria-invalid={Boolean(errors.identifier)}
                aria-describedby={errors.identifier ? 'identifier-error' : undefined}
                required
              />
            </div>
            {errors.identifier && (
              <span id="identifier-error" className="access-page__error-msg" role="alert">
                {errors.identifier}
              </span>
            )}
          </div>

          <div className="access-page__field">
            <label htmlFor="signin-password" className="access-page__label">
              Password
            </label>
            <div className="access-page__input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="signin-password"
                name="password"
                className="access-page__input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                required
              />
              <button
                type="button"
                className="access-page__toggle-pwd"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                {showPassword ? 'Sembunyikan' : 'Tampilkan'}
              </button>
            </div>
            {errors.password && (
              <span id="password-error" className="access-page__error-msg" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          <div className="access-page__actions">
            <button type="submit" className="btn btn-primary">
              Masuk
            </button>

            <button
              type="button"
              className="btn btn-outline"
              disabled
              aria-disabled="true"
              title="Autentikasi Google belum terhubung pada tahap presentasi ini."
            >
              Lanjutkan dengan Google
            </button>
          </div>
        </form>

        {submittedMessage && (
          <div className="access-page__notice access-page__notice--warning" role="region" aria-live="polite">
            <p>
              <strong>Layanan masuk resmi RKK belum diaktifkan pada tahap presentasi ini.</strong> Gunakan halaman Demo untuk melihat alur dan pengalaman Portal Konsumen.
            </p>
            <div className="access-page__actions" style={{ marginTop: '1rem' }}>
              <ActionLink href="/demo" variant="primary">
                Buka Halaman Demo
              </ActionLink>
              <ActionLink href="/" variant="outline">
                Kembali ke Website
              </ActionLink>
            </div>
          </div>
        )}

        <div className="access-page__notice access-page__notice--info" style={{ marginTop: '1.5rem' }}>
          Ingin melihat alur portal tanpa akun?{' '}
          <ActionLink href="/demo" style={{ fontWeight: 600, textDecoration: 'underline' }}>
            Lihat Akses Demo
          </ActionLink>
        </div>
      </div>
    </div>
  );
}
