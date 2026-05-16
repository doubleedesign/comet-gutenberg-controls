import { ColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown.dist.js';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown.dist.js';
import { useValidatedPalette } from '../hooks/use-validated-palette.dist.js';
import { ColorComboPreview } from './ColorComboPreview/ColorComboPreview.dist.js';
import { COLOUR_THEME_LABEL, BACKGROUND_COLOUR_LABEL, SECTION_BACKGROUND_LABEL } from './constants.dist.js';

/* global wp */
const { useMemo, useCallback } = wp.element;const { PanelBody } = wp.components;const ColorControls = (props) => {
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
    const handleChange = useCallback((newValues) => {
        setAttributes(newValues);
    }, [setAttributes]);
    return (wp.element.createElement(wp.element.Fragment, null,
        showColourPairControl && (wp.element.createElement(ColorComboPreview, { colorTheme: attributes?.colorTheme, backgroundColor: attributes?.backgroundColor, sectionBackground: attributes?.sectionBackground !== 'none' ? attributes?.sectionBackground : undefined })),
        showSingleColourThemeControl && (wp.element.createElement("div", { className: "comet-color-controls__item" },
            wp.element.createElement(ColourThemeSelector, { values: values, palette: singleBackgroundPalette, handleChange: handleChange }))),
        showSingleBackgroundColourControl && (wp.element.createElement(BackgroundColourSelector, { attributes: attributes, values: values, palette: singleBackgroundPalette, handleChange: (newValue) => handleChange({ backgroundColor: newValue }), clearable: ['comet/group'].includes(name) })),
        showColourPairControl && (wp.element.createElement("div", { className: "comet-color-controls__item" },
            wp.element.createElement(ColorPairPaletteDropdown, { value: {
                    foreground: values.colorTheme,
                    background: values.backgroundColor
                }, blockName: name.split('/')[1], onChange: (newValue) => {
                    handleChange({
                        colorTheme: newValue.foreground,
                        backgroundColor: newValue.background
                    });
                } }))),
        showSectionBackgroundControl && (wp.element.createElement("div", { className: "comet-color-controls__item" },
            wp.element.createElement(SectionBackgroundSelector, { values: values, palette: sectionBackgrounds, handleChange: (newValue) => {
                    handleChange({ sectionBackground: newValue });
                } })))));
}
function ColourThemeSelector({ values, palette, handleChange }) {
    return (wp.element.createElement(ColorPaletteDropdown, { label: COLOUR_THEME_LABEL, value: values.colorTheme, palette: palette, onChange: handleChange }));
}
function BackgroundColourSelector({ attributes, values, palette, handleChange, clearable = false }) {
    return (wp.element.createElement(wp.element.Fragment, null,
        wp.element.createElement(ColorComboPreview, { backgroundColor: attributes?.backgroundColor }),
        wp.element.createElement("div", { className: "comet-color-controls__item" },
            wp.element.createElement(ColorPaletteDropdown, { label: BACKGROUND_COLOUR_LABEL, value: values.backgroundColor !== 'none' ? values.backgroundColor : undefined, palette: palette, onChange: handleChange, clearable: clearable }))));
}
function SectionBackgroundSelector({ values, palette, handleChange }) {
    return (wp.element.createElement(ColorPaletteDropdown, { label: SECTION_BACKGROUND_LABEL, value: values.sectionBackground !== 'none' ? values.sectionBackground : undefined, palette: palette, clearable: true, onChange: handleChange }));
}

export { ColorControls };
//# sourceMappingURL=ColorControls.dist.js.map
