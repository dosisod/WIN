window.onkeydown=function(e){
	if (document.activeElement.tagName=="TEXTAREA") {
		document.getElementById("status").innerHTML="&nbsp;&nbsp;&nbsp;MODIFIED"
	}
}

function save() {
	fd=new FormData()
	fd.append("text",document.getElementById("text").value)
	fd.append("fname",document.getElementById("fname").innerHTML)

	req=new XMLHttpRequest()
	req.open("POST","/recv.php",true)

	req.onreadystatechange=function(){ //from mozilla docs
		if (this.readyState===XMLHttpRequest.DONE&&this.status===200) {
			alert(this.responseText)
		}
	}
	req.send(fd)
}

function oopen() { //open() is already taken so oopen() is used
	document.getElementById("file").click()
	document.getElementById("open-form").onchange=function() {
		var fl=document.getElementById("file").files[0]
		var fr=new FileReader()
		fr.readAsText(fl)
		fr.onloadend=function() {
			if (confirm("Opening a new file overrides existing file. Press OK to continue")) {
				document.getElementById("text").value=fr.result
				document.getElementById("fname").innerHTML=fl.name
				document.getElementById("open-form").reset()
				document.title=fl.name
			}
		}
	}
}

function edit() {
	alert("edit")
}
