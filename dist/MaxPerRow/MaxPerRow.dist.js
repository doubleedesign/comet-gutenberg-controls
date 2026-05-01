import { __experimentalNumberControl } from '@wordpress/components';
import { FieldTooltip } from '../FieldTooltip/FieldTooltip.dist.js';

/* eslint-disable max-len */
/* global comet, wp */
const MaxPerRow = ({ name, attributes, setAttributes }) => {
    if (!attributes?.maxPerRow) {
        return null;
    }
    const NumberControl = __experimentalNumberControl;
    return (React.createElement(NumberControl, { __next40pxDefaultSize: true, label: React.createElement(React.Fragment, null,
            "Max items per row",
            React.createElement(FieldTooltip, { tooltip: 'The preferred number of items per row in containers wide enough to accommodate them; items may be stacked to a smaller number on smaller viewports' })), value: attributes.maxPerRow, min: 2, max: 6, onChange: (newMax) => {
            try {
                newMax = parseInt(newMax);
            }
            catch {
                newMax = attributes.maxPerRow;
            }
            return setAttributes({ maxPerRow: newMax });
        } }));
};

export { MaxPerRow };
//# sourceMappingURL=MaxPerRow.dist.js.map
