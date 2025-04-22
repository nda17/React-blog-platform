import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	articles: []
};

export const listArticlesSlice = createSlice({
	name: 'listArticles',
	initialState: initialState,
	reducers: {
		setListArticles: (state, action) => {
			state.articles = [...action.payload];
		}
	}
});

export const { setListArticles } = listArticlesSlice.actions;
export default listArticlesSlice.reducer;
