import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { IAuthProvider } from '@/hoc/auth-provider/auth-provider.interface';
import { useAuth } from '@/hooks/useAuth';
import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const RequireAuth: FC<IAuthProvider> = ({ children }) => {
	const location = useLocation();
	const { user } = useAuth();

	if (!user) {
		return (
			<Navigate to={PUBLIC_PAGES.SIGN_IN} state={{ from: location }} />
		);
	}

	return children;
};
