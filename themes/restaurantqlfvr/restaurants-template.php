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
            <section class="section--white--deco">
                <h1>Find Us</h1>
                <h2>Location</h2>

                <iframe class="osm" width="100%" height="450" frameborder="0" scrolling="no" marginheight="0"
                        marginwidth="0"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=5.55959701538086%2C50.63490032045192%2C5.583543777465821%2C50.64295659411748&amp;layer=mapnik&amp;marker=50.63892862990742%2C5.57157039642334"></iframe>
            </section>

            <!--Reservation section-->


            <section class="section--white">
                <div class="container">
                    <h1>Submit information to place order</h1>
                    <h2>Reserve a table</h2>

                    <img src="https://via.placeholder.com/800x600" alt="">
                </div>
            </section>


        </main><!-- .site-main -->
    </div><!-- .content-area -->

<?php get_footer(); ?>