<?php
/**
 * Plugin Name: PDF Embed
 * Text Domain: pdf-embed
 */
defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'build/build.php';

add_action( 'admin_menu', function () {
	add_submenu_page(
		'options-general.php',
		__( 'PDF Embed', 'pdf-embed' ),
		__( 'PDF Embed', 'pdf-embed' ),
		'manage_options',
		'pdf-embed-settings-wp-admin',
		'pdf_embed_pdf_embed_settings_wp_admin_render_page'
	);
} );

add_action( 'init', function () {
	register_block_type( __DIR__ . '/build-blocks/viewer' );
} );