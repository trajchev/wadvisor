import { role } from './role.model';

export class AuthModel {
    username?: string;
    email: string;
    password: string;
    passwordConfirm?: string;
}

export class AuthResponseData {
  status: string;
  token: string;
  expiresIn: number;
  level: role;
}
