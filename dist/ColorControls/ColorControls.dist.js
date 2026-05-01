import { Dropdown, ColorPalette, Button, ColorIndicator, GradientPicker } from '@wordpress/components';
import { useRef, useState, useMemo } from '@wordpress/element';

/* global wp */
const ColorControls = ({ name, attributes, setAttributes }) => {
    if (!Object.keys(attributes).some(attr => ['colorTheme', 'backgroundColor', 'sectionBackground'].includes(attr))) {
        return null;
    }
    let palette = Object.entries(comet?.palette)
        ?.filter(([key, value]) => !['black', 'white'].includes(key))
        ?.map(([key, value]) => ({ slug: key, name: key, color: value }))
        ?? wp.data.select('core/block-editor').getSettings().colors;
    // Most blocks shouldn't have access to the status/message type colours, only brand colours, whereas others are the opposite
    if (['comet/callout'].includes(name)) {
        palette = palette.filter(color => ['error', 'success', 'info', 'warning'].includes(color.slug));
    }
    else if (['comet/separator'].includes(name)) {
        palette = palette.filter(color => !['error', 'success', 'info', 'warning', 'light'].includes(color.slug));
    }
    else if (['comet/copy', 'comet/copy-image'].includes(name)) {
        palette = palette.filter(color => !['error', 'success', 'info', 'warning', 'light', 'accent'].includes(color.slug));
    }
    else {
        palette = palette.filter(color => !['error', 'success', 'info', 'warning'].includes(color.slug));
    }
    if (!palette || palette.length === 0) {
        // eslint-disable-next-line max-len
        console.error('No colour palette found in component library configuration. You can use theme.json or the comet_canvas_theme_colours filter to add colours. Developers: See set_colours() in ThemeStyle.php in the plugin source for more implementation details.');
        return null;
    }
    const componentDefault = comet?.defaults[name.replace('comet/', '')] ?? {};
    const startValues = {
        colorTheme: attributes?.colorTheme ?? componentDefault?.colorTheme ?? null,
        backgroundColor: attributes?.backgroundColor ?? componentDefault?.backgroundColor ?? null,
        sectionBackground: attributes?.sectionBackground ?? componentDefault?.sectionBackground ?? null,
    };
    // Use refs to keep track of the presence of attribute support without the fields disappearing when the colour field is cleared
    const hasColorThemeSupport = useRef(!!startValues.colorTheme);
    const hasBackgroundColorSupport = useRef(!!startValues.backgroundColor);
    const hasSectionBackgroundSupport = useRef(!!startValues?.sectionBackground);
    if (!hasColorThemeSupport.current && !hasBackgroundColorSupport.current && !hasSectionBackgroundSupport.current) {
        return null;
    }
    const [foregroundColor, setForegroundColor] = useState(startValues.colorTheme);
    const [backgroundColors, setBackgroundColors] = useState((startValues.sectionBackground && startValues.sectionBackground !== 'inherit')
        ? [startValues.sectionBackground, startValues.backgroundColor]
        : [startValues.backgroundColor]);
    const getValueByColorName = (colorName) => {
        const color = palette.find((c) => c.slug === colorName);
        return color ? color.color : colorName;
    };
    const handleThemeChange = (name) => {
        setForegroundColor(name);
        setAttributes({ colorTheme: name ?? '' });
    };
    const handleBackgroundChange = (value) => {
        setBackgroundColors(value);
        setAttributes({ backgroundColors: value ?? [] });
    };
    // If background colour is not supported, provide single colour theme option
    // Note: sectionBackground should not be available without backgroundColor being available as well, but that isn't enforced/validated anywhere
    if (!hasBackgroundColorSupport.current) {
        return (React.createElement("div", { className: "comet-color-controls__item" },
            React.createElement(ColorPaletteDropdown, { label: "Theme", hexValue: getValueByColorName(attributes?.colorTheme) ?? '', palette: palette, onChange: handleThemeChange })));
    }
    // If section background is supported
    if (hasSectionBackgroundSupport.current) {
        return (React.createElement(ColorTripletSelector, { value: {
                foreground: foregroundColor,
                backgrounds: backgroundColors
            }, blockName: name.split('/')[1], onChange: (newValues) => {
                handleThemeChange(newValues.foreground);
                handleBackgroundChange(newValues.backgrounds);
            } }));
    }
    // If both colour theme and background colour are available but not section background, provide colour pair selection
    return (React.createElement("div", { className: "comet-color-controls__item" },
        React.createElement(ColorPairPaletteDropdown, { value: {
                foreground: foregroundColor,
                background: backgroundColors[0],
            }, blockName: name.split('/')[1], onChange: (newValue) => {
                handleThemeChange(newValue.foreground);
                handleBackgroundChange(newValue.background);
            } })));
};
function ColorPaletteDropdown({ label, hexValue, palette, onChange }) {
    const [hex, setHex] = useState(hexValue);
    const triggerRef = useRef();
    const getNameByColorValue = (colorValue) => {
        const color = palette.find((c) => c.color === colorValue);
        return color ? color.slug : colorValue;
    };
    return (React.createElement(Dropdown, { renderToggle: ({ onToggle, isOpen }) => (React.createElement(Button, { onClick: onToggle, "aria-expanded": isOpen, ref: triggerRef, __next40pxDefaultSize: true },
            React.createElement(ColorIndicator, { colorValue: hex }),
            label)), renderContent: ({ onToggle }) => (React.createElement(ColorPalette, { label: label, value: hex, colors: palette, onChange: (color) => {
                setHex(color ?? '');
                onChange(getNameByColorValue(color));
                onToggle(); // close dropdown after selection
            } })) }));
}
function ColorPairPaletteDropdown({ blockName, label = 'Theme', value, onChange }) {
    const [foreground, setForeground] = useState(value?.foreground ?? '');
    const [background, setBackground] = useState(value?.background !== 'transparent' ? value?.background : (comet?.globalBackground ?? 'white'));
    const triggerRef = useRef();
    const pairs = comet?.colourPairOverrides[blockName] ?? comet?.colourPairs ?? [];
    const palette = pairs.map((pair) => ({
        name: `${pair.foreground} on ${pair.background}`,
        slug: `${pair.foreground}-${pair.background}`,
        gradient: `linear-gradient(135deg, var(--color-${pair.foreground}) 0%, var(--color-${pair.foreground}) 50%, var(--color-${pair.background}) 50%, var(--color-${pair.background}) 100%)`,
    }));
    const gradientPreview = useMemo(() => {
        return `linear-gradient(135deg, var(--color-${foreground}) 0%, var(--color-${foreground}) 50%, var(--color-${background}) 50%, var(--color-${background}) 100%)`;
    }, [foreground, background]);
    const handleChange = (newValue) => {
        // New value is the gradient string; find the matching palette object
        const matchedPair = palette.find((pair) => pair.gradient === newValue);
        if (matchedPair) {
            const [newForeground, newBackground] = matchedPair.slug.split('-');
            setForeground(newForeground);
            setBackground(newBackground);
            onChange({
                foreground: newForeground,
                background: newBackground,
            });
        }
    };
    return (React.createElement(Dropdown, { renderToggle: ({ onToggle, isOpen }) => (React.createElement(Button, { onClick: onToggle, "aria-expanded": isOpen, ref: triggerRef, __next40pxDefaultSize: true },
            React.createElement(ColorIndicator, { colorValue: gradientPreview }),
            label)), renderContent: ({ isOpen, onToggle }) => (React.createElement(GradientPicker, { label: label, value: gradientPreview, gradients: palette, disableCustomGradients: true, className: `comet-color-controls comet-color-controls--${blockName}`, onChange: (value) => {
                handleChange(value);
                onToggle(); // close dropdown after selection
            } })) }));
}
function ColorTripletSelector({ blockName, value, onChange }) {
    const triggerRef = useRef();
    const sectionBackground = value.backgrounds[0] !== 'transparent' ? value.backgrounds[0] : '';
    const sectionPalette = Object.keys(comet?.sectionBackgrounds ?? []).map((option) => ({
        name: option,
        slug: option,
        gradient: option
    }));
    sectionPalette.unshift({ name: 'From theme', slug: '', gradient: '' });
    sectionPalette.unshift({ name: 'Transparent', slug: '', gradient: '' });
    const handleChange = (values) => {
        onChange(values);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "comet-color-controls__item" },
            React.createElement(ColorPairPaletteDropdown, { blockName: blockName, value: value, onChange: ({ foreground, background }) => {
                    handleChange({ foreground, backgrounds: [sectionBackground, background] });
                } })),
        React.createElement("div", { className: "comet-color-controls__item" },
            React.createElement(Dropdown, { renderToggle: ({ onToggle, isOpen }) => (React.createElement(Button, { onClick: onToggle, "aria-expanded": isOpen, ref: triggerRef, __next40pxDefaultSize: true },
                    React.createElement(ColorIndicator, { colorValue: "" }),
                    "Section background")), renderContent: ({ isOpen, onToggle }) => (React.createElement(GradientPicker, { label: "Section background", value: sectionBackground, gradients: sectionPalette, disableCustomGradients: true, className: `comet-color-controls comet-color-controls--${blockName}`, onChange: (value) => {
                        handleChange({ backgrounds: [value] });
                        onToggle(); // close dropdown after selection
                    }, clearable: true })) }))));
}

export { ColorControls };
//# sourceMappingURL=ColorControls.dist.js.map
