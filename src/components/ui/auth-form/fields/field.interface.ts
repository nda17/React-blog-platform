export interface IField {
	errors?: {
		username: { message: string };
		repeatPassword: { message: string };
		password: { message: string };
		email: { message: string };
		avatarUrl: { message: string };
	};
	required: boolean;
	title: string;
	validRepeatPassword?: boolean;
	validUsername?: boolean;
	validPassword?: boolean;
	validEmail?: boolean;
	validAvatarUrl?: boolean;
	type?: string;
	style?: React.CSSProperties;
	defaultChecked?: boolean;
	onChange?: () => void;
	value?: string;
	error?: string;
}
