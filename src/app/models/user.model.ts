import { role } from './role.model';

export class UserModel {
    id?: number;
    username: string;
    email: string;
    photo?: string;
    role: role;
    recruits: number;
    last_four: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}
