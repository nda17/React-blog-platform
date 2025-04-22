import styles from '@/components/ui/user-info/UserInfo.module.scss';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const UserInfo: FC = () => {
	const { user } = useAuth();

	return (
		<div className={styles.wrapper}>
			<Link
				to={`${PUBLIC_PAGES.USER}/${user.username}/edit`}
				className={clsx(styles['name-link'])}
			>
				{user?.username || 'No data'}
			</Link>
			<Link to={`${PUBLIC_PAGES.USER}/${user.username}/edit`}>
				<img
					className={styles.avatar}
					alt="Avatar"
					src={
						user?.image ||
						'https://static.productionready.io/images/smiley-cyrus.jpg'
					}
				/>
			</Link>
		</div>
	);
};
