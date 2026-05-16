function useValidatedPalette({ blockName, palette, isNested = false }) {
    const paletteToUse = palette || comet?.palette;
    if (!paletteToUse) {
        console.error(`No palette provided or available for useValidatedPalette for block ${blockName}`);
        return null;
    }
    let result = Object.entries(paletteToUse || {})
        ?.filter(([key, value]) => {
        if (isNested || blockName === 'comet/group') {
            return !['black'].includes(key);
        }
        return !['black', 'white'].includes(key);
    })
        ?.map(([key, value]) => ({ slug: key, name: key, color: value }))
        ?.sort((a, b) => {
        const order = ['white', 'dark', 'light', 'primary', 'secondary', 'accent'];
        const aIndex = order.indexOf(a.slug);
        const bIndex = order.indexOf(b.slug);
        if (aIndex === -1 && bIndex === -1) {
            return 0;
        }
        if (aIndex === -1) {
            return 1;
        }
        if (bIndex === -1) {
            return -1;
        }
        return aIndex - bIndex;
    });
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
    if (!result || result.length === 0) {
        return null;
    }
    return result;
}

export { useValidatedPalette };
//# sourceMappingURL=use-validated-palette.dist.js.map
