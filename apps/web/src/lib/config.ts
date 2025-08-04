export const config = {
  apiUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  authUrl: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
} as const; 