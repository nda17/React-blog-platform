import { IGeneralButtonByType } from '@/components/ui/buttons/general-button-by-type/general-button-by-type.interface';
import styles from '@/components/ui/buttons/general-button-by-type/GeneralButtonByType.module.scss';
import clsx from 'clsx';
import { FC } from 'react';

export const GeneralButtonByType: FC<IGeneralButtonByType> = ({
	typeButton = 'deleteTag',
	text,
	disabled,
	callback
}) => {
	const typeDeleteTag = 'deleteTag';
	const typeAddTag = 'addTag';
	const typeDeleteArticle = 'deleteArticle';
	const typeEditArticle = 'editArticle';

	return (
		<button
			type="button"
			disabled={disabled}
			onClick={callback}
			className={clsx(
				styles['button'],
				styles[typeButton === typeDeleteTag && 'button-delete-tag'],
				styles[typeButton === typeAddTag && 'button-add-tag'],
				styles[
					typeButton === typeDeleteArticle && 'button-delete-article'
				],
				styles[typeButton === typeEditArticle && 'button-edit-article'],
				styles[disabled && 'disabled']
			)}
		>
			{text}
		</button>
	);
};
