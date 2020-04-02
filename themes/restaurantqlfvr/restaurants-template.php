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

        </main><!-- .site-main -->
    </div><!-- .content-area -->

<?php get_footer(); ?>