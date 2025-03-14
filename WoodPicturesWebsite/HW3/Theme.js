class Theme {
    constructor(){
        if (Theme.instance){
            return Theme.instance;
        }
        Object.freeze(this);
        Theme.instance = this;
    }
    
    updateTheme(){
        // clear any "hard-coded" styles from affected divs
        var head = document.getElementById("head");
        if(head)
            head.style.backgroundColor = "";

        var body = document.getElementById("body");
        if(body)
            body.style.backgroundColor = "";

        var bottom = document.getElementById("bottom");
        if(bottom)
            bottom.style.backgroundColor = "";

    
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
                if(head)
                    head.style.backgroundColor = `rgb(${randVals[0]},${randVals[1]},${randVals[2]})`;
                if(body)
                    body.style.backgroundColor = `rgb(${randVals[3]},${randVals[4]},${randVals[5]})`;
                if(bottom)
                    bottom.style.backgroundColor = `rgb(${randVals[6]},${randVals[7]},${randVals[8]})`;
                document.getElementById("theme").href = "";
                break;
            default:
                break;
        }
        
    }

}
