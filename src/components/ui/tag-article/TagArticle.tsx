/* eslint-disable  */
// @ts-nocheck
import { ITagArticle } from '@/components/ui/tag-article/tag-article.interface';
import styles from '@/components/ui/tag-article/TagArticle.module.scss';
import { Tag } from 'antd';
import { FC } from 'react';

export const TagArticle: FC<ITagArticle> = ({ tag }) => {
	return <Tag className={styles.tag}>{tag}</Tag>;
};
