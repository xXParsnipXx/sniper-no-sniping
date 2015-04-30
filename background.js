<<<<<<< HEAD
var macro = []; // the array of actions: updated by webpageinject.js
var actionNo = 0; // current action we are on
var earls = [];
var isRecording = false;
var injectCount = 0; // for reinjectCS
var actionsUpdated = 0; // for addAction
var tC = []; // tC[0] = year, tC[1] = month, tC[2] = day, tC[3] = time

// called when browser action clicked
// create window and add listeners
function createWindow(tab) {
	// create window
	var windowProps = {url: "http://www.princeton.edu/~shuyangl/", type: "panel", width: 600, height: 720};
	var windowCreated = chrome.windows.create(windowProps);

	// add listeners
	addListeners();
}
chrome.browserAction.onClicked.addListener(createWindow);

// add listeners
function addListeners() {
	chrome.runtime.onMessage.addListener(handleMessage); 
	chrome.tabs.onRemoved.addListener(onParsnipClose);
}

// remove listeners
function removeListeners() {
	chrome.runtime.onMessage.removeListener(handleMessage);
	chrome.tabs.onRemoved.removeListener(onParsnipClose);
}

// called when parsnip tab closed
// remove da listeners
function onParsnipClose(tab) {
	// close if the closed tab is the parsnip tab
	if (tab.url == "http://www.princeton.edu/~shuyangl/") {
		removeListeners();
	}
}

// once page is updated, do next action
function addAction(tab) {

	// on updated is activated 3 times
	actionsUpdated++;
	if (actionsUpdated % 3 == 0) {

		// do actions until URL changes
		startURL = earls[actionNo];
		for (var i = actionNo; i < macro.length; i++) {
			if (earls[i] == startURL) {
				chrome.tabs.executeScript(tab.id, {code:macro[actionNo]});
				actionNo++;
			}
			else {
				break;
			}
		}

		// when last action performed, reset variables
		if (actionNo >= macro.length) {
			actionNo = 0;
			actionsUpdated = 0;
			chrome.tabs.onUpdated.removeListener(addAction);
		}
	}
}

// when page is updated, reinject content script (webpageinject.js)
function reinjectCS(tab) {
	injectCount = injectCount + 1;
	if (injectCount % 3 == 0) {
		chrome.tabs.executeScript(tab.id, {file: 'webpageinject.js'});
	}
}

// called by handleMessage. Starts recording macro: do this by injecting stuff
// into all tabs
function startRecording() {
	chrome.tabs.query({}, function (tabs) {

		// remove text in macroframe
		var eMacro = "document.getElementById(\"macroframe\").value = " + JSON.stringify("");
		chrome.tabs.query({url: "http://www.princeton.edu/~shuyangl/"}, function (tabs) {
			chrome.tabs.executeScript(tabs[0].id, {code: eMacro});
		});

		// inject stuff to new tabs too
		chrome.tabs.onUpdated.addListener(reinjectCS);

		// for each tab, inject stuff
	    for (var i = 0; i < tabs.length; i++) {
	    	chrome.tabs.executeScript(tabs[i].id, {file: 'webpageinject.js'});
	    }
	});
}

// handle message sent from macrodef.js
function handleMessage(request, sender, sendResponse) {
	// handle condition
	if (request.type == "cond") {
		tC = request.value.split(" ");
		alert(request.value);
	}

	// handle different state changes
	if (request.type == "state") {

		// toggle recording on and off
		if (request.value == "togglerecord") {
			if (!isRecording) {
				startRecording();
			}
			else {
				chrome.tabs.onUpdated.removeListener(reinjectCS);
			}
			isRecording = !isRecording;
		}

		// temporary: save by populating parsnip field
		if (request.value == "save") {

			alert("SAVED");

			// send macro to server
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "http://ec2-52-5-182-16.compute-1.amazonaws.com/", true);
			xhr.send(macroString);
		}


		// play the macro: tbd
		if (request.value == "play") {
				
			// open new tab, input url
			chrome.windows.create({url:earls[0], focused: true});

			// execute macro
			chrome.tabs.onUpdated.addListener(addAction);
			chrome.tabs.query({currentWindow: true}, function (tabs) {
				chrome.tabs.reload(tabs[0].id);
			});
		}
	}

	// add actions to macro, add URL if not yet defined
	if (request.type == "action") {
		if (isRecording) {
			earls.push(request.vrl);
			macro.push(request.value);

			// populate parsnip field
			chrome.tabs.query({url: "http://www.princeton.edu/~shuyangl/"}, function (tabs) {
				
				value = JSON.stringify(request.value) + "\n";
				var eMacro = "document.getElementById(\"macroframe\").value += " + JSON.stringify(value);
				chrome.tabs.executeScript(tabs[0].id, {code: eMacro});
			});
		}
	}
}
=======
// turn tab red
function turnRed(tab) {
	// No tabs or host permissions needed!
	console.log('Turning ' + tab.url + ' red!');
	chrome.tabs.executeScript({
    	code: 'document.body.style.backgroundColor="red"'
  	});
}

// create our parsnip window
function createWindow(tab) {
	var windowProps = {url: "index.html", type: "panel"};
	chrome.windows.create(windowProps);
}

// when you click the browser action, open the parsnip window
/*while (true) {
	if ()
}*/

chrome.browserAction.onClicked.addListener(createWindow);
>>>>>>> origin/master
