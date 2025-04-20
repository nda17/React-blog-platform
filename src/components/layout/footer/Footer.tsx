import { IFooter } from '@/components/layout/footer/footer.interface';
import styles from '@/components/layout/footer/Footer.module.scss';
import { PaginationPages } from '@/components/ui/pagination-pages/PaginationPages';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

export const Footer: FC<IFooter> = ({
	currentPage,
	setCurrentPage,
	setOffsetArticles,
	totalPages,
	limitArticles
}) => {
	const { pathname } = useLocation();
	const validPathname: string = PUBLIC_PAGES.LIST_ARTICLES;
	const [showPagination, setShowPagination] = useState<boolean>(false);
	const loading = useSelector(
		(state: { loading: { loading: boolean } }) => state.loading.loading
	);

	useEffect(() => {
		if (pathname === validPathname) {
			setShowPagination(true);
		} else {
			setShowPagination(false);
		}
	}, [pathname]);

	return (
		<footer className={styles.footer}>
			{!loading && showPagination && totalPages > 1 ? (
				<PaginationPages
					contentPage={currentPage}
					setContentPage={setCurrentPage}
					setOffsetArticles={setOffsetArticles}
					totalPages={totalPages}
					limitArticles={limitArticles}
				/>
			) : null}
		</footer>
	);
};
