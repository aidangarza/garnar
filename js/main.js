// ------------------------------- | AMG
// Scrolling Background Image
// ------------------------------- |
var scrollInterval;

function animateBackground(){
    var scrollSpeed = 70;
    var current = 0;

    function bgscroll(){
        current -= 1;

        $('.scrolling-bg').css("background-position", current+"px 0");
    }

    scrollInterval = setInterval(bgscroll, scrollSpeed);
}

// ------------------------------- | AMG
// Organize icons into circle around headshot
// ------------------------------- |
function makeCircle(passedThis, overshoot){
    var parent = passedThis.parent();

    var radius = passedThis.height() / 2 - 30 + overshoot;

    var fields = passedThis.children(),
        container = passedThis,
        width = container.width(),
        height = container.height(),
        angle = 0,
        step = (2*Math.PI) / fields.length;

    fields.each(function() {
        var x = Math.round(width/2 + radius * Math.cos(angle) - $(this).width()/2),
            y = Math.round(height/2 + radius * Math.sin(angle) - $(this).height()/2);
        $(this).css({
            left: x + 'px',
            top: y + 'px'
        });
        angle += step;
    });
}

// ------------------------------- | AMG
// Rotate icons around headshot
// ------------------------------- |
var rotateInterval;
var currentAngle = 0;

function rotateIcons(passedThis){
    var rotateSpeed = 70;

    function iconRotation(){
        currentAngle += 1

        passedThis.css({
            'transform': 'translate(-50%,-50%) rotate(' + currentAngle + 'deg) translateZ(0)',
            '-moz-transform': 'translate(-50%,-50%) rotate(' + currentAngle + 'deg) translateZ(0)',
            '-webkit-transform': 'translate(-50%,-50%) rotate(' + currentAngle + 'deg) translateZ(0)',
        });
        passedThis.children().css({
            'transform': 'rotate(-' + currentAngle + 'deg) translateZ(0)',
            '-moz-transform': 'rotate(-' + currentAngle + 'deg) translateZ(0)',
            '-webkit-transform': 'rotate(-' + currentAngle + 'deg) translateZ(0)',
        });
    }

    rotateInterval = setInterval(iconRotation, rotateSpeed);
}

// ------------------------------- | AMG
// Add an overshoot effect to the icons
// ------------------------------- |
var endCircle;

function animateIcons(passedThis){
    var iconGroup = passedThis.siblings(".icon-group");

    // Start rotating icons
    rotateIcons(iconGroup);

    // Create initial circle of icons with overshoot
    makeCircle(iconGroup, 10);

    // Remove overshoot
    endCircle = setTimeout(function(){
        // If the mouse has already left the parent wrap, abort
        if (iconGroup.hasClass("open")){
            makeCircle(iconGroup, 0);
        }
    }, 300);
}

// ------------------------------- | AMG
// Fire on DOM load
// ------------------------------- |
$(function(){

    animateBackground();

    // ------------------------------- | AMG
    // Make icons appear / disappear
    // ------------------------------- |
    var headshots = $(".headshot"),
        wraps = $(".headshot-wrap"),
        parents = $(".person-wrap");

    headshots.mouseenter(function(){
        var t = $(this).parent(),
            iconGroup = t.siblings(".icon-group");

        t.parent().addClass("hover");
        iconGroup.addClass("open");
        
        animateIcons(t);
    });

    wraps.mouseleave(function(){
        var t = $(this);

        t.parent().removeClass("hover");
        clearInterval(rotateInterval);
    });

    parents.mouseleave(function(){
        var t = $(this),
            iconGroup = t.find(".icon-group");

        iconGroup.children().removeAttr("style");
        iconGroup.removeClass("open");
        currentAngle = 0;
    });

    // ------------------------------- | AMG
    // Icons Click Events
    // ------------------------------- |
    var iconGroups = $(".icon-group");

    iconGroups.on("click", ".icon", function(){
        console.log(this);
    });

});