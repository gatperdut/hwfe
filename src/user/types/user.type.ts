export type User = {
  id: number;

  email: string;

  displayName: string;

  admin: boolean;

  // TODO drop this. Create UserCurrent which holds this as a non-synthetic field.
  // Synthetic fields

  _socketIds: string[];
};
