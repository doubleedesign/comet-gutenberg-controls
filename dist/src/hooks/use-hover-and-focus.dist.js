const { useMemo } = wp.element;const useHoverAndFocus = ({ element, onEnterButton, onLeaveButton }) => {
    const buttons = useMemo(() => {
        if (!element) {
            return [];
        }
        return Array.from(element.querySelectorAll('button, [role="button"]'));
    }, [element]);
    const handleOn = (event) => {
        onEnterButton((event.target.ariaLabel || event.target.innerText).toLowerCase());
    };
    const handleOff = () => {
        onLeaveButton();
    };
    buttons.forEach((button) => {
        button.addEventListener('mouseenter', handleOn);
        button.addEventListener('mouseleave', handleOff);
        button.addEventListener('focus', handleOn);
        button.addEventListener('blur', handleOff);
        return () => {
            button.removeEventListener('mouseenter', handleOn);
            button.removeEventListener('mouseleave', handleOff);
            button.removeEventListener('focus', handleOn);
            button.removeEventListener('blur', handleOff);
        };
    });
};

export { useHoverAndFocus };
//# sourceMappingURL=use-hover-and-focus.dist.js.map
