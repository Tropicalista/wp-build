<?php
/**
 * Plugin Name: My Plugin
 */
defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'build/build.php';

add_action( 'admin_menu', function () {
    add_submenu_page(
        'options-general.php',
        __( 'My Page', 'my-plugin' ),
        __( 'My Page', 'my-plugin' ),
        'manage_options',
        'my-admin-page-wp-admin',                       // id pagina + "-wp-admin"
        'my_plugin_my_admin_page_wp_admin_render_page'  // callback generata
    );
} );

add_action( 'init', function () {
    register_block_type( __DIR__ . '/packages/my-block' );
}, 20 );