import { __, sprintf } from '@wordpress/i18n';
import { store as coreDataStore, useEntityProp } from '@wordpress/core-data';
import { useDispatch, useSelect } from '@wordpress/data';
import { Card, Button, Stack } from '@wordpress/ui';
import { DataForm, useFormValidity } from '@wordpress/dataviews';
import { store as noticesStore } from '@wordpress/notices';
import './style.scss';
import { fields } from './constants';

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

function Footer() {
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

	const { saveEditedEntityRecord } = useDispatch( coreDataStore );
	const { createNotice } = useDispatch( noticesStore );

	const saveSettings = () => {
		return saveEditedEntityRecord( 'root', 'site', undefined, {
			throwOnError: true,
		} )
			.then( () => {
				createNotice(
					'info',
					'🎯 ' + __( 'Settings saved.', 'pdf-embed' ),
					{
						type: 'snackbar',
					}
				);
			} )
			.catch( ( error ) => {
				createNotice( 'error', '⚠️ ' + error.message, {
					type: 'snackbar',
					explicitDismiss: true,
				} );
			} );
	};

	const { validity } = useFormValidity( settings || {}, fields, form );

	return (
		<div className="experiments-page__footer">
			<Stack gap="lg" align="flex-start">
				<Button
					type="submit"
					variant="solid"
					loading={ isSaving }
					disabled={ isSaving || ! hasEdits || ! validity?.isValid }
					onClick={ saveSettings }
				>
					{ __( 'Save settings', 'pdf-embed' ) }
				</Button>
			</Stack>
		</div>
	);
}

export { Footer };
