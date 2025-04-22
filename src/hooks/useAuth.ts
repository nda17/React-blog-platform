import { AuthContext } from '@/hoc/auth-provider/AuthProvider';
import { useContext } from 'react';

export const useAuth = () => {
	return useContext(AuthContext);
};
