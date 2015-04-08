console.log( 'Background.html starting!' );

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.windows.create({ 
        url: "http://www.princeton.edu/~shuyangl/",
		/*
        width:  430,
        height: 150,
        top:    top_popup,
        left:   left_popup
		*/
    }, function(win) {
        chrome.windows.update(tab.windowId, { focused: true });
    });
});

console.log( 'Background.html resolved' );