<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <title><?php wp_title(); ?></title>
    <link href="https://fonts.googleapis.com/css?family=Poppins:100, 200,300,400,500,600,700,800,900&display=swap"
        rel="stylesheet">
    <link rel="profile" href="http://gmpg.org/xfn/11" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
    <?php if ( is_singular() && get_option( 'thread_comments' ) ) wp_enqueue_script( 'comment-reply' ); ?>
    <?php wp_head(); ?>
</head>

<body>
    <?php wp_body_open(); ?>

    <header>
        <nav>
            <h1><?php bloginfo('name') ;?></h1>




            <?php 
wp_nav_menu(
        array(
        'theme_location"' =>  'primary',
         'container_class' => 'primary-menu' 
         )
); 
?>
        </nav>
    </header>