<?php
require("proxy_conf.php");

// remove PHP script time limit for the heavyweight callbacks
set_time_limit(600); // 10 minutes

/* 
http://127.0.0.1/php-demo/proxy/FwRequest.php/path1/path2/?var1=1

[REQUEST_URI] 	=> /php-demo/proxy/FwRequest.php/path1/path2/?var1=1
[PATH_INFO] 	=> /path1/path2/ 
GET [QUERY_STRING] => var1=1
*/

/*
foreach($_SERVER as $key => $value) 
  echo("SERVER[".$key."]=".$value."<br>");
die();
*/

// remove SCRIPT_NAME from PHP_SELF to hide proxy uri call
$proxy_complete_uri = $_SERVER['PHP_SELF'];
$proxy_script_uri = $_SERVER['SCRIPT_NAME'];
$proxy_relative_uri = str_replace($proxy_script_uri,"",$proxy_complete_uri); 
/*
echo($proxy_complete_uri."<br>");
echo($proxy_script_uri."<br>");
echo($proxy_relative_uri."<br>");
die();
*/

// Complete path
if(isset($_SERVER['REQUEST_URI']))
{
  //print_r($_SERVER['REQUEST_URI']); echo("<br>");
}

// URI
if(isset($proxy_relative_uri))
{
  //print_r($_SERVER['PHP_SELF']); echo("<br>");
  //print_r($_SERVER['PATH_INFO']); echo("<br>"); 

	/************** CONFIG **************/
	$dest_host = $dest_host_ip_port.$proxy_relative_uri;
	/************** CONFIG **************/
}
else
{
	die('Error while parsing $_SERVER["PHP_SELF"] or $_SERVER["SCRIPT_NAME"]');	
}

// Query String
if(isset($_SERVER['QUERY_STRING']))
{
  //print_r($_SERVER['QUERY_STRING']); echo("<br>");
}

// includes the generic proxy file to GET/POST data
require("proxy.php");
?>