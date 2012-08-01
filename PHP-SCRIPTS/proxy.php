<?php
$debug_to_file = false;

/************** CONFIG **************/
//$dest_host = "remoteserverip:port"; // configured in the proxy_conf.php
/************** CONFIG **************/

/************** EXPERT CONFIG **************/
$proxied_headers = array('Set-Cookie', 'Content-Type', 'Cookie', 'Location', 'Pragma'); // What headers proxy from origin to client						
/************** EXPERT CONFIG **************/

// debug file
if($debug_to_file)
{
  $proxy_debug_file = "proxy_debug.txt";
  $proxy_debug = fopen($proxy_debug_file, 'a') or die("can't open file");
  fwrite($proxy_debug, "[START]------------------------------------\r\n");
  fwrite($proxy_debug, date('m/d/Y h:i:s', time())." Initialize Proxy Debug file!\r\n");
}

/* Init CURL */
$ch = curl_init();

$protocol = "http://";
if($enable_https) $protocol = "https://";

// Debug destination URL
if($debug_to_file)
  fwrite($proxy_debug, date('m/d/Y h:i:s', time())." CURL_URL=".$protocol.$dest_host."\r\n");

curl_setopt($ch, CURLOPT_URL, $protocol.$dest_host);
curl_setopt($ch, CURLOPT_AUTOREFERER, 1);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);
curl_setopt($ch, CURLOPT_USERAGENT, $_SERVER['HTTP_USER_AGENT']);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Expect:'));
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_0);

// bypass SSL verification
if($enable_https && $ssl_force_verify_bypass)
{
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
  $handle = fopen(getcwd().'\curl.log', 'w');
  curl_setopt($ch, CURLOPT_VERBOSE, '1');
  curl_setopt($ch, CURLOPT_STDERR, $handle);
}
else
{  
  $handle = fopen(getcwd().'\curl.log', 'w'); // debug CURL request
  curl_setopt($ch, CURLOPT_VERBOSE, '1');
  curl_setopt($ch, CURLOPT_STDERR, $handle);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, '1');
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, '1');
  curl_setopt($ch, CURLOPT_CERTINFO, '1');
  curl_setopt($ch, CURLOPT_CAINFO,  getcwd().'\ssl\ca.crt');
}

/* Collect and pass client request headers */
if(isset($_SERVER['HTTP_COOKIE']))     	    { $hdrs[]="Cookie: ".$_SERVER['HTTP_COOKIE']; }
if(isset($_SERVER['HTTP_USER_AGENT']))      { $hdrs[]="User-Agent: ".$_SERVER['HTTP_USER_AGENT']; }
if(isset($_SERVER["HTTP_HOST"]))            { $hdrs[]="Host: ".$_SERVER['HTTP_HOST']; }
if(isset($_SERVER["HTTP_ACCEPT"]))          { $hdrs[]="Accept: ".$_SERVER['HTTP_ACCEPT']; }
if(isset($_SERVER["HTTP_ACCEPT_ENCODING"])) { $hdrs[]="Accept-Encoding: ".$_SERVER['HTTP_ACCEPT_ENCODING']; }
if(isset($_SERVER["HTTP_ACCEPT_LANGUAGE"])) { $hdrs[]="Accept-Language: ".$_SERVER['HTTP_ACCEPT_LANGUAGE']; }
if(isset($_SERVER["HTTP_ACCEPT_CHARSET"]))  { $hdrs[]="Accept-Charset: ".$_SERVER['HTTP_ACCEPT_CHARSET']; }
if(isset($_SERVER['HTTP_PRAGMA']))          { $hdrs[]="Pragma: ".$_SERVER['HTTP_PRAGMA'].",remoteclientip=".$_SERVER['REMOTE_ADDR']; }

