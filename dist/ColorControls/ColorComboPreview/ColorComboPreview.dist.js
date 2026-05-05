function ColorComboPreview({ colorTheme, backgroundColor, sectionBackground }) {
    return (wp.element.createElement("div", { className: "comet-color-combo-preview", "data-testid": "comet-color-combo-preview", "data-background": sectionBackground || backgroundColor, role: "presentation" },
        wp.element.createElement("div", { className: "comet-color-combo-preview__content", "data-background": sectionBackground ? backgroundColor : undefined, "data-color-theme": colorTheme },
            wp.element.createElement("p", null, "The quick brown fox jumps over the lazy dog"))));
}

export { ColorComboPreview };
//# sourceMappingURL=ColorComboPreview.dist.js.map
