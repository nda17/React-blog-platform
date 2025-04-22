import styles from '@/components/ui/buttons/create-article-button/CreateArticleButton.module.scss';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import clsx from 'clsx';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export const CreateArticleButton: FC = () => {
	return (
		<Link
			className={clsx(styles['link-create-article'])}
			to={PUBLIC_PAGES.ADD_NEW_ARTICLE}
		>
			Create article
		</Link>
	);
};
