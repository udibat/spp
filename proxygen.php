<?php

header ('Content-type: application/json');

/* Bypasses CORS issue */
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: POST,GET,PUT,DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

/* Bypasses CORS issue */

$z = $_GET['y'];
	if($z=='gen') {
		$url= 'https://marketplace.spp.org/public-data-api/gen-mix/asChart';
		} else {
		$url = 'https://marketplace.spp.org/public-data-api/gen-mix/asChart';
		}

$handle = fopen($url, "r");

if ($handle) {
	while (!feof($handle))  {
		$buffer = fgets($handle, 4096);
		echo $buffer;
	}

	fclose($handle);
}

?>