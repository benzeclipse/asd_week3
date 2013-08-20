<?php



/*
if (isset($_POST['input'])) {
	$string = $_POST['input'];
	echo strrev($string);
}
*/

if (isset($_POST['name'], $_POST['string'])) {
	$name = $_POST['name'];
	$string = $_POST['string'];
	
	echo '<strong>', $name, '</strong>  says <i>', $string, '</i>';

}

?>