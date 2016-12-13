'use strict';
var chatMap = new Map(); // key: no, value: chat
var maxNo = 0;
chrome.webRequest.onCompleted.addListener(
  function(info) {
    var url = info.url;
    var appendQuery = '&from_chrome_extension=true';

    if (url.indexOf(appendQuery) < 0) {
      // request for get body
      fetch(url + appendQuery).then(function(response) {
        return response.json();
      }).then(function(remoteChats) {
        var remoteMaxNo = 0;
        remoteChats.forEach(function(e) {
          if (e.chat) {
            var no = e.chat.no;
            if(no > remoteMaxNo) {
              remoteMaxNo = no;
            }
            chatMap.set(no, e.chat);
          }
        });
        if(remoteMaxNo > maxNo ) {
          // new chat exits
          maxNo = remoteMaxNo;
          chrome.tabs.executeScript(null, { 
            code: 'var maxNo = ' + maxNo + ';var chats = \'' + JSON.stringify(Array.from(chatMap)) + '\''});
          chrome.tabs.executeScript(null, { file: 'script.js' });
        }
      });
    }
  },
  // filters
  {
    urls: [
      '*://nmsg.nicovideo.jp:*/api.json/thread*'
    ]
  });

