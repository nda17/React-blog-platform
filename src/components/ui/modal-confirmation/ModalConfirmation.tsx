/* eslint-disable  */
// @ts-nocheck
import { IModalConfirmation } from '@/components/ui/modal-confirmation/modal-confirmation.interface';
import { Modal } from 'antd';
import { FC } from 'react';

export const ModalConfirmation: FC<IModalConfirmation> = ({
	title,
	text,
	activeModal,
	handleConfirm,
	handleCancel
}) => {
	return (
		<Modal
			title={title}
			open={activeModal}
			onOk={() => handleConfirm()}
			onCancel={() => handleCancel()}
		>
			<p>{text}</p>
		</Modal>
	);
};
