
//window.onload = onInitFunction;

function onInitFunction(){
console.log("Inside Init");
var request = new XMLHttpRequest();
request.open('GET', 'http://localhost:8080/UserManagement/rest/AudioService/file/2', true);
request.onload = function () {
  // Begin accessing JSON data here
  var audioFile = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
  console.log("Successfully loaded.....!!!");
    //data.forEach(audioFile => {
	var audioSource = `data:audio/mp3;base64,${audioFile.content}`;
	insertAudioInput(audioSource);
	// app = document.getElementById('file1');
	//app.setAttribute('src',audioSource );
    //console.log(`data:audio/mp3;base64,${audioFile.content}`);
	//console.log(audioFile.content]]]);
	//document.location.reload(true);
    //});
  } else {
    console.log("Error Occurred");
  }
}
request.send();
}

function insertAudioInput(srcAudio) {
  console.log("Inside function");
  var x = document.createElement("AUDIO");
  x.setAttribute("src",srcAudio);
  x.setAttribute("controls", "controls");
  document.body.appendChild(x);
}

function handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  // Closure to capture the file information.
  
  reader.onload = (function(theFile) {
    return function(e) {
      var binaryData = e.target.result;
	  console.log(binaryData);
	  var bufView = new Uint8Array(binaryData);
	  var array = [...bufView];
	  //console.log(array);
	  //String.fromCharCode.apply(String, array);
	  //console.log(String.fromCharCode.apply(String, array));
      //Converting Binary Data to base 64
 //var base64String = window.btoa(binaryData);
		//var text = `"${base64String}"`;
	  //console.log(text);
	  var newAudio = {"id":1,"content":array};
	  //var newAudio = {"id":6,"content":"sgdfghdh"};
	  //console.log(JSON.stringify(newAudio));
	  var xhr = new XMLHttpRequest();
		xhr.open("POST", 'http://localhost:8080/UserManagement/rest/AudioService/fileUploadBytes', true);

		//Send the proper header information along with the request
		xhr.setRequestHeader("Content-Type", "application/json");

		xhr.onreadystatechange = function() { // Call a function when the state changes.
			if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
				// Request finished. Do processing here.
			}
		}
		//xhr.send('{"id":6,"content":"sgdfghdh"}');
		xhr.send(JSON.stringify(newAudio));
		console.log("File upload success");
      //showing file converted to base64
      //document.getElementById('base64').value = base64String;
      alert('File uploaded successfully');
    };
  })(f);
  // Read in the image file as a data URL.
  //reader.readAsBinaryString(f);
  reader.readAsArrayBuffer(f);

}

function uploadFile(){
	var x = document.getElementById("files");
  var txt = "";
  if ('files' in x) {
    if (x.files.length == 0) {
      txt = "Select one or more files.";
    } else {
      for (var i = 0; i < x.files.length; i++) {
        txt += "<br><strong>" + (i+1) + ". file</strong><br>";
        var file = x.files[i];
        if ('name' in file) {
          txt += "name: " + file.name + "<br>";
        }
        if ('size' in file) {
          txt += "size: " + file.size + " bytes <br>";
        }
      }
    }
  } 
  else {
    if (x.value == "") {
      txt += "Select one or more files.";
    } else {
      txt += "The files property is not supported by your browser!";
      txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }
  }
  document.getElementById("demo").innerHTML = txt;
	
}