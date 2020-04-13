<?php
/* Template Name: Restaurants */

// The Query

$args = array(
    'post_type' => 'resto'
);

$resto_query = new WP_Query($args);

?>
<?php get_header(); ?>


    <div id="primary" class="content-area">
        <main id="main" class="site-main">
            <!--section showing posts-->
            <section class="container">

                <h1>Welcome in Liège</h1>
                <h2>Présentation</h2>

                <?php
                if ($resto_query->have_posts()) {

                    // Load posts loop.
                    while ($resto_query->have_posts()) {
                        $resto_query->the_post();
                        get_template_part('template-parts/content/content', 'restaurants');
                    }

                    // Previous/next page navigation.
                    // twentynineteen_the_posts_navigation();

                } else {

                    // If no content, include the "No posts found" template.
                    get_template_part('template-parts/content/content', 'none');

                }
                wp_reset_postdata();
                ?>

            </section>

            <!--Map section-->
            <?php get_template_part('template-parts/modules/module', 'map'); ?>
            <!--Reservation section-->
            <?php get_template_part('template-parts/modules/module', 'reservation'); ?>
            <!--Discover our menu section-->
            <?php get_template_part('template-parts/modules/module', 'discover-menu'); ?>
            <!--Last recipes-->
            <?php get_template_part('template-parts/modules/module', 'recipes'); ?>


        </main><!-- .site-main -->
    </div><!-- .content-area -->

<?php get_footer(); ?>