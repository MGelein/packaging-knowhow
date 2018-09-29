/**The coordinates of the orange half */
orangeHalf = {x:1500, y:0};

/**
 * This file contains the main scripts for this webpage.
 */
$(document).ready(function(){
    //Set the svg contents
    $('#svg').html(getOrangeHalf());

    setInterval(function(){
        orangeHalf.x += (640 - orangeHalf.x) * 0.2;
        updateOrangeHalf();
    }, 30);
});

/**
 * Returns the SVG code for the orange half of the 
 * screen
 */
function getOrangeHalf(){
    //Start an empty group for this half
    let html = "<g transform='translate(1500, 0)' id='orangeHalf'>";
    //Start the path
    html += "<path fill='#F68B11' d='";
    html += "M0 720 Q320 360 320 0 L320 -1000 L2000 -1000 L2000 2000 L0 2000 L0 720";
    html += "'/>"
    //End the group and return
    html += "</g>";
    return html;
}

/**
 * Updates the position of the orangeHalf to match it's object position
 */
function updateOrangeHalf(){
    //Now set the transform
    $('#orangeHalf').attr('transform', 'translate(' + orangeHalf.x + "," + orangeHalf.y + ")");
}