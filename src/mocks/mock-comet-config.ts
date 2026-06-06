import { Config, ThemeColor } from '../types';
import { ASPECT_RATIOS } from '../components/constants';
import { MOCK_PALETTE, MOCK_GRADIENTS } from './common-defaults';

export function mockCometConfig(overrides?: Partial<Config>): Config {
	const mockConfig: Config = {
		globalBackground: 'white',
		aspectRatios: ASPECT_RATIOS,
		palette: MOCK_PALETTE.reduce((acc, color) => {
			acc[color.slug as ThemeColor] = color.color;
 
			return acc;
		}, {} as Record<ThemeColor, string>),
		colourPairs: [
			{ foreground: 'primary', background: 'white' },
			{ foreground: 'secondary', background: 'white' },
			{ foreground: 'accent', background: 'white' },
			{ foreground: 'primary', background: 'light' },
			{ foreground: 'light', background: 'dark' },
			{ foreground: 'accent', background: 'dark' },
		],
		colourPairOverrides: {},
		sectionBackgrounds: MOCK_GRADIENTS.reduce((acc, gradient) => {
			acc[gradient.slug] = gradient.gradient;

			return acc;
		}, {} as Record<string, string>),
		// Component-level defaults
		defaults: {},
		ajaxUrl: 'https://example.com/wp-admin/admin-ajax.php',
		nonce: 'mocked_nonce',
		context: {
			object_type: 'page',
			id: 123,
		}
	};

	window.comet = mockConfig;

	return mockConfig;
}