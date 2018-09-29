"use strict";
/**The spead of easing, or easefactr */
const easeFactor = 0.05;
/**The coordinates of the orange half */
var orangeHalf = { x: 1500, y: 0 };
/**The coordinates for the horse head */
var horse = { x: -1000, y: 10 };
/**The coordinates for the lettering */
var lettering = { x: -1000, y: 50 };
/**The coordinates for the contact details group */
var contact = {x: 8000, y: 500};
/**How many parts are faded in */
var fadeStage = 0;

/**
 * This file contains the main scripts for this webpage.
 */
$(document).ready(function () {
    //Set the svg contents
    $('#svg').html(getBG() + getOrangeHalf() + getLogo() + getLeftText() + getRightText());

    //Make the draw function run about 30fps
    window.requestAnimationFrame(draw)
});

/**
 * Called every frame
 */
function draw() {
    orangeHalf.x += (640 - orangeHalf.x) * easeFactor;
    horse.x += (620 - horse.x) * easeFactor;
    lettering.x += (32 - lettering.x) * easeFactor;
    contact.x += (1000 - contact.x) * easeFactor;

    fadeInLeft();

    //Update all the components position
    updateComponents();

    //Request a new animation frame
    window.requestAnimationFrame(draw);
}

/**
 * Handles any fading that needs to be done sequentially on the 
 * text on the left (white) size of the screen
 */
function fadeInLeft() {
    if (fadeStage == 0 && fadeIn('#title')) {
        fadeStage++;
    }
    if (fadeStage == 1 && fadeIn('#firstPar')) {
        fadeStage++;
    }
    if (fadeStage == 2 && fadeIn('#secondPar')) {
        fadeStage++;
    }
}

function getBG() {
    return "<rect x=0 y=0 width=2000 height=4000 fill=white/>"
}

/**
 * This helper function will try to fade in the object with the provided id
 * @param {String} id 
 */
function fadeIn(id) {
    //Try to parse the opacity
    let opacity = parseFloat($(id).attr('opacity'));
    //Then calculate how far it is from 1
    let diff = 1 - opacity;
    if (diff < 0.05) {
        //Close enough, just set opacity to one
        $(id).attr('opacity', 1);
        return true;
    } else {
        opacity += diff * easeFactor;
        $(id).attr('opacity', opacity);
        return false;
    }
}

/**
 * Returns the embed code for the complete logo
 */
function getLogo() {
    //Return the composite parts that make up the logo
    return getHorse() + getLettering();
}

/**
 * Returns the text on the left side (white)
 */
function getLeftText() {
    //High negative opacity makes the first fade happen with a delay
    let svg = "<g opacity=-20 id='title'><text class='header orange' x=32 y=350>A.C. Gelein</text></g>";
    svg += "<g id='firstPar' opacity=0><text x=32 y=400>Packaging Knowhow is a passionate one-man bussiness specialized</text>"
    svg += "<text x=32 y=430>in delivering turn-key environmentally friendly packaging solutions.</text></g>"
    svg += "<g id='secondPar' opacity=0><text x=32 y=490>If you have any questions, please don't hesitate to send an email</text>"
    svg += "<text x=32 y=520>or call me on the phone number listed to the right.</text></g>";
    //REturn the assembled string
    return svg;
}

/**
 * Returns the text on the right side (orange)
 */
function getRightText() {
    //High negative opacity makes the first fade happen with a delay
    let svg = "<g id='contact'><text class='header2 white' x=0 y=0>Contact Details:</text></g>";
    //svg += "<g id='firstPar' opacity=0><text x=32 y=400>Packaging Knowhow is a passionate one-man bussiness specialized</text>"
    //svg += "<text x=32 y=430>in delivering turn-key environmentally friendly packaging solutions.</text></g>"
    //svg += "<g id='secondPar' opacity=0><text x=32 y=490>If you have any questions, please don't hesitate to send an email</text>"
    //svg += "<text x=32 y=520>or call me on the phone number listed to the right.</text></g>";
    //REturn the assembled string
    return svg;
}

/**
 * Returns the SVG code to embed the horse head
 */
function getHorse() {
    return "<g id='horse'><image transform='scale(1.5)' xlink:href='logo/logo_horse.svg'></g>"
}

/**
 * Returns the letterd logo SVG embed code
 */
function getLettering() {
    return "<g id='lettering'><image transform='scale(1.15)' xlink:href='logo/logo_letters.svg'></g>"
}

/**
 * Returns the SVG code for the orange half of the 
 * screen
 */
function getOrangeHalf() {
    //Start an empty group for this half
    let html = "<g transform='translate(1500, 0)' id='orangeHalf'>";
    //Start the path
    html += "<path fill='#F68B11' d='";
    html += "M0 720 Q320 360 320 0 L320 -1000 L2000 -1000 L4000 2000 L-3000 4000 Z";
    html += "'/>"
    //End the group and return
    html += "</g>";
    return html;
}

/**
 * Update all the components
 */
function updateComponents() {
    updateOrangeHalf();
    updateHorse();
    updateLettering();
    updateContact();
}

/**
 * Shortcut to update the contact position
 */
function updateContact(){
    updateGroup('#contact', contact);
}

/**
 * Shortcut to update the orangeHalf position
 */
function updateOrangeHalf() {
    updateGroup("#orangeHalf", orangeHalf);
}

/**
 * Shortcut to update the horse head position
 */
function updateHorse() {
    updateGroup("#horse", horse);
}

/**
 * Shortcut to update the lettering position
 */
function updateLettering() {
    updateGroup("#lettering", lettering);
}

/**
 * Updates the group with the provided ID thourhg the transform
 * property to the x and y in the provided obbject
 * @param {String} id 
 * @param {Object} pos 
 */
function updateGroup(id, pos) {
    //Now set the transform
    $(id).attr('transform', 'translate(' + pos.x + "," + pos.y + ")");
}