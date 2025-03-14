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
    //retrieve the orders from the local storage
    var orders = getOrders();

    //if local storage is empty
    if(orders.length == 0){
    createRow(table,"אין הזמנות");
    table.setAttribute("border","solid");
    }else{
        // Create  table rows dynamically
    for (var i = 0; i < orders.length; i++) {
        //create the row
        var row = document.createElement("tr");
        //create the column
        var cell = document.createElement("td");
        //create the text
        var text = document.createTextNode('- הזמנה ' + item + ' - ');
        //connect the text to the cell
        cell.appendChild(text);
        //connect the cell to the row
        row.appendChild(cell); 
        //create the column
        var miniTableCol = document.createElement("td");
        //create the mini table inside the column
        miniTableCol.appendChild(createMiniTable(orders[i]));
        //connect the mini table to the row
        row.appendChild(miniTableCol);
        //connect the entire row 
        table.appendChild(row);
        //increase the item number
        item++;
    }
    //table.setAttribute("border","solid");
}
}

    //creates a table inside the main table, with the info of the item
    function createMiniTable(order){
        var table = document.createElement("table");
        var tr1 = document.createElement("tr");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td");
        td1.appendChild(createCustomerTable(order));
        td2.appendChild(createOrderTable(order));
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        table.appendChild(tr1);
        table.border = "1";
        return table;
    }

    //creates a table inside the main table, with the info of the item
    function createCustomerTable(order){
        var table = document.createElement("table");
        createRow(table,"שם פרטי: "+order.fName);
        createRow(table,"שם משפחה: "+order.lName);
        createRow(table,"טלפון: "+order.phone);
        createRow(table,"מייל: "+order.email);
        createRow(table,"כתובת: "+order.address);
        createRow(table,"עיר: "+order.city);
        //table.border = "1";
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

    function createOrderTable(order){
        var table = document.createElement("table");
        for (let i = 0; i < order.cart.length; i++) {
            var tr = document.createElement("tr");
            var td = document.createElement("td");
            td.appendChild(createMiniTableCart(order.cart[i]));
            tr.appendChild(td);
            table.appendChild(tr)
        }
        table.border = "1";
        return table;
    }
    
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

//creates a table inside the main table, with the info of the item
function createMiniTableCart(item){
    var table = document.createElement("table");
    createRow(table,"סוג מוצר:"+item.type);
    createRow(table,typeOfProduct(item));
    createRow(table,"מחיר:"+item.price);
    //table.border = "1";
    return table;
}


function getOrders(){
    var str_obj = localStorage.getItem("orders")     // str_obj = "[{Key1:value1,key2:value2},{},{},{}]"
    return JSON.parse(str_obj)               // real_obj = [{Key1:value1,key2:value2},{},{},{}]
}

createTable();