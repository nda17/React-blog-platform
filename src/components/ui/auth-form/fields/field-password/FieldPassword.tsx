import styles from '@/components/ui/auth-form/fields/field-password/FieldPassword.module.scss';
import { IField } from '@/components/ui/auth-form/fields/field.interface';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';

export const FieldPassword = forwardRef<HTMLInputElement, IField>(
	(
		{ errors, required, title, validPassword, type = 'password', ...rest },
		ref
	) => {
		const [showPassword, setShowPassword] = useState(false);
		const [typeFiled, setTypeField] = useState(type);

		const showPasswordField = () => {
			setShowPassword(prev => !prev);

			if (!showPassword) {
				setTypeField('text');
			} else {
				setTypeField('password');
			}
		};

		return (
			<div className={clsx(styles['wrapper-input'])}>
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
						type={typeFiled}
						{...rest}
						autoComplete="on"
					/>
					{showPassword ? (
						<EyeFilled
							className={clsx(styles['show-button-password'])}
							onClick={() => showPasswordField()}
						/>
					) : (
						<EyeInvisibleFilled
							className={clsx(styles['show-button-password'])}
							onClick={() => showPasswordField()}
						/>
					)}
				</label>
				{errors?.password && (
					<p className={styles.error}>{errors?.password?.message}</p>
				)}
			</div>
		);
	}
);
