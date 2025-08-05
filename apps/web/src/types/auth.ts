export interface UserData {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  user: UserData;
} 