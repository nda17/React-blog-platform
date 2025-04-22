import { ISubmitFormButton } from '@/components/ui/buttons/submit-form-button/submit-form-button.interface';
import styles from '@/components/ui/buttons/submit-form-button/SubmitFormButton.module.scss';
import { FC } from 'react';

export const SubmitFormButton: FC<ISubmitFormButton> = ({ text }) => {
	return <button className={styles.button}>{text}</button>;
};
