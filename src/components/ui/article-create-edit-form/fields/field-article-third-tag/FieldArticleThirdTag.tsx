import styles from '@/components/ui/article-create-edit-form/fields/field-article-third-tag/FieldArticleThirdTag.module.scss';
import { IFieldArticle } from '@/components/ui/article-create-edit-form/fields/field-article.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldArticleThirdTag = forwardRef<
	HTMLInputElement,
	IFieldArticle
>(({ errors, required, validArticleTag, type = 'text', ...rest }, ref) => {
	return (
		<div className={clsx(styles['wrapper-input'])}>
			<label className={clsx(styles['label-input'])}>
				<input
					className={clsx(
						styles['input-field'],
						styles[errors?.articleThirdTag && 'input-field-error'],
						styles[validArticleTag && 'input-field-valid']
					)}
					ref={ref}
					required={required}
					type={type}
					{...rest}
					autoComplete="on"
				/>
			</label>
			{errors?.articleThirdTag && (
				<p className={styles.error}>{errors?.articleThirdTag?.message}</p>
			)}
		</div>
	);
});
