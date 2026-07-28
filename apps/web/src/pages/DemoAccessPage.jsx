import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionLink from '../components/ui/ActionLink';
import { useDemoContext } from '../context/DemoContext';

export default function DemoAccessPage() {
  const navigate = useNavigate();
  const { startDemo, storageAvailable } = useDemoContext();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    document.title = 'Demo Access Gateway — Rumahku Konstruksi';
  }, []);

  const handleEnterDemo = () => {
    setLoading(true);
    setErrorMsg('');
    try {
      startDemo({ persona: 'customer', returnPath: '/portal' });
      navigate('/portal');
    } catch (err) {
      setErrorMsg(err.message || 'Gagal memulai sesi demo.');
      setLoading(false);
    }
  };

  return (
    <div className="access-page__container">
      <div className="access-page__panel">
        <span className="access-page__badge">MODE DEMO</span>
        <h1 className="access-page__title">Lihat Pengalaman Portal Konsumen RKK</h1>
        <p className="access-page__description">
          Jelajahi contoh alur Portal Konsumen menggunakan data sintetis. Mode ini tidak membuat akun, tidak menggunakan data pelanggan asli, dan tidak terhubung ke proses transaksi produksi.
        </p>

        {!storageAvailable && (
          <div className="access-page__notice access-page__notice--warning" role="alert">
            Penyimpanan browser (sessionStorage) tidak tersedia. Mode demo akan berjalan secara sementara dalam memori (in-memory fallback).
          </div>
        )}

        {errorMsg && (
          <div className="access-page__notice access-page__notice--warning" role="alert">
            {errorMsg}
          </div>
        )}

        <div className="access-page__actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleEnterDemo}
            disabled={loading}
          >
            {loading ? 'Membuat Sesi Demo...' : 'Masuk ke Demo Portal Konsumen'}
          </button>
          <ActionLink href="/" variant="outline">
            Kembali ke Website
          </ActionLink>
        </div>

        <div className="access-page__notice access-page__notice--info" tabIndex="0">
          <strong>Catatan Mode Demo:</strong>
          <br />
          Data, nama, nilai, tanggal, progres, dan dokumentasi yang tampil dalam mode demo bersifat contoh sintetis. Mode demo tidak menampilkan portal internal dan dapat diakhiri kapan saja.
        </div>
      </div>
    </div>
  );
}
