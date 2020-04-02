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
    </div>

</article>
