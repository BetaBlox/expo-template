export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  refreshToken: string | null;
  isAdmin: boolean;
  createdAt: string;
};
