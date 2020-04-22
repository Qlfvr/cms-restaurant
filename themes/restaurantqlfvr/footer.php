<footer>
    <div class="container">

        <div class="row">

            <div class="col-3 d-flex align-self-center">
                <h3><?php bloginfo('name'); ?></h3>
            </div>
            <div class="col-3 d-flex align-self-center">
                <h4> <?php echo get_the_title(47); ?></h4>
            </div>
            <div class="col-3 d-flex align-self-center">
                <h4>Contact Us</h4>
            </div>
            <div class="col-3 d-flex align-self-center">
                <h4>Instagram</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-3">
                <p><?php echo get_bloginfo('description') ?>
                </p>


            </div>
            <div class="col-3">


                <?php echo do_shortcode('[op-overview set_id="47"]'); ?>


            </div>
            <div class="col-3 contact_us ">
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
            <div class="col-3">
                <?php // echo do_shortcode('[instagram-feed]'); ?>
            </div>
        </div>
        <hr>

    </div>
</footer>

<?php wp_footer(); ?>

<script type="text/javascript" src="<?php echo get_template_directory_uri() ?>/assets/script.js"></script>
</body>

</html>