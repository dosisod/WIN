<?php

$path="/path/to/dir/"; //path to save files to

if (isset($_POST["text"])&&isset($_POST["fname"])) {
	$file=basename($_POST["fname"]) //string any folder paths
	file_put_contents($path.$file, $_POST["text"]);
	echo $_POST["fname"]." was saved successfully";
}
else {
	echo $_POST["fname"]." could not be saved";
}
?>