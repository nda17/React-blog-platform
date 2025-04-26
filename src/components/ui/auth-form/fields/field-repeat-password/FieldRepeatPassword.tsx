import styles from '@/components/ui/auth-form/fields/field-repeat-password/FieldRepeatPassword.module.scss';
import { IField } from '@/components/ui/auth-form/fields/field.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldRepeatPassword = forwardRef<HTMLInputElement, IField>(
	(
		{
			errors,
			required,
			title,
			validRepeatPassword,
			type = 'password',
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
							styles[errors?.repeatPassword && 'input-field-error'],
							styles[validRepeatPassword && 'input-field-valid']
						)}
						ref={ref}
						required={required}
						type={type}
						{...rest}
						autoComplete="on"
					/>
				</label>
				{errors?.repeatPassword && (
					<p className={styles.error}>{errors?.repeatPassword?.message}</p>
				)}
			</div>
		);
	}
);
