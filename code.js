window.onkeydown=window.onkeyup=()=>{ //if file is not empty, show "MODIFIED" text
	if (document.activeElement.tagName=="TEXTAREA") {
		if (document.activeElement.value!="")
			document.getElementById("status").innerHTML="&nbsp;&nbsp;&nbsp;MODIFIED"
		else
			document.getElementById("status").innerHTML=""
	}
}

function fname() { //selects text when file name is clicked
	e=document.getElementById("fname")
	if (document.body.createTextRange) { //chrome (?)
		temp=document.body.createTextRange()
		temp.moveToElementText(e)
		temp.select()
	}
	else if (window.getSelection) { //firefox
		temp=document.createRange()
		temp.selectNodeContents(e)
		selection=window.getSelection()
		selection.removeAllRanges()
		selection.addRange(temp)
	}
}

function save() { //send file to server to be saved
	fd=new FormData()
	fd.append("text",document.getElementById("text").value)
	fd.append("fname",document.getElementById("fname").innerHTML)

	fetch("/recv.php", {method:"POST", body:fd}) //sends request
		.then(e=>e.text())
		.then(e=>alert(e))
}

function oopen() { //open() is already taken so oopen() is used
	document.getElementById("file").click()
	document.getElementById("open-form").onchange=()=>{ //wait for file to be selected
		var fl=document.getElementById("file").files[0] //get file
		var fr=new FileReader()
		fr.onloadend=()=>{
			if (confirm("Opening a new file overrides existing file. Press OK to continue")) {
				document.getElementById("text").value=fr.result
				document.getElementById("fname").innerHTML=fl.name
				document.getElementById("open-form").reset()
				document.title=fl.name
			}
		}
		fr.readAsText(fl) //read file data
	}
}

function edit() { //not added yet
	alert("edit")
}