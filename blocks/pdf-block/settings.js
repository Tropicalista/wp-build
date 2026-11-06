import { fields } from './admin/screens/constants.js';
import { DataForm } from '@wordpress/dataviews/wp';
import { useEntityProp } from '@wordpress/core-data';

export const Settings = ( { attributes, setAttributes } ) => {
	const { config } = attributes;

	const handleChange = ( edits ) => {
		setAttributes( {
			config: {
				...config,
				...edits,
			},
		} );
	};

	const newFields = fields.map( ( field ) => {
		const { description, ...rest } = field;
		return rest;
	} );

	return (
		<DataForm
			data={ config || pdf_embed }
			fields={ newFields }
			form={ {
				fields: [
					'embedMode',
					'showZoomControl',
					'showAnnotationTools',
					'showFullScreen',
					'defaultViewMode',
					'enableFormFilling',
					'showDownloadPDF',
					'showPrintPDF',
					'exitPDFViewerType',
					'showThumbnails',
					'showBookmarks',
					'enableLinearization',
					'enableAnnotationAPIs',
					'includePDFAnnotations',
					'enableSearchAPIs',
					'showDisabledSaveButton',
					'focusOnRendering',
					'dockPageControls',
					'showFullScreenViewButton',
				],
				layout: {
					labelPosition: undefined,
					type: 'regular',
				},
			} }
			onChange={ ( edits ) => handleChange( edits ) }
		/>
	);
};
