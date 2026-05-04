function ColorSwatch({ colorTheme, backgroundColor }) {
    if (!colorTheme && !backgroundColor) {
        return null;
    }
    if (!backgroundColor) {
        return (wp.element.createElement("figure", { className: "comet-color-swatch", "data-testid": "comet-color-swatch", "aria-label": `Colour preview: ${colorTheme}` },
            wp.element.createElement("div", { className: "comet-color-swatch__preview", "data-background": colorTheme }),
            wp.element.createElement("figcaption", { className: "comet-color-swatch__caption" }, colorTheme)));
    }
    if (!colorTheme) {
        return (wp.element.createElement("figure", { className: "comet-color-swatch", "data-testid": "comet-color-swatch", "aria-label": `Colour preview: ${backgroundColor}` },
            wp.element.createElement("div", { className: "comet-color-swatch__preview", "data-background": backgroundColor }),
            wp.element.createElement("figcaption", { className: "comet-color-swatch__caption" }, backgroundColor)));
    }
    return (wp.element.createElement("figure", { className: "comet-color-swatch", "data-testid": "comet-color-swatch", "aria-label": `Colour preview: ${colorTheme} on ${backgroundColor}` },
        wp.element.createElement("div", { className: "comet-color-swatch__preview", "data-background": backgroundColor, "data-color-theme": colorTheme }, "The quick brown fox jumps over the lazy dog"),
        wp.element.createElement("figcaption", { className: "comet-color-swatch__caption" },
            colorTheme,
            " on ",
            backgroundColor)));
}

export { ColorSwatch };
//# sourceMappingURL=ColorSwatch.dist.js.map
