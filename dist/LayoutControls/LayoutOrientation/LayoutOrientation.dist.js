/* global wp */
const { __experimentalToggleGroupControl, __experimentalToggleGroupControlOption } = wp.components;const LayoutOrientation = ({ attributes, setAttributes }) => {
    if (!attributes?.orientation) {
        return null;
    }
    // We generally do not expect a component to support both "group layout" (grid or list) and orientation
    if (attributes?.layout) {
        return null;
    }
    const ToggleGroupControl = __experimentalToggleGroupControl;
    const ToggleGroupControlOption = __experimentalToggleGroupControlOption;
    return (wp.element.createElement(ToggleGroupControl, { className: "comet-toggle-group", __next40pxDefaultSize: true, isBlock: true, label: "Orientation", onChange: (value) => setAttributes({ orientation: value }), value: attributes.orientation },
        wp.element.createElement(ToggleGroupControlOption
        // @ts-expect-error TS2322: Type Element is not assignable to type string
        , { 
            // @ts-expect-error TS2322: Type Element is not assignable to type string
            label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                wp.element.createElement("path", { d: "m14.5 6.5-1 1 3.7 3.7H4v1.6h13.2l-3.7 3.7 1 1 5.6-5.5z" })), "aria-label": "Horizontal", showTooltip: true, value: "horizontal" }),
        wp.element.createElement(ToggleGroupControlOption
        // @ts-expect-error TS2322: Type Element is not assignable to type string
        , { 
            // @ts-expect-error TS2322: Type Element is not assignable to type string
            label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24" },
                wp.element.createElement("path", { d: "m16.5 13.5-3.7 3.7V4h-1.5v13.2l-3.8-3.7-1 1 5.5 5.6 5.5-5.6z" })), "aria-label": "Vertical", showTooltip: true, value: "vertical" })));
};

export { LayoutOrientation };
//# sourceMappingURL=LayoutOrientation.dist.js.map
