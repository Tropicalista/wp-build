<?php
$message = get_option( GREETING_PLUGIN_OPTION, 'Ciao dal plugin!' );
?>
<p <?php echo get_block_wrapper_attributes(); ?>><?php echo esc_html( $message ); ?></p>
