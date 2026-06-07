import { ContextualColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown.dist.js';
import { ContextualColorPairDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown.dist.js';
import { useValidatedPalette } from '../hooks/use-validated-palette.dist.js';
import { ColorComboPreview } from './ColorComboPreview/ColorComboPreview.dist.js';
import { ColourTypeLabel } from './constants.dist.js';
import { ColourContextProvider } from '../controllers/ColourContextProvider.dist.js';

/* global wp */
const { useMemo } = wp.element;const { PanelBody } = wp.components;const ColorControls = (props) => {
    if (!Object.keys(props?.attributes).some(attr => ['colorTheme', 'backgroundColor', 'sectionBackground'].includes(attr))) {
        return null;
    }
    return (wp.element.createElement(PanelBody, { title: "Colours", initialOpen: true, className: `comet-color-controls comet-color-controls--${props?.name?.split('/')[1]}` },
        wp.element.createElement(ColorControlsInner, { ...props })));
};
function ColorControlsInner({ name, context, attributes, setAttributes }) {
    const singleColourPalette = useValidatedPalette({
        blockName: name,
        palette: comet?.filteredPalette ?? comet?.palette
    });
    const singleBackgroundPalette = useValidatedPalette({
        blockName: name,
        isNested: context?.isNested || attributes.sectionBackground !== undefined || attributes.sectionBackground !== 'none',
        palette: comet?.palette
    });
    const sectionBackgrounds = comet?.sectionBackgrounds
        ? Object.entries(comet?.sectionBackgrounds).map(([key, value]) => ({ slug: key, name: key, color: value }))
        : [];
    if (!singleColourPalette && !singleBackgroundPalette && !sectionBackgrounds) {
        return;
    }
    const hasColorThemeSupport = Object.keys(attributes).includes('colorTheme');
    const hasBackgroundColorSupport = Object.keys(attributes).includes('backgroundColor');
    const hasSectionBackgroundSupport = sectionBackgrounds.length > 0 && Object.keys(attributes).includes('sectionBackground');
    if (!hasColorThemeSupport && !hasBackgroundColorSupport && !hasSectionBackgroundSupport) {
        return null;
    }
    const componentDefault = comet?.defaults?.[name.replace('comet/', '')] ?? {};
    const values = useMemo(() => ({
        colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
        backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
        sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
    }), [attributes, componentDefault]);
    const showColourPairControl = hasBackgroundColorSupport && hasColorThemeSupport;
    const showSingleColourThemeControl = !showColourPairControl && !hasBackgroundColorSupport && hasColorThemeSupport;
    const showSingleBackgroundColourControl = !showColourPairControl && hasBackgroundColorSupport && !hasColorThemeSupport;
    const showSectionBackgroundControl = useMemo(() => hasSectionBackgroundSupport && !context?.isNested, [context?.isNested]);
    return (wp.element.createElement(ColourContextProvider, { values: values, onChange: setAttributes },
        showSingleColourThemeControl && singleColourPalette && (wp.element.createElement(ContextualColorPaletteDropdown, { colorContextKey: "colorTheme", label: ColourTypeLabel.COLOUR_THEME, palette: singleColourPalette })),
        showSingleBackgroundColourControl && singleBackgroundPalette && (wp.element.createElement(ContextualColorPaletteDropdown, { colorContextKey: "backgroundColor", label: ColourTypeLabel.BACKGROUND, palette: singleBackgroundPalette, clearable: true })),
        showColourPairControl && (wp.element.createElement(wp.element.Fragment, null,
            wp.element.createElement(ColorComboPreview, { colorTheme: attributes?.colorTheme, backgroundColor: attributes?.backgroundColor, sectionBackground: attributes?.sectionBackground !== 'none' ? attributes?.sectionBackground : undefined }),
            wp.element.createElement(ContextualColorPairDropdown, { blockName: name.split('/')[1] }))),
        showSectionBackgroundControl && (wp.element.createElement(ContextualColorPaletteDropdown, { colorContextKey: "sectionBackground", label: ColourTypeLabel.SECTION_BACKGROUND, palette: sectionBackgrounds, clearable: true }))));
}

export { ColorControls };
//# sourceMappingURL=ColorControls.dist.js.map
