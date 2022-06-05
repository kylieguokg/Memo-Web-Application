document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("btn_prev").disabled = true;
    createMemo();
    
});

var btnChooseFile = document.getElementById("btn_create_memo");

btnChooseFile.addEventListener("click", createMemo);