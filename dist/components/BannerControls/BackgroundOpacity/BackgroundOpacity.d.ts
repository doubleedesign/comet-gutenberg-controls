import { EditorControlProps } from '../../types';
export type BackgroundOpacityProps = EditorControlProps & {
    attributes: {
        backgroundOpacity?: number;
    };
};
export declare const BackgroundOpacity: ({ name, attributes, setAttributes }: BackgroundOpacityProps) => JSX.Element | null;
