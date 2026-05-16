import { FieldTooltip } from '../../FieldTooltip/FieldTooltip.dist.js';

/* global wp */
const { __experimentalToggleGroupControl, __experimentalToggleGroupControlOption } = wp.components;const HorizontalAlignment = ({ attributes, setAttributes }) => {
    if (!attributes?.hAlign) {
        return null;
    }
    if (attributes.layout && attributes.layout === 'list') {
        return null;
    }
    const ToggleGroupControl = __experimentalToggleGroupControl;
    const ToggleGroupControlOption = __experimentalToggleGroupControlOption;
    return (wp.element.createElement(ToggleGroupControl, { className: "comet-toggle-group", __next40pxDefaultSize: true, isBlock: true, 
        // @ts-expect-error TS2322: Type Element is not assignable to type string
        label: wp.element.createElement(wp.element.Fragment, null,
            "Horizontal Alignment",
            wp.element.createElement(FieldTooltip, { tooltip: 'How to align the content if it does not take up the full width of the container' })), "aria-label": "Horizontal alignment", onChange: (value) => setAttributes({ hAlign: value }), value: attributes.hAlign },
        wp.element.createElement(ToggleGroupControlOption
        // @ts-expect-error TS2322: Type Element is not assignable to type string
        , { 
            // @ts-expect-error TS2322: Type Element is not assignable to type string
            label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                wp.element.createElement("path", { d: "M9 9v6h11V9H9zM4 20h1.5V4H4v16z" })), "aria-label": "Start", showTooltip: true, value: "start" }),
        wp.element.createElement(ToggleGroupControlOption
        // @ts-expect-error TS2322: Type Element is not assignable to type string
        , { 
            // @ts-expect-error TS2322: Type Element is not assignable to type string
            label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                wp.element.createElement("path", { d: "M12.5 15v5H11v-5H4V9h7V4h1.5v5h7v6h-7Z" })), "aria-label": "Middle", showTooltip: true, value: "center" }),
        wp.element.createElement(ToggleGroupControlOption
        // @ts-expect-error TS2322: Type Element is not assignable to type string
        , { 
            // @ts-expect-error TS2322: Type Element is not assignable to type string
            label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                wp.element.createElement("path", { d: "M4 15h11V9H4v6zM18.5 4v16H20V4h-1.5z" })), "aria-label": "End", showTooltip: true, value: "end" })));
};

export { HorizontalAlignment };
//# sourceMappingURL=HorizontalAlignment.dist.js.map
