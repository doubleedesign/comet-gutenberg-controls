import { FieldTooltip } from '../FieldTooltip/FieldTooltip.dist.js';
import { ToggleControl } from '@wordpress/components';

const GalleryControls = ({ name, attributes, setAttributes }) => {
    if (name !== 'comet/gallery') {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ToggleControl, { checked: attributes.lightbox, label: React.createElement(React.Fragment, null,
                React.createElement("span", null, "Enable lightbox"),
                React.createElement(FieldTooltip, { tooltip: 'When a visitor clicks on an image, open a larger version in an overlay' })), onChange: (value) => setAttributes({ lightbox: value }) }),
        React.createElement(ToggleControl, { checked: attributes.captions, label: "Show image captions if available", onChange: (value) => setAttributes({ captions: value }) })));
};

export { GalleryControls };
//# sourceMappingURL=GalleryControls.dist.js.map
