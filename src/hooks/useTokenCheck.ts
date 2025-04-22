import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { useAuth } from '@/hooks/useAuth';
import { getLocalStorageExpires } from '@/utils/getLocalStorageExpires';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const useTokenCheck = () => {
	const location = useLocation();
	const { signOut } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		const checkToken = async () => {
			const storedToken = localStorage.getItem('token');

			if (storedToken === null) {
				return;
			} else if (storedToken !== null) {
				const token = getLocalStorageExpires('token');
				if (token === null) {
					signOut(() => navigate(PUBLIC_PAGES.HOME, { replace: true }));
				}
			}
		};

		checkToken();
	}, [location.pathname]); // Отслеживание смены страниц
};
