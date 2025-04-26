export interface IFieldErrors {
	articleTitle?: {
		type?: string;
		message?: string;
	};
	articleDescription?: {
		message?: string;
	};
	articleTextarea?: {
		type?: string;
		message?: string;
	};
	articleFirstTag?: {
		type?: string;
		message?: string;
	};
	articleSecondTag?: {
		type?: string;
		message?: string;
	};
	articleThirdTag?: {
		type?: string;
		message?: string;
	};
}

export interface IFieldArticle {
	required?: boolean;
	title?: string;
	errors?: IFieldErrors;
	defaultValue: string;
	validArticleDescription?: boolean;
	validArticleTag?: boolean;
	validArticleTextarea?: boolean;
	validArticleTitle?: boolean;
	type?: string;
}
