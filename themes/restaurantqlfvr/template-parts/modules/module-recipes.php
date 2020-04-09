<?php
/* Template Name: Restaurants */

// The Query

$args = array(
    'post_type' => 'recipes',
    'posts_per_page' => 4

);

$query_last_recipes = new WP_Query($args);

?>


<section>

    <h1>Last updated</h1>
    <h2>Recipes blog</h2>

    <div class="container d-flex flex-row">


        <?php
        if ($query_last_recipes->have_posts()) :

            // Load posts loop.
            while ($query_last_recipes->have_posts()):
                $query_last_recipes->the_post(); ?>


                <div class="card">
                    <div class="card-image">
                        <?php the_post_thumbnail('thumbnail'); ?>
                    </div>


                    <div class="card-body">
                        <div class="card-header">
                            <div class="card-date"> <?php echo get_the_date() ?></div>

                            <h1><?php the_title(); ?></h1>
                        </div>

                        <?php the_excerpt(); ?>
                        <div class="card-footer">

                            <div class="dots"></div>
                            <a href="<?php the_permalink(); ?>">Read&nbsp;more</a>

                        </div>
                    </div>


                </div>


            <?php
            endwhile;

        // Previous/next page navigation.
        // twentynineteen_the_posts_navigation();

        else :

            // If no content, include the "No posts found" template.
            get_template_part('template-parts/content/content', 'none');

        endif;
        wp_reset_postdata();
        ?>


    </div>
</section>





