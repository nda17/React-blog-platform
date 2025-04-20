import styles from '@/components/layout/header/Header.module.scss';
import { AuthButtons } from '@/components/ui/auth-buttons/AuthButtons';
import { CreateArticleButton } from '@/components/ui/buttons/create-article-button/CreateArticleButton';
import { Logo } from '@/components/ui/logo/Logo';
import { UserInfo } from '@/components/ui/user-info/UserInfo';
import { useAuth } from '@/hooks/useAuth';
import clsx from 'clsx';
import { FC } from 'react';

export const Header: FC = () => {
	const { user } = useAuth();

	return (
		<header className={styles.header}>
			<Logo />
			<div className={clsx(styles['wrapper-right-section'])}>
				{user && <CreateArticleButton />}
				<div className={clsx(styles['wrapper-auth'])}>
					{user && <UserInfo />}
					<AuthButtons />
				</div>
			</div>
		</header>
	);
};
