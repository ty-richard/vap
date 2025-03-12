import PocketBase from 'pocketbase';

// Determine which URL to use based on the environment
const getPocketBaseUrl = () => {
  const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  return isLocalhost
    ? process.env.NEXT_PUBLIC_POCKETBASE_URL
    : process.env.NEXT_PRIVATE_POCKETBASE_URL;
};

// Create a single PocketBase instance to reuse connections
export const pb = new PocketBase(getPocketBaseUrl());

// Helper to get typed responses
export type TypedPocketBase = typeof pb;