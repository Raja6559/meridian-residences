import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;

// SSR content remains readable; action buttons enable only once handlers exist.
export function useHydrated() {
  return useSyncExternalStore(subscribe, clientReady, serverReady);
}
