import styles from '@/components/pages/articles-list/ArticlesList.module.scss';
import { IArticleItem } from '@/components/ui/article-item/article-item.interface';
import { ArticleItem } from '@/components/ui/article-item/ArticleItem';
import { Preloader } from '@/components/ui/preloader/Preloader';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const ArticlesList: FC = () => {
	const type = 'list';
	const listArticles = useSelector(
		(state: { listArticles: { articles: IArticleItem[] } }) =>
			state.listArticles.articles
	);

	return listArticles?.length ? (
		<div className={styles.wrapper}>
			{listArticles.map(item => {
				return (
					<ArticleItem
						key={uuidv4()}
						author={item.author}
						createdAt={item.createdAt}
						description={item.description}
						favorited={item.favorited}
						favoritesCount={item.favoritesCount}
						slug={item.slug}
						tagList={item.tagList}
						title={item.title}
						type={type}
					/>
				);
			})}
		</div>
	) : (
		<Preloader />
	);
};

export default ArticlesList;
