import PocketBase from 'pocketbase';

// Create a single PocketBase instance to reuse connections
export const pb = new PocketBase("https://pb.vetalliancepartners.com/");

// Helper to get typed responses
export type TypedPocketBase = typeof pb;