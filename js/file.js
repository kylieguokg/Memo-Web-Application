var displayBox = document.getElementById("memoView");
var textArea = document.getElementsByClassName("memo");
var inputChooseFile = document.getElementById("input_choose_file");
var fileName = null;

function openSettings(){
    document.getElementById("settings").style.width = "350px";
}

function closeSettings(){
    document.getElementById("settings").style.width = "0px";
}

function createPages(numPages){

    // clear the existing memos

    var len = pageCount;
   
    for (var i = 0; i < len; i++){
        console.log(i);
        (document.getElementById("memo_"+ i)).remove();
    
    }

    displayBox.scrollLeft = 0;

    pageCount = numPages;
    pageIndex = 0;

    for (var i = 0; i < numPages; i++){

        // create a new memo
        var newListItem = document.createElement("li");
        newListItem.innerHTML = "<textarea class = \"memo\" id = \"memo_" + i + "\" onkeyup= \"checkWordCount();\"></textarea>";
        displayBox.appendChild(newListItem);
        customise(localStorage.getItem("memoColour"), localStorage.getItem("txtSize"), localStorage.getItem("txtColour"));

    }

    pageNumber = pageIndex + 1;
    document.getElementById("pageNumber").innerHTML = "PAGE NUMBER: " + pageNumber;

}


var btnSaveFile = document.getElementById("btn_save_file");
btnSaveFile.addEventListener("click", saveFile);

function saveFile() {

    var fileText = "";

    console.log(pageCount);

    for (var i = 0; i < pageCount; i++){
        fileText += (document.getElementById("memo_" + i)).value;
        if (i + 1 < pageCount){
            fileText += "###";
        }
        
    }

    savetoFile(fileText);


}


// Rumyra (2022) File System Access API [Source code]. https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
async function savetoFile(fileText){

 
    const newHandle = await window.showSaveFilePicker({suggestedName: fileName, 
        id: 'here', 
        startIn: "downloads"});

    // create a FileSystemWritableFileStream to write to
    const writableStream = await newHandle.createWritable();

    // write our file
    await writableStream.write(fileText);

    // close the file and write the contents to disk.
    await writableStream.close();

    alert("File Saved!");
}


function countChars(text){
    const charArray = text.split('');
    return charArray.length;
}

function countWords(text){
    
    // split by any kind of spacing
    const wordArray = text.split(/\s+/);

    var len = wordArray.length;

    for (var i = 0; i < wordArray.length; i++){
        if (wordArray[i] == "") {
            len -= 1;
        }
    }

    return len;
}

var lastValidState = "";

function checkWordCount(){

    curTextArea = document.getElementById("memo_" + pageIndex);

    var numWords = countWords(curTextArea.value);

    document.getElementById("wordCount").innerHTML = "<label>WORD COUNT: " + numWords +"<\label>";

    
    if (numWords > 140){
        alert("This memo has over 140 words!");
        curTextArea.value = lastValidState;
        curTextArea.setAttribute("maxLength", countChars(curTextArea.value) - 2);
        numWords = countWords(curTextArea.value);
        document.getElementById("wordCount").innerHTML = "<label>WORD COUNT: " + numWords +"<\label>";
        return;
    } else {
        lastValidState = curTextArea.value;
        curTextArea.removeAttribute("maxLength");
    }

    
}

var btnNext = document.getElementById("btn_next");
btnNext.addEventListener("click", nextMemo);

var i = 1;
var firstMemo = true;
var pageCount = 0;
var pageIndex = 0;
var pageNumber = 1;


function nextMemo(){
    

    pageIndex += 1;

    var nextPage = pageIndex + 1;

    
    if (pageIndex >= pageCount){
        // create a new memo
        var newListItem = document.createElement("li");
        newListItem.innerHTML = "<textarea class = \"memo\" id = \"memo_" + pageIndex   + "\" onkeyup= \"checkWordCount();\"></textarea>";
        displayBox.appendChild(newListItem);
        customise(localStorage.getItem("memoColour"), localStorage.getItem("txtSize"), localStorage.getItem("txtColour"));
        pageCount += 1;
    } 


    curTextArea = document.getElementById("memo_" + pageIndex);

    if (curTextArea != null){
        curTextArea.scrollIntoView({inline: "center"});
    }
   
    
    pageNumber = pageIndex + 1;
    document.getElementById("pageNumber").innerHTML = "PAGE NUMBER: " + pageNumber;

    checkWordCount();

    document.getElementById("btn_prev").disabled = false;

}


var btnPrev = document.getElementById("btn_prev");
btnPrev.addEventListener("click", prevMemo);
   
function prevMemo(){

    pageIndex -= 1;

    if (displayBox.scrollLeft == 0){
        pageIndex = 0;
    }
    
    
    if (pageIndex == 0){
        document.getElementById("btn_prev").disabled = true;
    } else {
        document.getElementById("btn_prev").disabled = false;
    }

    curTextArea = document.getElementById("memo_" + pageIndex);
    curTextArea.scrollIntoView({inline: "center"});

    checkWordCount();

    pageNumber = pageIndex + 1;
    document.getElementById("pageNumber").innerHTML = "PAGE NUMBER: " + pageNumber;
}


function createMemo() {
    createPages(3);
    checkWordCount();
}



