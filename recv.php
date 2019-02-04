<?php

$path="/path/to/dir/"; //path to save files to
$path=(realpath($path)); //dont change this

if (isset($_POST["text"], $_POST["fname"])) {
	//converts path of file to real path
	$path_new=realpath($path."/".$_POST["fname"]);

	//checks if user is using ../ or / in path
	if (!$path_new||strpos($path_new, $path)!==0) { //file path not safe
		echo $_POST["fname"]." could not be saved";
	}
	else { //file path is safe
		file_put_contents($_POST["fname"], $_POST["text"]);
		echo $_POST["fname"]." was saved successfully";
	}
}
else {
	echo "Invalid params";
}
?>