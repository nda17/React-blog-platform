export interface IFooter {
	currentPage: number;
	setCurrentPage: (value: number) => void;
	setOffsetArticles: (value: number) => void;
	totalPages: number;
	limitArticles: number;
}
