// ==UserScript==
// @name       Availability Alert
// @namespace
// @version    0.5
// @description If availailability drops below a user-defined number, bring up an alert.
// @include      *drakesoftware.com/acd/p.htm
// @copyright  2012+, WH
// @require http://code.jquery.com/jquery-latest.js
// @require http://alexschneider.github.io/pushbullet-js/pushbullet.min.js
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_deleteValue
// @author    William Holland
// @updateURL	https://github.com/vdeogmer/AvailabilityAlert/raw/Dev/AvailabilityAlert.tamper.js
// @downloadURL	https://github.com/vdeogmer/AvailabilityAlert/raw/Dev/AvailabilityAlert.tamper.js
// ==/UserScript==

if (GM_getValue("availability") === undefined) {
    GM_setValue("availability", parseInt(prompt("How low should availability be before an alert happens?")));
    GM_setValue("queue",5);
}


PushBullet.APIKey = GM_getValue("pushbulletKey")


if (parseInt(document.getElementsByClassName("avail")[1].innerText) < GM_getValue("availability") ) {
    aAlert("Availability Alert","Availability is at "+ document.getElementsByClassName("avail")[1].innerText + "!");
    GM_setValue("availability",0);
    $('#availabilityAlert').val(GM_getValue("availability"));
}

if (parseInt(document.getElementsByClassName("inq")[1].innerText) > GM_getValue("queue")){
    aAlert("Queue Alert","There is a queue of "+ document.getElementsByClassName("inq")[1].innerText +"!")
}


function aAlert(alertTitle,alertText){
    if(GM_getValue("sound")){
        document.body.innerHTML += '<audio autoplay> <source src="https://drive.google.com/uc?export=download&id=0BzY5Uk5_ea2YRXE3WS1KUzQ1UWs"/></audio>';
    }

    if(PushBullet.APIKey){
        PushBullet.push("note", null, null, {title:alertTitle,body:alertText})
    }else{
        var alertWindow = window.open('',alertTitle,"height=200,width=300")
        alertWindow.document.write(alertText)
    }
}


document.body.innerHTML += "<div><p>Availability Alert:<p><form><input id='minus' type='button' value='-'><input id='availabilityAlert' type ='text' value='"+GM_getValue("availability")+"'><input id='plus' type='button' value='+'><p>Queue Alert:<p><input id='queueMinus' type='button' value='-'><input id='queueAlert' type ='text' value='"+GM_getValue("queue")+"'><input id='queuePlus' type='button' value='+'><p><input id='set' type ='submit' value='Set'></form></div>";
document.body.innerHTML += "<input id='settings' type=button value='Settings'>"
document.body.innerHTML += "<div id='pushbullet'><p>Use Pushbullet?<p><input id='pushYes' type=button value='Yes'><input id='pushNo' type=button value='No'></div>"
document.body.innerHTML += "<div id='sound'><p>Sound on alerts?<p><input id='soundYes' type=button value='Yes'><input id='soundNo' type=button value='No'></div>"
$("#pushbullet").hide()
$("#sound").hide()
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

$("#pushYes").click(function(){
    GM_setValue("pushbulletKey",prompt("Please enter your Pushbullet API key"))
    PushBullet.APIKey = GM_getValue("pushbulletKey")
})

$("#pushNo").click(function(){
    GM_deleteValue("pushbulletKey")
    PushBullet.APIKey = undefined
})

$("#settings").click(function(){
    $("#pushbullet").toggle()
    $("#sound").toggle()
})

$("#soundYes").click(function(){
    GM_setValue("sound",true)
})

$("#soundNo").click(function(){
    GM_deleteValue("sound")
})


