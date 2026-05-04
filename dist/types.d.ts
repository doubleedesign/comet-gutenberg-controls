/**
 * Comet global config from the Config class which is made available to JavaScript
 * - using wp_localize_script in WordPress plugins
 * - using a decorator in this library's Storybook
 */
export interface Config {
    defaults?: Record<string, any>;
    globalBackground?: ThemeColor;
    palette?: Record<ThemeColor, string>;
    colourPairs?: ColorPair[];
    colourPairOverrides?: Record<string, ColorPair[]>;
    gradients?: ThemeGradient[];
    sectionBackgrounds?: Record<string, ThemeColor | ThemeGradient>;
    aspectRatios?: AspectRatio[];
    ajaxUrl?: string;
    nonce?: string;
    context?: {
        object_type: string;
        id: number;
    };
}
export type ThemeColor = 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning' | 'info' | 'light' | 'dark' | 'white';
export type ColorPair = {
    foreground: ThemeColor;
    background: ThemeColor;
};
export type ColourPalette = ColourPaletteItem[];
export type ColourPaletteItem = {
    name: string;
    slug: string;
    color: string;
};
export type ThemeGradient = string;
export type AspectRatio = {
    name: string;
    value: string;
};
