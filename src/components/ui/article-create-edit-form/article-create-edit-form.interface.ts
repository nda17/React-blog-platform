import { IArticleItem } from '@/components/ui/article-item/article-item.interface';
import { IArticleData } from '@/types/article.interface';

export interface IArticleCreateEditForm {
	type?: string;
	currentArticle?: IArticleItem;
	handleRequest: (data: IArticleData) => void;
}
