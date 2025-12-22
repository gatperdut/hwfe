export type User = {
  id: number;

  email: string;

  displayName: string;

  admin: boolean;

  // Synthetic fields

  _socketIds: string[];
};
