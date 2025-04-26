export interface IFieldErrors {
	username?: { message: string };
	repeatPassword?: { message: string };
	password?: { message: string };
	email?: { message: string };
	avatarUrl?: { message: string };
	isAgree?: { message: string };
}

export interface IField {
	errors?: IFieldErrors;
	required?: boolean;
	title?: string;
	validRepeatPassword?: boolean;
	validUsername?: boolean;
	validPassword?: boolean;
	validEmail?: boolean;
	validAvatarUrl?: boolean;
	type?: string;
	defaultChecked?: boolean;
	defaultValue?: string ;
	onChange?: (event: unknown) => void;
	value?: string;
	error?: boolean;
}
