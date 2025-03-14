function updateTheme(){
    // clear any "hard-coded" styles from affected divs
    document.getElementById("head").style.backgroundColor = "";
    document.getElementById("body").style.backgroundColor = "";

    switch (localStorage.getItem("theme")) {
        case "dark":
            document.getElementById("theme").href = "style1.css";
            break;
        case "light":
            document.getElementById("theme").href = "style2.css";
            break;
        case "crazy":
            let randVals = [];
            // Sets to the array randVals 6 numbers that constitute RGB values.
            for (let i = 0; i < 6; i++) {
                randVals.push(Math.floor(Math.random() * 255)); // Gets a random number from 0 to 255
            }
            // Sets the random RGB values from the array to the "crazy" theme
            document.getElementById("head").style.backgroundColor = `rgb(${randVals[0]},${randVals[1]},${randVals[2]})`;
            document.getElementById("body").style.backgroundColor = `rgb(${randVals[3]},${randVals[4]},${randVals[5]})`;
            document.getElementById("theme").href = "";
            break;
        default:
            break;
    }
    
}
    
// Sets the theme for the site if a theme is stored
if (localStorage.getItem("theme")) {
    updateTheme();
    document.getElementById("theme_dropdown").value = localStorage.getItem("theme"); // sets the choice of the theme in the dropdown menu
}
// Sets the theme of the website when the dropdown changes.
document.getElementById("theme_dropdown").addEventListener("change", function() {
    localStorage.setItem("theme", document.getElementById("theme_dropdown").value);
    updateTheme();
});
//to count how many items we have in our table
var item = 1;

//creating the dynamic table
function createTable() {
    var table = document.getElementById("myTable");
    var sum = document.getElementById("sum");
    //retrieve the cart from the local storage
    var cart = getcart();
    //calculate the sum of the entire order and show it
    sum.appendChild(document.createTextNode(calcSum(cart)));

    //if local storage is empty
    if(cart.length == 0){
    createRow(table,"אין פריטים בעגלה");
    }else{
        // Create  table rows dynamically
    for (var i = 0; i < localStorage.cart.length; i++) {
        //create the row
        var row = document.createElement("tr");
        //create the column
        var cell = document.createElement("td");
        //create the text
        var text = document.createTextNode('- פריט ' + item + ' - ');
        //connect the text to the cell
        cell.appendChild(text);
        //connect the cell to the row
        row.appendChild(cell); 
        //create the column
        var miniTableCol = document.createElement("td");
        //create the mini table inside the column
        miniTableCol.appendChild(createMiniTable(cart[i]));
        //connect the mini table to the row
        row.appendChild(miniTableCol);
        //connect the entire row 
        table.appendChild(row);
        //increase the item number
        item++;
    }
}
}

    //creates a table inside the main table, with the info of the item
    function createMiniTable(order){
        var table = document.createElement("table");
        createRow(table,"סוג מוצר:"+order.type);
        createRow(table,typeOfProduct(order));
        createRow(table,"מחיר:"+order.price);
        table.border = "1";
        return table;
    }

    //creates a table row with the needed data
    function createRow(table, string){
        //creates a table row
        var row = document.createElement("tr");
        //creates a table column
        var cell = document.createElement("td");
        //creates a text node
        var text = document.createTextNode(string);
        cell.appendChild(text);
        cell.style.fontSize = "17px";
        row.appendChild(cell);
        table.appendChild(row);
    }

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
        cart : getcart(),
    }
    ordersObj.push(order);
    localStorage.setItem("orders",JSON.stringify(ordersObj));
    localStorage.setItem("cart","[]");
    item = 1;
}

//validate the data that is inputed
function validateInput() {
    var err_msg="";
    
    //checks if there is any data in the input
    if(!(document.getElementById("fName").value)){
        err_msg="יש להזין שם פרטי";
    }
    if(!(document.getElementById("lName").value)){
        err_msg="יש להזין שם משפחה";
    }
    if(!(document.getElementById("email").value)){
        err_msg="יש להזין אימייל ";
    }
    if(!(document.getElementById("phone").value)){
        err_msg="יש להזין מספר טלפון";
    }
    if(!(document.getElementById("address").value)){
        err_msg="יש להזין כתובת";
    }
    if(!(document.getElementById("city").value)){
        err_msg="יש להזין עיר";
    }
    //special check for the id
    if(checkId(document.getElementById("id").value)){
        err_msg="יש להזין ת.ז תקין";
    }
    //special check for the card
    if(checkCard(document.getElementById("card").value)){
        err_msg="יש להזין מספר כרטיס תקין";
        
    }
    if(!getcart()){
        err_msg="אין פריטים בעגלה";
    }
    //if there is no err msg, everything is good, if not, error message will be displayed
    if (err_msg != ''){
        alert(err_msg);
        return false;
    }
    return true;

}

//checks if the id has 9 numbers
function checkId(id){
    if(!id){
        return true;
    }
    if(id.length != 9){
        return true;
    }
    return false;
}

//checks if the card has 16 numbers
function checkCard(card){
    if(!card){
        return true;
    }
    if(card.length != 16){
        return true;
    }
    return false;
}

//an event listener that waits for a click on the button
document.getElementById("buy").addEventListener("click", function () {
    //if the input is valid, alert thanks for buying, and restart the cart
    if(validateInput()){
        alert("תודה שרכשתם");
        restartArray();
        location.replace("index.html")
    }
});




createTable();


