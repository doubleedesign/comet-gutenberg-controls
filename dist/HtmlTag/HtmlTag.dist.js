import { FieldTooltip } from '../FieldTooltip/FieldTooltip.dist.js';

const { ExternalLink, SelectControl } = wp.components;const HtmlTag = ({ name, attributes, setAttributes }) => {
    if (!attributes?.tagName) {
        return null;
    }
    const options = [
        { label: 'div', value: 'div' },
        { label: 'section', value: 'section' }
    ];
    // TODO: Find a way to set the available tags per-block based on what the underlying PHP component supports
    if (name === 'comet/gallery') {
        options.push({ label: 'figure', value: 'figure' });
    }
    return (wp.element.createElement(SelectControl, { label: wp.element.createElement(wp.element.Fragment, null,
            "HTML Element",
            wp.element.createElement(FieldTooltip, { tooltip: 'The HTML tag to use for the block container, or in some cases the main content within' })), help: wp.element.createElement(wp.element.Fragment, null,
            "HTML tags are used to structure content and are important for machine-readability, such as by assistive technologies and search engines.\u00A0",
            wp.element.createElement(ExternalLink, { href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' }, "Learn more about HTML")), size: '__unstable-large', value: attributes.tagName, options: options, onChange: (value) => setAttributes({ tagName: value }) }));
};

export { HtmlTag };
//# sourceMappingURL=HtmlTag.dist.js.map
