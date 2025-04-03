import styles from '@/components/ui/logo/Logo.module.scss';
import { FC } from 'react';

export const Logo: FC = () => {
	return (
		<a href="/" className={styles.link}>
			Realworld Blog
		</a>
	);
};
