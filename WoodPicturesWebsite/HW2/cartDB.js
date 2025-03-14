// Sets the theme of the website when the dropdown changes.
document.getElementById("theme_dropdown").addEventListener("change", function() {
    localStorage.setItem("theme", document.getElementById("theme_dropdown").value);
    updateTheme();
});

//calculates the sum of the order
function calcSum(cart){
    //calculate sum
    var sum = 0;
    for (let i = 0; i < cart.length; i++) {
        sum = sum + Number(cart[i].price);
    }
    return sum;
}

//retrieves the cart from the local storage, and returns the data decoded as an array
function getcart(){
    var str_obj = localStorage.getItem("cart")     // str_obj = "[{Key1:value1,key2:value2},{},{},{}]"
    return JSON.parse(str_obj)               // real_obj = [{Key1:value1,key2:value2},{},{},{}]
}

//finds which kind of product we are dealing with and returns the respected string
function typeOfProduct(order){
    switch(order.type){
        case "block":
            return "מידות: " + order.info.size;
            break;
        case "wallet":
            return "חברת ארנק: " + order.info.wallet_comp;
        case "case":
            return "סוג פלאפון: "+ order.info.phone_model;
        case "cup":
            return "צבע: " + order.info.cupColor;
    }
}


//empty the array of cart and restart the process
function restartArray(){
    if(localStorage.getItem("orders")){
        var ordersStr = localStorage.getItem("orders");
        var ordersObj = JSON.parse(ordersStr);
    }else{
        ordersObj = [];
    }
    var order = {
        fName : document.getElementById("fName").value,
        lName : document.getElementById("lName").value,
        address : document.getElementById("address").value,
        city : document.getElementById("city").value,
        phone : document.getElementById("phone").value,
        email : document.getElementById("email").value,
        cart : getcart()
    }
    ordersObj.push(order);
    localStorage.setItem("orders",JSON.stringify(ordersObj));
    localStorage.setItem("cart","[]");
    item = 1;
}
