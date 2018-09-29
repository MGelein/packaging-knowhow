"use strict";
/**The spead of easing, or easefactr */
const easeFactor = 0.05;
/**The coordinates of the orange half */
var orangeHalf = {x:1500, y:0};
/**The coordinates for the horse head */
var horse = {x:-1000, y:10};
/**The coordinates for the lettering */
var lettering = {x:-1000, y:50};

/**
 * This file contains the main scripts for this webpage.
 */
$(document).ready(function(){
    //Set the svg contents
    $('#svg').html(getOrangeHalf() + getLogo() + getText());

    //Make the draw function run about 30fps
    window.requestAnimationFrame(draw)
});

/**
 * Called every frame
 */
function draw(){
    orangeHalf.x += (640 - orangeHalf.x) * easeFactor;
    horse.x += (620 - horse.x) * easeFactor;
    lettering.x += (10 - lettering.x) * easeFactor;
    

    //Update all the components position
    updateComponents();

    //Request a new animation frame
    window.requestAnimationFrame(draw);
}

/**
 * Returns the embed code for the complete logo
 */
function getLogo(){
    //Return the composite parts that make up the logo
    return getHorse() + getLettering();
}

/**
 * Returns the SVG code to embed the horse head
 */
function getHorse(){
    return "<g id='horse'><image transform='scale(1.5)' xlink:href='logo/logo_horse.svg'></g>"
}

function getText(){
    return "<text x=0 y=500>A.C. Gelein</text>"
}

/**
 * Returns the letterd logo SVG embed code
 */
function getLettering(){
    return "<g id='lettering'><image xlink:href='logo/logo_letters.svg'></g>"
}

/**
 * Returns the SVG code for the orange half of the 
 * screen
 */
function getOrangeHalf(){
    //Start an empty group for this half
    let html = "<g transform='translate(1500, 0)' id='orangeHalf'>";
    //Start the path
    html += "<path fill='#F68B11' d='";
    html += "M0 720 Q320 360 320 0 L320 -1000 L2000 -1000 L2000 2000 L-1000 2000 Z";
    html += "'/>"
    //End the group and return
    html += "</g>";
    return html;
}

/**
 * Update all the components
 */
function updateComponents(){
    updateOrangeHalf();
    updateHorse();
    updateLettering();
}

/**
 * Shortcut to update the orangeHalf position
 */
function updateOrangeHalf(){
    updateGroup("#orangeHalf", orangeHalf);
}

/**
 * Shortcut to update the horse head position
 */
function updateHorse(){
    updateGroup("#horse", horse);
}

/**
 * Shortcut to update the lettering position
 */
function updateLettering(){
    updateGroup("#lettering", lettering);
}

/**
 * Updates the group with the provided ID thourhg the transform
 * property to the x and y in the provided obbject
 * @param {String} id 
 * @param {Object} pos 
 */
function updateGroup(id, pos){
    //Now set the transform
    $(id).attr('transform', 'translate(' + pos.x + "," + pos.y + ")");
}