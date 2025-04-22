export interface IGeneralButtonByType {
	typeButton: string;
	disabled?: boolean;
	text: string;
	callback: () => void;
}
