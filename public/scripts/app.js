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

    if (timePosted > 3153600) {
      timeText = `Updated ${Math.floor(timePosted / 3153600)} years ago`
    } else if (timePosted > 8640) {
      timeText = `Updated ${Math.floor(timePosted / 8640)} days ago`
    } else if (timePosted > 360) {
      timeText = `Updated ${Math.floor(timePosted / 360)} hours ago`
    } else if (timePosted > 60) {
      timeText = `Updated ${Math.floor(timePosted / 60)} minutes ago`
    }

    return timeText
  }

  function createTweetElement (tweet) {
    let htmlStr = ''

    htmlStr = `<section class="${tweet.user.handle.substr(1)}">
               <div id="top-styling-of-tweet">
    <img class="avatar" src="${tweet.user.avatars.small}">
    <h1 class="username">
    ${tweet.user.name}
    </h1>
    <p class="tweeter-handle">
    ${tweet.user.handle}
    </p>
    </div>
    <div id="centre-styling-of-tweet">
    <p class="tweet-message">
    ${escape(tweet.content.text)}
    </p>
    </div>
    <div id="bottom-styling-of-tweet">
    <p class="timestamp">
    enerateConvenientTime(tweet)
    </p>
    </div>
    </section>`;

    return htmlStr
  }

  function renderTweets (tweets) {
    let tweetElementHtml
    let positionIncrementer = 0

    tweets.reverse().forEach((tweet) => {
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
    let formMessage = '#new-tweet-textarea[name|="text"]'
    let formText = $('#new-tweet-textarea[name|="text"]').val()

    slideComposeOnClick()

    $(formId).on('submit', function (event) {
      event.preventDefault()

      if (formText.length > 140) {
        alert(`Message is longer than 140 characters, ${formText.length}.`)
        return 0
      }
      if ($(formMessage).val() === '') {
        alert(`Please write a message before attempting to tweet!`)
        return 0
      }
      if ($(formMessage).val() === false) {
        alert(`Message is invalid.`)
        return 0
      }

      submitTweetsClearTextField(formId, formMessage)
    })

    updateTweets(formId)
  }

  main()
})
