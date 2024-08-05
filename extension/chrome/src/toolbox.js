// var source_tbox = document.getElementById('content');
// var urlSplit_tbox = window.location.toString().split('/');
// var paperID_tbox  = urlSplit_tbox[urlSplit_tbox.length-1];


// function insertButtons(){
//      source_tbox.innerHTML += DOMPurify.sanitize(`
//      <div>
//      <button class="btn btn-lg btn-primary" id='arxiv-pdf'>Load pdf</button>
//      <button class="btn btn-lg btn-primary" id='AstroBites'>Search Astrobites</button>
//      <button class="btn btn-lg btn-primary" id='Annotate'>Annotate (hypothes.is)</button>
     
//      </div>
//      <div id="renderDisplay"></div></div>
//      `);
     
     
//      //Open PDF by default
     
//      var iframe = document.createElement('iframe');
//      iframe.src = "https://arxiv.org/pdf/"+paperID_tbox+".pdf";
//      iframe.width = 1200;
//      iframe.height = 100000;
//      iframe.id    = 'IframeElement';
//      var destination = document.getElementById('renderDisplay');
     
//      if(document.getElementById('IframeElement') !== null){
//           document.getElementById('IframeElement').remove();
//           destination.appendChild(iframe);
//      }
//      else{
//           destination.appendChild(iframe);
//      }
     
     
//      /////////////////////////////////////
     
     
     
//      document.getElementById('arxiv-pdf').onclick = function() {
     
//         var iframe = document.createElement('iframe');
//         iframe.src = "https://www.arxiv.org/pdf/"+paperID_tbox+".pdf";
//         iframe.width = 1200;
//         iframe.height = 100000;
//         iframe.id    = 'IframeElement';
//         var destination = document.getElementById('renderDisplay');
     
//         if(document.getElementById('IframeElement') !== null){
//              document.getElementById('IframeElement').remove();
//              destination.appendChild(iframe);
//         }
//         else{
//              destination.appendChild(iframe);
//         }
        
     
//      };
     
//      document.getElementById('Annotate').onclick = function() {
     
//           var iframe = document.createElement('iframe');
//           iframe.src = "https://via.hypothes.is/"+ "https://arxiv.org/pdf/"+paperID_tbox+".pdf";
//           iframe.width = 1200;
//           iframe.height = 900;
//           iframe.id    = 'IframeElement';
//           var destination = document.getElementById('renderDisplay');
       
//           if(document.getElementById('IframeElement') !== null){
//                document.getElementById('IframeElement').remove();
//                destination.appendChild(iframe);
//           }
//           else{
//                destination.appendChild(iframe);
//           }
          
       
//        };
     
     
//      document.getElementById('AstroBites').onclick = function() {
     
//         var iframe = document.createElement('iframe');
//         iframe.src = "https://astrobites.org/?s="+encodeURI(paperID_tbox);
//         iframe.width = 1200;
//         iframe.height = 600;
//         iframe.id    = 'IframeElement';
//         var destination = document.getElementById('renderDisplay');
     
     
//         if(document.getElementById('IframeElement') !== null){
//              document.getElementById('IframeElement').remove();
//              destination.appendChild(iframe);
//          }
//          else{
//              destination.appendChild(iframe);
//          }
     
//      };     

// }

// if(checkURL("https://arxiv.org/abs/")){
//      insertButtons()
// }
