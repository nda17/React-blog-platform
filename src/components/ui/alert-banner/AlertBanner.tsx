import { IAlertBanner } from '@/components/ui/alert-banner/alert-banner.interface';
import styles from '@/components/ui/alert-banner/AlertBanner.module.css';
import { Alert } from 'antd';
import { FC } from 'react';

export const AlertBanner: FC<IAlertBanner> = ({
	message,
	description,
	type
}) => {
	return (
		<div className={styles.wrapper}>
			<Alert
				message={message}
				description={description || null}
				type={type}
			/>
		</div>
	);
};
