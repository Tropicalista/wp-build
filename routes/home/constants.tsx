import { __ } from '@wordpress/i18n';
import { createInterpolateElement } from '@wordpress/element';
import { ExternalLink } from '@wordpress/components';
import { SelectControl } from '@wordpress/ui';
import type { Field } from '@wordpress/dataviews';

async function validate( item, field ) {
	const value = field.getValue( { item } );
	const url = 'https://viewlicense.adobe.io/viewsdklicense/jwt';

	if ( ! value || value.length < 8 ) {
		return __( 'Please insert a valid API key.', 'pdf-embed' );
	}

	const data = {
		client_id: value,
		client_device_time: Date.now(),
		//domain: window.location.hostname,
	};

	try {
		const response = await fetch( url, {
			method: 'POST',
			mode: 'cors',
			redirect: 'follow',
			headers: {
				'X-Key-Pair-Version': 'v1',
				'Content-Type': 'application/json',
				'x-api-key': value,
			},
			body: JSON.stringify( data ),
		} );

		if ( ! response?.ok ) {
			return __( 'This key is not valid for this domain.', 'pdf-embed' );
		}
		return null;
	} catch ( error ) {
		return __( 'This key is not valid for this domain.', 'pdf-embed' );
	}
}

const fields: Field< any >[] = [
	{
		id: 'apiKey',
		isValid: {
			required: true,
			custom: validate,
		},
		label: __( 'API Key', 'pdf-embed' ),
		description: createInterpolateElement(
			__(
				'Get your free API key on <a>Adobe Official site</a>.',
				'pdf-embed'
			),
			{
				a: (
					<ExternalLink
						href="https://www.adobe.io/apis/documentcloud/dcsdk/pdf-embed.html"
						target="_blank"
						rel="noreferrer"
					>
						{ __( 'Adobe Official site' ) }
					</ExternalLink>
				),
			}
		),
		type: 'password',
	},
	{
		id: 'embedMode',
		label: __( 'Embed Mode', 'pdf-embed' ),
		type: 'text',
		elements: [
			{
				label: 'Full Window',
				value: 'FULL_WINDOW',
				description: __(
					'Renders the PDF viewer into the full height and width of the parent element.',
					'pdf-embed'
				),
			},
			{
				label: 'Sized Container',
				value: 'SIZED_CONTAINER',
				description: __(
					'The sized container mode displays PDFs in a boxed container with landscape orientation.',
					'pdf-embed'
				),
			},
			{
				label: 'Inline',
				value: 'IN_LINE',
				description: __(
					'All PDF pages rendered in line within a web page.',
					'pdf-embed'
				),
			},
		],
		isValid: {
			required: true,
		},
		Edit: ( { onChange, field, data } ) => {
			const { label, setValue } = field;
			const value = field.getValue( { item: data } );

			return (
				<SelectControl
					label={ label }
					items={ field.elements }
					value={
						field.elements?.find(
							( item ) => item.value === value
						) ?? null
					}
					onValueChange={ ( item ) => {
						if ( item && item.value !== null ) {
							onChange(
								setValue( { item: data, value: item.value } )
							);
						}
					} }
					description={
						field.elements?.find( ( item ) => item.value === value )
							?.description ??
						__( 'Set the embed mode.', 'pdf-embed' )
					}
					required={ !! field.isValid.required }
				/>
			);
		},
	},
	{
		id: 'defaultViewMode',
		label: 'Default View Mode',
		type: 'text',
		description: 'This is a description for the default view mode field.',
		elements: [
			{
				label: 'Single Page',
				value: 'SINGLE_PAGE',
				description: __(
					"This mode displays only a single document page at a time and doesn't show any adjoining page.",
					'pdf-embed'
				),
			},
			{
				label: 'Fit Width',
				value: 'FIT_WIDTH',
				description: __(
					'Expands the page horizontally to the full width of the document pane.',
					'pdf-embed'
				),
			},
			{
				label: 'Fit Page',
				value: 'FIT_PAGE',
				description: __(
					'Displays the entire page in the current view pane.',
					'pdf-embed'
				),
			},
			{
				label: 'Two Column',
				value: 'TWO_COLUMN',
				description: __(
					'Displays two pages of the PDF side by side in the current view pane.',
					'pdf-embed'
				),
			},
			{
				label: 'Two Column Fit Page',
				value: 'TWO_COLUMN_FIT_PAGE',
				description: __(
					'Displays two pages of the PDF side by side where the entire two pages are displayed in the current view pane.',
					'pdf-embed'
				),
			},
			{
				label: 'Continuos (Mobile only)',
				value: 'CONTINUOS',
				description: __(
					'This mode displays all the document pages one after the other and users can easily navigate through the pages by scrolling up or down.',
					'pdf-embed'
				),
			},
		],
		isValid: {
			required: true,
		},
		Edit: ( { onChange, field, data } ) => {
			const { label, setValue } = field;
			const value = field.getValue( { item: data } );

			return (
				<SelectControl
					label={ label }
					items={ field.elements }
					value={
						field.elements?.find(
							( item ) => item.value === value
						) ?? null
					}
					onValueChange={ ( item ) => {
						if ( item && item.value !== null ) {
							onChange(
								setValue( { item: data, value: item.value } )
							);
						}
					} }
					description={
						field.elements?.find( ( item ) => item.value === value )
							?.description ??
						__( 'Set the embed mode.', 'pdf-embed' )
					}
					required={ !! field.isValid.required }
				/>
			);
		},
	},
	{
		id: 'showZoomControl',
		label: 'Show Zoom Control',
		type: 'boolean',
		description: __(
			'Set this to false to hide the zoom-in and zoom-out options available in the right-hand panel. This configuration will work for full window and lightbox embed modes.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'showAnnotationTools',
		label: 'Show Annotation Tools',
		type: 'boolean',
		description: __(
			'If true, tools such as add text, sticky note, highlight, and so on appear in the quick tools menu on the left-hand side in full window embed mode.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'showFullScreen',
		label: 'Show Full Screen',
		type: 'boolean',
		description: __(
			'By default, the full screen toggle appears in the bottom toolbar in sized container embed mode. Set this to false to hide the full screen toggle.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'enableFormFilling',
		label: 'Enable Form Filling',
		type: 'boolean',
		description: __(
			'If true, form filling is enabled and users can edit fields in full window embed mode.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'showDownloadPDF',
		label: 'Show Download PDF',
		type: 'boolean',
		description: __(
			'If true, PDF can be downloaded in all embed modes. Set this to false to disable PDF download.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'showPrintPDF',
		label: 'Show Print PDF',
		type: 'boolean',
		description: __(
			'If true, PDF can be printed in all embed modes. Set this to false to disable PDF printing.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'exitPDFViewerType',
		label: 'Exit PDF Viewer Type',
		type: 'text',
		description: __( 'Configure the top bar close button.', 'pdf-embed' ),
		elements: [
			{
				label: 'Close icon',
				value: 'CLOSE',
			},
			{
				label: 'Back',
				value: 'RETURN',
			},
		],
		isValid: {
			required: true,
		},
		Edit: 'select',
	},
	{
		id: 'showThumbnails',
		label: 'Show Thumbnails',
		type: 'boolean',
		description: __(
			'Page thumbnails are available by default in full window and lightbox embed modes. Set this to false if you want to hide the thumbnails from the right-hand panel.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'showBookmarks',
		label: 'Show Bookmarks',
		type: 'boolean',
		description: __(
			'PDF bookmarks are available by default in full window and lightbox embed modes. Set this to false if you want to hide the bookmarks from the right-hand panel.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'enableLinearization',
		label: 'Enable Linearization',
		type: 'boolean',
		description: __(
			'Enable linearization to optimize PDFs for faster viewing.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'enableAnnotationAPIs',
		label: 'Enable Annotation APIs',
		type: 'boolean',
		description: __(
			'Set this to true to add, update and delete PDF annotations programmatically in full window embed mode.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'includePDFAnnotations',
		label: 'Include PDF Annotations',
		type: 'boolean',
		description: __(
			'This configuration is used with enableAnnotationAPIs to access existing PDF annotations.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'enableSearchAPIs',
		label: 'Enable Search APIs',
		type: 'boolean',
		description: __(
			'Set this to true to perform search operation in the PDF programmatically.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'showDisabledSaveButton',
		label: 'Show Disabled Save Button',
		type: 'boolean',
		description: __(
			'Set this to true to show the save button in disabled state even when there are no changes to be saved to the PDF.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'focusOnRendering',
		label: 'Focus On Rendering',
		type: 'boolean',
		description: __(
			'With this configuration, website developers have the flexibility to control if the PDF should take focus when it is rendered.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'showFullScreenViewButton',
		label: 'Show Full Screen View Button',
		type: 'boolean',
		description: __(
			'Set this to false to hide the full-screen option available in the right-hand panel. This configuration will work for full window and lightbox embed modes.',
			'pdf-embed'
		),
		Edit: 'toggle',
	},
	{
		id: 'dockPageControls',
		label: 'Dock Page Controls',
		type: 'boolean',
		description: __(
			'This is deprecated in full window and lightbox embed modes.',
			'pdf-embed'
		),
		isVisible: ( item ) => {
			return item.embedMode === 'IN_LINE';
		},
		Edit: 'toggle',
	},
	{
		id: 'measurementId',
		label: 'Measurement ID',
		type: 'text',
		description: __(
			'Add your measurement id (G-XXXXXXX) to track pdf events in Google Analytics.',
			'pdf-embed'
		),
	},
];
export { fields };
