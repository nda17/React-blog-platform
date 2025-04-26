import { PUBLIC_PAGES } from '@/config/pages/public.config';
import { AuthProvider } from '@/hoc/auth-provider/AuthProvider';
import { RequireAuth } from '@/hoc/require-auth/RequireAuth';
import { FC, lazy } from 'react';
import { Toaster } from 'react-hot-toast';
import { Navigate, Route, Routes } from 'react-router-dom';
const NotFound = lazy(
	() => import('@/components/pages/not-found/NotFound')
);
const SignIn = lazy(() => import('@/components/pages/sign-in/SignIn'));
const SignUp = lazy(() => import('@/components/pages/sign-up/SignUp'));
const Layout = lazy(() => import('@/components/layout/Layout'));
const ArticleCreate = lazy(
	() => import('@/components/pages/article-create/ArticleCreate')
);
const ArticleEdit = lazy(
	() => import('@/components/pages/article-edit/ArticleEdit')
);
const Article = lazy(() => import('@/components/pages/article/Article'));
const ArticlesList = lazy(
	() => import('@/components/pages/articles-list/ArticlesList')
);
const UserEdit = lazy(
	() => import('@/components/pages/user-edit/UserEdit')
);

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
