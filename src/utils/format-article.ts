interface IArticle {
	title: string;
	description: string;
	body: string;
	tags?: string[];
}

export const formatArticle = (article: IArticle) => {
	const formattedArticle = Object.entries(article).reduce(
		(acc, [key, value]) => {
			if (value !== undefined) {
				if (Array.isArray(value)) {
					acc[key] = value.reduce((arr, item) => {
						if (item !== undefined) {
							arr.push(item);
						}
						return arr;
					}, []);
				} else {
					acc[key] = value;
				}
			}
			return acc;
		},
		{}
	);

	return formattedArticle;
};
