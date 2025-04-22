import { api } from '@/store/api';
import listArticlesReducer from '@/store/slices/listArticlesSlice';
import loadingReducer from '@/store/slices/loadingSlice';
import userReducer from '@/store/slices/userSlice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer,
	loading: loadingReducer,
	user: userReducer,
	listArticles: listArticlesReducer
});
