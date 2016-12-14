'use strict';
chrome.webNavigation.onCompleted.addListener(function(data) {
  if(data.url.includes('nnn.ed.nico/contents/lessons/')) {
    chrome.tabs.executeScript(null, { file: 'script.js' });
  }
});