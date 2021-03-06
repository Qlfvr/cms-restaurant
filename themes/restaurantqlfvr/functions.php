<?php

// Enqueue stylesheet css/main.css

function restaurantqlfvr_enqueue_style()
{
    wp_enqueue_style('restaurantqlfvr', get_template_directory_uri() . '/css/main.css', false);
}

add_action('wp_enqueue_scripts', 'restaurantqlfvr_enqueue_style');


add_theme_support('post-thumbnails');
add_theme_support('custom-header');

// Create Menu Location

function create_menu_locations()
{
    register_nav_menu('primary', __('Primary'));
// register_nav_menu('secondary',__( 'Secondary' ));
}

add_action('init', 'create_menu_locations');


// Désactiver l'éditeur gutemberg

// for posts
add_filter('use_block_editor_for_post', '__return_false', 10);
// for post types
add_filter('use_block_editor_for_post_type', '__return_false', 10);


?>