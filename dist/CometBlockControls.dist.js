import { LayoutControls } from './LayoutControls/LayoutControls.dist.js';
import { ColorControls } from './ColorControls/ColorControls.dist.js';
import { HtmlTag } from './HtmlTag/HtmlTag.dist.js';
import { GalleryControls } from './GalleryControls/GalleryControls.dist.js';
import { BannerControls } from './BannerControls/BannerControls.dist.js';
import { ColumnLayoutControls } from './ColumnLayoutControls/ColumnLayoutControls.dist.js';

const { InspectorAdvancedControls, InspectorControls } = wp.blockEditor;/**
 * Render the WordPress BlockEdit component with controls for custom attributes
 */
function CometBlockControls({ BlockEdit, ...props }) {
    return (wp.element.createElement(wp.element.Fragment, null,
        wp.element.createElement("div", { className: "comet-plugin-blocks-custom-controls" },
            wp.element.createElement(InspectorControls, null,
                wp.element.createElement(LayoutControls, { ...props }),
                wp.element.createElement(ColumnLayoutControls, { ...props }),
                wp.element.createElement(ColorControls, { ...props }),
                wp.element.createElement(BannerControls, { ...props }),
                wp.element.createElement(GalleryControls, { ...props })),
            wp.element.createElement(InspectorAdvancedControls, null,
                wp.element.createElement(HtmlTag, { ...props }))),
        wp.element.createElement(BlockEdit, { ...props })));
}

export { CometBlockControls };
//# sourceMappingURL=CometBlockControls.dist.js.map
