import { ColorSwatch } from '../ColorSwatch/ColorSwatch.dist.js';
import { COLOUR_PAIR_LABEL } from '../constants.dist.js';

const { useMemo, useRef, useState, useEffect } = wp.element;const { Dropdown, Button, ColorIndicator, GradientPicker } = wp.components;function ColorPairPaletteDropdown({ blockName, label = COLOUR_PAIR_LABEL, value, onChange }) {
    const [foreground, setForeground] = useState(value?.foreground ?? '');
    const [background, setBackground] = useState(value?.background !== 'transparent' ? value?.background : (comet?.globalBackground ?? 'white'));
    const triggerRef = useRef();
    const pairs = comet?.colourPairOverrides?.[blockName] ?? comet?.colourPairs ?? [];
    const palette = pairs.map((pair) => ({
        name: `${pair.foreground} on ${pair.background}`,
        slug: `${pair.foreground}-${pair.background}`,
        // eslint-disable-next-line max-len
        gradient: `linear-gradient(135deg, var(--color-${pair.foreground}) 0%, var(--color-${pair.foreground}) 50%, var(--color-${pair.background}) 50%, var(--color-${pair.background}) 100%)`,
    }));
    useEffect(() => {
        if (!palette)
            return;
        function validatePair(value) {
            return palette.find((pair) => pair.slug === `${value.foreground}-${value.background}`) !== undefined;
        }
        if (!validatePair(value)) {
            // If the current value is not valid, default to the first palette option
            setForeground(palette[0]?.slug.split('-')[0] ?? '');
            setBackground(palette[0]?.slug.split('-')[1] ?? '');
            onChange({
                foreground: palette[0]?.slug.split('-')[0] ?? '',
                background: palette[0]?.slug.split('-')[1] ?? '',
            });
        }
    }, [value, palette]);
    const gradientPreview = useMemo(() => {
        // eslint-disable-next-line max-len
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
    return (wp.element.createElement("div", { "data-testid": "comet-color-pair-selector" },
        wp.element.createElement(Dropdown, { renderToggle: ({ onToggle, isOpen }) => (wp.element.createElement(Button, { onClick: onToggle, "aria-expanded": isOpen, ref: triggerRef, __next40pxDefaultSize: true, "aria-label": label },
                label,
                wp.element.createElement(ColorIndicator, { colorValue: gradientPreview, "data-testid": "comet-color-pair-indicator", "aria-label": `Selected colours: ${foreground} on ${background}` }))), renderContent: ({ isOpen, onToggle }) => (wp.element.createElement("div", { className: "comet-color-selector-content" },
                wp.element.createElement(ColorSwatch, { colorTheme: foreground, backgroundColor: background }),
                wp.element.createElement("div", { className: "comet-color-selector-content__pickers" },
                    wp.element.createElement(GradientPicker, { value: gradientPreview, gradients: palette, disableCustomGradients: true, className: `comet-color-controls comet-color-controls--${blockName}`, onChange: (value) => {
                            handleChange(value);
                            onToggle(); // close dropdown after selection
                        } })))) })));
}

export { ColorPairPaletteDropdown };
//# sourceMappingURL=ColorPairPaletteDropdown.dist.js.map
