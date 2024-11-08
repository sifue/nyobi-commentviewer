'use strict';

/**
 * 授業ページの URL の正規表現
 * - https://www.nnn.ed.nico/lessons/:lesson_id
 * - https://www.nnn.ed.nico/courses/:course_id/chapters/:chapter_id/lessons/:lesson_id
 */
const urlRegExp = /^https:\/\/www\.nnn\.ed\.nico(?:\/courses\/\d+\/chapters\/\d+)?\/lessons\/\d+$/;

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (urlRegExp.test(details.url)) {
    await chrome.scripting.executeScript({
      target: { tabId: details.tabId },
      files: [ 'script.js' ]
    });
  }
});
