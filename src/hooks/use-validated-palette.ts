import {ColourPalette, ThemeColor} from "../types";

type ValidatePaletteArgs = {
	blockName: string;
	palette?: Record<ThemeColor, string>;
}

export function useValidatedPalette({ blockName, palette }: ValidatePaletteArgs): ColourPalette | null {
	const paletteToUse = palette || comet?.palette;
	if(!paletteToUse) {
		console.error(`No palette provided or available for useValidatedPalette for block ${blockName}`);
		return null;
	}

	let result: ColourPalette = Object.entries(paletteToUse || {})
			?.filter(([key, value]) => !['black', 'white'].includes(key))
			?.map(([key, value]) => ({ slug: key, name: key, color: value as string }));

	// Most blocks shouldn't have access to the status/message type colours, only brand colours, whereas others are the opposite
	if (['comet/callout'].includes(blockName)) {
		result = result.filter(color => ['error', 'success', 'info', 'warning'].includes(color.slug));
	}
	else if (['comet/separator'].includes(blockName)) {
		result = result.filter(color => !['error', 'success', 'info', 'warning', 'light'].includes(color.slug));
	}
	else if (['comet/copy', 'comet/copy-image'].includes(blockName)) {
		result = result.filter(color => !['error', 'success', 'info', 'warning', 'light', 'accent'].includes(color.slug));
	}
	else {
		result = result.filter(color => !['error', 'success', 'info', 'warning'].includes(color.slug));
	}

	if (!result|| result.length === 0) {
		return null;
	}

	return result;
}