$(document).ready(function(){
	$(".send-button").click(function(){
		sendMessage();	
	});
	$(".message-input").keyup(function(event){
	    if(event.keyCode == 13){
	        sendMessage();
	    }
	});
});
// Handle the debug mode query string parameter.
var debugMode = false;
if (window.location.search.indexOf("debug=1") > -1) {
	$("#toggle").val("Disable Debug Mode");
	debugMode = true;
} else {
	$("#toggle").val("Enable Debug Mode");
}

// Create our RiveScript interpreter.
var rs = new RiveScript({
	debug:   debugMode,
	onDebug: onDebug
});

// This won't work on the web!
//rs.loadDirectory("brain");

// Load our files from the brain/ folder.
rs.loadFile([
	"brain/begin.rive",
	"brain/admin.rive",
	"brain/clients.rive",
	"brain/eliza.rive",
	"brain/myself.rive",
	"brain/rpg.rive",
	"brain/javascript.rive"
	], on_load_success, on_load_error);

// You can register objects that can then be called 
// using <call></call> syntax
rs.setSubroutine('fancyJSObject', function(rs, args){
	// doing complex stuff here
});

function on_load_success () {
	// $("#message").removeAttr("disabled");
	// $("#message").attr("placeholder", "Send message");
	$(".message-input").focus();

	// Now to sort the replies!
	rs.sortReplies();
}

function on_load_error (err) {
	console.log("Loading error: " + err);
}

// Handle sending a message to the bot.
function sendMessage () {
	$('.message-input').focus();
	var text = $(".message-input").val();
	$(".message-input").val("");
	$(".chat-section").append("<div class='chat-row me'><div class='message-box'>" + text + "</div></div>");
	try {
		var reply = rs.reply("soandso", text);
		reply = reply.replace(/\n/g, "<br>");
		$(".chat-section").append("<div class='chat-row'><img class='avatar' src='images/bot.svg' alt='Chat WebBot' width='40' height='40'><div class='message-box'>" + reply + "</div></div>");
		$(".chat-section").animate({"scrollTop": $('.chat-section')[0].scrollHeight});
	} catch(e) {
		window.alert(e.message + "\n" + e.line);
		console.log(e);
	}

	return false;
}

// Button that turns debugging on and off.
function toggleDebug () {
	if (debugMode) {
		window.location = "?debug=0";
	} else {
		window.location = "?debug=1";
	}
}

function onDebug(message) {
	if (debugMode) {
		$("#debug").append("<div>[RS] " + escapeHtml(message) + "</div>");
	}
}

function escapeHtml(text) {
	return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}