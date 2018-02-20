$(document).ready(function () {
  function growBackgroundCanvas (cssIncrementerRefrence) {
    let scaledCanvasHeight = (cssIncrementerRefrence * 10) + 23
    $('main').css('height', `${scaledCanvasHeight}em`)
  }

  function convertHandle (userHandleOrId) {
    userHandleOrId = '.' + userHandleOrId.substr(1)
    return userHandleOrId
  }

  function dynamicallyRenderExtraCSS (tweet, cssIncrementerRefrence) {
    let scaledTweetPostion = cssIncrementerRefrence * 10
    $('<style>').prop('type', 'text/css')
                .html(`${convertHandle(tweet.user.handle)} {\
                  position: relative;\
                  top: ${scaledTweetPostion}em;\
                  }`)
                .appendTo('head')
  }

  function renderPredefinedCSS (htmlToRender) {
    const tweetElementToBeRenderedBy = document.getElementById('tweet-container')
    tweetElementToBeRenderedBy.insertAdjacentHTML('afterbegin', htmlToRender)
  }

  function escape (str) {
    const div = document.createElement('div')
    div.appendChild(document.createTextNode(str))
    return div.innerHTML
  }

  function generateConvenientTime (tweet) {
    let timePosted = Math.floor((Date.now() / 1000) - (tweet.created_at / 1000))
    let timeText = `Updated ${timePosted} seconds ago`

    if (timePosted > 31536000) {
      timeText = `Updated ${Math.floor(timePosted / 31536000)} years ago`
    } else if (timePosted > 86400) {
      timeText = `Updated ${Math.floor(timePosted / 86400)} days ago`
    } else if (timePosted > 3600) {
      timeText = `Updated ${Math.floor(timePosted / 3600)} hours ago`
    } else if (timePosted > 60) {
      timeText = `Updated ${Math.floor(timePosted / 60)} minutes ago`
    }

    return timeText
  }

  function createTweetElement (tweet) {
    let htmlStr = ''

    htmlStr =  `<section class="${tweet.user.handle.substr(1)}">
                  <div class="top-styling-of-tweet">
                    <img class="avatar" src="${tweet.user.avatars.small}">
                    <h1 class="username">
                      ${tweet.user.name}
                    </h1>
                    <p class="tweeter-handle">
                      ${tweet.user.handle}
                    </p>
                  </div>
                  <div class="centre-styling-of-tweet">
                    <p class="tweet-message">
                      ${escape(tweet.content.text)}
                    </p>
                  </div>
                  <div class="bottom-styling-of-tweet">
                    <div class="hooverIcons">
                      <img class="flag" src="../../images/flag.png">
                      <img class="heart" src="../..//images/heart.png">
                      <img class="repeat" src="../..//images/repeat.png">
                    </div>
                    <p class="timestamp">
                      ${generateConvenientTime(tweet)}
                    </p>
                  </div>
                </section>`;

    return htmlStr
  }

  function renderTweets (tweets) {
    let tweetElementHtml
    let positionIncrementer = 0

    tweets.forEach((tweet) => {
      tweetElementHtml = createTweetElement(tweet)

      renderPredefinedCSS(tweetElementHtml)
      dynamicallyRenderExtraCSS(tweet, positionIncrementer)
      growBackgroundCanvas(positionIncrementer)

      positionIncrementer++
    })

    return positionIncrementer
  }

  function updateTweets (formId) {
    $.ajax({
      url: $(formId).attr('action'),
      method: 'GET',
      success: function (tweets) {
        renderTweets(tweets)
      }
    })
  }

  function submitTweetsClearTextField (formId, formMessage) {
    $.ajax({
      url: $(formId).attr('action'),
      type: 'POST',
      data: $(formId).serialize(),
      success: function () {
        updateTweets(formId)
      }
    })

    $(formMessage).val('')
  }

  function slideComposeOnClick () {
    $('.compose').click(function (event) {
      event.preventDefault()
      $('#post-new-tweet').slideToggle({duration: 500})
    })
  }

  function main () {
    let formId = '#submit-tweet'

    slideComposeOnClick()

    $(formId).on('submit', function (event) {
      let formId = '#submit-tweet'
      let textareaElementIdName = '#new-tweet-textarea[name|="text"]'
      let formText = $('#new-tweet-textarea[name|="text"]').val()
      event.preventDefault()

      if (formText.length > 140) {

        alert(`Message is longer than 140 characters, ${formText.length}.`)
        return 0

      } else if (isEmptyOrUndefined(formText)) {

        alert(`Please write a message before attempting to tweet!`)
        return 0

      } else if (formText === false) {

        alert(`Message is invalid.`)
        return 0

      } else {

        submitTweetsClearTextField(formId, textareaElementIdName)
      }

    })

    updateTweets(formId)

    function isEmptyOrUndefined (str){      
      return ((typeof str== 'undefined')   
            ||(str == null)                
            ||(str == false)
            ||(str.length == 0)            
            ||(str == "")                  
            ||(str.replace(/\s/g,"") == "")
            ||(!/[^\s]/.test(str))         
            ||(/^\s*$/.test(str))           
      );
    }
  }

  main()
})
