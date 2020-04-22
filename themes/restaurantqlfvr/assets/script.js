/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function collapseNavbar() {
    var menu = document.getElementById("menuWrapper");

    if (menu.classList.contains("collapsed") == false) {
        menu.classList.add("collapsed");
    } else {
        menu.classList.remove("collapsed");


    }


}