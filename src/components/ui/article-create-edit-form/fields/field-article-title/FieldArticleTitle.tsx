import styles from '@/components/ui/article-create-edit-form/fields/field-article-title/FieldArticleTitle.module.scss';
import { IFieldArticle } from '@/components/ui/article-create-edit-form/fields/field-article.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldArticleTitle = forwardRef<
	HTMLInputElement,
	IFieldArticle
>(
	(
		{ errors, required, title, validArticleTitle, type = 'text', ...rest },
		ref
	) => {
		return (
			<div className={clsx(styles['wrapper-input'])}>
				<label className={clsx(styles['label-input'])}>
					<p className={clsx(styles['label-input-title'])}>{title}</p>
					<input
						className={clsx(
							styles['input-field'],
							styles[errors?.articleTitle && 'input-field-error'],
							styles[validArticleTitle && 'input-field-valid']
						)}
						ref={ref}
						required={required}
						type={type}
						{...rest}
						autoComplete="on"
					/>
				</label>
				{errors?.articleTitle && (
					<p className={styles.error}>{errors?.articleTitle?.message}</p>
				)}
			</div>
		);
	}
);
