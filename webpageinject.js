if (document.title != "PARSNIPPARSNIP") { // ensure not webapp itself

	// set initial url value
	//chrome.runtime.sendMessage({type: "initialURL", value: document.url});

	var nI = document.getElementsByTagName("input"); /* Get all INPUT elements */
	function clickpass(ix) { /* Pass in the clicked element's ID */
		var skp = "var nI = document.getElementsByTagName(\"input\");window.abert = function() {};nI[" + ix + "].value = \"" + nI[parseInt(ix)].value + "\";abert(\"blah\");";
		chrome.runtime.sendMessage({type:"action", value:skp, vrl:document.location.href});
	}
	for (var i = 0; i < nI.length; i++) {
		(function(i){
	        nI[i].addEventListener('blur', function(){clickpass(String(i))}, false);
	    })(i); /* Adds additional function on click that takes as argument the element's index */
	};
	
	var nT = document.getElementsByTagName("textarea"); /* Get all TEXTAREA elements */
	function clickta(ixx) { /* Pass in the clicked element's ID */
		var skp3 = "var nT = document.getElementsByTagName(\"textarea\");window.abert = function() {};nT[" + ixx + "].value = \"" + nT[parseInt(ixx)].value + "\";abert(\"blah\");";
		chrome.runtime.sendMessage({type:"action", value:skp3, vrl:document.location.href});
	}
	for (var i = 0; i < nT.length; i++) {
		(function(i){
	        nT[i].addEventListener('blur', function(){clickta(String(i))}, false);
	    })(i); /* Adds additional function on click that takes as argument the element's index */
	};

	var nB = document.body.getElementsByTagName("*"); /* Get ALL elements */
	function clicktrig(ev, indx) { /* Randomly changes background body color */
		/*var imgElements = document.getElementsByTagName("img");for (var i = 0; i < imgElements.length; i++){imgElements[i].src = "http://www.scholarsfirst.com/dept_compsci/_shared/kernighan.jpg";};*/ /* EASTER CAME EARLY */
		document.body.style.backgroundColor = ('#'+Math.floor(Math.random()*16777215).toString(16));
		ev.stopPropagation();
		var skp2 = "var nB = document.body.getElementsByTagName(\"\\*\");window.abert = function() {};nB[" + indx + "].click();abert(\"blah\");";
		chrome.runtime.sendMessage({type:"action", value:skp2, vrl:document.location.href});
	}
	for (var i = 0; i < nB.length; i++) {
		(function(i){
	        nB[i].addEventListener('click', function(event){clicktrig(event, String(i))}, false);
	    })(i); /* Adds additional function on click that takes as argument the element's index */
	};
}