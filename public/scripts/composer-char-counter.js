$(function() {

  sectionElementId = '#post-new-tweet';
  textareaElementIdName = '#new-tweet-textarea[name|="text"]';

  $(sectionElementId).on('keyup', function (event) {

    event.preventDefault();
    inputString.startCounterWithParams(140, sectionElementId, textareaElementIdName);

    if(inputString.length > inputString.allowed) {
      $(this).find('#char-counter')
             .text(inputString.remaining)
             .css('color', 'red');
        
    } else {
      $(this).find('#char-counter')
             .text(inputString.remaining)
             .css('color', 'black');

    }
  });

  const inputString = {

    searchStringLength (sectionElementId, textareaElementIdName) {
      return $(sectionElementId).find(textareaElementIdName).val().length;

    },
    startCounterWithParams(maxChars, sectionElementId, textareaElementIdName) {
      this.allowed = maxChars;
      this.length = this.searchStringLength(sectionElementId, textareaElementIdName);
      this.remaining = this.allowed - this.length;
      return this;

    },
    
    allowed:   undefined,
    length:    undefined,
    remaining: undefined,

  };
});