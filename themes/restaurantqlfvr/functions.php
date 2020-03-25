<?php  

// Enqueue stylesheet css/main.css

function restaurantqlfvr_enqueue_style() {
wp_enqueue_style( 'restaurantqlfvr', get_template_directory_uri().'/css/main.css', false );
}

add_action( 'wp_enqueue_scripts', 'restaurantqlfvr_enqueue_style' );

?>