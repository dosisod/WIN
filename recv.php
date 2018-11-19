<?php

if (isset($_POST["text"])&&isset($_POST["fname"])) {
	file_put_contents($_POST["fname"], $_POST["text"]);
	echo $_POST["fname"]." was saved successfully";
}
else {
	echo $_POST["fname"]." could not be saved";
}
?>
