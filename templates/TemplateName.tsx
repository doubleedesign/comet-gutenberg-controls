import React from 'react';
import { EditorControlProps } from '../types';

type TemplateNameProps = EditorControlProps & {
	attributes: {
	}
};

export const TemplateName = ({ name, attributes, setAttributes }: TemplateNameProps) => {
	if (!attributes?.templateName) {
		return null;
	}

	return (
		<></>
	);
};
