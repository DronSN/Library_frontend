export enum Role {
  ADMIN = 'ADMIN', USER = 'USER'
}

export interface AnonymousUser {
  authenticated: false;
}

export interface LoggedUser {
  authenticated: true;
  info: {
    username: string;
    role: Role;
    id: number;
  };
}

export type CurrentUser = AnonymousUser | LoggedUser;
