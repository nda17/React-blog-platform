import { Layout } from '@/components/layout/Layout';
import { ArticleCreate } from '@/components/pages/article-create/ArticleCreate';
import { ArticleEdit } from '@/components/pages/article-edit/ArticleEdit';
import { Article } from '@/components/pages/article/Article';
import { ArticlesList } from '@/components/pages/articles-list/ArticlesList';
import { NotFound } from '@/components/pages/not-found/NotFound';
import { SignIn } from '@/components/pages/sign-in/SignIn';
import { SignUp } from '@/components/pages/sign-up/SignUp';
import { UserEdit } from '@/components/pages/user-edit/UserEdit';
import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { AuthProvider } from '@/hoc/auth-provider/AuthProvider';
import { RequireAuth } from '@/hoc/require-auth/RequireAuth';
import { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';

export const App: FC = () => {
	return (
		<>
			<AuthProvider>
				<Toaster />
				<Routes>
					<Route path={PUBLIC_PAGES.HOME} element={<Layout />}>
						<Route
							index
							element={
								<Navigate to={PUBLIC_PAGES.LIST_ARTICLES} replace />
							}
						/>
						<Route path={PUBLIC_PAGES.SIGN_IN} element={<SignIn />} />
						<Route path={PUBLIC_PAGES.SIGN_UP} element={<SignUp />} />
						<Route
							path={PUBLIC_PAGES.ADD_NEW_ARTICLE}
							element={
								<RequireAuth>
									<ArticleCreate />
								</RequireAuth>
							}
						/>
						<Route
							path={PUBLIC_PAGES.EDIT_ARTICLE}
							element={
								<RequireAuth>
									<ArticleEdit />
								</RequireAuth>
							}
						/>
						<Route
							path={PUBLIC_PAGES.USER_EDIT}
							element={
								<RequireAuth>
									<UserEdit />
								</RequireAuth>
							}
						/>
						<Route path={PUBLIC_PAGES.LIST_ARTICLES}>
							<Route index element={<ArticlesList />} />
							<Route path={PUBLIC_PAGES.ARTICLE} element={<Article />} />
						</Route>
						<Route path={PUBLIC_PAGES.NOT_FOUND} element={<NotFound />} />
						<Route
							path="*"
							element={<Navigate replace to={PUBLIC_PAGES.NOT_FOUND} />}
						/>
					</Route>
				</Routes>
			</AuthProvider>
		</>
	);
};
