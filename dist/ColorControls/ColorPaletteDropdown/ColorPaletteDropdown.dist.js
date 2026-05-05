import { ColorSwatch } from '../ColorSwatch/ColorSwatch.dist.js';

const { Dropdown, Button, ColorIndicator, ColorPalette, GradientPicker } = wp.components;const { useRef, useCallback, useEffect, useMemo } = wp.element;function ColorPaletteDropdown({ label = 'Colour', value, palette, onChange, clearable = false }) {
    const triggerRef = useRef();
    const handleChange = useCallback((newValue) => {
        // Handle clearable selector
        if (!newValue) {
            onChange('');
            return;
        }
        const name = newValue.replace('var(--color-', '').replace(')', '').replace('var(--gradient-', '');
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
    const singleColours = useMemo(() => {
        return palette.filter(color => !color.slug.includes('-'));
    }, [palette]);
    const gradients = useMemo(() => {
        return palette.filter(color => color.slug.includes('-')).map(item => ({
            name: item.name,
            slug: item.slug,
            gradient: `var(--gradient-${item.slug})`,
        }));
    }, [palette]);
    return (wp.element.createElement("div", { "data-testid": "comet-single-color-selector" },
        wp.element.createElement(Dropdown, { renderToggle: ({ onToggle, isOpen }) => (wp.element.createElement(Button, { onClick: onToggle, "aria-expanded": isOpen, ref: triggerRef, __next40pxDefaultSize: true },
                label,
                value && value.includes('-') ?
                    (wp.element.createElement(ColorIndicator, { colorValue: `var(--gradient-${value})`, "data-testid": "comet-color-indicator", "aria-label": `Selected colours: ${value.replace('-', ' and ')}` })) : (wp.element.createElement(ColorIndicator, { colorValue: value ? `var(--color-${value})` : undefined, "data-testid": "comet-color-indicator", "aria-label": value ? `Selected colour: ${value}` : 'No colour selected' })))), renderContent: ({ onToggle, ...props }) => (wp.element.createElement("div", { className: "comet-color-selector-content" },
                value !== undefined && wp.element.createElement(ColorSwatch, { backgroundColor: value }),
                wp.element.createElement("div", { className: "comet-color-selector-content__pickers" },
                    gradients.length > 0 && (wp.element.createElement(GradientPicker, { clearable: clearable, value: value ? `var(--gradient-${value})` : undefined, gradients: gradients, disableCustomGradients: true, onChange: (value) => {
                            handleChange(value);
                            onToggle(); // close dropdown after selection
                        } })),
                    wp.element.createElement(ColorPalette, { clearable: clearable, value: `var(--color-${value})`, 
                        // @ts-ignore
                        colors: singleColours, disableCustomColors: true, onChange: (newValue) => {
                            handleChange(newValue);
                            onToggle(); // close dropdown after selection
                        } })))) })));
}

export { ColorPaletteDropdown };
//# sourceMappingURL=ColorPaletteDropdown.dist.js.map
