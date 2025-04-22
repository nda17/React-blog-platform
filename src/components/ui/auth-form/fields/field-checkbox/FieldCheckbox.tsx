import styles from '@/components/ui/auth-form/fields/field-checkbox/FieldCheckbox.module.scss';
import { IField } from '@/components/ui/auth-form/fields/field.interface';
import { forwardRef } from 'react';

export const CheckboxConfirm = forwardRef<HTMLInputElement, IField>(
	({ defaultChecked, type = 'checkbox', onChange, value, error }, ref) => {
		return (
			<label>
				<input
					className={styles.input}
					type={type}
					onChange={onChange}
					value={value}
					ref={ref}
					defaultChecked={defaultChecked}
				/>
				{error && <p className={styles.error}>{error}</p>}
			</label>
		);
	}
);
