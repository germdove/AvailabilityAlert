// ==UserScript==
// @name	Availability Alert
// @namespace
// @version	0.4
// @description	If availailability drops below a user-defined number, bring up an alert.
// @include	*drakesoftware.com/acd/p.htm
// @copyright	2012+, WH
// @require	http://code.jquery.com/jquery-latest.js
// @require	http://alexschneider.github.io/pushbullet-js/pushbullet.min.js
// @grant	GM_setValue
// @grant	GM_getValue
// @author    William Holland
// @updateURL	https://github.com/vdeogmer/AvailabilityAlert/raw/Dev/AvailabilityAlert.tamper.js
// @downloadURL	https://github.com/vdeogmer/AvailabilityAlert/raw/Dev/AvailabilityAlert.tamper.js
// ==/UserScript==

PushBullet.APIKey = "";
if (GM_getValue("availability") === undefined) {
    GM_setValue("availability", parseInt(prompt("How low should availability be before an alert happens?")));
    GM_setValue("queue",5);
}
if (parseInt(document.getElementsByClassName("avail")[1].innerText) < GM_getValue("availability") ) {
    document.body.innerHTML += '<embed id="sound_" autostart="true" hidden="true" src="https://github.com/vdeogmer/AvailabilityAlert/raw/Dev/R2D2.wav" />';
    if(PushBullet.APIKey){
        PushBullet.push("note", null, null, {title:"Availability Alert",body:"Availability is at "+ document.getElementsByClassName("avail")[1].innerText + "!"});
    } else {
        alert("Availability is at "+ document.getElementsByClassName("avail")[1].innerText + "!");
    }
    GM_setValue("availability",0);
    $('#availabilityAlert').val(GM_getValue("availability"));
}

if (parseInt(document.getElementsByClassName("inq")[1].innerText) > GM_getValue("queue")){
    if(PushBullet.APIKey){
        PushBullet.push("note", null, null, {title:"Queue Alert",body:"There is a queue of "+ document.getElementsByClassName("inq")[1].innerText +"!"});
    } else {
        alert("There is a queue of "+ document.getElementsByClassName("inq")[1].innerText +"!");
    }
}

document.body.innerHTML += "<div><p>Availability Alert:<p><form><input id='minus' type='button' value='-'><input id='availabilityAlert' type ='text' value='"+GM_getValue("availability")+"'><input id='plus' type='button' value='+'><p>Queue Alert:<p><input id='queueMinus' type='button' value='-'><input id='queueAlert' type ='text' value='"+GM_getValue("queue")+"'><input id='queuePlus' type='button' value='+'><p><input id='set' type ='submit' value='Set'></form></div>"; 
document.body.innerHTML += '<style media="screen" type="text/css"> div { width: 240; text-align: center;} </style>';

$('#plus').click(function(){
    GM_setValue("availability",GM_getValue("availability")+1);
    $('#availabilityAlert').val(GM_getValue("availability"));
});
$('#minus').click(function(){
    GM_setValue("availability",GM_getValue("availability")-1);
    $('#availabilityAlert').val(GM_getValue("availability"));
});
$('#queuePlus').click(function(){
    GM_setValue("queue",GM_getValue("queue")+1);
    $('#queueAlert').val(GM_getValue("queue"));
});
$('#queueMinus').click(function(){
    GM_setValue("queue",GM_getValue("queue")-1);
    $('#queueAlert').val(GM_getValue("queue"));
});

$('#set').click(function(){
    GM_setValue("availability", parseInt($('#availabilityAlert').val()));
    GM_setValue("queue", parseInt($('#queueAlert').val()));
});



