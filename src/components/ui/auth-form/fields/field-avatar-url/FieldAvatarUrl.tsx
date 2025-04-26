import styles from '@/components/ui/auth-form/fields/field-avatar-url/FieldAvatarUrl.module.scss';
import { IField } from '@/components/ui/auth-form/fields/field.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldAvatarUrl = forwardRef<HTMLInputElement, IField>(
	(
		{ errors, required, title, validAvatarUrl, type = 'text', ...rest },
		ref
	) => {
		return (
			<div className={clsx(styles['wrapper-input'])}>
				<label className={clsx(styles['label-input'])}>
					<p className={clsx(styles['label-input-title'])}>{title}</p>
					<input
						className={clsx(
							styles['input-field'],
							styles[errors?.avatarUrl && 'input-field-error'],
							styles[validAvatarUrl && 'input-field-valid']
						)}
						ref={ref}
						required={required}
						type={type}
						{...rest}
						autoComplete="on"
					/>
				</label>
				{errors?.avatarUrl && (
					<p className={styles.error}>{errors?.avatarUrl?.message}</p>
				)}
			</div>
		);
	}
);
