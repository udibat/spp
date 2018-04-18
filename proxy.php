<?php

header ('Content-type: application/json');

/* Bypasses CORS issue */
header ('Access-Control-Allow-Origin: *');
header ('Access-Control-Allow-Methods: POST,GET,PUT,DELETE');
header ('Access-Control-Allow-Headers: Authorization, Lang');
/* Bypasses CORS issue */ 

$c = $_GET['a'];
	if($c=='all') {
		$url= 'https://marketplace.spp.org/public-data-api';
		} else {
		$url = 'https://marketplace.spp.org/public-data-api';
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