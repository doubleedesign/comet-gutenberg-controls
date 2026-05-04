import { ColorSwatch } from '../../ColorSwatch/ColorSwatch.dist.js';

const React = React;const { Dropdown, Button, ColorIndicator, ColorPalette } = wp.components;const { useRef, useCallback, useEffect } = wp.element;function ColorPaletteDropdown({ label = 'Colour', value, palette, onChange, clearable = false }) {
    const triggerRef = useRef();
    const handleChange = useCallback((newValue) => {
        // Handle clearable selector
        if (!newValue) {
            onChange('');
            return;
        }
        const name = newValue.replace('var(--color-', '').replace(')', '');
        onChange(name);
    }, [onChange]);
    useEffect(() => {
        if (!palette)
            return;
        if (!value)
            return; // allows clearing the value
        function validateValue(value) {
            return palette.find((color) => color.slug === value) !== undefined;
        }
        if (!validateValue(value)) {
            // If the current value is not valid, default to the first palette option
            const defaultColor = palette[0]?.slug ?? '';
            onChange(defaultColor);
        }
    }, [value, palette]);
    return (React.createElement("div", { "data-testid": "comet-single-color-selector" },
        React.createElement(Dropdown, { renderToggle: ({ onToggle, isOpen }) => (React.createElement(Button, { onClick: onToggle, "aria-expanded": isOpen, ref: triggerRef, __next40pxDefaultSize: true },
                React.createElement(ColorIndicator, { colorValue: value ? `var(--color-${value})` : undefined, "data-testid": "comet-color-indicator", "aria-label": value ? `Selected colour: ${value}` : 'No colour selected' }),
                label)), renderContent: ({ onToggle, ...props }) => (React.createElement(React.Fragment, null,
                value !== undefined && React.createElement(ColorSwatch, { backgroundColor: value }),
                React.createElement(ColorPalette, { clearable: clearable, value: `var(--color-${value})`, colors: palette, disableCustomColors: true, onChange: (newValue) => {
                        handleChange(newValue);
                        onToggle(); // close dropdown after selection
                    } }))) })));
}

export { ColorPaletteDropdown };
//# sourceMappingURL=ColorPaletteDropdown.dist.js.map
