export interface IUserSignIn {
	email: string;
	password: string;
}

export interface IUserEdit extends IUserSignIn {
	username: string;
	image: string;
	avatarUrl?: string;
}

export interface IUserSignUp extends IUserSignIn {
	username: string;
	image?: string;
}

export type IUser = IUserSignIn | IUserSignUp | IUserEdit;
