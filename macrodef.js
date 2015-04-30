<<<<<<< HEAD
// when click button X, send message to background.js
document.getElementById("sav").addEventListener("click", function() {
	chrome.runtime.sendMessage({type: "state", value: "save"});
}, false);
document.getElementById("rcd").addEventListener("click", function () {
	chrome.runtime.sendMessage({type: "state", value: "togglerecord"});
}, false);
document.getElementById("ply").addEventListener("click", function () {
	chrome.runtime.sendMessage({type: "state", value: "play"});
}, false);

// Trigger
document.getElementById("setc").addEventListener("click", function () {
	var yr = document.getElementById("y_sel").value;
	var mo = document.getElementById("m_sel").value;
	var dy = document.getElementById("d_sel").value;
	var tm = document.getElementById("t_sel").value;
	chrome.runtime.sendMessage({type: "cond", value: (yr + " " + mo + " " + dy + " " + tm)});
}, false);



// not done yet
document.getElementById("und").addEventListener("click", function () {
	chrome.runtime.sendMessage({type: "state", value: "undo"});
}, false);
document.getElementById("lod").addEventListener("click", function () {
	chrome.runtime.sendMessage({type: "state", value: "load"});
=======
document.getElementById('sav').addEventListener("click", function() {
	alert("ALERTTTTTT");
>>>>>>> origin/master
}, false);