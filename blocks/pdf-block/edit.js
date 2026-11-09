import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import { Fragment, createInterpolateElement } from '@wordpress/element';
import {
	Placeholder,
	PanelBody,
	__experimentalToggleGroupControl as ToggleGroupControl,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { KeyInput } from './key-input';
import { Viewer } from './viewer';
import { Settings } from './settings.js';
import { useEntityProp } from '@wordpress/core-data';
import { SelectControl } from '@wordpress/ui';

export const MIN_PREVIEW_HEIGHT = 200;
export const MAX_PREVIEW_HEIGHT = 2000;

export default function Edit( props ) {
	const [ pdfEmbedSettings ] = useEntityProp( 'root', 'site', 'pdf_embed' );

	const {
		attributes: { type, config },
		setAttributes,
	} = props;

	const helpString = createInterpolateElement(
		__( 'Use <a>global settings</a>.' ),
		{
			a: (
				<a
					href={ addQueryArgs( 'options-general.php', {
						page: 'pdf-embed-settings-wp-admin',
					} ) }
					target="_blank"
					rel="noreferrer"
				>
					{ __( 'global settings', 'pdf-embed' ) }
				</a>
			),
		}
	);

	const blockProps = useBlockProps( {
		style: {
			height: null,
			minHeight: null,
		},
	} );

	if ( pdf_embed?.apiKey || pdfEmbedSettings?.apiKey ) {
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
						title={ __( 'Settings', 'pdf-embed' ) }
						initialOpen={ true }
					>
						<ToggleGroupControl
							value={ type ?? 'global' }
							isBlock
							help={
								'local' === type
									? __( 'Use local settings.', 'pdf-embed' )
									: helpString
							}
							__next40pxDefaultSize
							onChange={ ( val ) => {
								if ( ! config ) {
									setAttributes( {
										config: pdfEmbedSettings,
									} );
								}
								setAttributes( { type: val } );
							} }
						>
							<ToggleGroupControlOption
								value="global"
								label={ __( 'Global', 'pdf-embed' ) }
							/>
							<ToggleGroupControlOption
								value="local"
								label={ __( 'Local', 'pdf-embed' ) }
							/>
						</ToggleGroupControl>
						{ 'local' === type && <Settings { ...props } /> }
					</PanelBody>
				</InspectorControls>
				<Viewer { ...props } />
			</Fragment>
		);
	}

	return (
		<div { ...blockProps }>
			<Placeholder
				icon={ 'pdf' }
				instructions={ __(
					'Please insert a free api key to start using this block.',
					'pdf-embed'
				) }
				label={ __( 'PDF Embed', 'pdf-embed' ) }
				isColumnLayout
			>
				<KeyInput />
			</Placeholder>
		</div>
	);
}
