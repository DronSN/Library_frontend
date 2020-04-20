import {Role} from './current-user.model';

export interface UserDetails {
  username: string;
  password?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  id?: number;
  role: Role;
}
