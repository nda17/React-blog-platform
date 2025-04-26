import styles from '@/components/ui/auth-form/fields/field-username/FieldUsername.module.scss';
import { IField } from '@/components/ui/auth-form/fields/field.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldUsername = forwardRef<HTMLInputElement, IField>(
	(
		{
			errors,
			required,
			title,
			validUsername,
			type = 'text',
			...rest
		},
		ref
	) => {
		return (
			<div className={clsx(styles['wrapper-input'])}>
				<label className={clsx(styles['label-input'])}>
					<p className={clsx(styles['label-input-title'])}>{title}</p>
					<input
						className={clsx(
							styles['input-field'],
							styles[errors?.username && 'input-field-error'],
							styles[validUsername && 'input-field-valid']
						)}
						ref={ref}
						required={required}
						type={type}
						{...rest}
						autoComplete="on"
					/>
				</label>
				{errors?.username && (
					<p className={styles.error}>{errors?.username?.message}</p>
				)}
			</div>
		);
	}
);
