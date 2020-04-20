import {PersonalInfo} from './personal-info.model';
import {Role} from './current-user.model';

export interface User {
  username: string;
  password?: string;
  personalInfo: PersonalInfo;
  id: number;
  role: Role;
}
