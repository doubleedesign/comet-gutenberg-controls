import { BackgroundOpacity } from './BackgroundOpacity/BackgroundOpacity.dist.js';
import { BackgroundType } from './BackgroundType/BackgroundType.dist.js';

const React = React;const { PanelBody } = wp.components;function BannerControls(props) {
    if (props.name !== 'comet/banner') {
        return null;
    }
    return (React.createElement(PanelBody, { title: "Banner Options", initialOpen: true },
        React.createElement(BackgroundOpacity, { ...props }),
        React.createElement(BackgroundType, { ...props })));
}

export { BannerControls };
//# sourceMappingURL=BannerControls.dist.js.map
