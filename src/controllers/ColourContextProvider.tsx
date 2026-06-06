import { createContext, useContext, useCallback } from '@wordpress/element';
import { ColorState, ThemeColor, ThemeGradient } from '../types';
import { transformColorValueToKey } from '../utils';

// Values provided to the context, at the top level.
type ColourContextProviderProps = {
	/** The current values of the colour state. Generally expected to be the relevant attributes from the block's attributes prop. */
	values: ColorState;
	/** Callback function to handle updating the state in the parent component. Generally expected to be the block's setAttributes function. */
	onChange: (newValue: ColorState) => void;
	/** Controls that will use the colour context. */
	children: any;
};

// Values and functions provided to the hook, which then passes them down to the consuming components (with modifications as necessary)
type ColourContext = Pick<ColourContextProviderProps, 'values'> & {
	onChange: (newValue: ColorState) => void;
};

type ColourContextHookSingleValue = {
	value: ThemeColor | ThemeGradient | undefined;
	onChange: (newValue: ThemeColor | ThemeGradient | undefined) => void;
};

const ColourContext = createContext<ColourContext>({ values: {}, onChange: () => {} });

export const ColourContextProvider = ({ values, onChange, children }: ColourContextProviderProps) => {

	const handleChange = useCallback((newValue: ColorState) => {
		const transformedNewValue: ColorState = Object.keys(newValue).reduce((acc, key, index) => {
			const value = newValue[key as keyof ColorState];
			acc[key] = value ? transformColorValueToKey(value as string) : undefined;

			return acc;
		}, {} as ColorState);

		onChange(transformedNewValue);
	}, []);

	return (
		<ColourContext.Provider value={{ values, onChange: handleChange }}>
			{children}
		</ColourContext.Provider>
	);
};

export const useColourContext: () => ColourContext = () => {
	const context = useContext(ColourContext);

	if (!context) {
		throw new Error('useColourContext must be called from within the ColourContextProvider');
	}
	
	return context;
};

export const useSingleColourContext = (key: string): ColourContextHookSingleValue => {
	const context = useContext(ColourContext);

	if (!context) {
		throw new Error('useSingleColourContext must be called from within the ColourContextProvider');
	}

	const { values, onChange } = context;

	const handleSingleValueChange = useCallback((value: ThemeColor | ThemeGradient | undefined) => {
		onChange({ [key]: value });
	}, [onChange]);

	return {
		value: values[key] as ThemeColor | undefined,
		onChange: (value: ThemeColor | ThemeGradient | undefined) => {
			handleSingleValueChange(value);
		}
	};
};