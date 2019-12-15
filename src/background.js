console.log("backbround.js is up");

var processVisitsWithUrl = function(url, callback) {
	// We need the url of the visited item to process the visit.
	// Use a closure to bind the  url into the callback's args.
	return function(visitItems) {
		processVisits(url, visitItems, callback);
	};
}

function processVisits(url, visits, callback) {
	
	console.log(msg);
	callback({msg: msg});
}

chrome.runtime.onMessage.addListener(function(message, sender, response) {

	try {
		var url = new URL(message.url, sender.origin)
	} catch (error) {
		response(error);
	}
	chrome.history.getVisits({url: url.href}, visits => {
		response(visits);
	});

	return true;

	new Promise((resolve, reject) => {
		try {
			var url = new URL(message.url, sender.origin)
		} catch (error) {
			response(error);
			reject();
		}
		chrome.history.getVisits({url: url.href}, visits => { 
			var msg = url + " visited " + visits.length + " times";
			response(visits);
			resolve();
		});
	});
	// return true from the event listener to indicate you wish to send a response asynchronously
	// (this will keep the message channel open to the other end until sendResponse is called).
	return true;
});