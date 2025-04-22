import { setUser } from '@/store/slices/userSlice';
import { setLocalStorageExpires } from '@/utils/setLocalStorageExpires';
import { createContext } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();
	const user = useSelector((state: { user: { user } }) => state.user.user);

	const signUp = (user, callback) => {
		setLocalStorageExpires('token', user.token, 1800000);
		dispatch(setUser(user));
		callback();
	};

	// 1 минута = 60000 мс
	// 1 час = 3600000 мс
	// 1 день = 86400000 мс
	const signIn = (user, callback) => {
		setLocalStorageExpires('token', user.token, 1800000);
		dispatch(setUser(user));
		callback();
	};

	const signOut = callback => {
		if (!localStorage.getItem('token')) {
			localStorage.removeItem('token');
		}

		dispatch(setUser(null));
		toast.success('Logout');
		callback();
	};

	const value = { user, signUp, signIn, signOut };

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
