import { ColorPaletteDropdown } from './ColorPaletteDropdown/ColorPaletteDropdown.dist.js';
import { ColorPairPaletteDropdown } from './ColorPairPaletteDropdown/ColorPairPaletteDropdown.dist.js';
import { useValidatedPalette } from '../hooks/use-validated-palette.dist.js';

/* global wp */
const React = React;const { useRef, useMemo, useCallback } = wp.element;const { PanelBody } = wp.components;const ColorControls = (props) => {
    if (!Object.keys(props?.attributes).some(attr => ['colorTheme', 'backgroundColor', 'sectionBackground'].includes(attr))) {
        return null;
    }
    return (React.createElement(PanelBody, { title: "Colours", initialOpen: true, className: `comet-color-controls comet-color-controls--${props?.name?.split('/')[1]}` },
        React.createElement(ColorControlsInner, { ...props })));
};
function ColorControlsInner({ name, attributes, setAttributes }) {
    const palette = useValidatedPalette({ blockName: name });
    if (!palette) {
        return null;
    }
    const componentDefault = comet?.defaults[name.replace('comet/', '')] ?? {};
    const values = useMemo(() => ({
        colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
        backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
        sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
    }), [attributes, componentDefault]);
    // Use refs to keep track of the presence of attribute support without the fields disappearing when the colour field is cleared
    const hasColorThemeSupport = useRef(!!values.colorTheme);
    const hasBackgroundColorSupport = useRef(!!values.backgroundColor);
    const hasSectionBackgroundSupport = useRef(!!values?.sectionBackground);
    if (!hasColorThemeSupport.current && !hasBackgroundColorSupport.current && !hasSectionBackgroundSupport.current) {
        return null;
    }
    const handleChange = useCallback((newValues) => {
        setAttributes(newValues);
    }, [setAttributes]);
    // TODO: This component needs a bunch more work in terms of handling valid combinations of background/section background,
    //  including changing the available values when the selection changes
    // If background colour is not supported, provide single colour theme option only
    // Note: sectionBackground should not be available without backgroundColor being available as well, but that isn't enforced/validated anywhere
    if (!hasBackgroundColorSupport.current) {
        return (React.createElement("div", { className: "comet-color-controls__item" },
            React.createElement(ColorPaletteDropdown, { label: "Theme", value: values.colorTheme, palette: palette, onChange: handleChange })));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "comet-color-controls__item" },
            React.createElement(ColorPairPaletteDropdown, { value: {
                    foreground: values.colorTheme,
                    background: values.backgroundColor
                }, blockName: name.split('/')[1], onChange: (newValue) => {
                    handleChange({
                        colorTheme: newValue.foreground,
                        backgroundColor: newValue.background
                    });
                } })),
        hasSectionBackgroundSupport.current && (React.createElement("div", { className: "comet-color-controls__item" },
            React.createElement(ColorPaletteDropdown, { label: "Section background", value: values.sectionBackground, palette: palette, clearable: true, onChange: (newValue) => {
                    handleChange({ sectionBackground: newValue });
                } })))));
}

export { ColorControls };
//# sourceMappingURL=ColorControls.dist.js.map
