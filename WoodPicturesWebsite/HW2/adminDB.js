// Sets the theme of the website when the dropdown changes.
document.getElementById("theme_dropdown").addEventListener("change", function() {
    localStorage.setItem("theme", document.getElementById("theme_dropdown").value);
    updateTheme();
});

//finds which kind of product we are dealing with and returns the respected string
function typeOfProduct(item){
    switch(item.type){
        case "block":
            return "מידות: " + item.info.size;
            break;
        case "wallet":
            return "חברת ארנק: " + item.info.wallet_comp;
        case "case":
            return "סוג פלאפון: "+ item.info.phone_model;
        case "cup":
            return "צבע: " + item.info.cupColor;
    }
}

// Gets the orders from the local storage and returns the orders as an object
function getOrders(){
    var str_obj = localStorage.getItem("orders");
    if (str_obj)
        return JSON.parse(str_obj);
    //if there are no orders, return an empty array
    return [];
}