import styles from '@/components/ui/article-create-edit-form/fields/field-article-textarea/FieldArticleTextarea.module.scss';
import { IFieldArticle } from '@/components/ui/article-create-edit-form/fields/field-article.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldArticleTextarea = forwardRef<
	HTMLTextAreaElement,
	IFieldArticle
>(({ errors, required, title, validArticleTextarea, ...rest }, ref) => {
	return (
		<div className={clsx(styles['wrapper-input'])}>
			<label className={clsx(styles['label-input'])}>
				<p className={clsx(styles['label-input-textarea'])}>{title}</p>
				<textarea
					className={clsx(
						styles['input-field'],
						styles[errors?.articleTextarea && 'input-field-error'],
						styles[validArticleTextarea && 'input-field-valid']
					)}
					ref={ref}
					required={required}
					{...rest}
					autoComplete="on"
				/>
			</label>
			{errors?.articleTextarea && (
				<p className={styles.error}>{errors?.articleTextarea?.message}</p>
			)}
		</div>
	);
});
