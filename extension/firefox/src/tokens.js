
// error catching functions
function onExecuted(result) {
  console.log(`Loaded`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}


var jsFiles = [ "src/background.js", "src/toolbox.js"	];

function module2(){

 const executing = browser.tabs.executeScript({
    file: jsFiles[0]
  });
  executing.then(module3, onError);
}

function module3(){

  const executing = browser.tabs.executeScript({
    file: jsFiles[1]
  });
  executing.then(onExecuted, onError);

}


function module1(){

  var arxivToken =   browser.storage.sync.get('arxivshorts');  
  arxivToken.then((res) => {
    var foo_res = JSON.parse(res.arxivshorts);
    const executing = browser.tabs.executeScript({
        code:`var arxivToken="`+ foo_res + `";`
    });
    executing.then(module2, onError);
  
  });



}


function handleMessage(request, sender, sendResponse) {
  console.log("arxivshorts: " + request.greeting);
  module1();
  sendResponse({response: "arxivshorts:"});
}
// Trigger loading of modules //
browser.runtime.onMessage.addListener(handleMessage);




// run on install

function random32bit() { //https://stackoverflow.com/questions/37378237/how-to-generate-a-random-token-of-32-bit-in-javascript
  let u = new Uint32Array(1);
  window.crypto.getRandomValues(u);
  let str = u[0].toString(16).toUpperCase();
  return '00000000'.slice(str.length) + str;
}


function onInstalledNotification(details) {
  var token = random32bit();
  browser.storage.sync.set({
    arxivshorts: JSON.stringify(token)
  });
  console.log("Saved token");  
}
browser.runtime.onInstalled.addListener(onInstalledNotification);
