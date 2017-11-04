//Setup Variables
//=========================
var authKey = "tQoctKAj3Zrm6AWZvGzpjN9TOSNWwXTX";
var queryBaseURL = "http://api.giphy.com/v1/gifs/search?api_key=tQoctKAj3Zrm6AWZvGzpjN9TOSNWwXTX&limit=10&rating=pg-13";
var topics = ["LeagueOfLegends", "PUBG", "Minecraft"];

//Functions
//=========================

function startingButtons () {

	for (i=0; i<topics.length; i++) {
		var button = $("<button>" + topics[i] + "</button>");
		button.attr("type", "button");
		button.addClass("queryButton");
		button.attr("data-topic", topics[i].trim());
		$("#topics").append(button);
	};

};

function addButtons () {

	var userInput = $("input").val();
	var button = $("<button>" + userInput + "</button>");
	button.attr("type", "button");
	button.addClass("queryButton");
	button.attr("data-topic", userInput.trim());
	$("#topics").append(button);	

	button.on("click", function() {
		ajaxCall(this);
	});

};

function ajaxCall (button) {
	
	var giphySearch = $(button).attr("data-topic");
	var newQueryURL = queryBaseURL + "&q=" + giphySearch;
	console.log(newQueryURL);
	
	$.ajax({url:newQueryURL, method: "GET"})
		.done( function (giphyData) {
			console.log(giphyData);
			for(i=0; i<giphyData.data.length; i++) {

				console.log(giphyData.data[i].images.fixed_height_small.url);
				console.log(giphyData.data[i].images.fixed_height_small_still.url);
				console.log(giphyData.data[i].rating);

				var img = $("<img>");
				img.attr("src", giphyData.data[i].images.fixed_height_small_still.url);
				img.attr("data-still", giphyData.data[i].images.fixed_height_small_still.url)
				img.attr("data-active", giphyData.data[i].images.fixed_height_small.url);
				img.attr("data-state", "still");
				img.attr("height", "200");
				img.attr("width", "auto");

				$("#giphyResults").append(img);
				$("#giphyResults").append("<p>" + giphyData.data[i].rating) + "</p>";
				$("#giphyResults").append("<br>");

				img.on("click", function() {
					state(this);
				});

			};
		});

};

function state(gif) {

	var state = $(gif).attr("data-state");
	
	if (state === "still") {

		$(gif).attr("src", $(gif).attr("data-active"));
		$(gif).attr("data-state", "active");

	} else {

		$(gif).attr("src", $(gif).attr("data-still"));
		$(gif).attr("data-state", "still");

	};


};

//Main Processes
//=========================

//1) Create an array of search terms. Write them to the webpage as buttons
//2) Retrieve user input and write it to the webpage as a button
//3) Use buttons to create an AJAX call to GIPHYs API 
//4) Write the returned JSON object to the webpage

$( document ).ready(function() {

    startingButtons();

    $("#addButton").on("click", function() {
		addButtons();
	});

    $(".queryButton").on("click", function() {
		ajaxCall(this);
	});

});





