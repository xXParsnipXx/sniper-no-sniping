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