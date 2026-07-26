import AppErrorBoundary from './app/AppErrorBoundary';
import AppRouter from './app/AppRouter';

function App() {
  return (
    <AppErrorBoundary>
      <AppRouter />
    </AppErrorBoundary>
  );
}

export default App;
