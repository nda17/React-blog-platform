import { IUser } from '@/types/user.interface';

export interface IAuthForm {
	user?: IUser;
	type?: string;
	handleRequest: (data: IUser) => void;
}
