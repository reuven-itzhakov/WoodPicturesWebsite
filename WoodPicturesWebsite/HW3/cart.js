// Sets the theme for the site if a theme is stored
if (localStorage.getItem("theme")) {
    var t = new Theme();
    t.updateTheme();
    document.getElementById("theme_dropdown").value = localStorage.getItem("theme"); // sets the choice of the theme in the dropdown menu
}

//to count how many items we have in our table
var item = 1;



function check_credit(){
    var card_num = document.getElementById('card').value;
    if (card_num.length != 16)
        return false;
    var sum = 0;
    var i = 0;
    for (digit of card_num){
        var to_add = ((i%2)+1)*Number(digit);
        while (to_add>0){
            sum += to_add%10
            to_add = Math.floor(to_add/10)
        }
        i++
    }
    return (sum % 10) == 0
}




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



//validate the data that is inputed
function validateInput() {
    var err_msg="";
    //checks if there is any data in the input
    if(!(document.getElementById("fName").value)){
        err_msg="יש להזין שם פרטי";
    }
    if(!check_credit()){
        err_msg="יש להזין אשראי חוקי";
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
    if(!checkId()){
        err_msg="יש להזין ת.ז תקין";
    }
    //if the cart is empty
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
function checkId(){
    var id_num = document.getElementById('id').value;
    if (id_num.length != 9)
        return false;
    var sum = 0;
    var i = 0;
    for (digit of id_num){
        var to_add = ((i%2)+1)*Number(digit);
        while (to_add>0){
            sum += to_add%10
            to_add = Math.floor(to_add/10)
        }
        i++
    }
    return (sum % 10) == 0
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


