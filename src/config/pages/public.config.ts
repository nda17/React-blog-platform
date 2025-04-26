class PublicPages {
	HOME: string = '/';
	LIST_ARTICLES: string = '/articles';
	ARTICLE: string = '/articles/:slug';
	SIGN_IN: string = '/sign-in';
	SIGN_UP: string = '/sign-up';
	ADD_NEW_ARTICLE: string = '/new-article';
	EDIT_ARTICLE: string = '/articles/:slug/edit';
	NOT_FOUND: string = '/404';
	REGISTER: string = '/users';
	LOGIN: string = '/users/login';
	USER: string = '/user';
	USER_EDIT: string = '/user/:slug/edit';
}

export const PUBLIC_PAGES = new PublicPages();
