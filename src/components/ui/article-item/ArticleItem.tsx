import { IArticleItem } from '@/components/ui/article-item/article-item.interface';
import styles from '@/components/ui/article-item/ArticleItem.module.scss';
import { GeneralButtonByType } from '@/components/ui/buttons/general-button-by-type/GeneralButtonByType';
import { LikeButton } from '@/components/ui/buttons/like-button/LikeButton';
import { MarkdownContent } from '@/components/ui/markdown-content/MarkdownContent';
import { ModalConfirmation } from '@/components/ui/modal-confirmation/ModalConfirmation';
import { TagArticle } from '@/components/ui/tag-article/TagArticle';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useAuth } from '@/hooks/useAuth';
import {
	useCreateLikeMutation,
	useDeleteArticleMutation,
	useDeleteLikeMutation
} from '@/store/api';
import { formatDate } from '@/utils/format-date';
import clsx from 'clsx';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export const ArticleItem: FC<IArticleItem> = ({
	author,
	body,
	createdAt,
	description,
	favorited,
	favoritesCount,
	slug,
	tagList,
	title,
	type
}) => {
	const { user } = useAuth();
	const date = formatDate(createdAt, 'MMMM d, yyyy');
	const [activeModal, setActiveModal] = useState(false);
	const navigate = useNavigate();
	const { slug: slugCurrent } = useParams();
	const [deleteArticle] = useDeleteArticleMutation();
	const [createLike] = useCreateLikeMutation();
	const [deleteLike] = useDeleteLikeMutation();
	const token = JSON.parse(localStorage.getItem('token'))?.value;

	const handleConfirmDeleteArticle = () => {
		setActiveModal(true);
	};

	const handleDeleteArticle = async (token: string, slug: string) => {
		try {
			await deleteArticle({
				token: token,
				slug: slug
			}).unwrap();
			navigate(PUBLIC_PAGES.LIST_ARTICLES, { replace: true });
			toast.success('Article successfully deleted');
		} catch (error) {
			console.error(error);
			toast.error(`Error: ${error?.status} article not deleted!`);
		}
	};

	const handleLike = async (token: string, slug: string) => {
		if (!user) {
			return toast.error('Please login to smash the like!');
		}

		if (favorited) {
			try {
				await deleteLike({
					token: token,
					slug: slug
				}).unwrap();
				toast.success('Like successfully deleted');
			} catch (error) {
				console.error(error);
				toast.error(`Error: ${error?.status} Like not deleted!`);
			}
		} else {
			try {
				await createLike({
					token: token,
					slug: slug
				}).unwrap();
				toast.success('Like successfully added');
			} catch (error) {
				console.error(error);
				toast.error(`Error: ${error?.status} Like not added!`);
			}
		}
	};

	return (
		<div
			className={clsx(
				styles['wrapper'],
				styles[type === 'article' && 'article']
			)}
		>
			{activeModal && (
				<ModalConfirmation
					title={'Deleting an article'}
					text={'Are you sure?'}
					activeModal={activeModal}
					handleConfirm={() => handleDeleteArticle(token, slug)}
					handleCancel={() => setActiveModal(false)}
				/>
			)}
			<div className={clsx(styles['wrapper-left-section'])}>
				<div className={clsx(styles['title-wrapper'])}>
					{type === 'list' && (
						<Link
							to={`${PUBLIC_PAGES.LIST_ARTICLES}/${slug}`}
							className={clsx(styles['title-link'])}
						>
							{title.trim().slice(0, 19) || 'no data'}
						</Link>
					)}
					{type === 'article' && (
						<p className={clsx(styles['title-link'])}>
							{title.trim().slice(0, 19) || 'no data'}
						</p>
					)}
					<div className={clsx(styles['socials-wrapper'])}>
						<LikeButton
							active={favorited}
							handleLike={() => handleLike(token, slug)}
						/>
						<span className={clsx(styles['socials-counter'])}>
							{favoritesCount}
						</span>
					</div>
				</div>
				<div>
					{tagList.map((item: string) => {
						return (
							<TagArticle
								key={uuidv4()}
								tag={
									(item && item.toString().trim().slice(0, 8)) || 'No data'
								}
							/>
						);
					})}
				</div>
				{type === 'list' && (
					<p className={styles.description}>{description.slice(0, 80)}</p>
				)}
				{type === 'article' && <MarkdownContent content={body} />}
			</div>
			<div className={clsx(styles['wrapper-right-section'])}>
				<div className={clsx(styles['wrapper-info'])}>
					<div className={clsx(styles['user-info'])}>
						<p className={styles.username}>
							{author.username.slice(0, 8)}
						</p>
						<p className={styles.date}>{date}</p>
					</div>
					<img className={styles.avatar} src={author.image} alt="Avatar" />
				</div>
				{author?.username === user?.username && slugCurrent === slug && (
					<div className={clsx(styles['wrapper-button'])}>
						<GeneralButtonByType
							typeButton={'deleteArticle'}
							text={'Delete'}
							callback={() => handleConfirmDeleteArticle()}
						/>
						<GeneralButtonByType
							typeButton={'editArticle'}
							text={'Edit'}
							callback={() =>
								navigate(`${PUBLIC_PAGES.LIST_ARTICLES}/${slug}/edit`)
							}
						/>
					</div>
				)}
			</div>
		</div>
	);
};
