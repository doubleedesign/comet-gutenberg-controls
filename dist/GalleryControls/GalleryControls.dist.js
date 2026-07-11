import { FieldTooltip } from '../FieldTooltip/FieldTooltip.dist.js';

const { __experimentalToggleGroupControl, __experimentalToggleGroupControlOption, PanelBody, ToggleControl } = wp.components;const { useState } = wp.element;const GalleryControls = ({ name, attributes, setAttributes }) => {
    if (name !== 'comet/gallery') {
        return null;
    }
    const [clickBehaviour, setClickBehaviour] = useState('none');
    const ToggleGroupControl = __experimentalToggleGroupControl;
    const ToggleGroupControlOption = __experimentalToggleGroupControlOption;
    return (wp.element.createElement(PanelBody, { title: "Gallery options", initialOpen: true },
        wp.element.createElement(ToggleGroupControl, { className: "comet-toggle-group", __next40pxDefaultSize: true, isBlock: true, label: "Click behaviour", onChange: (value) => {
                setClickBehaviour(value ?? 'none');
                switch (value) {
                    case 'lightbox':
                        setAttributes({ lightbox: true, externalLinks: false });
                        break;
                    case 'links':
                        setAttributes({ lightbox: false, externalLinks: true });
                        break;
                    default:
                        setAttributes({ lightbox: false, externalLinks: false });
                }
            }, value: clickBehaviour },
            wp.element.createElement(ToggleGroupControlOption, { label: "None", value: "none" }),
            wp.element.createElement(ToggleGroupControlOption, { label: "Lightbox", value: "lightbox", showTooltip: true, "aria-label": 'When a visitor clicks on an image, open a larger version in an overlay' }),
            wp.element.createElement(ToggleGroupControlOption, { label: "Links", value: "links", showTooltip: true, "aria-label": 'When a visitor clicks on an image that has an external URL set, open that URL in a new tab' })),
        wp.element.createElement(ToggleControl, { checked: attributes.captions, label: "Show image captions if available", onChange: (value) => setAttributes({ captions: value }) }),
        wp.element.createElement(ToggleControl, { checked: attributes.imageCrop, label: wp.element.createElement(wp.element.Fragment, null,
                wp.element.createElement("span", null, "Crop images"),
                wp.element.createElement(FieldTooltip, { tooltip: 'If enabled, images will scale and be centered in the available space; if disabled they will be cropped to fill the space. This setting does not affect the image when open in the lightbox.' })), onChange: (value) => setAttributes({ imageCrop: value }) })));
};

export { GalleryControls };
//# sourceMappingURL=GalleryControls.dist.js.map
