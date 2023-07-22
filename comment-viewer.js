'use strict';

const videoPlayer = document.querySelector('[aria-label="動画プレイヤー"]');
const timeElement = document.querySelector('time');

const commentList = document.createElement('ul');
commentList.classList.add('comment-list');
videoPlayer.parentElement.parentElement.appendChild(commentList);

// ---------- コメントを取得して表示する ----------

const commentHistory = new Map();

CanvasRenderingContext2D.prototype.originalFillText = CanvasRenderingContext2D.prototype.fillText;
CanvasRenderingContext2D.prototype.fillText = function (text, x, y, maxWidth) {
  this.originalFillText(text, x, y, maxWidth);

  const currentPlaybackTime = timeElement.textContent.trim();
  const comment = text.trim();

  if (comment) {
    const comments = commentHistory.get(currentPlaybackTime) ?? [];

    // 1 つのコメントに対して fillText() が 2 回呼び出されるので間引く
    if (comments.filter(c => c === comment).length % 2 === 0) {
      commentList.insertAdjacentHTML('beforeend', `
        <li class="comment">
          <span class="time">${currentPlaybackTime}</span>
          <span class="text">${sanitize(comment)}</span>
        </li>
      `);

      commentList.scrollTop = commentList.scrollHeight;
    }

    comments.push(comment);
    commentHistory.set(currentPlaybackTime, comments);
  }
};

// ---------- 運営コメントを取得して表示する ----------

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.addedNodes.length) {
      const addedNode = mutation.addedNodes.item(0);

      const currentPlaybackTime = timeElement.textContent.trim();
      const comment = sanitize(addedNode.textContent).replace('リンクはこちら', () => addedNode.querySelector('a').outerHTML);

      commentList.insertAdjacentHTML('beforeend', `
        <li class="comment staff">
          <span class="time">${currentPlaybackTime}</span>
          <span class="text">${comment}</span>
        </li>
      `);

      commentList.scrollTop = commentList.scrollHeight;
    }
  });
});

observer.observe(videoPlayer.firstElementChild, {
  subtree: true,
  childList: true
});

function sanitize(text) {
  const element = document.createElement('div');
  element.innerText = text;
  return element.innerHTML;
}
