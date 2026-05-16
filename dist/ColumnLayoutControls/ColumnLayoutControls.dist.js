import { ContainerSize } from '../LayoutControls/ContainerSize/ContainerSize.dist.js';
import { HorizontalAlignment } from '../LayoutControls/HorizontalAlignment/HorizontalAlignment.dist.js';
import { VerticalAlignment } from '../LayoutControls/VerticalAlignment/VerticalAlignment.dist.js';
import { FieldTooltip } from '../FieldTooltip/FieldTooltip.dist.js';

const { PanelBody } = wp.components;const { __experimentalToggleGroupControl, __experimentalToggleGroupControlOption } = wp.components;const { useCallback, useEffect, useMemo } = wp.element;function ColumnLayoutControls(props) {
    if (props.name !== 'comet/columns') {
        return null;
    }
    const ToggleGroupControl = __experimentalToggleGroupControl;
    const ToggleGroupControlOption = __experimentalToggleGroupControlOption;
    const { attributes, setAttributes } = props;
    const columnCount = wp.data.select('core/block-editor').getBlockCount(props.clientId);
    const showLayoutOptions = useMemo(() => {
        return (attributes.qty > 1) && (columnCount < attributes.qty);
    }, [attributes?.qty, columnCount]);
    const handleQtyChange = useCallback((newQty) => {
        setAttributes({ qty: newQty });
    }, [setAttributes]);
    const handleLayoutChange = useCallback((newLayout) => {
        setAttributes({ columnLayout: newLayout });
    }, [setAttributes]);
    useEffect(() => {
        // Automatically increase the column count if more columns (inner blocks) are added than currently selected
        if (columnCount > attributes.qty) {
            setAttributes({ qty: columnCount });
        }
        // If the columns fill the available slots, there is no need for these attributes so set them to fallback values
        // (undefined can cause them to disappear because of the controls' display logic)
        if (columnCount === attributes.qty) {
            setAttributes({ hAlign: 'center', columnLayout: 'even' });
        }
    }, [columnCount, attributes.qty, setAttributes]);
    /* eslint-disable max-len */
    return (wp.element.createElement(PanelBody, { title: "Layout", initialOpen: true },
        wp.element.createElement(ContainerSize, { ...props }),
        wp.element.createElement("div", { className: "comet-column-layout-controls" },
            wp.element.createElement("div", { className: "comet-column-layout-controls__qty" },
                wp.element.createElement(ToggleGroupControl, { className: "comet-toggle-group", 
                    // @ts-expect-error TS2322: Type Element is not assignable to type string
                    label: wp.element.createElement(wp.element.Fragment, null,
                        "Number of columns",
                        wp.element.createElement(FieldTooltip, { tooltip: 'The maximum number of slots to divide the available space into' })), "aria-label": "Maximum number of columns", __next40pxDefaultSize: true, isBlock: true, value: attributes?.qty ?? columnCount ?? 2, onChange: handleQtyChange },
                    wp.element.createElement(ToggleGroupControlOption, { value: 2, showTooltip: true, "aria-label": "Split in half (2 columns)", 
                        //@ts-expect-error TS2322: Type Element is not assignable to type string
                        label: getIconForEvenLayout(2), disabled: columnCount > 2 }),
                    wp.element.createElement(ToggleGroupControlOption, { value: 3, showTooltip: true, "aria-label": "Split into thirds (3 columns)", 
                        //@ts-expect-error TS2322: Type Element is not assignable to type string
                        label: getIconForEvenLayout(3), disabled: columnCount > 3 }),
                    wp.element.createElement(ToggleGroupControlOption, { value: 4, showTooltip: true, "aria-label": "Split into quarters (4 columns)", 
                        //@ts-expect-error TS2322: Type Element is not assignable to type string
                        label: getIconForEvenLayout(4), disabled: columnCount > 4 }))),
            showLayoutOptions && (wp.element.createElement("div", { className: "comet-column-layout-controls__layout" },
                wp.element.createElement(ToggleGroupControl, { className: "comet-toggle-group", __next40pxDefaultSize: true, isBlock: true, onChange: handleLayoutChange, value: attributes.columnLayout ?? 'even', 
                    // @ts-expect-error TS2322: Type Element is not assignable to type string
                    label: wp.element.createElement(wp.element.Fragment, null,
                        "Layout",
                        wp.element.createElement(FieldTooltip, { tooltip: 'How to distribute columns when there are fewer blocks than the number of columns selected' })), "aria-label": "Column layout", help: "Note: Blocks will stack on small viewports regardless of the layout selection." },
                    wp.element.createElement(ToggleGroupControlOption, { value: "expand-last", showTooltip: true, "aria-label": "Expand last column", 
                        // @ts-expect-error TS2322: Type Element is not assignable to type string
                        label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-layout-sidebar", viewBox: "0 0 16 16" },
                            wp.element.createElement("path", { d: "M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z" })) }),
                    wp.element.createElement(ToggleGroupControlOption, { value: "even", showTooltip: true, "aria-label": "Even columns", 
                        //@ts-expect-error TS2322: Type Element is not assignable to type string
                        label: getIconForEvenLayout(attributes.qty) }),
                    wp.element.createElement(ToggleGroupControlOption, { value: "expand-first", showTooltip: true, "aria-label": "Expand first column", 
                        //@ts-expect-error TS2322: Type Element is not assignable to type string
                        label: wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", className: "bi bi-layout-sidebar-reverse", viewBox: "0 0 16 16" },
                            wp.element.createElement("path", { d: "M16 3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5-1v12H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 0h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2z" })) }))))),
        columnCount !== attributes.qty && wp.element.createElement(HorizontalAlignment, { ...props }),
        wp.element.createElement(VerticalAlignment, { ...props })));
}
function getIconForEvenLayout(qty) {
    switch (qty) {
        case 2:
            return wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" },
                wp.element.createElement("path", { d: "M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5z" }));
        case 3:
            return wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", fill: "currentColor", viewBox: "0 0 16 16" },
                wp.element.createElement("path", { d: "M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z" }));
        case 4:
            return wp.element.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 16 16" },
                wp.element.createElement("path", { d: "M14,1H2C.9,1,0,1.9,0,3v10c0,1.1.9,2,2,2h12c1.1,0,2-.9,2-2V3c0-1.1-.9-2-2-2ZM1,13V3c0-.55.45-1,1-1h1.75v12h-1.75c-.55,0-1-.45-1-1ZM7.5,14h-2.75V2h2.75v12ZM8.5,2h2.75v12h-2.75V2ZM15,13c0,.55-.45,1-1,1h-1.75V2h1.75c.55,0,1,.45,1,1v10Z" }));
        default:
            return null;
    }
}

export { ColumnLayoutControls };
//# sourceMappingURL=ColumnLayoutControls.dist.js.map
