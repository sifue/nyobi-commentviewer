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
var script = document.createElement('script');
script.innerText = 'var commentTextArea = document.querySelector("#comment-text-area");window.addEventListener("appearComment", function(e) {  var comments = window.kyuuri.comments;  var currentComment = comments.find(function(co) { return co.no === e.detail.item.no; });  commentTextArea.value += "\\n" + currentComment.no + ": " + currentComment.text;  commentTextArea.scrollTop = commentTextArea.scrollHeight;}, false);';
document.body.appendChild(script);

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


