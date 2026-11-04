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
		type: 'regular',
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

	const { validity } = useFormValidity( settings || {}, fields, form );

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
				'This is a minimal wp-build route that renders DataViews.',
				'pdf-embed'
			) }
			visual={ <img src={ logo } alt="" /> }
			hasPadding={ true }
		>
			<div className="experiments-page__form">
				<Stack gap="lg" align="flex-start">
					<Card.Root>
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
					</Card.Root>
					<Card.Root>
						<Card.Header>
							<Card.Title>Heading</Card.Title>
						</Card.Header>
						<Card.Content>
							<h1>{ __( 'Heading', 'pdf-embed' ) }</h1>
						</Card.Content>
					</Card.Root>
				</Stack>
				<Footer />
			</div>
		</Page>
	);
}

export { Stage as stage };
