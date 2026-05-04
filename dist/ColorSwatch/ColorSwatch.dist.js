const React = React;function ColorSwatch({ colorTheme, backgroundColor }) {
    if (!colorTheme && !backgroundColor) {
        return null;
    }
    if (!backgroundColor) {
        return (React.createElement("figure", { className: "comet-color-swatch", "data-testid": "comet-color-swatch", "aria-label": `Colour preview: ${colorTheme}` },
            React.createElement("div", { className: "comet-color-swatch__preview", "data-background": colorTheme }),
            React.createElement("figcaption", { className: "comet-color-swatch__caption" }, colorTheme)));
    }
    if (!colorTheme) {
        return (React.createElement("figure", { className: "comet-color-swatch", "data-testid": "comet-color-swatch", "aria-label": `Colour preview: ${backgroundColor}` },
            React.createElement("div", { className: "comet-color-swatch__preview", "data-background": backgroundColor }),
            React.createElement("figcaption", { className: "comet-color-swatch__caption" }, backgroundColor)));
    }
    return (React.createElement("figure", { className: "comet-color-swatch", "data-testid": "comet-color-swatch", "aria-label": `Colour preview: ${colorTheme} on ${backgroundColor}` },
        React.createElement("div", { className: "comet-color-swatch__preview", "data-background": backgroundColor, "data-color-theme": colorTheme }, "The quick brown fox jumps over the lazy dog"),
        React.createElement("figcaption", { className: "comet-color-swatch__caption" },
            colorTheme,
            " on ",
            backgroundColor)));
}

export { ColorSwatch };
//# sourceMappingURL=ColorSwatch.dist.js.map
