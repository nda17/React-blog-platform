import { IArticleItem } from '@/components/ui/article-item/article-item.interface';

export interface IArticleCreateEditForm {
	type?: string;
	currentArticle?: IArticleItem;
	handleRequest: (data: IArticleItem) => void;
}
