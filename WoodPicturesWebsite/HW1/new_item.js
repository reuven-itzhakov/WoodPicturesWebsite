var previewCanvas = document.getElementById('previewCanvas');
var ctx = previewCanvas.getContext('2d');
var subImgToLoad;
var imgToLoad;
var textToLoad;
var w;
var h;
var innerCoords={
    "woodenBlock":{start_x:270,start_y:20,end_x:240,end_y:320},
    "wallet":{start_x:50,start_y:40,end_x:380,end_y:280},
    "case":{start_x:40,start_y:100,end_x:180,end_y:230},
    "cup":{start_x:70,start_y:100,end_x:160,end_y:210}
}



function drawText(text, maxlen, maxlines, x, y, fontSize){
    var lines = text.split("\n");
    ctx.font = `${fontSize}px Agency FB`;
    ctx.textAlign = "center";
    for(var i = 0;i < lines.length; i++){
        ctx.fillText(lines[i], x, y);
        y+=fontSize
    }
}


function updateTheme(){
    // clear any "hard-coded" styles from affected divs
    document.getElementById("head").style.backgroundColor = "";
    document.getElementById("body").style.backgroundColor = "";
    document.getElementById("bottom").style.backgroundColor = "";

    switch (localStorage.getItem("theme")) {
        case "dark":
            document.getElementById("theme").href = "style1.css";
            break;
        case "light":
            document.getElementById("theme").href = "style2.css";
            break;
        case "crazy":
            let randVals = [];
            // Sets to the array randVals 9 numbers that constitute RGB values.
            for (let i = 0; i < 9; i++) {
                randVals.push(Math.floor(Math.random() * 255)); // Gets a random number from 0 to 255
            }
            // Sets the random RGB values from the array to the "crazy" theme
            document.getElementById("head").style.backgroundColor = `rgb(${randVals[0]},${randVals[1]},${randVals[2]})`;
            document.getElementById("body").style.backgroundColor = `rgb(${randVals[3]},${randVals[4]},${randVals[5]})`;
            document.getElementById("bottom").style.backgroundColor = `rgb(${randVals[6]},${randVals[7]},${randVals[8]})`;
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

// An array that contains the divs of unique inputs for each product as elements
var inputDivs = [
document.getElementById("divBlock"),
document.getElementById("divWallet"),
document.getElementById("divCase"),
document.getElementById("divCup")
];

// The function gets an index and sets the inputDivs[index] to be shown
// while others to be hidden
function show(index) {
    for (let i = 0; i < 4; i++) {
        if (i != index) {
        inputDivs[i].style.display = "none";
        } else {
        inputDivs[i].style.display = "block";
        }
    }
}


// this function gets the 'name' attribute of a radio input tag and returns the checked radio
// returns null if no radio is selected
function getRadioSelection(radioName) {
    let s = document.querySelectorAll(`input[name=${radioName}]`);
    for (const element of s) {
        if (element.checked) {
            return element;
        }
    }
    return null;
}

// this function gets the 'name' attribute of a radio input tag, as well as a value between 0 and 1
// it finds the selected radio and sets its corresponding label's opacity to the passed value and the others to 1
function setOpacityOnRadioSelection(radioName, opacity){
    let selection = getRadioSelection(radioName);
    if(selection){
        let radios = document.querySelectorAll(`input[name=${radioName}]`);
        for (const element of radios) {
            document.querySelector(`label[for=${element.id}]`).style.opacity=1;
        }
        document.querySelector(`label[for=${selection.id}]`).style.opacity = opacity;
    }
}

function renderCanvas(){
    var img = new Image();
    img.onload = function(){
        // ctx.fillStyle
        previewCanvas.width = w;
        previewCanvas.height = h;
        ctx.drawImage(img, 0, 0, w, h);
        var frontImg = new Image();
        frontImg.onload = function(){
            ctx.globalAlpha = 0.6;
            var sel = getRadioSelection('product');
            if (sel){
                var x = innerCoords[sel.id].start_x;
                var y = innerCoords[sel.id].start_y;
                var to_x = innerCoords[sel.id].end_x;
                var to_y = innerCoords[sel.id].end_y;
                ctx.drawImage(frontImg, x, y, to_x, to_y);
                ctx.globalAlpha = 1;
                if(document.getElementById("text").value){
                    // f2(document.getElementById("text").value, 18, 6, 130, 50);
                    drawText(document.getElementById("text").value, 18, 6, 130, 50, 50);
                    // f3(document.getElementById("text").value, 18, 6, 130, 50, 30);
                }
            }
        }
        if (subImgToLoad) {
            frontImg.src = subImgToLoad;
        }
    }
    try {
        img.src = imgToLoad;
    }
    catch{
        console.log("error caught")
    }
}

// function draw(src, w, h){
//     var img = new Image();
//     img.onload = function(){
//         previewCanvas.width = w;
//         previewCanvas.height = h;
//         ctx.font = "20px Agency FB"; // set your size and font here
//         ctx.drawImage(img, 0, 0, w, h);
//         var str = "שדג שדג כשדגש דגשעdhdfh dfש";
//         ctx.textAlign = "center"
//         ctx.fillText(str, w/2, h/2); // set your text here
//     }
//     img.src = src;
// }

// For each label of the radio inputs there will be 3 functions that will execute on click event
// show the unique dropdown, set the price of the product and set the opacity for the picture.
document.getElementById("woodenBlock").addEventListener("click", function () {
    show(0);
    setPrice();
    setOpacityOnRadioSelection("product", 0.5);
    imgToLoad = "media/sample wood.jpg"
    w = 540
    h = 360
    renderCanvas();
});
document.getElementById("wallet").addEventListener("click", function () {
    show(1);
    setPrice();
    setOpacityOnRadioSelection("product", 0.5)
    imgToLoad = "media/sample wallet.jpg"
    w = 540
    h = 360
    renderCanvas();
});
document.getElementById("case").addEventListener("click", function () {
    show(2);
    setPrice();
    setOpacityOnRadioSelection("product", 0.5)
    imgToLoad = "media/sample phone_case.png"
    w = 250
    h = 360
    renderCanvas();
});
document.getElementById("cup").addEventListener("click", function () {
    show(3);
    setPrice();
    setOpacityOnRadioSelection("product", 0.5)
    imgToLoad = "media/sample mug.jpg"
    w = 370
    h = 360
    renderCanvas();
});

// Set event listener so the price will update when dropdowns change
document.getElementById("block_size").addEventListener("change", setPrice);
document.getElementById("wallet_comp").addEventListener("change", setPrice);
document.getElementById("phone_model").addEventListener("change", setPrice);
document.getElementById("cupColor").addEventListener("change", setPrice);


document.getElementById("image").addEventListener("change", function() {
    let fr = new FileReader(); // creates a FileReader object
    fr.onload = function () { // sets a function to call upon when fr finishes reading a file
        subImgToLoad = fr.result; // fr.result is what fr read (based on which reading method was used)
        renderCanvas();
    }
    fr.readAsDataURL(document.getElementById("image").files[0])
})


// when the button addToCart clicked, the function will execute:
document.getElementById("addToCart").addEventListener("click", function () {
    if (validateInput()) {
        let sel = getRadioSelection("product"); // gets the checked radio
        if (sel) { // if a radio is selected
            // set order to be an object with price attribute
            let order = {
                price: document.getElementById("price").innerHTML
            };
            // set info to be an object with text and picture attribute
            let info = {
                text: document.getElementById("text").value,
                picture: previewCanvas.toDataURL()
            };
            // creates a new attribute in info according to the product that selected
            switch (sel.value) {
            case "woodenBlock":
                info.size=document.getElementById("block_size").value;
                order.type="block";
                break;
            case "wallet":
                info.wallet_comp=document.getElementById("wallet_comp").value;
                order.type="wallet";
                break;
            case "case":
                info.phone_model=document.getElementById("phone_model").value;
                order.type="case";
                break;
            case "cup":
                info.cupColor=document.getElementById("cupColor").value;
                order.type="cup";
                break;
            }
            order.info=info; // adds the object info to the order
            // If there is no object order in the local storage - sets new one.
            if (!localStorage.getItem("cart")) {
                localStorage.setItem("cart","[]");
            }
            // convert the string to a list
            let cartArr = JSON.parse(localStorage.getItem("cart"));
            // push the item object to the list
            cartArr.push(order);
            // overiding the value to a string representation of the updated list
            localStorage.setItem("cart",JSON.stringify(cartArr));
            }
            alert("המוצר נוסף לסל");
            location.replace("cart.html") // redirect the user to the cart




        // let fr = new FileReader(); // creates a FileReader object
        // fr.onload = function () { // sets a function to call upon when fr finishes reading a file
            // let sel = getRadioSelection("product"); // gets the checked radio
            // if (sel) { // if a radio is selected
            //     // set order to be an object with price attribute
            //     let order = {
            //         price: document.getElementById("price").innerHTML
            //     };
            //     // set info to be an object with text and picture attribute
            //     let raw_str = fr.result // fr.result is what fr read (based on which reading method was used)
            //     let comma = raw_str.indexOf(",")
            //     let info = {
            //         text: document.getElementById("text").value,
            //         picture: raw_str.slice(comma+1) // raw_str has junk info before comma, after comma the real data
            //     };
            //     // creates a new attribute in info according to the product that selected
            //     switch (sel.value) {
            //     case "woodenBlock":
            //         info.size=document.getElementById("block_size").value;
            //         order.type="block";
            //         break;
            //     case "wallet":
            //         info.wallet_comp=document.getElementById("wallet_comp").value;
            //         order.type="wallet";
            //         break;
            //     case "case":
            //         info.phone_model=document.getElementById("phone_model").value;
            //         order.type="case";
            //         break;
            //     case "cup":
            //         info.cupColor=document.getElementById("cupColor").value;
            //         order.type="cup";
            //         break;
            //     }
            //     order.info=info; // adds the object info to the order
            //     // If there is no object order in the local storage - sets new one.
            //     if (!localStorage.getItem("cart")) {
            //         localStorage.setItem("cart","[]");
            //     }
            //     // convert the string to a list
            //     let cartArr = JSON.parse(localStorage.getItem("cart"));
            //     // push the item object to the list
            //     cartArr.push(order);
            //     // overiding the value to a string representation of the updated list
            //     localStorage.setItem("cart",JSON.stringify(cartArr));
            //     }
        // };
        // let fileSelect = document.getElementById("image");
        // fr.readAsDataURL(fileSelect.files[0]); // this is the method that invokes fr.onload()
    }
});

document.getElementById("text").addEventListener("input",renderCanvas);

// the function checks if all input fields are filled and alerts the user if a field is not filled
function validateInput() {
    let radio = getRadioSelection("product"); // get the chosen radio
    if (!radio){
        alert("יש לבחור מוצר");
        return false;
    }
    var opt_dd;
    var err_msg=""
    // each radio option has a different input field
    switch(radio.value){
        case "woodenBlock":
            opt_dd = document.getElementById("block_size")
            err_msg="יש לבחור מידות"
            break;
        case "wallet":
            opt_dd = document.getElementById("wallet_comp")
            err_msg="יש לבחור חברת ארנקים"
            break;
        case "case":
            opt_dd = document.getElementById("phone_model")
            err_msg="יש לבחור סוג טלפון"
            break;
        case "cup":
            opt_dd = document.getElementById("cupColor") 
            err_msg="יש לבחור צבע ספל"
            break;
        default:
            opt_dd=null;
    }
    
    if (opt_dd){
        if(!opt_dd.value){
            alert(err_msg);
            return false;
        }
    }
    if(!document.getElementById("image").value){
        alert("יש להעלות תמונה");
        return false;
    }
    // give the user a choice to not upload a text
    if(!document.getElementById("text").value){
        return confirm("האם להשאיר טקסט ריק?");
    }
    return true;
}

// The function set the price in the price field using the prices of the products
function setPrice() {
    // Object with the price for each product 
    let obj = {
        small: 99,
        medium: 139,
        med_sqr: 109,
        large_sqr: 149,
        guci: 3150,
        tommy: 750,
        louis_vuitton: 6420,
        ip_15p: 110,
        sam_gal: 110,
        xi_po_f2p: 110,
        onePlus: 110,
        gog_pix: 110,
        nok_xp: 110,
        mot_cor: 110,
        white: 120,
        pink: 120,
        cyan: 120
    }
    let opt = getRadioSelection("product");
    let optionChosen;
    // Get the value of the product's dropdown that was chosen
    if(opt){
        switch(opt.value){
            case "woodenBlock":
                optionChosen = document.getElementById("block_size").value;
                break;
            case "wallet":
                optionChosen = document.getElementById("wallet_comp").value;
                break;
            case "case":
                optionChosen = document.getElementById("phone_model").value;
                break;
            case "cup":
                optionChosen = document.getElementById("cupColor").value;
                break;
            default:
                optionChosen = null
        }
    }
    // Set the price accordingly to the product if chosen, else 0.
    if (optionChosen && opt){
        document.getElementById("price").innerHTML = obj[optionChosen];
    }
    else{
        document.getElementById("price").innerHTML = 0;
    }
}

// Checks how many items are in the cart and sets the text in brackets
function updateCartAmount(){
    if (!localStorage.getItem("cart")) {
        localStorage.setItem("cart","[]");
    }
    let cartArr = JSON.parse(localStorage.getItem("cart"));
    document.getElementById("amountInCart").innerHTML = cartArr.length;
}

// Call the function in each run of the page so the number of items in the cart will be updated.
updateCartAmount();