import { IMarkdownContent } from '@/components/ui/markdown-content/markdown-content.interface';
import '@/components/ui/markdown-content/MarkdownContent.module.scss';
import Markdown from 'markdown-to-jsx';
import { FC } from 'react';

export const MarkdownContent: FC<IMarkdownContent> = ({ content }) => {
	return (
		<Markdown
			options={{
				overrides: {
					ul: {
						component: ({ children }) => (
							<ul
								style={{
									listStyle: 'disk',
									marginTop: '1em',
									marginBottom: '1em',
									marginLeft: 0,
									marginRight: 0
								}}
							>
								{children}
							</ul>
						)
					},
					h1: {
						component: ({ children }) => (
							<h1 style={{ margin: 0 }}>{children}</h1>
						)
					},
					p: {
						component: ({ children }) => (
							<p
								style={{
									display: 'block',
									marginTop: '1em',
									marginBottom: '1em',
									marginLeft: 0,
									marginRight: 0
								}}
							>
								{children}
							</p>
						)
					}
				}
			}}
		>
			{content}
		</Markdown>
	);
};
