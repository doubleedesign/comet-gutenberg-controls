import { transformColorValueToKey } from '../utils.dist.js';

const { createContext, useContext, useCallback } = wp.element;const ColourContext = createContext({ values: {}, onChange: () => { } });
const ColourContextProvider = ({ values, onChange, children }) => {
    const handleChange = useCallback((newValue) => {
        const transformedNewValue = Object.keys(newValue).reduce((acc, key, index) => {
            const value = newValue[key];
            acc[key] = value ? transformColorValueToKey(value) : undefined;
            return acc;
        }, {});
        onChange(transformedNewValue);
    }, []);
    return (wp.element.createElement(ColourContext.Provider, { value: { values, onChange: handleChange } }, children));
};
const useColourContext = () => {
    const context = useContext(ColourContext);
    if (!context) {
        throw new Error('useColourContext must be called from within the ColourContextProvider');
    }
    return context;
};
const useSingleColourContext = (key) => {
    const context = useContext(ColourContext);
    if (!context) {
        throw new Error('useSingleColourContext must be called from within the ColourContextProvider');
    }
    const { values, onChange } = context;
    const handleSingleValueChange = useCallback((value) => {
        onChange({ [key]: value });
    }, [onChange]);
    return {
        value: values[key],
        onChange: (value) => {
            handleSingleValueChange(value);
        }
    };
};

export { ColourContextProvider, useColourContext, useSingleColourContext };
//# sourceMappingURL=ColourContextProvider.dist.js.map
