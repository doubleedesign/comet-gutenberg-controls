import { ContainerSize } from './ContainerSize/ContainerSize.dist.js';
import { GroupLayout } from './GroupLayout/GroupLayout.dist.js';
import { VerticalAlignment } from './VerticalAlignment/VerticalAlignment.dist.js';
import { HorizontalAlignment } from './HorizontalAlignment/HorizontalAlignment.dist.js';
import { LayoutOrientation } from './LayoutOrientation/LayoutOrientation.dist.js';
import { ContentMaxWidth } from './ContentMaxWidth/ContentMaxWidth.dist.js';
import { MaxPerRow } from './MaxPerRow/MaxPerRow.dist.js';
import { ItemCount } from './ItemCount/ItemCount.dist.js';
import { NegativeMargins } from './NegativeMargins/NegativeMargins.dist.js';
import { AspectRatio } from './AspectRatio/AspectRatio.dist.js';
import { LayoutOrder } from './LayoutOrder/LayoutOrder.dist.js';

/* global wp */
const { PanelBody } = wp.components;const LayoutControls = (props) => {
    // If the block does not have any layout attributes, do not render the controls
    const componentDefault = Object.keys(comet?.defaults?.[props?.name?.replace('comet/', '')] ?? {}) ?? [];
    const currentAttributes = Object.keys(props.attributes) ?? [];
    if (componentDefault.length === 0 && currentAttributes.length === 0) {
        return null;
    }
    const layoutAttributes = [
        'size',
        'layout',
        'orientation',
        'hAlign',
        'vAlign',
        'backgroundType',
        'maxPerRow'
    ];
    const hasLayoutAttributes = [...componentDefault, ...currentAttributes].some((attr) => layoutAttributes.includes(attr));
    if (!hasLayoutAttributes) {
        return null;
    }
    return (wp.element.createElement(PanelBody, { title: "Layout", initialOpen: true },
        wp.element.createElement(ContainerSize, { ...props }),
        wp.element.createElement(AspectRatio, { ...props }),
        wp.element.createElement(ContentMaxWidth, { ...props }),
        wp.element.createElement(NegativeMargins, { ...props }),
        wp.element.createElement(GroupLayout, { ...props }),
        wp.element.createElement("div", { className: "comet-control-pair" },
            wp.element.createElement(ItemCount, { ...props }),
            wp.element.createElement(MaxPerRow, { ...props })),
        wp.element.createElement(LayoutOrientation, { ...props }),
        wp.element.createElement(LayoutOrder, { ...props }),
        wp.element.createElement(HorizontalAlignment, { ...props }),
        wp.element.createElement(VerticalAlignment, { ...props })));
};

export { LayoutControls };
//# sourceMappingURL=LayoutControls.dist.js.map
