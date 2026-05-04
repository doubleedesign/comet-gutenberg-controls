import { ColourPalette } from "../types";

export function useValidatedPalette({ blockName }: { blockName: string }) {
	if (!comet.palette) return [];

	let palette: ColourPalette = Object.entries(comet?.palette)
			?.filter(([key, value]) => !['black', 'white'].includes(key))
			?.map(([key, value]) => ({ slug: key, name: key, color: value as string }))
		?? wp.data.select('core/block-editor').getSettings().colors;

	// Most blocks shouldn't have access to the status/message type colours, only brand colours, whereas others are the opposite
	if (['comet/callout'].includes(blockName)) {
		palette = palette.filter(color => ['error', 'success', 'info', 'warning'].includes(color.slug));
	}
	else if (['comet/separator'].includes(blockName)) {
		palette = palette.filter(color => !['error', 'success', 'info', 'warning', 'light'].includes(color.slug));
	}
	else if (['comet/copy', 'comet/copy-image'].includes(blockName)) {
		palette = palette.filter(color => !['error', 'success', 'info', 'warning', 'light', 'accent'].includes(color.slug));
	}
	else {
		palette = palette.filter(color => !['error', 'success', 'info', 'warning'].includes(color.slug));
	}

	if (!palette || palette.length === 0) {
		// eslint-disable-next-line max-len
		console.error('No colour palette found in component library configuration. You can use the comet_canvas_theme_colours PHP filter to add colours. Developers: See set_colours() in ThemeStyle.php in the plugin source for more implementation details.');

		return null;
	}

	return palette;
}