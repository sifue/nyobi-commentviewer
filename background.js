'use strict';
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if(details.url.includes('nnn.ed.nico/lessons/')) {
    await chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: [ 'script.js' ]
    });
  }
});
