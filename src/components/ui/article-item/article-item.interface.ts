export interface IArticleItem {
	author: {
		username: string;
		image: string;
		following: boolean;
	};
	body?: string;
	createdAt: string;
	description: string;
	favorited: boolean;
	favoritesCount: number;
	slug: string;
	tagList: string[];
	title: string;
	type: string;
}
