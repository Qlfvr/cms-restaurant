<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
    <meta charset="<?php bloginfo('charset'); ?>"/>
    <title><?php wp_title(); ?></title>
    <link href="https://fonts.googleapis.com/css?family=Poppins:100, 200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet">
    <link rel="profile" href="http://gmpg.org/xfn/11"/>
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>"/>
    <?php if (is_singular() && get_option('thread_comments')) wp_enqueue_script('comment-reply'); ?>
    <?php wp_head(); ?>
    <style>
        header {
        <?php

         if (has_post_thumbnail() && !is_single()){
         echo "background: url('"; the_post_thumbnail_url(); echo "') center / cover no-repeat;";
         }
        /* else {
             echo "background: url('".get_header_image()."') center / cover no-repeat;";
         }*/

         ?>
        }
    </style>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<header>


    <nav class="navbar">
        <h1 class="site-title"><a href="<?php home_url(); ?>/"><?php bloginfo('name'); ?></a></h1>


        <div id="menuWrapper" class="menu-wrapper">
            <button id="burger" class="burger-button" onclick="collapseNavbar()">
                Menu &nbsp;
                <img src="<?php echo get_template_directory_uri() ?>/assets/icons/burger.svg" alt="">
            </button>

            <button id="closeMenu" class="close-menu" onclick="collapseNavbar()">
                <img src="<?php echo get_template_directory_uri() ?>/assets/icons/close.svg " alt="">

            </button>

            <?php
            wp_nav_menu(
                array(
                    'theme_location"' => 'primary',
                    'container' => '', /* No need for a container since ul menu in nav tag*/
                    'menu_class' => 'primary-menu',


                )
            );
            ?>
        </div>
    </nav>

    <div id="header-title">
        <?php echo the_field('heading'); ?>
    </div>
</header>