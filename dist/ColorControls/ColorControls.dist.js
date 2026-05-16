import { ColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown.dist.js';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown.dist.js';
import { useValidatedPalette } from '../hooks/use-validated-palette.dist.js';
import { ColorComboPreview } from './ColorComboPreview/ColorComboPreview.dist.js';
import { SECTION_BACKGROUND_LABEL, COLOUR_THEME_LABEL, BACKGROUND_COLOUR_LABEL } from './constants.dist.js';

/* global wp */
const { useRef, useMemo, useCallback } = wp.element;const { PanelBody } = wp.components;const ColorControls = (props) => {
    if (!Object.keys(props?.attributes).some(attr => ['colorTheme', 'backgroundColor', 'sectionBackground'].includes(attr))) {
        return null;
    }
    return (wp.element.createElement(PanelBody, { title: "Colours", initialOpen: true, className: `comet-color-controls comet-color-controls--${props?.name?.split('/')[1]}` },
        wp.element.createElement(ColorControlsInner, { ...props })));
};
function ColorControlsInner({ name, context, attributes, setAttributes }) {
    const singleColourPalette = useValidatedPalette({ blockName: name, palette: comet?.filteredPalette ?? comet?.palette });
    const singleBackgroundPalette = useValidatedPalette({ blockName: name, isNested: context?.isNested, palette: comet?.palette });
    if (!singleColourPalette && !singleBackgroundPalette) {
        return;
    }
    const sectionBackgrounds = comet?.sectionBackgrounds ? Object.entries(comet.sectionBackgrounds)
        .map(([key, value]) => {
        return ({
            slug: key,
            name: key,
            color: value
        });
    }) : [];
    const componentDefault = comet?.defaults?.[name.replace('comet/', '')] ?? {};
    const values = useMemo(() => ({
        colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
        backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
        sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
    }), [attributes, componentDefault]);
    // Use refs to keep track of the presence of attribute support without the fields disappearing when the colour field is cleared
    const hasColorThemeSupport = useRef(!!values.colorTheme);
    const hasBackgroundColorSupport = useRef(Object.keys(attributes).includes('backgroundColor'));
    const hasSectionBackgroundSupport = useRef(sectionBackgrounds.length > 0 && Object.keys(attributes).includes('sectionBackground'));
    if (!hasColorThemeSupport.current && !hasBackgroundColorSupport.current && !hasSectionBackgroundSupport.current) {
        return null;
    }
    const handleChange = useCallback((newValues) => {
        setAttributes(newValues);
    }, [setAttributes]);
    // Handle only section background being supported (should only occur when the block can have inner blocks and is not nested)
    if ((hasSectionBackgroundSupport.current && !hasColorThemeSupport.current && !hasBackgroundColorSupport.current) && !context?.isNested) {
        return (wp.element.createElement("div", { className: "comet-color-controls__item" },
            wp.element.createElement(SectionBackgroundSelector, { values: values, palette: sectionBackgrounds, handleChange: (newValue) => {
                    handleChange({ sectionBackground: newValue });
                } })));
    }
    // Otherwise, if background colour is not supported, provide single colour theme option only
    if (!hasBackgroundColorSupport.current) {
        return (wp.element.createElement("div", { className: "comet-color-controls__item" },
            wp.element.createElement(ColourThemeSelector, { values: values, palette: singleBackgroundPalette, handleChange: handleChange })));
    }
    // If background colour is supported but colorTheme is not, provide single background colour option only
    if (!hasColorThemeSupport.current && hasBackgroundColorSupport.current) {
        return (wp.element.createElement(BackgroundColourSelector, { attributes: attributes, values: values, palette: singleBackgroundPalette, handleChange: (newValue) => handleChange({ backgroundColor: newValue }), clearable: ['comet/group'].includes(name) }));
    }
    // If both colour theme and background colour are supported, provide the combined selector and preview,
    // along with section background if that is also supported
    return (wp.element.createElement(wp.element.Fragment, null,
        wp.element.createElement(ColorComboPreview, { colorTheme: attributes?.colorTheme, backgroundColor: attributes?.backgroundColor, sectionBackground: attributes?.sectionBackground }),
        wp.element.createElement("div", { className: "comet-color-controls__item" },
            wp.element.createElement(ColorPairPaletteDropdown, { value: {
                    foreground: values.colorTheme,
                    background: values.backgroundColor
                }, blockName: name.split('/')[1], onChange: (newValue) => {
                    handleChange({
                        colorTheme: newValue.foreground,
                        backgroundColor: newValue.background
                    });
                } })),
        (hasSectionBackgroundSupport.current && !context?.isNested) && (wp.element.createElement("div", { className: "comet-color-controls__item" },
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
