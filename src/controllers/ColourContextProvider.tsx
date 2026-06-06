import { createContext, useContext, useState, useCallback, Element } from '@wordpress/element';
import { ThemeColor, ThemeGradient } from "../types";

type ColourContext = {
    value: ThemeColor | ThemeGradient;
    handleChange: (value: string) => void;
}

type ColourContextProviderProps = {
    initialValue: ThemeColor | ThemeGradient;
    onChange: (value: string) => void;
    children: Element
}

const ColourContext = createContext<ColourContext>({
    value: 'primary',
    handleChange: (newValue: string) => {},
});

export const ColourContextProvider = ({ initialValue, onChange, children }: ColourContextProviderProps) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = useCallback((newValue: string) => {
        // Handle clearable selector
        if(!newValue) {
            onChange('');

            return;
        }

        const name = newValue.replace('var(--color-', '').replace(')', '').replace('var(--gradient-', '');
        onChange(name);
    }, [onChange]);

    return (
        <ColourContext.Provider value={{ value, handleChange }}>
            {children}
        </ColourContext.Provider>
    )
}

export const useColourContext = () => {
    const context = useContext(ColourContext);

    if (!context) {
        throw new Error("useColourContext must be called from within the ColourContextProvider")
    }

    return context;
}