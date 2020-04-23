<footer>

    <div class="footer-grid">

        <!--blog info-->
        <div class="footer-blog-info">
            <h3 class="footer-entry-title"><?php bloginfo('name'); ?></h3>
            <p class="footer-entry-content"><?php echo get_bloginfo('description') ?></p>
        </div>

        <!--social links-->
        <div class="footer-entry-content footer-social-links">
            <?php get_template_part('template-parts/modules/module', 'social-links'); ?>
        </div>

        <!--opening hours-->
        <div class="footer-hours">
            <h4 class="footer-entry-title"><?php echo get_the_title(47); ?></h4> <!--opening hours-->
            <div class="footer-entry-content"><?php echo do_shortcode('[op-overview set_id="47"]'); ?></div>
        </div>
        <!--contact us-->
        <div class="footer-contact">
            <h4 class="footer-entry-title">Contact Us</h4>

            <div class="footer-entry-content contact_us">
                <p class="phone"><?php echo the_field('phone', 35); ?></p>
                <p class="adress"><?php

                    if (have_rows('adress', 35)):
                        while (have_rows('adress', 35)):
                            $row = the_row();
                            $lastRowKey = array_key_last($row);
                            foreach ($row as $key => $value) {
                                echo $value;
                                if ($key != $lastRowKey) {

                                    echo '<br>';
                                }
                            }
                            // Do something...
                        endwhile;
                    else :
                        // no rows found
                    endif;
                    ?>
                </p>
                <p class="email">
                    <?php echo the_field('email', 35); ?>
                </p>
            </div>
        </div>
        <!--instagram feed-->
        <div class="footer-instagram">
            <h4 class="footer-entry-title">Instagram</h4>
            <div class="footer-entry-content">
                <?php // echo do_shortcode('[instagram-feed]'); ?>
            </div>
        </div>


    </div> <!--footer grid-->
    <hr>
</footer>
<?php wp_footer(); ?>

<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/assets/script.js"></script>
</body>

</html>