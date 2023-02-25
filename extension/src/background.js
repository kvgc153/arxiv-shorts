
var source = document.getElementById('content');
var urlSplit = window.location.toString().split('//')[1];
var summaryJSON = 'https://raw.githubusercontent.com/kvgc/arxiv-shorts/main/arxiv-shorts.json';



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


$.getJSON(summaryJSON, function(data) {

  // User might visit https://arxiv.org/abs/1611.03530v2 or https://arxiv.org/abs/1611.03530 
  // so need to take care of that explicity
  // Assume that there can only be at a max of 8 versions per paper

  var versions = ["", "v8", "v7", "v6", "v5", "v4", "v3", "v2", "v1"];  

  for(var i=0; i< versions.length; i++){
    try{
      var AISummary = data["http://"+urlSplit+versions[i]]['summary'];
      document.getElementById('summarizedNotes').innerHTML += AISummary;
    }
    catch(error){
      console.error(error);
    }

  }
  
  if(document.getElementById('summarizedNotes').innerHTML.length < 15){
    // check if anything was written to the HTML block and if not hide it 
    $('#summaryBox').css('opacity','0')
  }
});




