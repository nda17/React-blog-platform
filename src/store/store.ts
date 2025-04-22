/* eslint-disable  */
// @ts-nocheck
import { api } from '@/store/api';
import { rootReducer } from '@/store/rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { RootState } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkMiddleware } from 'redux-thunk';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		}).concat(api.middleware as ThunkMiddleware<RootState>)
});

const persistor = persistStore(store);

export { persistor, store };
