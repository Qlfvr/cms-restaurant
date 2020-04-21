<?php get_header(); ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main">

            <?php
            /* Start the Loop */
            while (have_posts()) :
                the_post();
                get_template_part('template-parts/content/content', 'single');
            endwhile; // End of the loop.

            get_template_part('template-parts/modules/module', 'recipes'); ?>

        </main><!-- .site-main -->
    </div><!-- .content-area -->

<?php get_footer(); ?>