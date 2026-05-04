import { BackgroundOpacity } from './BackgroundOpacity/BackgroundOpacity.dist.js';
import { BackgroundType } from './BackgroundType/BackgroundType.dist.js';

const { PanelBody } = wp.components;function BannerControls(props) {
    if (props.name !== 'comet/banner') {
        return null;
    }
    return (wp.element.createElement(PanelBody, { title: "Banner Options", initialOpen: true },
        wp.element.createElement(BackgroundOpacity, { ...props }),
        wp.element.createElement(BackgroundType, { ...props })));
}

export { BannerControls };
//# sourceMappingURL=BannerControls.dist.js.map
