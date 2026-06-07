import { ColourTypeLabel } from '../constants.dist.js';
import { useColourContext } from '../../controllers/ColourContextProvider.dist.js';
import { ColorPalettePicker } from '../ColorPalettePicker/ColorPalettePicker.dist.js';
import { transformColorPairsToPalette } from '../../utils.dist.js';
import { PopupMenu } from '../../PopupMenu/PopupMenu.dist.js';

const { useMemo, useState, useEffect, useCallback } = wp.element;const { ColorIndicator } = wp.components;function ContextualColorPairDropdown({ blockName, ...props }) {
    const { values, onChange } = useColourContext();
    const pairs = comet?.colourPairOverrides?.[blockName] ?? comet?.colourPairs ?? [];
    const palette = transformColorPairsToPalette(pairs);
    // Neither the foreground/colorTheme nor backgroundColor should be undefined,
    // unlike other ColorState controls, hence sticking with the ColorPair type here.
    const mappedValues = useMemo(() => ({
        foreground: values.colorTheme,
        background: values?.backgroundColor,
    }), [values.colorTheme, values.backgroundColor]);
    const handleChange = useCallback((newValues) => {
        onChange({
            colorTheme: newValues.foreground,
            backgroundColor: newValues.background,
        });
    }, []);
    return wp.element.createElement(ColorPairPaletteDropdown, { ...props, value: mappedValues, palette: palette, onChange: handleChange });
}
function ColorPairPaletteDropdown({ label = ColourTypeLabel.PAIR, value, palette, onChange }) {
    const [foreground, setForeground] = useState(value?.foreground ?? '');
    const [background, setBackground] = useState(value?.background ?? (comet?.globalBackground ?? 'white'));
    const doChange = useCallback((newForeground, newBackground) => {
        setForeground(newForeground);
        setBackground(newBackground);
        onChange({
            foreground: newForeground,
            background: newBackground,
        });
    }, [onChange]);
    useEffect(() => {
        if (!palette)
            return;
        if (Object.values(value).every(val => val === undefined))
            return;
        function validatePair(value) {
            return palette.find((pair) => pair.slug === `${value.foreground}-${value.background}`);
        }
        if (!validatePair(value) && palette.length > 0) {
            // If the current value is not valid, default to the first palette option
            const defaultForeground = palette[0].slug.split('-')[0];
            const defaultBackground = palette[0].slug.split('-')[1];
            doChange(defaultForeground, defaultBackground);
        }
    }, [value, palette]);
    const handleChange = (newValue) => {
        // New value is the gradient string; find the matching palette object
        const matchedPair = palette.find((pair) => pair.slug === newValue);
        if (matchedPair) {
            const [newForeground, newBackground] = matchedPair.slug.split('-');
            doChange(newForeground, newBackground);
        }
    };
    const previewIndicator = useMemo(() => {
        // eslint-disable-next-line max-len
        return `linear-gradient(135deg, var(--color-${foreground}) 0%, var(--color-${foreground}) 50%, var(--color-${background}) 50%, var(--color-${background}) 100%)`;
    }, [foreground, background]);
    return (wp.element.createElement(PopupMenu, { className: "comet-color-controls__item", "data-testid": "comet-color-pair-selector" },
        wp.element.createElement(PopupMenu.Trigger, { ariaLabel: label },
            label,
            wp.element.createElement(ColorIndicator, { colorValue: previewIndicator, "data-testid": "comet-color-pair-indicator", "aria-label": `Selected colours: ${foreground} on ${background}` })),
        wp.element.createElement(PopupMenu.Content, null, ({ onToggle }) => (wp.element.createElement(ColorPalettePicker, { value: `${foreground}-${background}`, gradients: palette, previewType: "content", onChange: (newValue) => {
                handleChange(newValue);
                onToggle(); // close dropdown after selection
            } })))));
}

export { ColorPairPaletteDropdown, ContextualColorPairDropdown };
//# sourceMappingURL=ColorPairPaletteDropdown.dist.js.map
