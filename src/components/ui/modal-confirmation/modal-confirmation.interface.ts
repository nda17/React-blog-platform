export interface IModalConfirmation {
	title: string;
	text: string;
	activeModal: boolean;
	handleConfirm: () => void;
	handleCancel: () => void;
}
