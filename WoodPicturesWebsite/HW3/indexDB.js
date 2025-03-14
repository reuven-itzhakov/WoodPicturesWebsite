// set the username and the password for the admin login
var username = "admin";
var password = "admin123";

// check the validation of the input for the admin sign-in field
document.getElementById("sign-in").addEventListener("click", function() {
    inputUsername = document.getElementById("user").value;
    inputPassword = document.getElementById("pass").value;
    if (inputUsername === username && inputPassword === password){
        location.replace("admin.html");
    }
    else{
        alert("שם משתמש או סיסמא שגויים!");
    }
});
// Sets the theme of the website when the dropdown changes.
document.getElementById("theme_dropdown").addEventListener("change", function() {
    localStorage.setItem("theme", document.getElementById("theme_dropdown").value);
    var t = new Theme();
    t.updateTheme();
});

function processInfo(name,text,stars) {
    var review_object = {
            "name":name,
            "text":text,
            "stars":stars
    }
    var reviews = getReviewDb()
    reviews.push(review_object);
    var reviews_str = JSON.stringify(reviews);
	localStorage.setItem("reviews", reviews_str);
}

function getReviewDb(){
	var reviews = localStorage.getItem("reviews");	
    if (reviews == null){
        reviews = [];
    }else {
        reviews = JSON.parse(reviews);
    }
	return reviews;
}
function getAllReviews() {
    var reviews = getReviewDb();
    var textPrint = '';
    
    for (var i = 0; i < reviews.length; i++) {
        var review = reviews[i];
        var starRating=''

        for(var j=0; j<Number(review.stars);j++){
            starRating += '<img src="media/star2.png" width="20" height="20">';
        }
        textPrint += review.name + ', ' + starRating +  '</br>' + review.text;
        textPrint += '</br>';
        textPrint += '</br>';
    }
    
    document.getElementById('p_review').innerHTML = textPrint;
}