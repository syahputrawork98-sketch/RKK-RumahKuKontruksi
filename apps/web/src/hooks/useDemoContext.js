import { useContext } from 'react';
import { DemoContext } from '../context/DemoContext';
import {
  readDemoContext,
  createDemoContext,
  resetDemoContext,
  exitDemoMode,
  clearDemoContext,
  isStorageAvailable
} from '../utils/demoContext';

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
