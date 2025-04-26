import { AuthForm } from '@/components/ui/auth-form/AuthForm';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useAuth } from '@/hooks/useAuth';
import { useLoginUserMutation } from '@/store/api';
import { IUserSignIn } from '@/types/user.interface';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const SignIn: FC = () => {
	const type = 'sign-in';
	const navigate = useNavigate();
	const location = useLocation();
	const { signIn } = useAuth();
	const [loginUser] = useLoginUserMutation();

	const handleLogin = async (user: IUserSignIn) => {
		try {
			const result = await loginUser(user).unwrap();
			signIn(result.user, () => navigate(fromPage, { replace: true }));
			toast.success('Successful login');
		} catch (error) {
			console.error(error);
			toast.error(`Error: ${error?.status} email or password invalid!`);
		}
	};

	const fromPage = location.state?.from?.pathname || PUBLIC_PAGES.HOME;

	const handleRequest = (data: IUserSignIn) => {
		const user = {
			email: data.email,
			password: data.password
		};

		handleLogin(user);
	};

	return <AuthForm type={type} handleRequest={handleRequest} />;
};

export default SignIn;
