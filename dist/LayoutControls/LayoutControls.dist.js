import { ContainerSize } from '../ContainerSize/ContainerSize.dist.js';
import { GroupLayout } from '../GroupLayout/GroupLayout.dist.js';
import { VerticalAlignment } from '../VerticalAlignment/VerticalAlignment.dist.js';
import { HorizontalAlignment } from '../HorizontalAlignment/HorizontalAlignment.dist.js';
import { LayoutOrientation } from '../LayoutOrientation/LayoutOrientation.dist.js';
import { ContentMaxWidth } from '../ContentMaxWidth/ContentMaxWidth.dist.js';
import { MaxPerRow } from '../MaxPerRow/MaxPerRow.dist.js';
import { ItemCount } from '../ItemCount/ItemCount.dist.js';
import { NegativeMargins } from '../NegativeMargins/NegativeMargins.dist.js';
import { AspectRatio } from '../AspectRatio/AspectRatio.dist.js';
import { GalleryControls } from '../GalleryControls/GalleryControls.dist.js';
import { LayoutOrder } from '../LayoutOrder/LayoutOrder.dist.js';

/* global wp */
const { PanelBody } = wp.components;const LayoutControls = (props) => {
    // If the block does not have any layout attributes, do not render the controls
    const componentDefault = Object.keys(comet?.defaults[props.name.replace('comet/', '')] ?? {}) ?? [];
    const currentAttributes = Object.keys(props.attributes) ?? [];
    if (componentDefault.length === 0 && currentAttributes.length === 0) {
        return null;
    }
    const layoutAttributes = [
        'size',
        'groupLayout',
        'orientation',
        'hAlign',
        'vAlign',
        'backgroundType'
    ];
    const hasLayoutAttributes = [...componentDefault, ...currentAttributes].some((attr) => layoutAttributes.includes(attr));
    if (!hasLayoutAttributes) {
        return null;
    }
    return (React.createElement(PanelBody, { title: "Layout", initialOpen: true },
        React.createElement(ContainerSize, { ...props }),
        React.createElement(AspectRatio, { ...props }),
        React.createElement(ContentMaxWidth, { ...props }),
        React.createElement(NegativeMargins, { ...props }),
        React.createElement(GroupLayout, { ...props }),
        React.createElement(ItemCount, { ...props }),
        React.createElement(MaxPerRow, { ...props }),
        React.createElement(LayoutOrientation, { ...props }),
        React.createElement(LayoutOrder, { ...props }),
        React.createElement(HorizontalAlignment, { ...props }),
        React.createElement(VerticalAlignment, { ...props }),
        React.createElement(GalleryControls, { ...props })));
};

export { LayoutControls };
//# sourceMappingURL=LayoutControls.dist.js.map
