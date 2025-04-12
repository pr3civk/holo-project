export type Post = {
	id: string;
	title: string;
	content: string;
	githubCode?: {
		html?: string;
		ts?: string;
		glsl?: string;
		css?: string;
	};
};
