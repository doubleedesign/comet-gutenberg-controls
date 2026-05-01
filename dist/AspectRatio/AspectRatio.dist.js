import { FieldTooltip } from '../FieldTooltip/FieldTooltip.dist.js';
import { SelectControl } from '@wordpress/components';

const AspectRatio = ({ name, attributes, setAttributes }) => {
    if (!attributes?.aspectRatio || !comet.aspectRatios) {
        return null;
    }
    const options = comet.aspectRatios.map((ratio) => ({
        label: `${sentence_case(ratio.name)} (${ratio.value})`,
        value: ratio.value,
    }));
    const label = name === 'comet/gallery' ? React.createElement(React.Fragment, null,
        "Aspect ratio",
        React.createElement(FieldTooltip, { tooltip: 'The preferred aspect ratio for the image previews' })) : 'Aspect ratio';
    return (React.createElement(SelectControl, { label: label, size: '__unstable-large', value: attributes.aspectRatio, options: options, onChange: (newRatio) => setAttributes({ aspectRatio: newRatio }) }));
};
function sentence_case(text) {
    return text
        .toLowerCase()
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .replaceAll('_', ' ');
}

export { AspectRatio };
//# sourceMappingURL=AspectRatio.dist.js.map
