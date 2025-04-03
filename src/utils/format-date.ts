import { format } from 'date-fns';

export const formatDate = (createdAt: string, pattern: string) => {
	return format(createdAt, pattern);
};
