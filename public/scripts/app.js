$(document).ready(function (){

	// Fake data taken from tweets.json
	const data = [
	  {
	    "user": {
	      "name": "Newton",
	      "avatars": {
	        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
	        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
	        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
	       },
	      "handle": "@SirIsaac"
	    },
	    "content": {
	      "text": "If I have seen further it is by standing on the shoulders of giants"
	    },
	    "created_at": 1461116232227,
	  },
	  {
	    "user": {
	      "name": "Descartes",
	      "avatars": {
	        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
	        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
	        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
	      },
	      "handle": "@rd" },
	    "content": {
	      "text": "Je pense , donc je suis"
	    },
	    "created_at": 1461113959088
	  },
	  {
	    "user": {
	      "name": "Johann von Goethe",
	      "avatars": {
	        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
	        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
	        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
	      },
	      "handle": "@johann49"
	    },
	    "content": {
	      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
	    },
	    "created_at": 1461113796368
	  }
	];

	renderTweets(data);




	function renderTweets(tweets) {


		tweets.forEach( (tweet) => {
			createTweetElement(tweet);

			//OFFSET CSS TO WIN
			
		});
	}

	function createTweetElement(tweet) {

		const tweetElementToBeRenderedBy = document.getElementById( 'tweet-container' ); 
	    tweetElementToBeRenderedBy.insertAdjacentHTML( 'afterbegin', buildHtmlTweetTemplate(tweet) );

		if ( $("#tweet-container").find(convertHandle(tweet.user.handle)).length == 0 ) {
            console.log(`A user specific tweet element was created for ${tweet.user.name}!`);;
			return undefined;


   		} else {
            console.log(`A user specific tweet element failed to be found after creation...`);
			return undefined;

		}
	}

	function buildHtmlTweetTemplate (tweet) {

		let htmlStr = "";
	    	htmlStr += `<div class="${convertHandle(tweet.user.handle)}">`
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
		    htmlStr += `${tweet.content.text}`;        
		    htmlStr += `</p>`;
		    htmlStr += `</div>`;
		    htmlStr += `<div id="bottom-styling-of-tweet">`;
		    htmlStr += `<p class="timestamp">`;
		    htmlStr += `${tweet.created_at}`;
		    htmlStr += `</p>`;
		    htmlStr += `</div>`;
	    	htmlStr += `</div>`;

	    return htmlStr;
	}

	function convertHandle (userHandleOrId) {
;
	if(userHandleOrId.charAt(0) === '@') {
		userHandleOrId = '.' + userHandleOrId.substr(1);
	} else {
		userHandleOrId = '@' + userHandleOrId.substr(1);
	}

	return userHandleOrId;
	}
});