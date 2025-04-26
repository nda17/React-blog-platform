import styles from '@/components/ui/article-create-edit-form/fields/field-article-first-tag/FieldArticleFirstTag.module.scss';
import { IFieldArticle } from '@/components/ui/article-create-edit-form/fields/field-article.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldArticleFirstTag = forwardRef<
	HTMLInputElement,
	IFieldArticle
>(({ errors, required, validArticleTag, type = 'text', ...rest }, ref) => {
	return (
		<div className={clsx(styles['wrapper-input'])}>
			<label className={clsx(styles['label-input'])}>
				<input
					className={clsx(
						styles['input-field'],
						styles[errors?.articleFirstTag && 'input-field-error'],
						styles[validArticleTag && 'input-field-valid']
					)}
					ref={ref}
					required={required}
					type={type}
					{...rest}
					autoComplete="on"
				/>
			</label>
			{errors?.articleFirstTag && (
				<p className={styles.error}>{errors?.articleFirstTag?.message}</p>
			)}
		</div>
	);
});
