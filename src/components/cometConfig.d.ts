import type {
	ThemeColor, ColorPair, ThemeGradient, AspectRatio 
} from '../types';

/**
 * Comet global config from the Config class which is made available to JavaScript
 * - using wp_localize_script in WordPress plugins
 * - using a decorator in this library's Storybook
 */
interface Config {
	defaults?: Record<string, any>;
	globalBackground?: ThemeColor;
	palette?: Record<ThemeColor, string>;
	colourPairs?: ColorPair[];
	colourPairOverrides?: Record<string, ColorPair[]>;
	gradients?: ThemeGradient[];
	sectionBackgrounds?: Record<string, ThemeColor|ThemeGradient>;
	aspectRatios?: AspectRatio[];
	ajaxUrl?: string;
	nonce?: string;
	context?: {
		object_type: string;
		id: number;
	}
}
