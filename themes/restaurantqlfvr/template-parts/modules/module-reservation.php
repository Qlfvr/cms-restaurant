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
