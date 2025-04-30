import { IArticleCreateEditForm } from '@/components/ui/article-create-edit-form/article-create-edit-form.interface';
import styles from '@/components/ui/article-create-edit-form/ArticleCreateEditForm.module.scss';
import { FieldArticleDescription } from '@/components/ui/article-create-edit-form/fields/field-article-description/FieldArticleDescription';
import { FieldArticleFirstTag } from '@/components/ui/article-create-edit-form/fields/field-article-first-tag/FieldArticleFirstTag';
import { FieldArticleSecondTag } from '@/components/ui/article-create-edit-form/fields/field-article-second-tag/FieldArticleSecondTag';
import { FieldArticleTextarea } from '@/components/ui/article-create-edit-form/fields/field-article-textarea/FieldArticleTextarea';
import { FieldArticleThirdTag } from '@/components/ui/article-create-edit-form/fields/field-article-third-tag/FieldArticleThirdTag';
import { FieldArticleTitle } from '@/components/ui/article-create-edit-form/fields/field-article-title/FieldArticleTitle';
import { IFieldErrors } from '@/components/ui/article-create-edit-form/fields/field-article.interface';
import { GeneralButtonByType } from '@/components/ui/buttons/general-button-by-type/GeneralButtonByType';
import { SubmitFormButton } from '@/components/ui/buttons/submit-form-button/SubmitFormButton';
import {
	validateArticleDescriptionRegex,
	validateArticleTagRegex,
	validateArticleTextareaRegex,
	validateArticleTitleRegex
} from '@/shared/regex';
import { IArticleData } from '@/types/article.interface';
import clsx from 'clsx';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const ArticleCreateEditForm: FC<IArticleCreateEditForm> = ({
	type = 'create',
	currentArticle,
	handleRequest
}) => {
	const [validArticleTitle, setValidArticleTitle] =
		useState<boolean>(false);
	const [validArticleDescription, setValidArticleDescription] =
		useState<boolean>(false);
	const [validArticleTextarea, setValidArticleTextarea] =
		useState<boolean>(false);
	const [validArticleFirstTag, setValidArticleFirstTag] =
		useState<boolean>(false);
	const [validArticleSecondTag, setValidArticleSecondTag] =
		useState<boolean>(false);
	const [validArticleThirdTag, setValidArticleThirdTag] =
		useState<boolean>(false);
	const [articleFirstTag, setArticleFirstTag] = useState<boolean>(false);
	const [articleSecondTag, setArticleSecondTag] = useState<boolean>(false);
	const [articleThirdTag, setArticleThirdTag] = useState<boolean>(false);
	const create: string = 'create';
	const edit: string = 'edit';

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue, //setValue для управления значениями формы
		unregister //unregister для удаления формы
	} = useForm({ mode: 'onChange' });

	const onSubmit = (data: IArticleData) => {
		handleRequest(data);
	};

	const validateArticleTitle = (value: string) => {
		if (validateArticleTitleRegex.test(value)) {
			setValidArticleTitle(true);
			return true;
		} else {
			setValidArticleTitle(false);
			return 'Min 3 symbols and max 19 symbols';
		}
	};

	const validateArticleDescription = (value: string) => {
		if (validateArticleDescriptionRegex.test(value)) {
			setValidArticleDescription(true);
			return true;
		} else {
			setValidArticleDescription(false);
			return 'Min 10 symbols and max 30 symbols';
		}
	};

	const validateArticleTextarea = (value: string) => {
		if (validateArticleTextareaRegex.test(value)) {
			setValidArticleTextarea(true);
			return true;
		} else {
			setValidArticleTextarea(false);
			return 'Min 10 symbols';
		}
	};

	const validateArticleTag = (value: string, tagId: string) => {
		const firstId = 'first';
		const secondId = 'second';
		const thirdId = 'third';

		const isValid = validateArticleTagRegex.test(value);

		const tagSetters = {
			[firstId]: setValidArticleFirstTag,
			[secondId]: setValidArticleSecondTag,
			[thirdId]: setValidArticleThirdTag
		};

		if (tagSetters[tagId]) {
			tagSetters[tagId](isValid);
		}

		return isValid || 'Min 3 symbols and max 8 symbols';
	};

	useEffect(() => {
		if (type === 'edit' && currentArticle?.tagList) {
			const setTagStates = [
				setArticleFirstTag,
				setArticleSecondTag,
				setArticleThirdTag
			];

			for (let i = 0; i < 3; i++) {
				if (currentArticle.tagList[i] !== undefined) {
					setTagStates[i](true);
					setValue(
						`article${i === 0 ? 'First' : i === 1 ? 'Second' : 'Third'}Tag`,
						currentArticle.tagList[i]
					);
				}
			}
		}
	}, []);

	// Функции для удаления тегов с очисткой значений формы
	const handleDeleteFirstTag = () => {
		setArticleFirstTag(false);
		// setValue('articleFirstTag', ''); //Сбрас значения поля формы
		unregister('articleFirstTag'); //Удаление поля из формы
		setValidArticleFirstTag(false); //Сброс валидации
	};

	// Функции для удаления тегов с очисткой значений формы
	const handleDeleteSecondTag = () => {
		setArticleSecondTag(false);
		// setValue('articleSecondTag', ''); //Сбрас значения поля формы
		unregister('articleSecondTag'); //Удаление поля из формы
		setValidArticleSecondTag(false); //Сброс валидации
	};

	// Функции для удаления тегов с очисткой значений формы
	const handleDeleteThirdTag = () => {
		setArticleThirdTag(false);
		// setValue('articleThirdTag', ''); //Сбрас значения поля формы
		unregister('articleThirdTag'); //Удаление поля из формы
		setValidArticleThirdTag(false); //Сброс валидации
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<h1 className={clsx(styles['title-form'])}>
				{type === create && 'Create new article'}
				{type === edit && 'Edit article'}
			</h1>
			<FieldArticleTitle
				{...register('articleTitle', {
					required: 'Title is required!',
					validate: value => validateArticleTitle(value)
				})}
				validArticleTitle={validArticleTitle}
				defaultValue={type === edit ? currentArticle.title : null}
				type="text"
				title="Title"
				errors={errors as IFieldErrors}
			/>
			<FieldArticleDescription
				{...register('articleDescription', {
					required: 'Description is required!',
					validate: value => validateArticleDescription(value)
				})}
				validArticleDescription={validArticleDescription}
				defaultValue={type === edit ? currentArticle.description : null}
				type="text"
				title="Description"
				errors={errors as IFieldErrors}
			/>
			<FieldArticleTextarea
				{...register('articleTextarea', {
					required: 'Text article is required!',
					validate: value => validateArticleTextarea(value)
				})}
				validArticleTextarea={validArticleTextarea}
				defaultValue={type === edit ? currentArticle.body : null}
				title="Text"
				errors={errors as IFieldErrors}
			/>
			<div className={clsx(styles['wrapper-tags'])}>
				<p className={clsx(styles['title-tags'])}>Tags</p>
				<div className={clsx(styles['wrapper-tags-group'])}>
					{articleFirstTag && (
						<div className={clsx(styles['wrapper-tag-input'])}>
							<FieldArticleFirstTag
								{...register('articleFirstTag', {
									required: 'Tag is required!',
									validate: value => validateArticleTag(value, 'first')
								})}
								validArticleTag={validArticleFirstTag}
								defaultValue={
									type === edit ? currentArticle.tagList[0] : null
								}
								errors={errors as IFieldErrors}
							/>
							<GeneralButtonByType
								typeButton={'deleteTag'}
								text={'Delete'}
								disabled={articleSecondTag}
								callback={handleDeleteFirstTag} // Используем функцию с очисткой
							/>
						</div>
					)}
					{articleSecondTag && (
						<div className={clsx(styles['wrapper-tag-input'])}>
							<FieldArticleSecondTag
								{...register('articleSecondTag', {
									required: 'Tag is required!',
									validate: value => validateArticleTag(value, 'second')
								})}
								validArticleTag={validArticleSecondTag}
								defaultValue={
									type === edit ? currentArticle.tagList[1] : null
								}
								errors={errors as IFieldErrors}
							/>
							<GeneralButtonByType
								typeButton={'deleteTag'}
								text={'Delete'}
								disabled={articleThirdTag}
								callback={handleDeleteSecondTag}
							/>
						</div>
					)}
					{articleThirdTag && (
						<div className={clsx(styles['wrapper-tag-input'])}>
							<FieldArticleThirdTag
								{...register('articleThirdTag', {
									required: 'Tag is required!',
									validate: value => validateArticleTag(value, 'third')
								})}
								validArticleTag={validArticleThirdTag}
								defaultValue={
									type === edit ? currentArticle.tagList[2] : null
								}
								errors={errors as IFieldErrors}
							/>
							<GeneralButtonByType
								typeButton={'deleteTag'}
								text={'Delete'}
								callback={handleDeleteThirdTag}
							/>
						</div>
					)}
					{!articleFirstTag && (
						<GeneralButtonByType
							typeButton={'addTag'}
							text={'Add tag'}
							disabled={articleSecondTag}
							callback={() => setArticleFirstTag(prev => !prev)}
						/>
					)}
					{articleFirstTag && !articleSecondTag && (
						<GeneralButtonByType
							typeButton={'addTag'}
							text={'Add tag'}
							disabled={articleSecondTag}
							callback={() => setArticleSecondTag(prev => !prev)}
						/>
					)}
					{articleFirstTag && articleSecondTag && !articleThirdTag && (
						<GeneralButtonByType
							typeButton={'addTag'}
							text={'Add tag'}
							disabled={articleThirdTag}
							callback={() => setArticleThirdTag(prev => !prev)}
						/>
					)}
					<SubmitFormButton text={'Send'} />
				</div>
			</div>
		</form>
	);
};
