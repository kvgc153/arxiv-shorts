function handleResponse(message) {
    console.log(`Message from the background script:  ${message.response}`);
    runFlag = false;
  }
  
  function handleError(error) {
    console.log(`Error: ${error}`);
  }
  
  function notify_arxivshorts(e) {
      console.log("Sending message to background page");
      let sending = browser.runtime.sendMessage({
        greeting: "Sending trigger to start extension"
      });
      sending.then(handleResponse, handleError);

  }
  
notify_arxivshorts();
