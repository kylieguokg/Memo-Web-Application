

document.addEventListener('DOMContentLoaded', () => {

    document.getElementById("memoView").style.justifyContent = null;

    customise(localStorage.getItem("memoColour"), localStorage.getItem("txtSize"), localStorage.getItem("txtColour"));

	document.getElementById('saveButton').onclick = (e) => {
		e.preventDefault();

        customise(memoColour.value, textSize.value, textColour.value);

        localStorage.setItem("memoColour", memoColour.value);
        localStorage.setItem("txtSize", textSize.value);
        localStorage.setItem("txtColour", textColour.value);


	}


});

function customise(mColour, txtSize, txtColour){


    for (var i = 0; i < document.getElementsByClassName("memo").length; i++){

        
        (document.getElementsByClassName("memo"))[i].style.backgroundColor = mColour;
        (document.getElementsByClassName("memo"))[i].style.fontSize = txtSize + "px";
        (document.getElementsByClassName("memo"))[i].style.color = txtColour
    }


}