window.onkeydown=window.onkeyup=(e)=>{ //if file is not empty, show "MODIFIED" text
	if (document.activeElement.tagName=="TEXTAREA") {
		if (document.activeElement.value!="") {
			key=e.which||e.event //current key
			//keys that dont actually change the file
			ignore=[16, 17, 18, 20, 27, 37, 38, 39, 40, 93]
			if (ignore.indexOf(key)<0) //check whether ignored key was pressed
				document.getElementById("status").innerHTML="&nbsp;&nbsp;&nbsp;MODIFIED"
		}
		else {
			document.getElementById("status").innerHTML=""
		}
	}
}

function check(e) { //checks and removes newlines inside of file name
	//if a newline is typed dont add it to filename
	(e.which||e.event)==13?e.preventDefault():""
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
	fd.append("fname",document.getElementById("fname").innerText)

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
				document.getElementById("fname").innerText=fl.name
				document.getElementById("open-form").reset()
				document.title=fl.name
			}
		}
		fr.readAsText(fl) //read file data
	}
}

function edit() { //not added yet
	alert("edit feature has not been implemented yet")
}