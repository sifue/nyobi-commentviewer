'use strict';

setTimeout(() => {
  const link = document.createElement('link');
  link.setAttribute('href', chrome.runtime.getURL('comment-viewer.css'));
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.setAttribute('src', chrome.runtime.getURL('comment-viewer.js'));
  script.setAttribute('type', 'text/javascript');
  document.body.appendChild(script);
}, 3000);
