import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  readDemoContext,
  createDemoContext,
  clearDemoContext,
  resetDemoContext,
  exitDemoMode,
  isStorageAvailable
} from '../utils/demoContext';

const DemoContext = createContext(null);

export function DemoContextProvider({ children }) {
  const [demoState, setDemoState] = useState(() => readDemoContext());
  const [storageAvailable, setStorageAvailable] = useState(() => isStorageAvailable());

  useEffect(() => {
    setStorageAvailable(isStorageAvailable());
    setDemoState(readDemoContext());
  }, []);

  const startDemo = useCallback((options) => {
    const newContext = createDemoContext(options);
    setDemoState(newContext);
    return newContext;
  }, []);

  const refreshDemo = useCallback(() => {
    const active = readDemoContext();
    setDemoState(active);
    return active;
  }, []);

  const resetDemo = useCallback((options) => {
    const newContext = resetDemoContext(options);
    setDemoState(newContext);
    return newContext;
  }, []);

  const exitDemo = useCallback(() => {
    exitDemoMode();
    setDemoState(null);
  }, []);

  const value = {
    demoContext: demoState,
    isDemoActive: Boolean(demoState),
    storageAvailable,
    startDemo,
    refreshDemo,
    resetDemo,
    exitDemo,
    clearDemo: clearDemoContext
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

// oxlint-disable-next-line react/only-export-components
export function useDemoContext() {
  const context = useContext(DemoContext);
  if (!context) {
    const active = readDemoContext();
    return {
      demoContext: active,
      isDemoActive: Boolean(active),
      storageAvailable: isStorageAvailable(),
      startDemo: createDemoContext,
      refreshDemo: readDemoContext,
      resetDemo: resetDemoContext,
      exitDemo: exitDemoMode,
      clearDemo: clearDemoContext
    };
  }
  return context;
}
