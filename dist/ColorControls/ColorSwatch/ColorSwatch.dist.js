function ColorSwatch({ colorTheme, backgroundColor }) {
    const defaultBackground = comet?.globalBackground ?? 'white';
    if (!colorTheme && !backgroundColor) {
        return (wp.element.createElement(ColorSwatchInner, { caption: "No colour selected", backgroundColor: undefined }));
    }
    if (!backgroundColor && colorTheme) {
        return (wp.element.createElement(ColorSwatchInner, { colorTheme: colorTheme, caption: colorTheme, backgroundColor: defaultBackground }));
    }
    if (!colorTheme && backgroundColor) {
        return (wp.element.createElement(ColorSwatchInner, { backgroundColor: backgroundColor, caption: backgroundColor }));
    }
    return (wp.element.createElement(ColorSwatchInner, { caption: `${colorTheme} on ${backgroundColor}`, colorTheme: colorTheme, backgroundColor: backgroundColor }));
}
function ColorSwatchInner({ colorTheme, backgroundColor, caption }) {
    const backgroundIsGradientOrUndefined = backgroundColor?.includes('-') || backgroundColor === undefined;
    return (wp.element.createElement("figure", { className: "comet-color-swatch", "data-testid": "comet-color-swatch", "aria-label": `Colour preview: ${caption}` },
        wp.element.createElement("div", { className: "comet-color-swatch__preview", "data-background": backgroundColor, "data-color-theme": colorTheme }, (!backgroundIsGradientOrUndefined) ? 'The quick brown fox jumps over the lazy dog' : null),
        wp.element.createElement("figcaption", { className: "comet-color-swatch__caption" }, caption)));
}

export { ColorSwatch };
//# sourceMappingURL=ColorSwatch.dist.js.map
