import styles from '@/components/ui/auth-form/fields/field-email/FieldEmail.module.scss';
import { IField } from '@/components/ui/auth-form/fields/field.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldEmail = forwardRef<HTMLInputElement, IField>(
	(
		{ errors, required, title, validEmail, type = 'text', ...rest },
		ref
	) => {
		return (
			<div className={clsx(styles['wrapper-input'])}>
				<label className={clsx(styles['label-input'])}>
					<p className={clsx(styles['label-input-title'])}>{title}</p>
					<input
						className={clsx(
							styles['input-field'],
							styles[errors?.email && 'input-field-error'],
							styles[validEmail && 'input-field-valid']
						)}
						ref={ref}
						required={required}
						type={type}
						{...rest}
						autoComplete="on"
					/>
				</label>
				{errors?.email && (
					<p className={styles.error}>{errors?.email?.message}</p>
				)}
			</div>
		);
	}
);
