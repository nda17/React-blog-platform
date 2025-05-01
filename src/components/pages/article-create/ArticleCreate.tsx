import styles from '@/components/pages/article-create/ArticleCreate.module.scss';
import { ArticleCreateEditForm } from '@/components/ui/article-create-edit-form/ArticleCreateEditForm';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useCreateArticleMutation } from '@/store/api';
import { IArticle, IArticleData } from '@/types/article.interface';
import { formatArticle } from '@/utils/format-article';
import { FC } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ArticleCreate: FC = () => {
	const type = 'create';
	const navigate = useNavigate();
	const [createArticle] = useCreateArticleMutation();

	const handleCreateArticle = async (token: string, article: IArticle) => {
		const formattedArticle = formatArticle(article);

		try {
			await createArticle({
				token,
				article: formattedArticle
			}).unwrap();
			navigate(PUBLIC_PAGES.LIST_ARTICLES, { replace: true });
			toast.success('Article successfully created');
		} catch (error) {
			console.error(error);
			toast.error(`Error: ${error?.status} article not created!`);
		}
	};

	const handleRequest = (data: IArticleData) => {
		const article: IArticle = {
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

		handleCreateArticle(token, article);
	};

	return (
		<div className={styles.wrapper}>
			<ArticleCreateEditForm type={type} handleRequest={handleRequest} />
		</div>
	);
};

export default ArticleCreate;
