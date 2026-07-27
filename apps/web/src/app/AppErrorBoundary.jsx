import React from 'react';

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error('App Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-state">
          <h1>Halaman tidak dapat ditampilkan</h1>
          <p>Terjadi kesalahan yang tidak terduga pada aplikasi kami.</p>
          <a href="/" className="btn btn-primary">Kembali ke Beranda</a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default AppErrorBoundary;
