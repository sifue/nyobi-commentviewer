'use strict';
var commentTextArea = document.querySelector('#comment-text-area');
if (!commentTextArea) {
  var column = document.querySelector('.component-lesson-left-column');
  var div = document.createElement('div');
  commentTextArea = document.createElement('textarea');
  commentTextArea.id = 'comment-text-area';
  div.appendChild(commentTextArea);
  column.appendChild(div);
}

var script = document.createElement('script');
script.innerText = 'var commentTextArea = document.querySelector("#comment-text-area");window.addEventListener("appearComment", function(e) {  var comments = window.kyuuri.comments;  var currentComment = comments.find(function(co) { return co.no === e.detail.item.no; });  commentTextArea.value += "\\n" + currentComment.no + ": " + currentComment.text;  commentTextArea.scrollTop = commentTextArea.scrollHeight;}, false);';
document.body.appendChild(script);
