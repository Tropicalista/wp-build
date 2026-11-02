<?php
/**
 * Plugin Name: Greeting Plugin
 * Description: Pagina admin per impostare un saluto e blocco Gutenberg che lo mostra.
 * Version: 1.0.0
 * Requires at least: 7.0
 * Text Domain: greeting-plugin
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GREETING_PLUGIN_OPTION', 'greeting_plugin_message' );

require_once plugin_dir_path( __FILE__ ) . 'build/build.php';

function greeting_plugin_register_setting() {
	register_setting(
		'greeting_plugin',
		GREETING_PLUGIN_OPTION,
		array(
			'type'              => 'string',
			'default'           => 'Ciao dal plugin!',
			'show_in_rest'      => true,
			'sanitize_callback' => 'sanitize_text_field',
		)
	);
}
add_action( 'init', 'greeting_plugin_register_setting' );

function greeting_plugin_add_admin_page() {
	add_submenu_page(
		'themes.php',
		__( 'Saluto', 'greeting-plugin' ),
		__( 'Saluto', 'greeting-plugin' ),
		'manage_options',
		'greeting-settings-wp-admin',
		'greeting_plugin_greeting_settings_wp_admin_render_page'
	);
}
add_action( 'admin_menu', 'greeting_plugin_add_admin_page' );

function greeting_plugin_register_block() {
	$asset = include plugin_dir_path( __FILE__ ) . 'packages/greeting-block/build/index.min.asset.php';

	wp_register_script(
		'greeting-plugin-greeting-block',
		plugins_url( 'packages/greeting-block/build/index.min.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version']
	);

	register_block_type(
		plugin_dir_path( __FILE__ ) . 'packages/greeting-block',
		array(
			'editor_script_handles' => array( 'greeting-plugin-greeting-block' ),
		)
	);
}
add_action( 'init', 'greeting_plugin_register_block' );
