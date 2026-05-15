import { ContainerSize } from '../LayoutControls/ContainerSize/ContainerSize.dist.js';
import { HorizontalAlignment } from '../LayoutControls/HorizontalAlignment/HorizontalAlignment.dist.js';
import { VerticalAlignment } from '../LayoutControls/VerticalAlignment/VerticalAlignment.dist.js';

const { PanelBody } = wp.components;const { __experimentalToggleGroupControl, __experimentalToggleGroupControlOption } = wp.components;const { useCallback } = wp.element;function ColumnLayoutControls(props) {
    if (props.name !== 'comet/columns') {
        return null;
    }
    const ToggleGroupControl = __experimentalToggleGroupControl;
    const ToggleGroupControlOption = __experimentalToggleGroupControlOption;
    const { attributes, setAttributes } = props;
    const handleQtyChange = useCallback((newQty) => {
        setAttributes({ qty: newQty });
        if (attributes?.qty && attributes.qty < 3) {
            setAttributes({ columnLayout: 'even' });
        }
    }, [setAttributes]);
    const handleLayoutChange = useCallback((newLayout) => {
        setAttributes({ columnLayout: newLayout });
    }, [setAttributes]);
    /* eslint-disable max-len */
    return (wp.element.createElement(PanelBody, { title: "Layout", initialOpen: true },
        wp.element.createElement(ContainerSize, { ...props }),
        wp.element.createElement("div", { className: "comet-column-layout-controls" },
            wp.element.createElement("div", { className: "comet-column-layout-controls__qty", "data-selected-value": attributes.qty ?? 2 },
                wp.element.createElement(ToggleGroupControl, { className: "comet-toggle-group", __next40pxDefaultSize: true, isBlock: true, label: "Number of columns", onChange: handleQtyChange, value: attributes.qty ?? 2 },
                    wp.element.createElement(ToggleGroupControlOption, { label: "1", value: 1, disabled: true }),
                    wp.element.createElement(ToggleGroupControlOption, { label: "2", value: 2 }),
                    wp.element.createElement(ToggleGroupControlOption, { label: "3", value: 3 }),
                    wp.element.createElement(ToggleGroupControlOption, { label: "4", value: 4 }))),
            attributes?.qty && attributes.qty > 2 && (wp.element.createElement("div", { className: "comet-column-layout-controls__layout" },
                wp.element.createElement(ToggleGroupControl, { className: "comet-toggle-group", __next40pxDefaultSize: true, isBlock: true, label: "Layout", onChange: handleLayoutChange, value: attributes.columnLayout ?? 'even' },
                    wp.element.createElement(ToggleGroupControlOption, { value: "expand-last", showTooltip: true, "aria-label": "Expand last column", 
                        // @ts-expect-error TS2322: Type Element is not assignable to type string
                        label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-layout-sidebar", viewBox: "0 0 16 16" },
                            wp.element.createElement("path", { d: "M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" })) }),
                    wp.element.createElement(ToggleGroupControlOption, { value: "even", showTooltip: true, "aria-label": "Even columns", 
                        //@ts-expect-error TS2322: Type Element is not assignable to type string
                        label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" },
                            wp.element.createElement("path", { d: "M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z" })) }),
                    wp.element.createElement(ToggleGroupControlOption, { value: "expand-first", showTooltip: true, "aria-label": "Expand first column", 
                        //@ts-expect-error TS2322: Type Element is not assignable to type string
                        label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-layout-sidebar-reverse", viewBox: "0 0 16 16" },
                            wp.element.createElement("path", { d: "M16 3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5-1v12H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 0h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2z" })) }))))),
        wp.element.createElement(HorizontalAlignment, { ...props }),
        wp.element.createElement(VerticalAlignment, { ...props })));
}

export { ColumnLayoutControls };
//# sourceMappingURL=ColumnLayoutControls.dist.js.map
