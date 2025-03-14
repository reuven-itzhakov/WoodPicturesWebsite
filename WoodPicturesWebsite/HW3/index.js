// Sets the theme for the site if a theme is stored
if (localStorage.getItem("theme")) {
    var t = new Theme();
    t.updateTheme();
    document.getElementById("theme_dropdown").value = localStorage.getItem("theme"); // sets the choice of the theme in the dropdown menu
}

// 
function reviewFunction()
{
    var name = document.getElementById('fname').value;
    var text = document.getElementById('text').value;
    var star1 = document.getElementById('star1').checked;
    var star2 = document.getElementById('star2').checked;
    var star3 = document.getElementById('star3').checked;
    var star4 = document.getElementById('star4').checked;
    var star5 = document.getElementById('star5').checked;
    var stars='';
    if(star1){
        stars='1';
    }
    else if(star2){
        stars='2';
    }
    else if(star3){
        stars='3';
    }
    else if(star4){
        stars='4';
    }
    else if(star5){
        stars='5';
    }
    else{
        stars='none';
    }

    var alertmsg= '';
    if(trim(name)==''){
        alertmsg= alertmsg+ "please enter your first name\n";
    }
     if(trim(text)==''){
        alertmsg= alertmsg+ "please enter your review\n";

     }
     if(stars== 'none'){ 
         alertmsg=alertmsg+ "\nplease check a star";
    }
    if(alertmsg!=''){
        alert(alertmsg);

    }

    else{
        document.getElementById('p_sent').innerHTML="חוות הדעת נשמרה בהצלחה";
        processInfo(name,text,stars);
    }

}

// copied from course material
// remove spaces before and after str
function trim (str){
    return str.replace(/^\s+|\s+$/g, '');
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