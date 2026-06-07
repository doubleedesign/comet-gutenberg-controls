import { Dropdown, Button  } from '@wordpress/components';
import { createContext, useContext, useRef, type Ref } from '@wordpress/element';

export type PopupMenuProps = {
	testId?: string;
	className?: string;
	children: any;
	onToggle?: ({ isOpen }) => void;
	onClose?: () => void;
};

// This isn't exported from the package it comes from
type CallbackProps = {
	isOpen: boolean;
	onToggle: () => void;
	onClose: () => void;
};

export function PopupMenu({ testId, className, children, onToggle, onClose }: PopupMenuProps) {
	const triggerRef = useRef<HTMLButtonElement>(null);
	const popoverAnchorRef = useRef<HTMLDivElement>(null);

	if(!Array.isArray(children) || children.length !== 2) {
		console.error('PopupMenu must contain PopupMenu.Trigger and PopupMenu.Content as children');

		return null;
	}

	const trigger = children.find((child: any) => child.type === PopupMenu.Trigger);
	const content = children.find((child: any) => child.type === PopupMenu.Content);

	if(!trigger || !content) {
		console.error('PopupMenu must contain PopupMenu.Trigger and PopupMenu.Content as children');

		return null;
	}

	return (
		<div ref={popoverAnchorRef} className={`${className} comet-popup`} data-testid={testId}>
			<Dropdown
				renderToggle={(renderProps: CallbackProps) => (
					<RenderPropProvider ref={triggerRef}
						{...renderProps}
						onToggle={() => {
							renderProps.onToggle();
							onToggle?.({ isOpen: !renderProps.isOpen });
						}}
						onClose={() => {
							renderProps.onClose();
							onClose?.();
						}}
					>
						{trigger}
					</RenderPropProvider>
				)}
				renderContent={(renderProps: CallbackProps) => (
					<RenderPropProvider
						ref={popoverAnchorRef}
						{...renderProps}
						onToggle={() => {
							renderProps.onToggle();
							onToggle?.({ isOpen: !renderProps.isOpen });
						}}
						onClose={() => {
							renderProps.onClose();
							onClose?.();
						}}
					>
						{content}
					</RenderPropProvider>
				)}
				popoverProps={{ inline: true, anchorRef: popoverAnchorRef, className: 'comet-popup__content' }}
			/>
		</div>
	);
}

const RenderPropContext = createContext<CallbackProps & { ref: Ref<any> }|null>(null);

// Wrapping the children inside PopupMenu with RenderPropContext.Provider directly doesn't wrap them properly,
// but doing it this way does ¯\_(ツ)_/¯
function RenderPropProvider({ children, ...renderProps }: CallbackProps & { ref: Ref<any>; children: any }) {
	return (
		<RenderPropContext.Provider value={renderProps}>
			{children}
		</RenderPropContext.Provider>
	);
}

PopupMenu.Trigger = function Trigger({ ariaLabel, children }: { ariaLabel?: string, children: any }) {
	const renderProps = useContext(RenderPropContext);
	if (!renderProps) throw new Error('PopupMenu.Trigger must be used inside PopupMenu');

	return (
		<Button
			className="comet-popup__trigger"
			onClick={() => {
				renderProps?.onToggle();
				renderProps?.isOpen && renderProps?.onClose();
			}}
			aria-expanded={renderProps.isOpen}
			ref={renderProps.ref}
			aria-label={ariaLabel}
			__next40pxDefaultSize
		>
			{children}
		</Button>
	);
};


PopupMenu.Content = function Content({ children }) {
	const renderProps = useContext(RenderPropContext);
	if (!renderProps) throw new Error('PopupMenu.Content must be used inside PopupMenu');

	return (
		<div ref={renderProps.ref}>
			{typeof children === 'function' ? children(renderProps) : null}
		</div>
	);
};