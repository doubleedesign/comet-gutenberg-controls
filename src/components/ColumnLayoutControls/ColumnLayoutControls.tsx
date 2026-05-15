import { EditorControlProps } from '../types';
import { PanelBody, SelectControl } from '@wordpress/components';
import { ContainerSize } from '../LayoutControls/ContainerSize/ContainerSize';
import { __experimentalToggleGroupControl, __experimentalToggleGroupControlOption } from '@wordpress/components';
import { HorizontalAlignment } from '../LayoutControls/HorizontalAlignment/HorizontalAlignment';
import { VerticalAlignment } from '../LayoutControls/VerticalAlignment/VerticalAlignment';
import { useCallback, useEffect, useMemo } from '@wordpress/element';
import { FieldTooltip } from '../FieldTooltip/FieldTooltip';
import { CONTAINER_SIZES } from '../constants';

export type ColumnLayoutControlsProps = EditorControlProps & {
	attributes: {
		size?: string;
		qty: number;
		columnLayout?: 'even',
		hAlign?: string;
		vAlign?: string;
	}
};

export function ColumnLayoutControls(props: ColumnLayoutControlsProps) {
	if (props.name !== 'comet/columns') {
		return null;
	}

	const ToggleGroupControl = __experimentalToggleGroupControl;
	const ToggleGroupControlOption = __experimentalToggleGroupControlOption;
	const { attributes, setAttributes } = props;
	const columnCount = wp.data.select('core/block-editor').getBlockCount(props.clientId);

	const showLayoutOptions = useMemo(() => {
		return (attributes.qty > 1) && (columnCount < attributes.qty);
	}, [attributes?.qty, columnCount]);

	const handleQtyChange = useCallback((newQty) => {
		setAttributes({ qty: newQty });
	}, [setAttributes]);

	const handleLayoutChange = useCallback((newLayout) => {
		setAttributes({ columnLayout: newLayout });
	}, [setAttributes]);

	useEffect(() => {
		// Automatically increase the column count if more columns (inner blocks) are added than currently selected
		// TODO: How to limit the maximum number of inner blocks to 4?
		if(columnCount > attributes.qty) {
			setAttributes({ qty: columnCount });
		}
		// If the columns fill the available slots, there is no need for these attributes
		if(columnCount === attributes.qty) {
			setAttributes({ hAlign: null, columnLayout: null });
		}
	}, [columnCount, attributes.qty, setAttributes]);

	/* eslint-disable max-len */
	return (
		<PanelBody title="Layout" initialOpen={true}>
			<ContainerSize {...props} />
			<div className="comet-column-layout-controls">
				<div className="comet-column-layout-controls__layout">
					<SelectControl
						label={
							<>
								Columns
								<FieldTooltip
									tooltip={'The maximum number of slots to divide the available space into'}
								/>
							</>}
						size={'__unstable-large'}
						value={attributes.size}
						options={[
							{ label: 'Halves', value: '2' },
							{ label: 'Thirds', value: '3' },
							{ label: 'Quarters', value: '4' },
						]}
						onChange={handleQtyChange}
					/>
				</div>
				<div className="comet-column-layout-controls__layout">
					<ToggleGroupControl
						className="comet-toggle-group"
						__next40pxDefaultSize
						isBlock
						onChange={handleLayoutChange}
						value={attributes.columnLayout ?? 'even'}
						// @ts-expect-error TS2322: Type Element is not assignable to type string
						label={
							<>
								Layout
								<FieldTooltip
									tooltip={'How to distribute columns when there are fewer blocks than the number of columns selected'}
								/>
							</>
						}
						help="Note: Items may stack on small viewports regardless of the layout selection."
					>
						<ToggleGroupControlOption
							value="expand-last"
							showTooltip
							aria-label="Expand last column"
							// @ts-expect-error TS2322: Type Element is not assignable to type string
							label={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-layout-sidebar" viewBox="0 0 16 16">
								<path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm5-1v12h9a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM4 2H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h2z"/></svg>}
						/>
						<ToggleGroupControlOption
							value="even"
							showTooltip
							aria-label="Two even columns"
							//@ts-expect-error TS2322: Type Element is not assignable to type string
							label={getIconForEvenLayout(attributes.qty)}
						/>
						<ToggleGroupControlOption
							value="expand-first"
							showTooltip
							aria-label="Expand first column"
							//@ts-expect-error TS2322: Type Element is not assignable to type string
							label={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
								fill="currentColor" className="bi bi-layout-sidebar-reverse"
								viewBox="0 0 16 16">
								<path
									d="M16 3a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5-1v12H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zm1 0h2a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-2z"/>
							</svg>}
						/>
					</ToggleGroupControl>
				</div>
			</div>
			{columnCount !== attributes.qty && <HorizontalAlignment {...props} />}
			<VerticalAlignment {...props} />
		</PanelBody>
	);
}

function getIconForEvenLayout(qty: number) {
	switch (qty) {
		case 2:
			return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
				<path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm8.5-1v12H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-1 0H2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h5.5z"/>
			</svg>;
		case 3:
			return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
				<path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h13A1.5 1.5 0 0 1 16 1.5v13a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5zM1.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5H5V1zM10 15V1H6v14zm1 0h3.5a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5H11z"/>
			</svg>;
		case 4:
			return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
				<path d="M0 3a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm3-1v12H2a1 1 0 0 0-1 1V3a1 1 0 0 0 0 1-1h1zm3 0v12H5V2h1zm3 0v12h-1V2h1zm3 0h1a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-1z"/>
			</svg>;
		default:
			return null;
	}
}