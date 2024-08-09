var jsFiles = ["src/background.js", "src/toolbox.js"];

// Error catching functions
function onExecuted(result) {
  console.log(`Loaded`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function module1(tabID) {
  chrome.storage.sync.get('arxivshorts', function(result) {
    if (chrome.runtime.lastError) {
      console.log(`Error: ${chrome.runtime.lastError}`);
    } else {
      var foo_res = JSON.parse(result.arxivshorts);
      chrome.scripting.executeScript({
        target: { tabId: tabID },
        func: (token) => { window.arxivToken = token; },
        args: [foo_res]
      }).then(() => {
        module2(tabID);
      }).catch((error) => {
        console.log(`Error: ${error}`);
      });
    }
  });
}

function module2(tabID) {
  chrome.scripting.executeScript({
    target: { tabId: tabID },
    files: [jsFiles[0]]
  }).then(() => {
    module3(tabID);
  }).catch((error) => {
    console.log(`Error: ${error}`);
  });
}

function module3(tabID) {
  chrome.scripting.executeScript({
    target: { tabId: tabID },
    files: [jsFiles[1]]
  }).then((results) => {
    onExecuted(results);
  }).catch((error) => {
    onError(error);
  });
}

function handleMessage(request, sender, sendResponse) {
  console.log("arxivshorts: " + request.greeting);
  console.log(sender.tab.id);
  module1(sender.tab.id);
  sendResponse({ response: "arxivshorts:" });
}

// Trigger loading of modules
chrome.runtime.onMessage.addListener(handleMessage);

// Run on install
function random32bit() {
  let u = new Uint32Array(1);
  crypto.getRandomValues(u);
  let str = u[0].toString(16).toUpperCase();
  return '00000000'.slice(str.length) + str;
}

function onInstalledNotification(details) {
  var token = random32bit();
  chrome.storage.sync.set({
    arxivshorts: JSON.stringify(token)
  }, function() {
    if (chrome.runtime.lastError) {
      console.log(`Error: ${chrome.runtime.lastError}`);
    } else {
      console.log("Saved token");
    }
  });
}

chrome.runtime.onInstalled.addListener(onInstalledNotification);
