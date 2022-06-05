
var btnChooseFile = document.getElementById("btn_choose_file");

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("btn_next").disabled = true;
    document.getElementById("btn_prev").disabled = true;

    console.log("disabled");


});

// Rumyra (2022) File System Access API [Source code]. https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
async function getFile() {

    const pickerOpts = {
        types: [
          {
            description: 'Plain text',
            accept: {
               'text/plain': ['.memo' , '.txt']
            }
          },
        ],
        // excludeAcceptAllOption: true,
        multiple: false,
        id: 'here',
        startIn: "downloads"
      };

    // open file picker
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);

    // get file contents
    const fileData = await fileHandle.getFile();

    openFile(fileData);

}


function openFile(fileData){


    if (fileData == null) {
        alert("No file has been selected!");
        return;
    } else {
       
        fileName = fileData.name;
        const fileArr = fileName.split(".");
        if (fileArr[fileArr.length - 1] != "memo"){
            alert("File must be .memo type");
            return;

        }
    }

    var reader = new FileReader();

    reader.onload = function(e) {

        var allText = e.target.result;

        if (checkPlainText(allText) == false){
            alert("MEMO file is not plain text");
            return;
        }

        // split by page 
        const pagesText = allText.split("###"); // delimiter for pages
        var len = pagesText.length;
 
        createPages(len);

    
        for (var i = 0; i < len; i++){

            var curTextArea = document.getElementById( "memo_" + i);

            var numWords = countWords(pagesText[i]);
    
        
            if (numWords > 140){
                alert("This memo has over 140 words!");
                return;
            }

            curTextArea.value = pagesText[i];

        }

        checkWordCount();


        if (pagesText.length == 1){
            displayBox.style.justifyContent = "center";

        } else {
            displayBox.style.justifyContent = null;
        }

        document.getElementById("btn_next").disabled = false;
        
    }

    reader.readAsText(fileData);
}





function checkPlainText(text){

    // check if ascii
    var re = new RegExp('[^\\u0000-\\u007f]');

    if (re.test(text)){
        return false;
    };


}

