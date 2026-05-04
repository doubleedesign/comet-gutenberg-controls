import React from 'react';
import { EditorControlProps } from '../types';

export type TemplateNameProps = EditorControlProps & {
	attributes: {
	}
};

export function TemplateName({ name, attributes, setAttributes }: TemplateNameProps) {
	if (!attributes?.templateName) {
		return null;
	}

	return (
		<></>
	);
}
