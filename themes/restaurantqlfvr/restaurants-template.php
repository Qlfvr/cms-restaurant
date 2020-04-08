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

                <?php echo the_field('iframe'); ?>

            </section>

            <!--Reservation section-->

            <section id="reservation" class="section--white">
                <div class="container">
                    <h1>Submit information to place order</h1>
                    <h2>Reserve a table</h2>


                    <div class="reservation-wrapper">

                        <img src="<?php echo the_field('reservation_img'); ?>" alt="" Reservation>

                        <div class="reservation-form-wrapper">
                            <form action="" method="get" class="reservation-form">

                                <div class="form-row">

                                    <fieldset>
                                        <label for="name">Your name: </label>
                                        <input type="text" name="name" id="name" required>
                                    </fieldset>

                                    <fieldset>
                                        <label for="email">Your email: </label>
                                        <input type="email" name="email" id="email" required>
                                    </fieldset>

                                </div>

                                <!--Ligne 2-->
                                <div class="form-row">
                                    <fieldset>
                                        <label for="phone">Phone number </label>
                                        <input type="text" name="phone" id="phone" required>
                                    </fieldset>
                                    <fieldset>
                                        <label for="people">Table for</label>
                                        <select type="people" name="people" id="people" required>
                                            <option value="1">1 Person</option>
                                            <option value="2">2 People</option>
                                            <option value="3">3 People</option>
                                            <option value="4">4 People</option>
                                            <option value="5">5 People</option>
                                            <option value="6">6 People</option>
                                            <option value="7">7 People</option>
                                            <option value="8">8 People</option>
                                        </select>
                                    </fieldset>
                                </div>

                                <div class="form-row">

                                    <fieldset>
                                        <label for="date">Select Date</label>
                                        <input type="date" name="date" id="date" required>

                                    </fieldset>

                                    <fieldset>
                                        <label for="time">Select Time</label>
                                        <input type="time" name="time" id="time" min="09:00" max="21h30" required>
                                    </fieldset>
                                </div>
                                <div class="form-row">

                                    <fieldset>
                                        <label for="message">Your Message</label>
                                        <textarea name="" id="" rows="3"></textarea>
                                    </fieldset>
                                </div>


                                <input class="btn" type="submit" value="Reserve now">
                            </form>
                        </div>
                    </div>

                </div>
            </section>

            <!--Discover our menu section-->

            <section class="section--white">
                <div class="container">
                    <div class="row">
                        <div class="col-6 d-flex flex-column justify-content-between">

                            <div class="img2x2">
                                <img src="https://via.placeholder.com/100X100" alt="">
                                <img src="https://via.placeholder.com/100X100" alt="">
                                <img src="https://via.placeholder.com/100X100" alt="">
                                <img src="https://via.placeholder.com/100X100" alt="">
                            </div>
                        </div>
                        <div class="col-6 d-flex flex-column justify-content-between">

                            <div>
                                <h1>Let's discover food</h1>
                                <h2>Discover our menu</h2>
                            </div>
                            <p class="text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Consequuntur cumque ex
                                laboriosam maiores nobis, placeat quos repellendus! Aliquid aperiam consectetur
                                dignissimos eius est eum maxime mollitia. Deserunt dolorum incidunt labore!

                            </p>
                            <p><a class="btn" href="#">View the full Menu</a></p>
                        </div>
                    </div>
                </div>
            </section>


            <?php get_template_part('template-parts/parts/parts', 'recipes'); ?>


        </main><!-- .site-main -->
    </div><!-- .content-area -->

<?php get_footer(); ?>