import { FieldTooltip } from '../FieldTooltip/FieldTooltip.dist.js';

const { PanelBody, ToggleControl } = wp.components;const GalleryControls = ({ name, attributes, setAttributes }) => {
    if (name !== 'comet/gallery') {
        return null;
    }
    return (wp.element.createElement(PanelBody, { title: "Gallery options", initialOpen: true },
        wp.element.createElement(ToggleControl, { checked: attributes.lightbox, label: wp.element.createElement(wp.element.Fragment, null,
                wp.element.createElement("span", null, "Enable lightbox"),
                wp.element.createElement(FieldTooltip, { tooltip: 'When a visitor clicks on an image, open a larger version in an overlay' })), onChange: (value) => setAttributes({ lightbox: value }) }),
        wp.element.createElement(ToggleControl, { checked: attributes.captions, label: "Show image captions if available", onChange: (value) => setAttributes({ captions: value }) })));
};

export { GalleryControls };
//# sourceMappingURL=GalleryControls.dist.js.map
