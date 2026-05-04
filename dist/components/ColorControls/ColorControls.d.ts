import { EditorControlProps } from '../types';
import { ThemeColor, ThemeGradient } from '../../types';
export type ColorControlsProps = EditorControlProps & {
    attributes: {
        colorTheme?: ThemeColor;
        backgroundColor?: ThemeColor;
        sectionBackground?: ThemeColor | ThemeGradient;
    };
};
export declare const ColorControls: (props: ColorControlsProps) => JSX.Element | null;
