import styles from '@/components/ui/auth-buttons/AuthButtons.module.scss';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const AuthButtons: FC = () => {
	const { user, signOut } = useAuth();
	const navigate = useNavigate();

	const signOutProfile = () => {
		localStorage.removeItem('token');
		navigate(PUBLIC_PAGES.HOME, { replace: true });
	};

	return (
		<div className={styles.wrapper}>
			{!user && (
				<Link
					className={clsx(styles['link-login'])}
					to={PUBLIC_PAGES.SIGN_IN}
				>
					Sign In
				</Link>
			)}
			{!user && (
				<Link
					className={clsx(styles['link-register'])}
					to={PUBLIC_PAGES.SIGN_UP}
				>
					Sign Up
				</Link>
			)}
			{user && (
				<button
					onClick={() => signOut(() => signOutProfile())}
					className={clsx(styles['link-logout'])}
				>
					Log Out
				</button>
			)}
		</div>
	);
};
