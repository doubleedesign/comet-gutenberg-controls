import { FieldTooltip } from '../../FieldTooltip/FieldTooltip.dist.js';
import { CONTAINER_SIZES } from '../../constants.dist.js';

const { useMemo } = wp.element;const { SelectControl } = wp.components;const ContainerSize = ({ attributes, setAttributes }) => {
    if (!attributes?.size && !attributes?.innerSize) {
        return null;
    }
    if (!attributes?.innerSize) {
        return wp.element.createElement(ContainerOnly, { attributes: attributes, setAttributes: setAttributes });
    }
    return wp.element.createElement(ContainerAndInner, { attributes: attributes, setAttributes: setAttributes });
};
const ContainerOnly = ({ attributes, setAttributes }) => {
    return (wp.element.createElement(SelectControl, { label: wp.element.createElement(wp.element.Fragment, null,
            "Container size",
            wp.element.createElement(FieldTooltip, { tooltip: 'Represents the maximum width of the content area inside the block; may appear to have no effect on smaller viewports' })), size: '__unstable-large', value: attributes.size, options: CONTAINER_SIZES, onChange: (newSize) => setAttributes({ size: newSize }) }));
};
const ContainerAndInner = ({ attributes, setAttributes }) => {
    const options = CONTAINER_SIZES;
    const innerOptions = [
        { label: 'Auto (do not override)', value: 'fullwidth' }, // needs to have the same values or we have a bad time with the compatibility logic
        { label: 'Wide', value: 'wide' },
        { label: 'Contained', value: 'contained' },
        { label: 'Narrow', value: 'narrow' },
    ];
    const updateContainerSize = (newSize) => {
        setAttributes({ size: newSize });
        // If the inner size was larger than the new container size, update it to be the same
        const innerSizeIndex = options.findIndex(option => option.value === attributes.innerSize);
        if (innerSizeIndex > options.findIndex(option => option.value === newSize)) {
            setAttributes({ innerSize: newSize });
        }
    };
    const updateinnerSize = (newSize) => {
        setAttributes({ innerSize: newSize });
        // If the inner size is being set larger than the current container size, update the container to match
        const containerSizeIndex = options.findIndex(option => option.value === attributes.size);
        if (options.findIndex(option => option.value === newSize) < containerSizeIndex) {
            setAttributes({ size: newSize });
        }
    };
    // Filter inner options to only those smaller than or equal to the container size
    const filteredInnerOptions = useMemo(() => {
        const containerSizeIndex = options.findIndex(option => option.value === attributes.size);
        return innerOptions.slice(containerSizeIndex);
    }, [attributes.size]);
    return (wp.element.createElement(wp.element.Fragment, null,
        wp.element.createElement(SelectControl, { label: wp.element.createElement(wp.element.Fragment, null,
                "Container size",
                wp.element.createElement(FieldTooltip, { tooltip: 'Represents the maximum width of the content area inside the block; may appear to have no effect on smaller viewports' })), size: '__unstable-large', value: attributes.size, options: options, onChange: updateContainerSize }),
        wp.element.createElement(SelectControl, { label: wp.element.createElement(wp.element.Fragment, null,
                "Inner content size",
                wp.element.createElement(FieldTooltip, { tooltip: 'Optionally override the inner content\'s overall max width; may appear to have no effect on smaller viewports' })), size: '__unstable-large', value: attributes.innerSize, options: filteredInnerOptions, onChange: updateinnerSize })));
};

export { ContainerSize };
//# sourceMappingURL=ContainerSize.dist.js.map
