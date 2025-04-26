export interface IArticle {
	title: string;
	description: string;
	body: string;
	tagList?: string[];
}

export interface IArticleData {
	articleTitle: string;
	articleDescription: string;
	articleTextarea: string;
	articleFirstTag?: string;
	articleSecondTag?: string;
	articleThirdTag?: string;
}
