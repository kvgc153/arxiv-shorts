if(window['visited'] != 'true'){

  window['visited'] = 'true';

  var source = document.getElementsByClassName("abstract")[0];
  var urlSplit = window.location.toString().split('//')[1];
  var urlSplit = urlSplit.split('/');
  var arxivID  = urlSplit[urlSplit.length-1];
  var arxivTitle = document.getElementsByClassName("title mathjax")[0].outerText;

  
  var acceptTokens = ["v1", "v2", "v3", "v4", "v5", "v6", "v7", "v8"];
  var tokenFlag = false;
  for (var i=0; i<acceptTokens.length; i++){
    if(arxivID.includes(acceptTokens[i])){
      tokenFlag = true;
    }
  }
  if(tokenFlag == false){
    // get element id from page if token is not present
    var newURL = document.getElementsByClassName('tablecell arxividv')[0].getElementsByClassName("arxivid")[0].firstElementChild.getAttribute("href");
    var urlSplit = newURL.split('//')[1];
    var urlSplit = urlSplit.split('/');
    var arxivID  = urlSplit[urlSplit.length-1];   
  }

  var summaryJSONurl = "https://www.cosmicnoon.com/cgi-bin/arxivshorts.cgi?id=" + arxivID + "&token=" + arxivToken;

  function checkURL(url){
    // returns boolean
    return(window.location.href.indexOf(url) > -1)
  }

  async function returnJSON(url, mode) {
    source.innerHTML +=DOMPurify.sanitize(`
    <br><br>
  <div  id="summaryBox" style="background-color:transparent; overflow: auto;">
      <div class="card" style="width: 100%;">
        <div class="card-body">
            <div id="summarizedNotes" class="card-text" >
            </div>
        </div>
      </div>
  </div>`);

    const response = await fetch(url);
    const summaryJSON = await response.json();

    if(mode == 'abstract'){
      try{
        if(summaryJSON.hasOwnProperty('summary')){
          var makeHTML0 = "<h5> Summary: </h5>" + summaryJSON['summary'] +  "<br><br><hr> <h5> Concepts: </h5><br><hr>";
          document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize(makeHTML0 );
      
          var concepts = summaryJSON['GPT']['concepts'];
          var conceptsKeys = Object.keys(concepts);
      
          var makeHTML1 = ''
          for(var j=0; j< conceptsKeys.length; j++){
            var foo = j+1;
            relatedPapers = '';
            // for(var k=0;k<concepts[conceptsKeys[j]].ss_id.length;k++){
            myKeys ={arxivTitle: 'true'};
            for(var k=0;k<4;k++){
              if(myKeys.hasOwnProperty(concepts[conceptsKeys[j]].ss_title[k])){;}
              else{
                if(arxivTitle != concepts[conceptsKeys[j]].ss_title[k]){
                myKeys[concepts[conceptsKeys[j]].ss_title[k]] = 'true';
                relatedPapers += `<a href="${concepts[conceptsKeys[j]].ss_id[k]}">${concepts[conceptsKeys[j]].ss_title[k]}</a><br> `;
                }
              }
            }
            makeHTML1 += `
            <div class="card bg-light mb-3">
              <div class="card-body">
                <h5 class="card-title">${foo}. ${conceptsKeys[j]}</h5>
                <p class="card-text">
                  ${concepts[conceptsKeys[j]].definition}.${concepts[conceptsKeys[j]].usefulness} <br><br>
                   <b>Learn more: </b> 
                    <a href="https://en.wikipedia.org/w/index.php?fulltext=1&search=${conceptsKeys[j]}" class="btn btn-outline-primary btn-sm"> Wikipedia</a>
                    <a href="https://astrobites.org/?s=${conceptsKeys[j]}" class="btn btn-outline-primary btn-sm"> Astrobites</a>
                    <a href="https://www.google.com/search?q=${conceptsKeys[j]}" class="btn btn-outline-primary btn-sm"> Google</a>
                    <a href="https://www.bing.com/search?showconv=1&sendquery=1&q= tell me about ${conceptsKeys[j]}. Suggest me useful articles to read about it. Use images from the internet as required" class="btn btn-outline-primary btn-sm"> Bing AI Chat</a>

                   <br><br>
                  <b>Related arXiv papers:</b><br> ${relatedPapers}<br>
                </p>
              </div>
            </div>
          `;
          }
          document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize(makeHTML1);

    
          // var similarPapers = summaryJSON['ADS']['similar'];
          // document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize("<h5> Similiar papers: </h5><ul>");
          // for (let idx = 0; idx < similarPapers.length; idx++) {
      
          //   const foo = document.createElement('a');
          //   foo.setAttribute('href', "https://ui.adsabs.harvard.edu/abs/"+ similarPapers[idx]['bibcode']);
          //   foo.textContent = similarPapers[idx]['title'][0];
          //   document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize("<li>"+ foo.outerHTML + "</li>");
          // }
          // document.getElementById('summarizedNotes').innerHTML += "</ul>";

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

