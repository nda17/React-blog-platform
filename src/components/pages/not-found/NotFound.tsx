import { AlertBanner } from '@/components/ui/alert-banner/AlertBanner';
import { FC } from 'react';

const NotFound: FC = () => {
	const message = '404 - Not found!';
	const description = 'Please, check the page URL.';
	const type = 'error';

	return (
		<AlertBanner message={message} description={description} type={type} />
	);
};

export default NotFound;
