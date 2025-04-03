/* eslint-disable  */
// @ts-nocheck
import styles from '@/components/ui/preloader/Preloader.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex, Spin } from 'antd';
import { FC } from 'react';

export const Preloader: FC = () => (
	<Flex className={styles.wrapper} align="center" gap="middle">
		<Spin indicator={<LoadingOutlined spin />} size="large" />
	</Flex>
);
