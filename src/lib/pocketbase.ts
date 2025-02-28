import PocketBase from 'pocketbase';

// Create a single PocketBase instance to reuse connections
export const pb = new PocketBase(process.env.NEXT_PUBLIC_POCKETBASE_URL);

// Helper to get typed responses
export type TypedPocketBase = typeof pb; 