import { EditorControlProps } from '../../types';
import { type AspectRatio as AspectRatioOption } from '../../../types';
export type AspectRatioProps = EditorControlProps & {
    attributes: {
        aspectRatio?: AspectRatioOption;
    };
};
export declare const AspectRatio: ({ name, attributes, setAttributes }: AspectRatioProps) => JSX.Element | null;
