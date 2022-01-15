let mouseX = 0; // Used to hold the mouse x position.
let mouseY = 0; // Used to hold the mouse y position.
let id = "a";
let idList = []; // An array storing all id's of each star.
let stars = []; // An array containing all of the stars in the graph. Each star has an x and y position.
let route = []; // An array containing the sequence of stars to visit, in order.
let mouseInGraph;// Boolean value used to determine if the mouse is in the graph area.
let rocketSpawned = false;
let speed = 5; // The ms delay between each movement of the rocket. Changes speed.
let rocketX;
let rocketY;
let destX;
let destY;
let deltaY;
let deltaX;
let totalChangeY;
let totalChangeX;
let moveInProgress = false;
let nextStar = 0;

function getMousePosition(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    return(mouseX + ", " + mouseY);
}

function getStars() {
    return stars;
}

function displayMousePosition(event) {
    var text = getMousePosition(event);
    document.getElementById('coordinates').innerHTML = text;
}

document.addEventListener("mousemove", displayMousePosition);

function addStar(event) {
    mouseY = event.clientY;
    if(mouseY < 750) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        stars.push({
            x: mouseX,
            y: mouseY, 
            edges: []
        });
        id+="a";
        // document.getElementById('graph').innerHTML += "<div id ='" + id + "'style = 'height: 10px; width: 10px; background-color: rgba(247, 255, 173, 0.884); border-radius:75px;'</div>";
        document.getElementById('graph').innerHTML += "<img id = '" + id + "'src = 'Star.png'>"
        idList.push(id);
        document.getElementById(id).style.position = "absolute";
        document.getElementById(id).style.top = mouseY + "px";
        document.getElementById(id).style.left = mouseX + "px";

        for(const star of stars) {
            star.edges.push([mouseX, mouseY]);
        }
    }
}

document.addEventListener("click", addStar);

// //TODO: Move all elements when mouse moves around the graph.
// function moveBackground(event) {
//     for(let i = 0; i < stars.length; i++) {
//         let j = document.getElementById(idList[i]);
//         j.style.transform = "translate(5px,5px)";
//     }
// }

function startRocket() {
    if(rocketSpawned === false) {
        document.getElementById("start").style.visibility = "hidden";

        let startingStar = stars[0];
        rocketX = startingStar.x - 45; // Subtract 45 because images are not centered perfectly.
        rocketY = startingStar.y - 45;
        let text = "<img id = 'rocket' src = 'Alien.png' width = '100' height = '100'>";
        document.getElementById("graph").innerHTML += text;
        document.getElementById("rocket").style.position = 'absolute';
        document.getElementById("rocket").style.top = rocketY + "px";
        document.getElementById("rocket").style.left = rocketX + "px";
        // document.getElementById("alien").style.position = 'absolute';
        // document.getElementById("alien").style.top = document.getElementById("rocket").style.top;
        // document.getElementById("alien").style.left = document.getElementById("rocket").style.left;
        rocketSpawned = true;
        
        setInterval(moveRocket, 15);
    }
}

function updateSpeed() {
    if(moveInProgress === false) {
        destX = stars[nextStar].x - 45;
        destY = stars[nextStar].y - 45;
        deltaY = Math.abs((destY - rocketY) / 100);
        deltaX = Math.abs((destX - rocketX) / 100);
        totalChangeY = Math.abs(destY - rocketY);
        totalChangeX = Math.abs(destX - rocketX);
        while(deltaY / totalChangeY > deltaX / totalChangeX) {
            deltaX+=0.00000001;
        }
        while(deltaX / totalChangeX > deltaY / totalChangeY) {
            deltaY+=0.00000001;
        }
        deltaX/=2;
        deltaY/=2; 
    }
}

function moveRocket() {
    updateSpeed();
    if(Math.sqrt(Math.pow((rocketY - destY), 2) + Math.pow((rocketX - destX), 2)) > 3)  { // The alien is considered to be at the location when their distance is < 3.
        moveInProgress = true;
        if(rocketX < destX) {
            rocketX+=deltaX;
        } else if (rocketX > destX) {
            rocketX-=deltaX;
        } 
        if(rocketY < destY) {
            rocketY+=deltaY;
        } else if (rocketY > destY) {
            rocketY-=deltaY;
        }
        document.getElementById("rocket").style.left = rocketX + "px";
        document.getElementById("rocket").style.top = rocketY + "px";
    } else {
        moveInProgress = false;
        if(nextStar === stars.length - 1) {
            nextStar = 0;
        } else {
            nextStar++;
        }
        updateSpeed();
    }
}