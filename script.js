'use strict';
// create comment area
var commentTextArea = document.querySelector('#comment-text-area');
if (!commentTextArea) {
  var column = document.querySelector('.component-lesson-left-column');
  var div = document.createElement('div');
  commentTextArea = document.createElement('textarea');
  commentTextArea.id = 'comment-text-area';
  div.appendChild(commentTextArea);
  column.appendChild(div);
}

// for comment
var oldText = null;
var _drawLetterSpacing = PIXI.Text.prototype.drawLetterSpacing;
PIXI.Text.prototype.drawLetterSpacing = function (text, x, y, isStroke) {
  _drawLetterSpacing.call(this, text, x, y, isStroke);
  if (oldText != text) {
    commentTextArea.value += '\n' + text;
    oldText = text;
    commentTextArea.scrollTop = commentTextArea.scrollHeight;
  }
};

// for lesson interaction comment
var commentText = null;
function updateCommentIfChange(commentDiv) {
  if (commentText !== commentDiv.innerHTML) {
    commentDiv.addEventListener('DOMNodeRemoved', handleMutations) ;
    commentText = commentDiv.innerHTML;
    commentTextArea.value += '\n運営: ' + commentText;
    commentTextArea.scrollTop = commentTextArea.scrollHeight;
  }
}
function handleMutations(mutations) {
  var commentDiv = document.querySelector('.component-lesson-interaction-bar-event-message-inner');
  if (commentDiv) {
    updateCommentIfChange(commentDiv);
  }
}
var observer = new MutationObserver(handleMutations);
var config = { attributes: true, childList: true, characterData: true };
observer.observe(document.querySelector('.component-lesson-interaction-bar'), config);


