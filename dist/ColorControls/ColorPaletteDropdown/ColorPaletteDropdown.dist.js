import { ColorSwatch } from '../../ColorSwatch/ColorSwatch.dist.js';

const { Dropdown, Button, ColorIndicator, ColorPalette } = wp.components;const { useRef, useCallback, useEffect } = wp.element;function ColorPaletteDropdown({ label = 'Colour', value, palette, onChange, clearable = false }) {
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
    return (wp.element.createElement("div", { "data-testid": "comet-single-color-selector" },
        wp.element.createElement(Dropdown, { renderToggle: ({ onToggle, isOpen }) => (wp.element.createElement(Button, { onClick: onToggle, "aria-expanded": isOpen, ref: triggerRef, __next40pxDefaultSize: true },
                wp.element.createElement(ColorIndicator, { colorValue: value ? `var(--color-${value})` : undefined, "data-testid": "comet-color-indicator", "aria-label": value ? `Selected colour: ${value}` : 'No colour selected' }),
                label)), renderContent: ({ onToggle, ...props }) => (wp.element.createElement(wp.element.Fragment, null,
                value !== undefined && wp.element.createElement(ColorSwatch, { backgroundColor: value }),
                wp.element.createElement(ColorPalette, { clearable: clearable, value: `var(--color-${value})`, colors: palette, disableCustomColors: true, onChange: (newValue) => {
                        handleChange(newValue);
                        onToggle(); // close dropdown after selection
                    } }))) })));
}

export { ColorPaletteDropdown };
//# sourceMappingURL=ColorPaletteDropdown.dist.js.map
