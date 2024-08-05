function handleResponse(message) {
  console.log(`Message from the background script:  ${message.response}`);
  runFlag = false;
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function notify_arxivshorts(e) {
  console.log("Sending message to background page");
  chrome.runtime.sendMessage(
      {greeting: "Sending trigger to start extension"},
      function(response) {
          if (chrome.runtime.lastError) {
              handleError(chrome.runtime.lastError);
          } else {
              handleResponse(response);
          }
      }
  );
}

notify_arxivshorts();