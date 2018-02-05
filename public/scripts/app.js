$(document).ready(function (){

	formId = '#submit-tweet';
	formMessage = '#new-tweet-textarea[name|="text"]';

	slideComposeOnClick();

	$(formId).on('submit', function(event) {
		event.preventDefault();

		if($(formMessage).val().length > 140) {
			alert(`Message is longer than 140 characters, ${formMessage.length}.`)
			return 0;
		}
		if($(formMessage).val() === "") {
			alert(`Please write a message before attempting to tweet!`)
			return 0;
		}
		if($(formMessage).val() == false) {
			alert(`Message is invalid.`)
			return 0;
		}

		submitTweetsClearTextField(formId, formMessage);
   		updateTweets(formId);
	});


	updateTweets(formId);


	function slideComposeOnClick() {
		$( ".compose" ).click( function() {
			event.preventDefault();
    		$("#post-new-tweet").slideToggle({duration: 500});
  		});
	}

	function submitTweetsClearTextField(formId, formMessage) {

    	$.ajax({
			url: $(formId).attr('action'),
			type: 'POST',
			data: $(formId).serialize(),
		});

    	$(formMessage).val("");
	}

	function updateTweets (formId) {
		
	   	$.ajax({
			url: $(formId).attr('action'),
			method: 'GET',
			success: function (tweets) {
				renderTweets(tweets);
				console.log(tweets.length, tweets);
			}
		});
	}

	function renderTweets(tweets) {

		let tweetElementHtml;
		let positionIncrementer = 0;
		let reverseOrderOfTweets = tweets.reverse();

		tweets.forEach( (tweet) => {

			tweetElementHtml = createTweetElement(tweet);

			renderPredefinedCSS(tweetElementHtml);
			dynamicallyRenderExtraCSS(tweet, positionIncrementer);
			growBackgroundCanvas(positionIncrementer);

			positionIncrementer ++;	
		});

		return positionIncrementer;
	}

	function createTweetElement (tweet) {

		let htmlStr = "";

    	htmlStr += `<section class="${tweet.user.handle.substr(1)}">`
		htmlStr += `<div id="top-styling-of-tweet">`;
	    htmlStr += `<img class="avatar" src="${tweet.user.avatars.small}">`;
	    htmlStr += `<h1 class="username">`;
	    htmlStr += `${tweet.user.name}`;
	    htmlStr += `</h1>`;
	    htmlStr += `<p class="tweeter-handle">`;
	    htmlStr += `${tweet.user.handle}`;        
	    htmlStr += `</p>`;
	    htmlStr += `</div>`;
	    htmlStr += `<div id="centre-styling-of-tweet">`;
	    htmlStr += `<p class="tweet-message">`;
	    htmlStr += `${escape(tweet.content.text)}`;        
	    htmlStr += `</p>`;
	    htmlStr += `</div>`;
	    htmlStr += `<div id="bottom-styling-of-tweet">`;
	    htmlStr += `<p class="timestamp">`;
	    htmlStr += generateConvenientTime(tweet);
	    htmlStr += `</p>`;
	    htmlStr += `</div>`;
    	htmlStr += `</section>`;

	    return htmlStr;
	}

	function generateConvenientTime (tweet) {
	    let timePosted = Math.floor((Date.now() / 1000) - (tweet.created_at / 1000));
		let timeText = `Updated ${timePosted} seconds ago`;

		if (timePosted > 3153600) {
			timeText = `Updated ${Math.floor(timePosted / 3153600)} years ago`;		
		} else if (timePosted > 8640) {
			timeText = `Updated ${Math.floor(timePosted / 8640)} days ago`;
		} else if (timePosted > 360) {
			timeText = `Updated ${Math.floor(timePosted / 360)} hours ago`;
		} else if (timePosted > 60) {
			timeText = `Updated ${Math.floor(timePosted / 60)} minutes ago`;
		}

		return timeText;
	}

	function renderPredefinedCSS (htmlToRender) {
		const tweetElementToBeRenderedBy = document.getElementById( 'tweet-container' ); 
	    tweetElementToBeRenderedBy.insertAdjacentHTML( 'afterbegin', htmlToRender);
	}

	function dynamicallyRenderExtraCSS (tweet, cssIncrementerRefrence) {

		let scaledTweetPostion = cssIncrementerRefrence * 10;

	    $("<style>").prop("type", "text/css")
     		.html( `${convertHandle(tweet.user.handle)} {\
        			position: relative;\
        			top: ${scaledTweetPostion}em;\
     			    }`)
     		.appendTo("head");
	}

	function convertHandle (userHandleOrId) {
		return userHandleOrId = '.' + userHandleOrId.substr(1);
	}

	function growBackgroundCanvas (cssIncrementerRefrence) {

		let scaledCanvasHeight = cssIncrementerRefrence * 21;

		$('main').css('height', `${scaledCanvasHeight}em`);
	}

	function escape(str) {
  		var div = document.createElement('div');
  		div.appendChild(document.createTextNode(str));
  		return div.innerHTML;
	}
});