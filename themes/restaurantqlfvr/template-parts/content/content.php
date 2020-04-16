<?php
/**
 * Template part for displaying resto posts
 */

?>


<article id="post-<?php the_ID(); ?>" <?php post_class('post-card'); ?>>

    <div class="post-image">
        <?php the_post_thumbnail(); ?>
    </div>
    <div class="post-content">

        <h1><?php the_title(); ?></h1>

        <p><?php the_content(); ?></p>

        <?php if (get_post_type() == "recipes"): ?>

            <p class="text-center"><a class="btn" href="<?php the_permalink(); ?>">Read More</a></p>


        <?php endif; ?>


    </div>

</article>
