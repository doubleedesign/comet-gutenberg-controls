/* global wp */
import { __experimentalToggleGroupControl, __experimentalToggleGroupControlOption } from '@wordpress/components';
import { FieldTooltip } from '../../FieldTooltip/FieldTooltip';

export const HorizontalAlignment = ({ attributes, setAttributes }) => {
	// TODO: Use component defaults from comet JS object (which are set using the PHP global Config object). They should take precedence over block.json
	if (!attributes?.hAlign) {
		return null;
	}

	if (attributes.layout && attributes.layout === 'list') {
		return null;
	}

	const ToggleGroupControl = __experimentalToggleGroupControl;
	const ToggleGroupControlOption = __experimentalToggleGroupControlOption;

	return (
		<ToggleGroupControl
			className="comet-toggle-group"
			__next40pxDefaultSize
			isBlock
			// @ts-expect-error TS2322: Type Element is not assignable to type string
			label={
				<>
					Horizontal Alignment
					<FieldTooltip
						tooltip={'How to align the content if it does not take up the full width of the container'}
					/>
				</>
			}
			onChange={(value) => setAttributes({ hAlign: value })}
			value={attributes.hAlign}
		>
			<ToggleGroupControlOption
				// @ts-expect-error TS2322: Type Element is not assignable to type string
				label={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M9 9v6h11V9H9zM4 20h1.5V4H4v16z"/>
				</svg>}
				aria-label="Start"
				showTooltip
				value="start"
			/>
			<ToggleGroupControlOption
				// @ts-expect-error TS2322: Type Element is not assignable to type string
				label={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M12.5 15v5H11v-5H4V9h7V4h1.5v5h7v6h-7Z"/>
				</svg>}
				aria-label="Middle"
				showTooltip
				value="center"
			/>
			<ToggleGroupControlOption
				// @ts-expect-error TS2322: Type Element is not assignable to type string
				label={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M4 15h11V9H4v6zM18.5 4v16H20V4h-1.5z"/>
				</svg>}
				aria-label="End"
				showTooltip
				value="end"
			/>
		</ToggleGroupControl>
	);
};
