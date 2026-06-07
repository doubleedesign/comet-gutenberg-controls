import { ColorSwatch } from '../ColorSwatch/ColorSwatch.dist.js';
import { transformColorValueToKey, transformValueKeyToPair, transformColorKeyToValue } from '../../utils.dist.js';
import { useHoverAndFocus } from '../../hooks/use-hover-and-focus.dist.js';
import difference from 'lodash/difference';

const { useState, useMemo, useCallback, useRef, useEffect } = wp.element;const { ColorPalette } = wp.components;function ColorPalettePicker({ previewType, value, onChange, ...props }) {
    const elementRef = useRef(null);
    const [activeValue, setActiveValue] = useState(value);
    const [mounted, setMounted] = useState(false);
    // Trigger a re-render when the ref has mounted so the useHoverAndFocus hook gets the resolved element, not null
    useEffect(() => {
        if (elementRef?.current) {
            setMounted(true);
        }
    }, [elementRef]);
    // Because the individual colour palette swatches are buried deep in the imported components,
    // which don't have callback props for the events we want to use,
    // this is a somewhat hacky way of finding them to temporarily swap our preview swatch on hover/focus.
    useHoverAndFocus({
        element: elementRef?.current,
        onEnterButton: (slug) => setActiveValue(slug),
        onLeaveButton: () => setActiveValue(value),
    });
    // Handle an actual selection change (click/Enter)
    const handleChange = useCallback((newValue) => {
        const valueKey = transformColorValueToKey(newValue);
        setActiveValue(valueKey);
        onChange(valueKey);
    }, []);
    const gradientAsColorPair = transformValueKeyToPair(activeValue);
    const swatchValues = useMemo(() => {
        if (previewType === 'content') {
            return gradientAsColorPair ? {
                colorTheme: gradientAsColorPair.foreground,
                backgroundColor: gradientAsColorPair.background,
            } : {
                colorTheme: activeValue,
                backgroundColor: undefined,
            };
        }
        return {
            colorTheme: undefined,
            backgroundColor: activeValue,
        };
    }, [activeValue, previewType, gradientAsColorPair]);
    return (wp.element.createElement("div", { ref: elementRef, className: "comet-color-palette" },
        wp.element.createElement(ColorSwatch, { ...swatchValues }),
        wp.element.createElement(ColorPalettePickerInner, { ...props, value: value, onChange: handleChange })));
}
function ColorPalettePickerInner({ colors = [], gradients = [], value, onChange, ...props }) {
    const statusColors = useMemo(() => colors.filter(color => ['success', 'info', 'warning', 'error'].includes(color.slug)), [colors]);
    const brandColors = useMemo(() => difference(colors, statusColors), [colors, statusColors]);
    // Because we are working with a limited palette and CSS variables instead of raw colour values,
    // with some CSS adjustments we don't actually need to use the gradient-specific palette component
    // - we can treat them all as colours
    const combinedBrandPalette = useMemo(() => {
        return [...brandColors, ...gradients].reduce((acc, item) => {
            if ('color' in item) {
                acc.push(item);
                return acc;
            }
            if (['success', 'info', 'warning', 'error'].some(status => item.slug.includes(status))) {
                return acc;
            }
            acc.push({
                name: item.name,
                slug: item.slug,
                color: item.gradient,
            });
            return acc;
        }, []);
    }, [colors, gradients]);
    const combinedStatusPalette = useMemo(() => {
        return [...statusColors, ...gradients].reduce((acc, item) => {
            if ('color' in item) {
                acc.push(item);
                return acc;
            }
            if (!['success', 'info', 'warning', 'error'].some(status => item.slug.includes(status))) {
                return acc;
            }
            acc.push({
                name: item.name,
                slug: item.slug,
                color: item.gradient,
            });
            return acc;
        }, []);
    }, [colors, gradients]);
    const multiPalette = useMemo(() => {
        return [
            { name: 'Brand colours', slug: 'brand', colors: combinedBrandPalette },
            { name: 'Status colours', slug: 'status', colors: combinedStatusPalette },
        ];
    }, [brandColors, statusColors]);
    return (wp.element.createElement(ColorPalette, { ...props, className: "comet-color-palette__picker", asButtons: true, headingLevel: "3", colors: statusColors.length > 0 ? multiPalette : combinedBrandPalette, disableCustomColors: true, value: transformColorKeyToValue(value), onChange: (newValue, index, slug) => {
            onChange(slug);
        } }));
}

export { ColorPalettePicker };
//# sourceMappingURL=ColorPalettePicker.dist.js.map
