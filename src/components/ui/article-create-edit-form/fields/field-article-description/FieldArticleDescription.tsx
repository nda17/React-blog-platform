import styles from '@/components/ui/article-create-edit-form/fields/field-article-description/FieldArticleDescription.module.scss';
import { IFieldArticle } from '@/components/ui/article-create-edit-form/fields/field-article.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldArticleDescription = forwardRef<
	HTMLInputElement,
	IFieldArticle
>(
	(
		{
			errors,
			required,
			title,
			validArticleDescription,
			type = 'text',
			...rest
		},
		ref
	) => {
		return (
			<div className={clsx(styles['wrapper-input'])}>
				<label className={clsx(styles['label-input'])}>
					<p className={clsx(styles['label-input-description'])}>
						{title}
					</p>
					<input
						className={clsx(
							styles['input-field'],
							styles[errors?.articleDescription && 'input-field-error'],
							styles[validArticleDescription && 'input-field-valid']
						)}
						ref={ref}
						required={required}
						type={type}
						{...rest}
						autoComplete="on"
					/>
				</label>
				{errors?.articleDescription && (
					<p className={styles.error}>
						{errors?.articleDescription?.message}
					</p>
				)}
			</div>
		);
	}
);
