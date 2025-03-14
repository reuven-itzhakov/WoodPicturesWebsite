// Sets the theme of the website when the dropdown changes.
document.getElementById("theme_dropdown").addEventListener("change", function() {
    localStorage.setItem("theme", document.getElementById("theme_dropdown").value);
    var t = new Theme();
    t.updateTheme();
});

function get_cart() {
    var cart_str = localStorage.getItem("cart");
    if(cart_str){
        var cart_obj = JSON.parse(cart_str);
        return cart_obj;
    }
    return [];
}

function add_to_cart(item){
    var cart = get_cart();
    cart.push(item);
    var cart_str = JSON.stringify(cart);
    localStorage.setItem("cart",cart_str);
}