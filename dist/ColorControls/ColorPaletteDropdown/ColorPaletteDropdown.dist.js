import { ColorPalettePicker } from '../ColorPalettePicker/ColorPalettePicker.dist.js';
import { useSingleColourContext } from '../../controllers/ColourContextProvider.dist.js';
import { PopupMenu } from '../../PopupMenu/PopupMenu.dist.js';

const { ColorIndicator } = wp.components;const { useEffect, useMemo } = wp.element;function ContextualColorPaletteDropdown({ colorContextKey, ...props }) {
    const { value, onChange } = useSingleColourContext(colorContextKey ?? 'colorTheme');
    return (wp.element.createElement(ColorPaletteDropdown, { ...props, value: value, onChange: onChange, previewType: colorContextKey === 'colorTheme' ? 'content' : 'background' }));
}
function ColorPaletteDropdown({ value, label, palette, onChange, clearable = false, previewType = 'background' }) {
    useEffect(() => {
        if (!palette)
            return;
        if (!value)
            return; // allows clearing the value
        function validateValue(value) {
            return palette.find((color) => color.slug === value) !== undefined;
        }
        // If the current value is not valid, default to the first palette option
        if (!validateValue(value) && palette?.[0]?.slug) {
            onChange(palette[0].slug);
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
    return (wp.element.createElement(PopupMenu, { className: "comet-color-controls__item", "data-testid": "comet-single-color-selector" },
        wp.element.createElement(PopupMenu.Trigger, { ariaLabel: label },
            label,
            value && value.includes('-') ?
                (wp.element.createElement(ColorIndicator, { colorValue: `var(--gradient-${value})`, "data-testid": "comet-color-indicator", "aria-label": `Selected colours: ${value.replace('-', ' and ')}` })) : (wp.element.createElement(ColorIndicator, { colorValue: value ? `var(--color-${value})` : undefined, "data-testid": "comet-color-indicator", "aria-label": value ? `Selected colour: ${value}` : 'No colour selected' }))),
        wp.element.createElement(PopupMenu.Content, null, ({ onToggle }) => (wp.element.createElement(ColorPalettePicker, { clearable: clearable, value: value, colors: singleColours, gradients: gradients, previewType: previewType, onChange: (newValue) => {
                onChange(newValue);
                onToggle(); // close dropdown after selection
            } })))));
}

export { ColorPaletteDropdown, ContextualColorPaletteDropdown };
//# sourceMappingURL=ColorPaletteDropdown.dist.js.map
