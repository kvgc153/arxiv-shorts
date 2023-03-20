
var urlSplit = window.location.toString().split('//')[1];
var summaryJSONurl = 'https://raw.githubusercontent.com/kvgc/arxiv-shorts/main/arxiv-shorts.json';

var source = document.getElementById('content');
source.innerHTML +=`
 <div  id="summaryBox" style="left: 68%; height: 40%; position: fixed; width: 30%; bottom: 5%;z-index:10; background-color:white; overflow: auto;border-style: double;">
    <div class="card" style="width: 100%">
      <div class="card-body">
        <h5 class="card-title">Summary</h5>
           <div id="summarizedNotes" class="card-text" >
           </div>
      </div>
    </div>
 </div>`;

$.getJSON(summaryJSONurl, function(data) {

  ////////////////////////////////////////
  ///// Run on a regular arxiv page  ///// 
  ////////////////////////////////////////

  // User might visit https://arxiv.org/abs/1611.03530v2 or https://arxiv.org/abs/1611.03530 
  // so need to take care of that explicity
  // Assume that there can only be at a max of 8 versions per paper

  var summaryJSON = data; 
  console.log(summaryJSON);
  if(window.location.href.indexOf("https://arxiv.org/abs/") > -1){
    var versions = ["", "v8", "v7", "v6", "v5", "v4", "v3", "v2", "v1"];  

    for(var i=0; i< versions.length; i++){
      try{
        var AISummary = summaryJSON["http://"+urlSplit+versions[i]]['summary'];
        document.getElementById('summarizedNotes').innerHTML += AISummary;
      }
      catch(error){
        // console.error(error);
      }
    
    }
    
  }


  ///////////////////////////////////////////////
  ///// Run when user visits past week page ///// 
  ///////////////////////////////////////////////
  function checkURL(url){
    // returns boolean
    return(window.location.href.indexOf(url) > -1)
  }
  if(checkURL("https://arxiv.org/list/astro-ph.GA/pastweek?")| checkURL("https://arxiv.org/list/astro-ph.GA/recent") | checkURL("https://arxiv.org/list/astro-ph.GA/new")) {
    
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
          newNode.innerHTML               = "<b> Generated Summary: </b><br>" + AISummary + "<br>";
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
    $('#summaryBox').css('opacity','0')
  }

});



