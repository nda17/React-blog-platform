import { ArticleCreateEditForm } from '@/components/ui/article-create-edit-form/ArticleCreateEditForm';
import { IArticleItem } from '@/components/ui/article-item/article-item.interface';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useUpdateArticleMutation } from '@/store/api';
import { IArticle, IArticleData } from '@/types/article.interface';
import { formatArticle } from '@/utils/format-article';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ArticleEdit: FC = () => {
	const type = 'edit';
	const navigate = useNavigate();
	const [updateArticle] = useUpdateArticleMutation();
	const { slug: slugCurrent } = useParams();
	const listArticles = useSelector(
		(state: { listArticles: { articles: IArticleItem[] } }) =>
			state.listArticles.articles
	);

	const currentArticle =
		listArticles.find(article => article.slug === slugCurrent) ||
		undefined;

	const handleUpdateArticle = async (
		token: string,
		slug: string,
		article: IArticle
	) => {
		const formattedArticle = formatArticle(article);

		try {
			await updateArticle({
				token: token,
				slug,
				article: formattedArticle
			}).unwrap();
			navigate(PUBLIC_PAGES.LIST_ARTICLES, { replace: true });
			toast.success('Article successfully updated');
		} catch (error) {
			console.error(error);
			toast.error(`Error: ${error?.status} article not updated!`);
		}
	};

	const handleRequest = (data: IArticleData) => {
		const article = {
			title: data.articleTitle,
			description: data.articleDescription,
			body: data.articleTextarea,
			tagList: [
				data.articleFirstTag,
				data.articleSecondTag,
				data.articleThirdTag
			]
		};

		const token = JSON.parse(localStorage.getItem('token'))?.value;

		handleUpdateArticle(token, slugCurrent, article);
	};

	return (
		<ArticleCreateEditForm
			type={type}
			currentArticle={currentArticle}
			handleRequest={handleRequest}
		/>
	);
};

export default ArticleEdit;
