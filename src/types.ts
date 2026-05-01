export type ThemeColor =
	'primary' |
	'secondary' |
	'accent' |
	'error' |
	'success' |
	'warning' |
	'info' |
	'light' |
	'dark' |
	'white';

export type ColorPair = {
	foreground: ThemeColor;
	background: ThemeColor;
};

// Note: If you're looking for where colours and gradients are set, it's theme.json.
// Another note: Only the slugs are passed through to the PHP render functions,
// the values in theme.json are used for the editor but not for rendering
export type ThemeGradient = string;

export type AspectRatio = {
	name: string;
	value: string;
};