// custom headers
/*
if(isset($_SESSION) && isset($_SESSION['pragma_dssession']))
  $hdrs[]="Pragma:".$_SESSION['pragma_dssession'].",remoteclientip=".$_SERVER['REMOTE_ADDR'];
*/  
//$hdrs[]="X-Requested-With: XMLHttpRequest";
//$hdrs[]="Content-Type: application/x-www-form-urlencoded";
//$hdrs[]="Content-Type: text/xml";
//$hdrs[]="Pragma:dssession=941339.750607.981005";
//print_r($hdrs);
//die();

// set output headers
curl_setopt($ch, CURLOPT_HTTPHEADER, $hdrs);

// force POST
//curl_setopt($ch, CURLOPT_POST, 1);

/* pass POST params */
if(sizeof($_POST) > 0)
{
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($_POST)); 
}

if($debug_to_file)
{
  // DEBUG Client REQUEST HEADERS
  foreach ($hdrs as $key => $value) 
  {
    fwrite($proxy_debug, date('m/d/Y h:i:s', time())." CURL Headers: HEADER[".$key."]=".$value."\r\n");  
  }
  fwrite($proxy_debug, date('m/d/Y h:i:s', time())." Execute CURL request to: ".$protocol.$dest_host."\r\n");
}

// Execute CURL
$res = curl_exec($ch);
curl_close($ch);
fclose($handle);

if($debug_to_file)
  fwrite($proxy_debug, date('m/d/Y h:i:s', time())." Finalized executing CURL\r\n");

// verify if response is empty -> REST server not active (connection expires time limit)
if($res == "")
  die('{"error":"NO_RESPONSE_FROM_REST_SERVER"}');

/* parse response */
list($headers, $body) = explode("\r\n\r\n", $res, 2);

$headers = explode("\r\n", $headers);
$hs = array();
foreach($headers as $header)
{
  if(false !== strpos($header, ':'))
  {
    list($h, $v) = explode(':', $header);
    $hs[$h][] = $v;
    if($debug_to_file)
      fwrite($proxy_debug, date('m/d/Y h:i:s', time())." HEADER: ".$header."\r\n");
  } 
  else 
  {
    $header1  = $header;
    if($debug_to_file)
      fwrite($proxy_debug, date('m/d/Y h:i:s', time())." HEADER1=HEADER: ".$header."\r\n");
  }
}
// extracts Pragma header 'dssession=893382.359933.850100,dssessionexpires=1200000'
/*
if(isset($_SESSION) && !isset($_SESSION['pragma_dssession']))
{
  $pragma_dssession = array();
  $pragma_header = $hs['Pragma'][0];
  $pragma_dssession = explode(",", $pragma_header);
  $_SESSION['pragma_dssession'] = $pragma_dssession[0];
  //echo($pragma_dssession[0]);
  //print_r($hs);
  //die();
  fwrite($proxy_debug, date('m/d/Y h:i:s', time())." Manually adding Pragma to HEADER: ".$pragma_dssession[0]."\r\n");
}
*/

/* set headers */
if(!isset($header1))
{
  $header1 = 'HTTP/1.1 200 OK';
  if($debug_to_file)
    fwrite($proxy_debug, date('m/d/Y h:i:s', time())." Manually setting HEADER1: ".$header1."\r\n");
}

list($proto, $code, $text) = explode(' ', $header1);
header($_SERVER['SERVER_PROTOCOL'].' '.$code.' '.$text);
foreach($proxied_headers as $hname)
{
  if(isset($hs[$hname]))
  {
	  foreach($hs[$hname] as $v)
    {
      if($debug_to_file)
        fwrite($proxy_debug, date('m/d/Y h:i:s', time())." Setting PROXY_HEADERS: ".$hname.": ".$v."\r\n");
	    if($hname === 'Set-Cookie')
      {
		    header($hname.": ".$v, false);
	    }
      else
      {
		    header($hname.": ".$v);
	    }
	  }
  }
}

if($debug_to_file)
{
  fwrite($proxy_debug, "[END]--------------------------------------\r\n\r\n");
  fclose($proxy_debug);
}
die($body);