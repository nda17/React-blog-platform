import styles from '@/components/ui/auth-form/fields/field-password/FieldPassword.module.scss';
import { IField } from '@/components/ui/auth-form/fields/field.interface';
import clsx from 'clsx';
import { forwardRef } from 'react';

export const FieldPassword = forwardRef<HTMLInputElement, IField>(
	(
		{
			errors,
			required,
			title,
			validPassword,
			type = 'password',
			style,
			...rest
		},
		ref
	) => {
		return (
			<div className={clsx(styles['wrapper-input'])} style={style}>
				<label className={clsx(styles['label-input'])}>
					<p className={clsx(styles['label-input-title'])}>{title}</p>
					<input
						className={clsx(
							styles['input-field'],
							styles[errors?.password && 'input-field-error'],
							styles[validPassword && 'input-field-valid']
						)}
						ref={ref}
						required={required}
						type={type}
						{...rest}
						autoComplete="on"
					/>
				</label>
				{errors?.password && (
					<p className={styles.error}>{errors?.password?.message}</p>
				)}
			</div>
		);
	}
);
