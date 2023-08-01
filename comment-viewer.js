'use strict';

const videoPlayer = document.querySelector('[aria-label="動画プレイヤー"]');
const asideElement = document.querySelector('aside');
const timeElement = document.querySelector('time');

// デフォルトでは動画プレイヤーの下に配置する
videoPlayer.parentElement.parentElement.insertAdjacentHTML('beforeend', `
  <div id="comment-panel">
    <ul id="comment-list" class="comment-list"></ul>
    <div class="comment-toolbar">
      <label for="position-select">表示位置</label>
      <select id="position-select">
        <option value="top-right">右上</option>
        <option value="bottom-left" selected>左下</option>
      </select>
    </div>
  </div>
`);

const commentPanel = document.querySelector('#comment-panel');
const commentList = commentPanel.querySelector('#comment-list');
const positionSelect = commentPanel.querySelector('#position-select');

// 表示位置の切り替え
positionSelect.addEventListener('change', (event) => {
  const position = event.target.value;

  if (position === 'top-right') asideElement.insertAdjacentElement('afterbegin', commentPanel);
  else if (position === 'bottom-left') videoPlayer.parentElement.parentElement.insertAdjacentElement('beforeend', commentPanel);

  commentList.scrollTop = commentList.scrollHeight;
  commentPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

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
