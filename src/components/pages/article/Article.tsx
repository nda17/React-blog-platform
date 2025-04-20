import styles from '@/components/pages/article/Article.module.scss';
import { AlertBanner } from '@/components/ui/alert-banner/AlertBanner';
import { IArticleItem } from '@/components/ui/article-item/article-item.interface';
import { ArticleItem } from '@/components/ui/article-item/ArticleItem';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const Article: FC = () => {
	const message = 'Article not found.';
	const description = 'Please, search again.';
	const type = 'article';
	const listArticles = useSelector(
		(state: { listArticles: { articles: IArticleItem[] } }) =>
			state.listArticles.articles
	);
	const { slug } = useParams();
	const article = listArticles.find(item => item.slug === slug);

	return (
		<div className={styles.wrapper}>
			{article ? (
				<ArticleItem
					author={article.author}
					createdAt={article.createdAt}
					description={article.description}
					favorited={article.favorited}
					favoritesCount={article.favoritesCount}
					slug={article.slug}
					tagList={article.tagList}
					title={article.title}
					body={article.body}
					type={type}
				/>
			) : (
				<AlertBanner
					message={message}
					description={description}
					type="warning"
				/>
			)}
		</div>
	);
};
