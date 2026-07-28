import { Navigate } from 'react-router-dom';
import { readDemoContext, clearDemoContext } from '../../utils/demoContext';

export default function PortalAccessBoundary({ children }) {
  const activeContext = readDemoContext();

  if (!activeContext) {
    clearDemoContext();
    return <Navigate to="/demo" replace />;
  }

  return children;
}
