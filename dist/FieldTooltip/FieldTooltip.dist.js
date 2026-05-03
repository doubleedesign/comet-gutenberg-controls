const React = React;const { Button, Tooltip } = wp.components;const FieldTooltip = ({ tooltip }) => {
    if (!tooltip) {
        return null;
    }
    return (React.createElement(Tooltip, { text: React.createElement("span", { style: { display: 'block', maxWidth: '200px' } }, tooltip) },
        React.createElement(Button, { size: "small", icon: React.createElement("svg", { viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg" },
                React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.5 12a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0ZM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 4v1.5h-1.5V8h1.5Zm0 8v-5h-1.5v5h1.5Z" })) })));
};

export { FieldTooltip };
//# sourceMappingURL=FieldTooltip.dist.js.map
