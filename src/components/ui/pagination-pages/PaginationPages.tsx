import { Pagination } from 'antd';
import { useEffect, useState } from 'react';

export const PaginationPages = ({
	contentPage,
	setContentPage,
	setOffsetArticles,
	totalPages,
	limitArticles
}) => {
	const [page, setPage] = useState<number>(contentPage);

	const changePage = (e: number) => {
		setPage(e);
	};

	useEffect(() => {
		setContentPage(page);

		const offsetArticlesResult = (page: number) => {
			if (page === 1) {
				return 0;
			} else {
				return page * limitArticles - limitArticles;
			}
		};
		const offsetArticles = offsetArticlesResult(page);

		setOffsetArticles(offsetArticles);
	}, [page]);

	return (
		<Pagination
			current={contentPage}
			onChange={(e: number) => changePage(e)}
			total={totalPages}
			pageSize={1}
			showSizeChanger={false}
		/>
	);
};
