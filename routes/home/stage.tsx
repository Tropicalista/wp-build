import { Page } from '@wordpress/admin-ui';
import { __ } from '@wordpress/i18n';
import { store as coreDataStore, useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { Card, Spinner, Stack } from '@wordpress/ui';
import { DataForm, useFormValidity } from '@wordpress/dataviews';
import logo from '../../assets/logo.svg';
import './style.scss';
import { fields } from './constants';
import { Footer } from './footer';
import Help from './help';

const form = {
	fields: [
		'apiKey',
		'embedMode',
		'showZoomControl',
		'showAnnotationTools',
		'showFullScreen',
		'defaultViewMode',
		'height',
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
		'enableTextSelection',
		'showDisabledSaveButton',
		'focusOnRendering',
		'showFullScreenViewButton',
		'dockPageControls',
		'measurementId',
	],
	layout: {
		labelPosition: undefined,
		type: 'regular' as const,
	},
};

function Stage() {
	const [ settings ] = useEntityProp( 'root', 'site', 'pdf_embed' );

	const { isSaving, hasEdits, hasResolved } = useSelect(
		( select ) => ( {
			hasResolved: select( coreDataStore ).hasFinishedResolution(
				'getEntityRecord',
				[ 'root', 'site' ]
			),
			isSaving: select( coreDataStore ).isSavingEntityRecord(
				'root',
				'site'
			),
			hasEdits: select( coreDataStore ).hasEditsForEntityRecord(
				'root',
				'site',
				undefined,
				'pdf_embed'
			),
		} ),
		[]
	);

	const { editEntityRecord } = useDispatch( coreDataStore );

	const handleChange = ( edits ) => {
		editEntityRecord( 'root', 'site', undefined, {
			pdf_embed: {
				...settings,
				...edits,
			},
		} );
	};

	const { validity, isValid } = useFormValidity(
		settings || {},
		fields,
		form
	);

	if ( ! settings || ! hasResolved ) {
		return (
			<Stack
				align="center"
				direction="row"
				gap="sm"
				className="experiments-page__stage-loading"
			>
				<Spinner color="currentColor" />
				<span>Loading…</span>
			</Stack>
		);
	}

	return (
		<Page
			title={ __( 'Settings', 'pdf-embed' ) }
			subTitle={ __(
				'Here you can set the global settings that will be available for all Pdf Embed blocks sitewide. This settings are also valid for lightbox.',
				'pdf-embed'
			) }
			visual={ <img src={ logo } alt="" /> }
			hasPadding={ true }
		>
			<div className="experiments-page__form">
				<Stack
					gap="lg"
					align="flex-start"
					className="experiments-page__content"
				>
					<Card.Root className="colonna-sinistra">
						<Card.Header>
							<Card.Title>Heading</Card.Title>
						</Card.Header>
						<Card.Content>
							<DataForm
								data={ settings }
								fields={ fields }
								form={ form }
								validity={ validity }
								onChange={ ( edits ) => handleChange( edits ) }
							/>
						</Card.Content>
						<Footer isValid={ isValid } />
					</Card.Root>
					<Help />
				</Stack>
			</div>
		</Page>
	);
}

export { Stage as stage };
