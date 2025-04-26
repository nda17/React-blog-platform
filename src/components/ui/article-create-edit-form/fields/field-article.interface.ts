export interface IFieldArticle {
	required: boolean;
	title: string;
	errors: {
		articleDescription?: {
			message: string;
		};
		articleFirstTag?: {
			message: string;
		};
		articleSecondTag?: {
			message: string;
		};
		articleTextarea?: {
			message: string;
		};
		articleThirdTag?: {
			message: string;
		};
		articleTitle?: {
			message: string;
		};
	};
	validArticleDescription?: boolean;
	validArticleTag?: boolean;
	validArticleTextarea?: boolean;
	validArticleTitle?: boolean;
	type: string;
}
