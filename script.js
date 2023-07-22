'use strict';

const script = document.createElement('script');
script.setAttribute('src', chrome.runtime.getURL('comment-viewer.js'));
script.setAttribute('type', 'text/javascript');
document.body.appendChild(script);
