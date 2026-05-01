import { InspectorControls, InspectorAdvancedControls } from '@wordpress/block-editor';
import { LayoutControls } from './LayoutControls/LayoutControls.dist.js';
import { PanelBody } from '@wordpress/components';
import { ColorControls } from './ColorControls/ColorControls.dist.js';
import { BackgroundOpacity } from './BackgroundOpacity/BackgroundOpacity.dist.js';
import { BackgroundType } from './BackgroundType/BackgroundType.dist.js';
import { HtmlTag } from './HtmlTag/HtmlTag.dist.js';

/**
 * Render BlockEdit component with controls for custom attributes
 * @param BlockEdit The original BlockEdit component
 * @param {Object} props The block edit props
 */
function CometBlockControls({ BlockEdit, ...props }) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "comet-plugin-blocks-custom-controls" },
            React.createElement(InspectorControls, null,
                React.createElement(LayoutControls, { ...props }),
                Object.keys(props?.attributes).some(attr => ['colorTheme', 'backgroundColor', 'backgroundOpacity', 'backgroundType'].includes(attr)) && (React.createElement(PanelBody, { title: "Colours", initialOpen: true, className: `comet-color-controls comet-color-controls--${props.name.split('/')[1]}` },
                    React.createElement(ColorControls, { ...props }),
                    React.createElement(BackgroundOpacity, { ...props }),
                    React.createElement(BackgroundType, { ...props })))),
            React.createElement(InspectorAdvancedControls, null,
                React.createElement(HtmlTag, { ...props }))),
        React.createElement(BlockEdit, { ...props })));
}

export { CometBlockControls };
//# sourceMappingURL=CometBlockControls.dist.js.map
