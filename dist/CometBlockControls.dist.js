import { LayoutControls } from './LayoutControls/LayoutControls.dist.js';
import { ColorControls } from './ColorControls/ColorControls.dist.js';
import { HtmlTag } from './HtmlTag/HtmlTag.dist.js';
import { GalleryControls } from './GalleryControls/GalleryControls.dist.js';
import { BannerControls } from './BannerControls/BannerControls.dist.js';

const React = React;const { InspectorAdvancedControls, InspectorControls } = wp.blockEditor;/**
 * Render the WordPress BlockEdit component with controls for custom attributes
 */
function CometBlockControls({ BlockEdit, ...props }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "comet-plugin-blocks-custom-controls" },
            React.createElement(InspectorControls, null,
                React.createElement(LayoutControls, { ...props }),
                React.createElement(ColorControls, { ...props }),
                React.createElement(BannerControls, { ...props }),
                React.createElement(GalleryControls, { ...props })),
            React.createElement(InspectorAdvancedControls, null,
                React.createElement(HtmlTag, { ...props }))),
        React.createElement(BlockEdit, { ...props })));
}

export { CometBlockControls };
//# sourceMappingURL=CometBlockControls.dist.js.map
