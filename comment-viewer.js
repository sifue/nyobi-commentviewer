'use strict';
// create comment area
var commentTextArea = document.querySelector('#comment-text-area');
if (!commentTextArea) {
  var column = document.querySelector('#root > div > div > div > div > div');
  var div = document.createElement('div');
  commentTextArea = document.createElement('textarea');
  commentTextArea.style = 'width:100%;height:6em;';
  commentTextArea.id = 'comment-text-area';
  div.appendChild(commentTextArea);
  column.appendChild(div);
}

// for comment (Canvas API hack)
var oldText = null;
CanvasRenderingContext2D.prototype.originalFillText = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
  this.originalFillText(text, x, y, maxWidth);
  if (oldText != text) {
    commentTextArea.value += "\\n" + text;
    oldText = text;
    commentTextArea.scrollTop = commentTextArea.scrollHeight;
  }
};


// for lesson interaction comment
var commentText = null;
function updateCommentIfChange(commentDiv) {
  if (commentText !== commentDiv.innerText) {
    commentDiv.addEventListener('DOMNodeRemoved', handleMutations) ;
    commentText = commentDiv.innerText;
    if(commentText) {
      commentTextArea.value += '\n運営: ' + commentText;
      commentTextArea.scrollTop = commentTextArea.scrollHeight;
    }
  }
}
function handleMutations(mutations) {
  var commentDiv = document.querySelector('#root > div > div > div > div > div > div > div > div > div > div');
  if (commentDiv) {
    updateCommentIfChange(commentDiv);
  }
}
var observer = new MutationObserver(handleMutations);
var config = { attributes: true, childList: true, characterData: true, subtree: true };
observer.observe(document.querySelector('#root > div > div > div > div > div > div > div'), config);
