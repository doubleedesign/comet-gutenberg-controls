import { SelectControl } from '@wordpress/components';
import { EditorControlProps } from '../../types';

export type BackgroundTypeProps = EditorControlProps & {
	attributes: {
		backgroundType?: 'content' | 'overlay'
	}
};

export const BackgroundType = ({ attributes, setAttributes }: BackgroundTypeProps) => {
	if (!attributes?.backgroundType) {
		return null;
	}

	const options = [
		{ label: 'Content', value: 'content' },
		{ label: 'Overlay', value: 'overlay' },
	];

	return (
		<SelectControl
			label="Background type"
			size={'__unstable-large'}
			value={attributes.backgroundType}
			options={options}
			onChange={(newType) => setAttributes({ backgroundType: newType })}/>
	);
};
