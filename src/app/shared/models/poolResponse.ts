import { User } from './user';

export class PoolResponse {
    _id: string;
    name: string;
    members: User[];
}
