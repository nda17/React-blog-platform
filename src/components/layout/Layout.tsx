import { Footer } from '@/components/layout/footer/Footer';
import { Header } from '@/components/layout/header/Header';
import styles from '@/components/layout/Layout.module.scss';
import { AlertBanner } from '@/components/ui/alert-banner/AlertBanner';
import { Preloader } from '@/components/ui/preloader/Preloader';
import { useTokenCheck } from '@/hooks/useTokenCheck';
import { useGetListArticlesQuery } from '@/store/api';
import { setListArticles } from '@/store/slices/listArticlesSlice';
import { setLoading } from '@/store/slices/loadingSlice';
import { FC, useEffect, useState } from 'react';
import { Offline, Online } from 'react-detect-offline';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
	useTokenCheck();
	const message = 'No network connection!';
	const description = 'Please, try again later or check your connection.';
	const type = 'error';
	const [totalPages, setTotalPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [offsetArticles, setOffsetArticles] = useState<number>(0);
	const limitArticles: number = 10;
	const dispatch = useDispatch();
	const loading = useSelector(
		(state: { loading: { loading: boolean } }) => state.loading.loading
	);

	const token = JSON.parse(localStorage.getItem('token'))?.value;

	const { data, isLoading, error } = useGetListArticlesQuery({
		token: token || null,
		offset: offsetArticles,
		limit: limitArticles
	});

	useEffect(() => {
		if (data) {
			const totalPages = Math.ceil(data?.articlesCount / limitArticles);
			setTotalPages(totalPages);
			dispatch(setListArticles(data?.articles));
		}

		if (error) {
			console.error(error);
		}

		dispatch(setLoading(isLoading));
	}, [data, currentPage]);

	return (
		<>
			<Header />
			<main className={styles.main}>
				<Online>{!loading ? <Outlet /> : <Preloader />}</Online>
				<Offline>
					<AlertBanner
						message={message}
						description={description}
						type={type}
					/>
				</Offline>
			</main>
			<Footer
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				setOffsetArticles={setOffsetArticles}
				totalPages={totalPages}
				limitArticles={limitArticles}
			/>
		</>
	);
};
