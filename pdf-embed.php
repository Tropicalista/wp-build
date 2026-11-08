<?php
/**
 * Plugin Name: PDF Embed
 * Text Domain: pdf-embed
 */
defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'build/build.php';

add_action(
	'admin_menu',
	function () {
		add_submenu_page(
			'options-general.php',
			__( 'PDF Embed', 'pdf-embed' ),
			__( 'PDF Embed', 'pdf-embed' ),
			'manage_options',
			'pdf-embed-settings-wp-admin',
			'pdf_embed_pdf_embed_settings_wp_admin_render_page'
		);
	}
);

add_action(
	'init',
	function () {
		register_block_type( __DIR__ . '/build/blocks/pdf-block' );

		$defaults = array(
			'apiKey'                   => '',
			'measurementId'            => '',
			'embedMode'                => 'FULL_WINDOW',
			'showZoomControl'          => true,
			'showAnnotationTools'      => true,
			'showFullScreen'           => true,
			'defaultViewMode'          => 'FIT_PAGE',
			'enableFormFilling'        => false,
			'showDownloadPDF'          => true,
			'showPrintPDF'             => true,
			'exitPDFViewerType'        => 'CLOSE',
			'showThumbnails'           => true,
			'showBookmarks'            => true,
			'enableLinearization'      => false,
			'enableAnnotationAPIs'     => false,
			'includePDFAnnotations'    => false,
			'enableSearchAPIs'         => true,
			'showDisabledSaveButton'   => true,
			'focusOnRendering'         => true,
			'showFullScreenViewButton' => true,
			'dockPageControls'         => true,
			'enableTextSelection'      => false,
		);

		$strings = array( 'apiKey', 'measurementId', 'embedMode', 'defaultViewMode', 'exitPDFViewerType' );

		$properties = array();

		foreach ( $defaults as $key => $value ) {
			if ( in_array( $key, $strings, true ) ) {
				$properties[ $key ] = array(
					'type' => 'string',
				);
			} else {
				$properties[ $key ] = array(
					'type' => 'boolean',
				);
			}
		}

		$args = array(
			'type'         => 'object',
			'default'      => $defaults,
			'show_in_rest' => array(
				'schema' => array(
					'type'                 => 'object',
					'properties'           => $properties,
					'additionalProperties' => false,
				),
			),
		);

		register_setting( 'pdf_embed', 'pdf_embed', $args );

		$options = get_option( 'pdf_embed', false );

		wp_add_inline_script(
			'tropicalista-pdfembed-view-script',
			'const pdf_embed = ' . wp_json_encode( $options ),
			'before'
		);
		wp_add_inline_script(
			'tropicalista-pdfembed-editor-script',
			'const pdf_embed = ' . wp_json_encode( $options ),
			'before'
		);
	}
);
