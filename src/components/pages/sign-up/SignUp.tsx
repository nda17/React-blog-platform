import { AuthForm } from '@/components/ui/auth-form/AuthForm';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useAuth } from '@/hooks/useAuth';
import { useRegisterUserMutation } from '@/store/api';
import { IUserSignUp } from '@/types/user.interface';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export const SignUp: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { signUp } = useAuth();
	const [registerUser] = useRegisterUserMutation();

	const handleRegister = async (user: IUserSignUp) => {
		try {
			const result = await registerUser(user).unwrap();
			signUp(result.user, () => navigate(fromPage, { replace: true }));
			toast.success('Successful registration');
		} catch (error) {
			console.error(error);
			toast.error(
				`Error ${error?.status}: ${error?.data?.errors?.username ? 'Username ' : 'Email '}${error?.data?.errors?.username || error?.data?.errors?.email}`
			);
		}
	};

	const fromPage = location.state?.from?.pathname || PUBLIC_PAGES.HOME;

	const handleRequest = (data: IUserSignUp) => {
		const user = {
			username: data.username,
			email: data.email,
			password: data.password
		};

		handleRegister(user);
	};
	return <AuthForm handleRequest={handleRequest} />;
};
