<div class="container">
    <article id="post-<?php the_ID(); ?>" <?php post_class('article-recipe'); ?>>
        <header class="entry-header">

            <div class="d-flex justify-content-between">
                <div>retour | <?php echo get_the_date(); ?></div>
                <div>
                    <?php
                    $categories = get_categories(array(
                        'orderby' => 'name',
                        'parent' => 0
                    ));

                    foreach ($categories as $category) {
                        printf('<a href="%1$s">%2$s</a> ',
                            esc_url(get_category_link($category->term_id)),
                            esc_html($category->name)
                        );
                    }
                    ?> </div>
            </div>

            <h1><?php echo get_the_title() ?></h1>

            <?php the_excerpt(); ?>

            <div class="entry-thumbnail">
                <?php the_post_thumbnail(); ?>
            </div>

        </header>

        <div class="d-flex">

            <div class="article-recipe-social-area">
                <?php get_template_part('template-parts/modules/module', 'social-links'); ?>
            </div>

            <div class="entry-content">

                <div>
                    <h2>Ingredients</h2>
                    <?php
                    echo "for ";
                    the_field('people');
                    echo " people";
                    echo " - preparation ";
                    the_field('duration');
                    echo " min :";
                    // check if the repeater field has rows of data
                    if (have_rows('ingredients')): ?>
                        <ul>
                            <?php
                            // loop through the rows of data
                            while (have_rows('ingredients')) : the_row();
                                echo "<li>";
                                // display a sub field value
                                the_sub_field('ingredient');
                                echo "</li>";
                            endwhile; ?>
                        </ul>
                    <?php
                    else :
                        // no rows found
                    endif;
                    ?>
                </div>

                <div>
                    <h2>Instructions</h2>
                    <?php
                    // check if the repeater field has rows of data
                    if (have_rows('instructions')): ?>
                        <ol>
                            <?php
                            // loop through the rows of data
                            while (have_rows('instructions')) : the_row();
                                echo "<li>";
                                // display a sub field value
                                the_sub_field('steps');
                                echo "</li>";
                            endwhile; ?>
                        </ol>
                    <?php
                    else :
                        // no rows found
                    endif;
                    ?>
                </div>

                <?php
                /*        the_content();*/
                ?>
            </div><!-- .entry-content -->
        </div> <!-- wrapper .entry-content & .social-links -->
        <!--   <footer class="entry-footer">
           </footer>-->
    </article><!-- #post-<?php the_ID(); ?> -->
</div>