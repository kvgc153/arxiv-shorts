;

if(window['visited'] != 'true'){

window['visited'] = 'true';

var source = document.getElementById('content');
source.innerHTML +=DOMPurify.sanitize(`
 <div id="togglerMain" style="left: 91.5%; height: 5%; position: fixed; width: 10%; bottom: 71%;z-index:10; background-color:transparent; overflow: auto;">
         <button id="toggler" type="button" class="btn btn-dark">arxiv-shorts</button>

 </div>`);

source.innerHTML +=DOMPurify.sanitize(`
 <div  id="summaryBox" style="left: 70%; height: 70%; position: fixed; width: 28%; bottom: 1%;z-index:10; background-color:transparent; overflow: auto;">
    <div class="card" style="width: 100%;">
      <div class="card-body">
           <div id="summarizedNotes" class="card-text" >
           </div>
      </div>
    </div>
 </div>`);

$(document).ready(function () {
  $("#toggler").click(function () {
      $("#summaryBox").toggle();
  });
});

var urlSplit = window.location.toString().split('//')[1];
var urlSplit = urlSplit.split('/');
var arxivID  = urlSplit[urlSplit.length-1];


var summaryJSONurl = "https://www.cosmicnoon.com/cgi-bin/arxivshorts.cgi?id=" + arxivID + "&token=" + arxivToken;

function checkURL(url){
  // returns boolean
  return(window.location.href.indexOf(url) > -1)
}

if(checkURL("https://arxiv.org/abs/")){
$.getJSON(summaryJSONurl, function(data) {
  var summaryJSON = data; 
  if(summaryJSON.hasOwnProperty('summary')){
    var makeHTML0 = "<h3> Summary: </h3>" + summaryJSON['summary'] + "<br><br><hr> <h3> Concepts: </h3><br><hr>";
    document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize(makeHTML0 );

    var concepts = summaryJSON['GPT']['concepts'];
    var conceptsKeys = Object.keys(concepts);

    var makeHTML1 = ''
    for(var j=0; j< conceptsKeys.length; j++){
      var foo = j+1;
      makeHTML1 += `
      <div class="card bg-light mb-3">
        <div class="card-body">
          <h5 class="card-title">${foo}. ${conceptsKeys[j]}</h5><br>
          <p class="card-text">
            ${concepts[conceptsKeys[j]].context}<br><br>
            <b>Def'n: </b>${concepts[conceptsKeys[j]].definition}<br>
            <b>Usage: </b>${concepts[conceptsKeys[j]].usefulness}<br>
          </p>
        </div>
      </div><br><br>
    `;
    }
    document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize(makeHTML1);







    var similarPapers = summaryJSON['ADS']['similar'];
    document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize("<h3> Related papers: </h3><ul>");
    for (let idx = 0; idx < similarPapers.length; idx++) {

      const foo = document.createElement('a');
      foo.setAttribute('href', "https://ui.adsabs.harvard.edu/abs/"+ similarPapers[idx]['bibcode']);
      foo.textContent = similarPapers[idx]['title'][0];
      document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize("<li>"+ foo.outerHTML + "</li>");
    }
    document.getElementById('summarizedNotes').innerHTML += "</ul>";
  }
  else{
    var similarPapers = summaryJSON['ADS']['similar'];
    document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize("<h3> Related papers: </h3><br>");
    for (let idx = 0; idx < similarPapers.length; idx++) {

      const foo = document.createElement('a');
      foo.setAttribute('href', "https://ui.adsabs.harvard.edu/abs/"+ similarPapers[idx]['bibcode']);
      foo.textContent = similarPapers[idx]['title'][0];
      document.getElementById('summarizedNotes').innerHTML += DOMPurify.sanitize(foo.outerHTML + "<br><br>");
    } 
  }






    ////////////////////////////////////
  // Hide notes panel if not needed //
  ////////////////////////////////////
  if(document.getElementById('summarizedNotes').innerHTML.length < 15){
    // check if anything was written to the HTML block and if not hide it 
    $('#summaryBox').css('opacity','0')
  }


});
}

var summaryOnlyJSON = 'https://raw.githubusercontent.com/kvgc/arxiv-shorts/main/arxiv-shorts.json';


if(checkURL("https://arxiv.org/list/astro-ph.GA/pastweek?")| checkURL("https://arxiv.org/list/astro-ph.GA/recent") | checkURL("https://arxiv.org/list/astro-ph.GA/new")) {
  $.getJSON(summaryOnlyJSON, function(data) {
    var summaryJSON = data; 

    ///////////////////////////////////////////////
    ///// Run when user visits past week page ///// 
    ///////////////////////////////////////////////

 
    if(true){    
      var papers = document.getElementsByClassName("list-identifier");
      var papersMeta = document.getElementsByClassName("meta"); 
      // len(papers) == len(papersMeta)
      for(var i =0; i< papers.length;i++){
        var currentPageUrl = "http://"+ papers[i].childNodes[0].href.split('//')[1];
        var versions = ["", "v3", "v2", "v1"]; 

        for(var j=0; j< versions.length; j++){      
          try {
            var AISummary = summaryJSON[currentPageUrl+versions[j]]['summary'];

            var newNode = document.createElement("div");
            newNode.innerHTML               =  DOMPurify.sanitize("<b> Generated Summary: </b><br>" + AISummary + "<br>");
            newNode.style.border            = "2px dotted black";
            newNode.style.padding           = "10px";
            newNode.style.backgroundColor   = "#F0F8FF";
            newNode.style.width             = "40%";
            newNode.style.fontFamily        = "Cambria";
            papersMeta[i].childNodes[3].appendChild(newNode);
            // papers1[0].childNodes[3]

            
          } catch (error) {
            console.error(error);
          }
        }
      }
    }

      ////////////////////////////////////
    // Hide notes panel if not needed //
    ////////////////////////////////////
    if(document.getElementById('summarizedNotes').innerHTML.length < 15){
      // check if anything was written to the HTML block and if not hide it 
      $('#togglerMain').css('opacity','0')
      $('#summaryBox').css('opacity','0')
    }
  });
}

}