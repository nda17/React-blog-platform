import { API_URL } from '@/config/api.config';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import {
	createApi,
	fetchBaseQuery,
	retry
} from '@reduxjs/toolkit/query/react';

export const api = createApi({
	baseQuery: retry(fetchBaseQuery({ baseUrl: API_URL }), {
		maxRetries: 1
	}),
	tagTypes: ['ArticlesList'],
	endpoints: builder => ({
		getListArticles: builder.query({
			query: (params: {
				token: string;
				offset: number;
				limit: number;
			}) => ({
				url: `${PUBLIC_PAGES.LIST_ARTICLES}?offset=${params.offset}&limit=${params.limit}`,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${params.token}`
				}
			}),
			providesTags: [{ type: 'ArticlesList', id: 'list' }]
		}),

		registerUser: builder.mutation({
			query: (user: {
				username: string;
				email: string;
				password: string;
			}) => ({
				url: `${PUBLIC_PAGES.REGISTER}`,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: { user }
			})
		}),

		loginUser: builder.mutation({
			query: (user: { email: string; password: string }) => ({
				url: `${PUBLIC_PAGES.LOGIN}`,
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: { user }
			})
		}),

		updateUser: builder.mutation({
			query: ({ token, user }) => ({
				url: `${PUBLIC_PAGES.USER}`,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: { user }
			})
		}),

		createArticle: builder.mutation({
			query: ({ token, article }) => ({
				url: `${PUBLIC_PAGES.LIST_ARTICLES}`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: { article }
			}),
			invalidatesTags: [{ type: 'ArticlesList', id: 'list' }]
		}),

		updateArticle: builder.mutation({
			query: ({ token, slug, article }) => ({
				url: `${PUBLIC_PAGES.LIST_ARTICLES}/${slug}`,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: { article }
			}),
			invalidatesTags: [{ type: 'ArticlesList', id: 'list' }]
		}),

		deleteArticle: builder.mutation({
			query: ({ token, slug }) => ({
				url: `${PUBLIC_PAGES.LIST_ARTICLES}/${slug}`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}),
			invalidatesTags: [{ type: 'ArticlesList', id: 'list' }]
		}),

		createLike: builder.mutation({
			query: ({ token, slug }) => ({
				url: `${PUBLIC_PAGES.LIST_ARTICLES}/${slug}/favorite`,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}),
			invalidatesTags: [{ type: 'ArticlesList', id: 'list' }]
		}),

		deleteLike: builder.mutation({
			query: ({ token, slug }) => ({
				url: `${PUBLIC_PAGES.LIST_ARTICLES}/${slug}/favorite`,
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			}),
			invalidatesTags: [{ type: 'ArticlesList', id: 'list' }]
		})
	})
});

export const {
	useGetListArticlesQuery,
	useRegisterUserMutation,
	useLoginUserMutation,
	useUpdateUserMutation,
	useCreateArticleMutation,
	useUpdateArticleMutation,
	useDeleteArticleMutation,
	useCreateLikeMutation,
	useDeleteLikeMutation
} = api;
