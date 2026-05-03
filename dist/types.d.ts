export type ThemeColor = 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'white';
export type ColorPair = {
    foreground: ThemeColor;
    background: ThemeColor;
};
export type ThemeGradient = string;
export type AspectRatio = {
    name: string;
    value: string;
};
