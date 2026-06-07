const { Dropdown, Button } = wp.components;const { createContext, useContext, useRef } = wp.element;function PopupMenu({ testId, className, children, onToggle, onClose }) {
    const triggerRef = useRef(null);
    const popoverAnchorRef = useRef(null);
    if (!Array.isArray(children) || children.length !== 2) {
        console.error('PopupMenu must contain PopupMenu.Trigger and PopupMenu.Content as children');
        return null;
    }
    const trigger = children.find((child) => child.type === PopupMenu.Trigger);
    const content = children.find((child) => child.type === PopupMenu.Content);
    if (!trigger || !content) {
        console.error('PopupMenu must contain PopupMenu.Trigger and PopupMenu.Content as children');
        return null;
    }
    return (wp.element.createElement("div", { ref: popoverAnchorRef, className: `${className} comet-popup`, "data-testid": testId },
        wp.element.createElement(Dropdown, { renderToggle: (renderProps) => (wp.element.createElement(RenderPropProvider, { ref: triggerRef, ...renderProps, onToggle: () => {
                    renderProps.onToggle();
                    onToggle?.({ isOpen: !renderProps.isOpen });
                }, onClose: () => {
                    renderProps.onClose();
                    onClose?.();
                } }, trigger)), renderContent: (renderProps) => (wp.element.createElement(RenderPropProvider, { ref: popoverAnchorRef, ...renderProps, onToggle: () => {
                    renderProps.onToggle();
                    onToggle?.({ isOpen: !renderProps.isOpen });
                }, onClose: () => {
                    renderProps.onClose();
                    onClose?.();
                } }, content)), popoverProps: { inline: true, anchorRef: popoverAnchorRef, className: 'comet-popup__content' } })));
}
const RenderPropContext = createContext(null);
// Wrapping the children inside PopupMenu with RenderPropContext.Provider directly doesn't wrap them properly,
// but doing it this way does ¯\_(ツ)_/¯
function RenderPropProvider({ children, ...renderProps }) {
    return (wp.element.createElement(RenderPropContext.Provider, { value: renderProps }, children));
}
PopupMenu.Trigger = function Trigger({ ariaLabel, children }) {
    const renderProps = useContext(RenderPropContext);
    if (!renderProps)
        throw new Error('PopupMenu.Trigger must be used inside PopupMenu');
    return (wp.element.createElement(Button, { className: "comet-popup__trigger", onClick: () => {
            renderProps?.onToggle();
            renderProps?.isOpen && renderProps?.onClose();
        }, "aria-expanded": renderProps.isOpen, ref: renderProps.ref, "aria-label": ariaLabel, __next40pxDefaultSize: true }, children));
};
PopupMenu.Content = function Content({ children }) {
    const renderProps = useContext(RenderPropContext);
    if (!renderProps)
        throw new Error('PopupMenu.Content must be used inside PopupMenu');
    return (wp.element.createElement("div", { ref: renderProps.ref }, typeof children === 'function' ? children(renderProps) : null));
};

export { PopupMenu };
//# sourceMappingURL=PopupMenu.dist.js.map
