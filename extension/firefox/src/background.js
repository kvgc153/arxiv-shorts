if(window['visited'] != 'true'){

  window['visited'] = 'true';

  var source = document.getElementsByClassName("abstract")[0];
  var urlSplit = window.location.toString().split('//')[1];
  var urlSplit = urlSplit.split("?context")[0];
  console.log(urlSplit);
  var urlSplit = urlSplit.split('/');
  var arxivID  = urlSplit[urlSplit.length-1];
  var arxivTitle = document.getElementsByClassName("title mathjax")[0].outerText;

  
  var invalidTokens = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8"];
  // if arxivID contains any of the tokens, then we have to santize the url 
  for(var i=0; i<invalidTokens.length; i++){
    if(arxivID.includes(invalidTokens[i])){
      var arxivID = arxivID.split(invalidTokens[i])[0];
    }
  }

  var arxivID = arxivID.replace(".","_")

  var summaryJSONurl = "https://www.cosmicnoon.com/cgi-bin/arxivshorts.cgi?id=" + arxivID + "&token=" + arxivToken;
  console.log(summaryJSONurl);

  function checkURL(url){
    // returns boolean
    return(window.location.href.indexOf(url) > -1)
  }

  async function returnJSON(url, mode) {

    source.innerHTML += DOMPurify.sanitize(`
<br><br>
<div id="summaryBox" style="background-color:transparent; overflow: auto; padding: 16px;">
  <div style="border: 1px solid #e1e8ed; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); border-radius: 10px; max-width: 600px; padding: 16px; background-color: #ffffff;">
    <div style="font-family: Arial, sans-serif;">
      <div id="summarizedNotes" style="font-size: 14px; color: #14171a;"></div>
    </div>
  </div>
</div>`);
// /* <h5 style="font-size: 16px; margin-bottom: 8px; color: #1da1f2;">Summary</h5> */


    const response = await fetch(url);
    const summaryJSON = await response.json();

    if(mode == 'abstract'){
      try{
        if(summaryJSON.hasOwnProperty('summary')){
            var genSummary = summaryJSON['summary'];
            genSummary = genSummary.split("\n\n");
            document.getElementById('summarizedNotes').innerText = genSummary[1] + "\n\n";

            //Show the tags in a different color
            var tags = genSummary[2];
            // Make color div 
            var colorDiv = document.createElement('div');
            colorDiv.style.color = '#e08848';
            colorDiv.style.display = 'inline';
            colorDiv.style.fontSize = '14px';
            colorDiv.style.fontWeight = 'bold';
            colorDiv.innerText = tags;
            document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize(colorDiv.outerHTML);
          }

        }
        catch(err){
          console.log(err); 
        }
        ////////////////////////////////////
        // Hide notes panel if not needed //
        ////////////////////////////////////
        if(document.getElementById('summarizedNotes').innerHTML.length < 15){
          // check if anything was written to the HTML block and if not hide it 
          document.getElementById('summaryBox').style.opacity = '0';
        }
    }

    }

    if(checkURL("https://arxiv.org/abs/")){
    returnJSON(summaryJSONurl, 'abstract'); 
   }
}

