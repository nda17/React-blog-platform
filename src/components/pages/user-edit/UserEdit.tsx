import { AuthForm } from '@/components/ui/auth-form/AuthForm';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useAuth } from '@/hooks/useAuth';
import { useUpdateUserMutation } from '@/store/api';
import { IUserEdit } from '@/types/user.interface';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

export const UserEdit: FC = () => {
	const type = 'user-edit';
	const navigate = useNavigate();
	const location = useLocation();
	const { signIn, user } = useAuth();
	const [updateUser] = useUpdateUserMutation();

	const handleUpdate = async (token: string, user: IUserEdit) => {
		try {
			const result = await updateUser({
				token: token,
				user: {
					username: user.username,
					email: user.email,
					password: user.password,
					image: user.image
				}
			}).unwrap();

			signIn(result.user, () => navigate(fromPage, { replace: true }));
			toast.success('Successful update');
		} catch (error) {
			console.error(error);
			toast.error(`Error: ${error?.status} email is busy!`);
		}
	};

	const fromPage = location.state?.from?.pathname || PUBLIC_PAGES.HOME;

	const handleRequest = (data: IUserEdit) => {
		const user = {
			username: data.username,
			email: data.email,
			password: data.password,
			image: data.avatarUrl
		};

		const token = JSON.parse(localStorage.getItem('token'))?.value;

		handleUpdate(token, user);
	};

	return (
		<AuthForm user={user} type={type} handleRequest={handleRequest} />
	);
};
