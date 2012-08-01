//-----------------------------------------------------------------------------	
var DSHWCB = {};
//-----------------------------------------------------------------------------	
/* DEMO CODE
var myobj = new DSHWCB.BroadcastChannel('../PHP-SCRIPTS/proxy/', true);
var myobj = DSHWCB.BroadcastChannel('../PHP-SCRIPTS/proxy/', true,);

	<!-- Demo code to be used in the main HTML file -->
	<script type="text/javascript" src="../PHP-SCRIPTS/DSHWCB.js"></script>
	<script type="text/javascript">
	function ProcessMessageData(cbid, custno, pqky) {
		//alert('Process Message Data: CBID='+cbid+' CUSTNO='+custno+' PQKY='+pqky);

	  	if(parseInt(custno, 10) > 0 && parseInt(pqky, 10) > 0)
	  	{
	  		document.getElementById('custno').value = custno;
	  		document.getElementById('pqky').value = pqky;
			document.getElementById('getquest').click();
		}
	};
//-----------------------------------------------------------------------------	
// DEMO CODE 2:
	var dss_broadcast_channel = new DSHWCB.BroadcastChannel(undefined, true, onProcessRegisterChannel, onProcessMessageData);
	
	// callbacks can also be registered latter:
	var dss_broadcast_channel = new DSHWCB.BroadcastChannel(undefined, true);
	dss_broadcast_channel.pProcessRegisterChannel = onProcessRegisterChannel;
	dss_broadcast_channel.pProcessMessageData = onProcessMessageData;
	</script>
*/	
//-----------------------------------------------------------------------------	

DSHWCB.BroadcastChannel = function (iproxyurl, iautoregister, onProcessRegisterChannel, onProcessMessageData, onProcessCloseChannel) {

	//var dss_broadcast_channel = DSHWCB.BroadcastChannel(undefined, true);	
	if(!(this instanceof arguments.callee)) {
		console.log("Auto create and return object!");
		return new arguments.callee(iproxyurl, iautoregister);
	}	
	console.log("Creating DSHWCB.BroadcastChannel object.");

	// adding closeBrowser call to the EventManager to be triggered when browser is closed (terminate DSSession)
	console.log("Adding window.onbeforeunload custom DSHWCB.BroadcastChannel event to unload session.");
	this.addEvent(window, "load", this.autoRegister(this));  
	this.addEvent(window, "beforeunload", this.closeBrowser(this));  
	this.addEvent(window, "unload", this.refreshBrowser(this));  		
	
	//-----------------------------------------------------------------------------
	this.ds_client_broadcast_id = "";
	this.pragma_dssession = "";
	//-----------------------------------------------------------------------------
	this.proxy_url = "../PHP-SCRIPTS/proxy/";
	this.auto_register_channel = false;
	this.auto_redirect_response = true;
	this.show_messages_dialog = false;
	this.show_debug_messages = false;	
	//-----------------------------------------------------------------------------
	this.scn = "RESTipadchannel";
	this.chid = "";
	this.cbid = "";
	this.st	= "";
	//-----------------------------------------------------------------------------

	if(typeof iproxyurl === "string" && iproxyurl !== "" && iproxyurl !== undefined) {	
	  this.proxy_url = iproxyurl;
      console.log("ProxyUrl = "+this.proxy_url+";");
	}	

	if(typeof iautoregister === "boolean") {	
	  this.auto_register_channel = iautoregister;
	  if(this.auto_register_channel === true)
	    console.log("AutoRegisterChannel = true;");
	   else
	   	console.log("AutoRegisterChannel = false;");
	}	
	//-----------------------------------------------------------------------------	
	console.log("init: ProxyUrl = "+this.proxy_url+";");
	console.log("init: AutoRegisterChannel = "+this.auto_register_channel+";");
	console.log("init: ShowMessagesDialog = "+this.show_messages_dialog+";");
	console.log("init: ShowDebugMessages = "+this.show_debug_messages+";");
	//-----------------------------------------------------------------------------	
	// register external callbacks
	this.pProcessRegisterChannel = onProcessRegisterChannel;
	this.pProcessMessageData = onProcessMessageData;	
	this.pProcessCloseChannel = onProcessCloseChannel;	
	//-----------------------------------------------------------------------------	
};

//-----------------------------------------------------------------------------
// Public - DSHWCB namespace Scope - Generic functions
//-----------------------------------------------------------------------------	
// Math.randomFromTo(100,1000) //950
// source: http://www.admixweb.com/2010/08/24/javascript-tip-get-a-random-number-between-two-integers/
DSHWCB.BroadcastChannel.prototype.randomFromTo = function (from, to) {
    return Math.floor(Math.random()*(to-from+1)+from);
};
//-----------------------------------------------------------------------------
// Event Handler generic function - Add
DSHWCB.BroadcastChannel.prototype.addEvent = function (obj, evt, fn) {  
   if (typeof addEventListener !== "undefined") { // standards  
       obj.addEventListener(evt, fn, false);  
   } else if (typeof attachEvent !== "undefined") { // legacy IE  
       obj.attachEvent("on" + evt, fn);  
   } else { // neither; use DOM Level 0  
       obj["on" + evt] = fn;  
   }  
}  
//-----------------------------------------------------------------------------
// Event Handler generic function - Add  
DSHWCB.BroadcastChannel.prototype.removeEvent = function (obj, evt, fn) {  
    if (typeof removeEventListener !== "undefined") { // standards  
        obj.removeEventListener(evt, fn, false);  
    } else if (typeof detachEvent !== "undefined") { // legacy IE  
        obj.detachEvent("on" + evt, fn);  
    } else { // neither; use DOM Level 0  
        obj["on" + evt] = null;  
    }  
}  
//-----------------------------------------------------------------------------
// Public - DSHWCB namespace Scope
//-----------------------------------------------------------------------------	
DSHWCB.BroadcastChannel.prototype.getClientBroadcastID = function () {
	return this.ds_client_broadcast_id;
};
//-----------------------------------------------------------------------------	
DSHWCB.BroadcastChannel.prototype.setClientBroadcastID = function (icbid) {
	this.ds_client_broadcast_id = icbid;
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.pProcessRegisterChannel = function (registerstatus, cbid) {
	// to be replaced with callback pointer from main HTML code

	//var dss_remote_channel = new DSHWCB.BroadcastChannel('', false);
	//dss_remote_channel.pProcessMessageData = ProcessRegisterChannel;
	// or
	// set in constructor DSHWCB.BroadcastChannel
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.pProcessMessageData = function (cbid, custno, pqky) {
	// to be replaced with callback pointer from main HTML code

	//var dss_remote_channel = new DSHWCB.BroadcastChannel('', false);
	//dss_remote_channel.pProcessMessageData = ProcessMessageData;
	// or
	// set in constructor DSHWCB.BroadcastChannel
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.pProcessCloseChannel = function () {
	// to be replaced with callback pointer from main HTML code

	//var dss_remote_channel = new DSHWCB.BroadcastChannel('', false);
	//dss_remote_channel.pProcessCloseChannel = onProcessCloseChannel;
	// or
	// set in constructor DSHWCB.BroadcastChannel
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.registerChannel = function () {

	// internal ajax request object
	var sendReq = this._getXmlHttpRequestObject();	

	console.log("REGISTER: "+this.proxy_url);
	if (sendReq.readyState == 4 || sendReq.readyState == 0) {

        this.ds_client_broadcast_id = "";
		this.chid = this._getCHID();
		this.cbid = this._getCBID();
		this.st	=  this._getST();        

		sendReq.open("GET",this.proxy_url+
			'FwRequest.php/datasnap/rest/DSAdmin/ConsumeClientChannel/'+this.scn+'/'+this.chid+'/'+this.cbid+'//'+this.st+'//', true);
        sendReq.setRequestHeader('Accept','application/json');
        sendReq.setRequestHeader('Content-Type','text/xml');
		sendReq.onreadystatechange = this._cbRegisterChannel(this);

        console.log('registerChannel()');

		sendReq.send(null);
	}	
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.consumeChannelGET = function () {

	// internal ajax request object
	var sendReq = this._getXmlHttpRequestObject();	

	if (sendReq.readyState == 4 || sendReq.readyState == 0) {
		sendReq.open("GET",
			this.proxy_url+'FwRequest.php/datasnap/rest/DSAdmin/ConsumeClientChannel//'+this.chid+'///'+this.st+'/true/', true);
        sendReq.setRequestHeader('Accept','application/json');
        sendReq.setRequestHeader('Content-Type','text/xml');
        sendReq.setRequestHeader('Pragma',this.pragma_dssession);
		sendReq.onreadystatechange = this._cbConsumeChannelGET(this);

		console.log('consumeChannelGET()');
		sendReq.send(null);
	}	
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.consumeChannelPOST = function () {

	// internal ajax request object
	var sendReq = this._getXmlHttpRequestObject();	

	if (sendReq.readyState == 4 || sendReq.readyState == 0) {
		sendReq.open("POST",
			this.proxy_url+'FwRequest.php/datasnap/rest/DSAdmin/ConsumeClientChannel//'+this.chid+'///'+this.st+'/true/', true);		
        sendReq.setRequestHeader('Accept','application/json');
        sendReq.setRequestHeader('Content-Type','text/xml');
        sendReq.setRequestHeader('Pragma',this.pragma_dssession);
		sendReq.onreadystatechange = this._cbConsumeChannelPOST(this);

		console.log('consumeChannelPOST()');
		var param = {"result":[{"close":true}]};
		sendReq.send(param);
	}	
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.closeClientChannel = function () {

	if(this.ds_client_broadcast_id != "") {
		// internal ajax request object
		var sendReq = this._getXmlHttpRequestObject();	

		if (sendReq.readyState == 4 || sendReq.readyState == 0) {
			sendReq.open("GET",
				this.proxy_url+'FwRequest.php/datasnap/rest/DSAdmin/CloseClientChannel/'+this.chid+'/'+this.st+'/', true);
	        sendReq.setRequestHeader('Accept','application/json');
	        sendReq.setRequestHeader('Content-Type','text/xml');
	        sendReq.setRequestHeader('Pragma',this.pragma_dssession);
			sendReq.onreadystatechange = this._cbCloseClientChannel(this);

			console.log('closeClientChannel()');
			sendReq.send(null);
		}
	}
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.closeClientChannelSync = function () {
// NOTE: SJAX request (Synchronous) - necessary to block browser exit

	if(this.ds_client_broadcast_id != "") {
		// internal ajax request object
		var sendReq = this._getXmlHttpRequestObject();	

		if (sendReq.readyState == 4 || sendReq.readyState == 0) {
			sendReq.open("GET",
				this.proxy_url+'FwRequest.php/datasnap/rest/DSAdmin/CloseClientChannel/'+this.chid+'/'+this.st+'/', false);
	        sendReq.setRequestHeader('Accept','application/json');
	        sendReq.setRequestHeader('Content-Type','text/xml');
	        sendReq.setRequestHeader('Pragma',this.pragma_dssession);
			console.log('closeClientChannelSync()');
			sendReq.send(null);
		}
	}
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.closeSession = function () {

	//if(this.ds_client_broadcast_id != "") {
		// internal ajax request object
		var sendReq = this._getXmlHttpRequestObject();	

		if (sendReq.readyState == 4 || sendReq.readyState == 0) {
			sendReq.open("GET",
				this.proxy_url+'FwRequest.php/datasnap/rest/CloseSession/', true);
	        sendReq.setRequestHeader('Accept','application/json');
	        sendReq.setRequestHeader('Content-Type','text/xml');
	        sendReq.setRequestHeader('Pragma',this.pragma_dssession);
			sendReq.onreadystatechange = this._cbCloseSession(this);

			console.log('closeSession()');		
			sendReq.send(null);
		}
	//}
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.closeSessionSync = function () {
// NOTE: SJAX request (Synchronous) - necessary to block browser exit

	//if(this.ds_client_broadcast_id != "") {
		// internal ajax request object
		var sendReq = this._getXmlHttpRequestObject();	

		if (sendReq.readyState == 4 || sendReq.readyState == 0) {
			sendReq.open("GET",
				this.proxy_url+'FwRequest.php/datasnap/rest/CloseSession/', false);
	        sendReq.setRequestHeader('Accept','application/json');
	        sendReq.setRequestHeader('Content-Type','text/xml');
	        sendReq.setRequestHeader('Pragma',this.pragma_dssession);			
			console.log('closeSessionSync()');		
			sendReq.send(null);
		}
	//}
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.refreshBrowser = function (parentobj) {

    return function() {
    	//alert('RefreshBrowser! CBID='+parentobj.cbid);
		if(parentobj.ds_client_broadcast_id != undefined && parentobj.ds_client_broadcast_id !== "")
		{
			parentobj.closeClientChannelSync(); // already triggered by pending consumeClientGET/POST			
			parentobj.closeSessionSync(); 
			//alert('Closing connection [BrowserRefresh]');
		}		
	};
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.closeBrowser = function (parentobj) {

    return function() {
    	//alert('closeBrowser! CBID='+parentobj.cbid);
		if(parentobj.ds_client_broadcast_id != undefined && parentobj.ds_client_broadcast_id !== "")
		{
			parentobj.closeClientChannelSync(); // already triggered by pending consumeClientGET/POST			
			parentobj.closeSessionSync(); 
			//alert('Closing connection [CloseBrowser]');
		}		
	};
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype.autoRegister = function (parentobj) {

    return function() {    	
		if(parentobj.auto_register_channel != undefined && parentobj.auto_register_channel === true)
		{
			setTimeout(function(){parentobj.registerChannel()}, 500);			
		}		
	};
};
//-----------------------------------------------------------------------------
// Private - DSHWCB namespace Scope
//-----------------------------------------------------------------------------	
DSHWCB.BroadcastChannel.prototype._getCHID = function () {

	return "client"+this.randomFromTo(1000, 9999).toString();
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._getCBID = function () {

	return "cb"+this.randomFromTo(1000, 9999).toString();
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._getST = function () {

	return "concept"+(new Date().getTime()).toString();
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._getMsgDataCBID = function (message_data) {

	return this.ds_client_broadcast_id;
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._getMsgDataCUSTNO = function (message_data) {

	var custno = "0";
	var str_array = message_data.split(",");
	for (var i = 0; i < str_array.length; i++) {

		if(str_array[i].indexOf("custno=") != -1)
		{
			var str_sub_array = str_array[i].split("=");
			if(str_sub_array.length == 2)
			  custno = str_sub_array[1]; 
			break;
		}		
	};		
	if(parseInt(custno, 10) <= 0)
	  custno = 0;

	return custno;
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._getMsgDataPQKY = function (message_data) {

	var pqky = "0";
	var str_array = message_data.split(",");
	for (var i = 0; i < str_array.length; i++) {

		if(str_array[i].indexOf("pqky=") != -1)
		{
			var str_sub_array = str_array[i].split("=");
			if(str_sub_array.length == 2)
			  pqky = str_sub_array[1]; 
			break;
		}		
	};	
	if(parseInt(pqky) <= 0)
	  pqky = 0;

	return pqky;
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._getXmlHttpRequestObject = function () {

	if (window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert(
		'Status: Could not create XmlHttpRequest Object.' +
		'Consider upgrading your browser.');
	}
};
//-----------------------------------------------------------------------------
// Private - DSHWCB namespace Scope - XMLHttpRequest callback functions
//-----------------------------------------------------------------------------
// callback for registerChannel
DSHWCB.BroadcastChannel.prototype._cbRegisterChannel = function (cbparent) {
    return function() {
	    if (this.readyState == 4 || this.readyState == 0) {
	    	if(cbparent === undefined || typeof cbparent !== 'object')
	    	{
	    		console.log('[XMLHttpRequestCallback] Invalid callback pointer "cbparent"!');
	    		cbparent.pProcessRegisterChannel(false,"");
	    		return;
	    	}
		   	console.log('[XMLHttpRequestCallback] cbRegisterChannel: '+this.responseText);

		   	var json_response = JSON.parse(this.responseText);
		   	if(json_response.hasOwnProperty("SessionExpired"))
		   	{
		   		console.log('[XMLHttpRequestCallback] cbRegisterChannel: SessionExpired');
		   		if(cbparent.show_messages_dialog == true) alert('Session has expired, please re-open your browser!');
		   		cbparent.ds_client_broadcast_id = "";
				cbparent.chid = "";
				cbparent.cbid = "";
				cbparent.st	= "";
				cbparent.pProcessRegisterChannel(false,"");
		   	}
		   	else if(json_response.hasOwnProperty("error"))
		   	{
		   		console.log('[XMLHttpRequestCallback] cbRegisterChannel: Error = '+ json_response.error);
		   		if(cbparent.show_messages_dialog == true) alert('REST server error response: '+json_response.error+'!');
		   		cbparent.ds_client_broadcast_id = "";
				cbparent.chid = "";
				cbparent.cbid = "";
				cbparent.st	= "";
				cbparent.pProcessRegisterChannel(false,"");	   		
		   	}	   	
		   	else if(json_response.result[0].hasOwnProperty("invoke"))
		   	{
		   		if(json_response.result[0].invoke[1].created === true)
		   		{
		   			cbparent.ds_client_broadcast_id = json_response.result[0].invoke[0];
		   			console.log('[XMLHttpRequestCallback] cbRegisterChannel: Registered with success (CBID='+cbparent.ds_client_broadcast_id+')');
		   			var pragma_result = this.getResponseHeader('Pragma').split(",");
		   			if(pragma_result[0] !== undefined)
		   				cbparent.pragma_dssession = pragma_result[0];
		   			else
		   				cbparent.pragma_dssession = ""; 
		   			console.log('[XMLHttpRequestCallback] cbRegisterChannel: Pragma: '+cbparent.pragma_dssession);
		   			cbparent.pProcessRegisterChannel(true,cbparent.cbid);
		   			if(cbparent.show_debug_messages == 1) alert('Registered with success! (CBID='+cbparent.ds_client_broadcast_id+')');
					if(cbparent.auto_redirect_response === true)
						cbparent.consumeChannelPOST();
						//cbparent.consumeChannelGET();
		   		}
		   		else
		   		{
					cbparent.ds_client_broadcast_id = "";
					cbparent.chid = "";
					cbparent.cbid = "";
					cbparent.st	= "";				
		   			console.log('[XMLHttpRequestCallback] cbRegisterChannel: Error while trying to Register');
		   			if(cbparent.show_messages_dialog == true) alert('Error while trying to register!');
		   			cbparent.pProcessRegisterChannel(false,"");
		   		}
			}
			else
			{
				cbparent.ds_client_broadcast_id = "";
				cbparent.chid = "";
				cbparent.cbid = "";
				cbparent.st	= "";			
				console.log('[XMLHttpRequestCallback] cbRegisterChannel: ERROR!');
				if(cbparent.show_messages_dialog == true) alert('Unkown ERROR while trying to register!');
				cbparent.pProcessRegisterChannel(false,"");
			}
	    }
	};
};
//-----------------------------------------------------------------------------
// callback for consumeChannelGET
DSHWCB.BroadcastChannel.prototype._cbConsumeChannelGET = function (cbparent) {

    return function() {
	    if (this.readyState == 4 || this.readyState == 0) {
	    	if(cbparent === undefined || typeof cbparent !== 'object')
	    	{
	    		console.log('[XMLHttpRequestCallback] Invalid callback pointer "cbparent"!');
	    		return;
	    	}
		   	console.log('[XMLHttpRequestCallback] cbConsumeChannelGET: '+this.responseText);	   	

		   	var json_response = {"result":[{"response":""}]}
		   	if(this.responseText !== "")
		   		json_response = JSON.parse(this.responseText);
		   	if(json_response.result[0].hasOwnProperty("broadcast"))
		   	{

		   		console.log('[XMLHttpRequestCallback] cbConsumeChannelGET: Received broadcasted message');
		   		var message_data = json_response.result[0].broadcast[0];
		   		if(message_data.indexOf(cbparent.ds_client_broadcast_id) != -1)
		   		{
		   			console.log('[XMLHttpRequestCallback] cbConsumeChannelGET: Message destinated to self CBID='+cbparent.ds_client_broadcast_id);
		   			//if(show_debug_messages == 1) alert('Received broadcasted message (CBID='+cbparent.ds_client_broadcast_id+'): '+message_data);
		   			if(cbparent.pProcessMessageData != undefined && typeof cbparent.pProcessMessageData == 'function')
		   			{	
		   				var cbid 	= cbparent._getMsgDataCBID(message_data);
		   				var custno 	= cbparent._getMsgDataCUSTNO(message_data);
		   				var pqky 	= cbparent._getMsgDataPQKY(message_data);
		   				cbparent.pProcessMessageData(cbid, custno, pqky);
		   			}
		   			if(cbparent.pProcessCloseChannel != undefined && typeof cbparent.pProcessCloseChannel == 'function')
		   				cbparent.pProcessCloseChannel();					
		   			if(cbparent.auto_redirect_response === true)
		   				cbparent.closeClientChannel(); //cbparent.closeSession();
		   		}
		   		else
		   		{
		   			if(cbparent.auto_redirect_response === true)
						cbparent.consumeChannelGET();
				}	   		
			}
			else if(json_response.result[0].hasOwnProperty("close"))		
			{
				cbparent.ds_client_broadcast_id = "";
				console.log('[XMLHttpRequestCallback] cbConsumeChannelGET: Received CLOSE broadcast message!');
				if(cbparent.show_messages_dialog == true) alert('Received CLOSE broadcast message!');		
	   			if(cbparent.pProcessCloseChannel != undefined && typeof cbparent.pProcessCloseChannel == 'function')
	   				cbparent.pProcessCloseChannel();								
				if(cbparent.auto_redirect_response === true)
				{
					cbparent.closeClientChannel(); //cbparent.closeSession();
				}
			}
			else
			{				
				console.log('[XMLHttpRequestCallback] cbConsumeChannelGET: ERROR!');
				if(cbparent.show_messages_dialog == true) alert('ERROR while receiving broadcast!');			

				// In case this was generated by a Browser Cancel (ESC) operation, tries to make a clean close (use with carefull - danger!!!)
				if(cbparent.ds_client_broadcast_id != undefined && cbparent.ds_client_broadcast_id !== "")
					cbparent.closeBrowser(cbparent).call(cbparent);				
				
				cbparent.ds_client_broadcast_id = "";
			}		
		}
	};
};
//-----------------------------------------------------------------------------
// callback for consumeChannelGET
DSHWCB.BroadcastChannel.prototype._cbConsumeChannelPOST = function (cbparent) {

    return function() {
	    if (this.readyState == 4 || this.readyState == 0) {
	    	if(cbparent === undefined || typeof cbparent !== 'object')
	    	{
	    		console.log('[XMLHttpRequestCallback] Invalid callback pointer "cbparent"!');
	    		return;
	    	}
		   	console.log('[XMLHttpRequestCallback] cbConsumeChannelPOST: '+this.responseText);	   	

		   	var json_response = {"result":[{"response":""}]}
		   	if(this.responseText !== "")
		   		json_response = JSON.parse(this.responseText);
		   	if(json_response.result[0].hasOwnProperty("broadcast"))
		   	{

		   		console.log('[XMLHttpRequestCallback] cbConsumeChannelPOST: Received broadcasted message');
		   		var message_data = json_response.result[0].broadcast[0];
		   		if(message_data.indexOf(cbparent.ds_client_broadcast_id) != -1)
		   		{
		   			console.log('[XMLHttpRequestCallback] cbConsumeChannelPOST: Message destinated to self CBID='+cbparent.ds_client_broadcast_id);
		   			//if(show_debug_messages == 1) alert('Received broadcasted message (CBID='+cbparent.ds_client_broadcast_id+'): '+message_data);
		   			if(cbparent.pProcessMessageData != undefined && typeof cbparent.pProcessMessageData == 'function')
		   			{	
		   				var cbid 	= cbparent._getMsgDataCBID(message_data);
		   				var custno 	= cbparent._getMsgDataCUSTNO(message_data);
		   				var pqky 	= cbparent._getMsgDataPQKY(message_data);
		   				cbparent.pProcessMessageData(cbid, custno, pqky);
		   			}
		   			if(cbparent.pProcessCloseChannel != undefined && typeof cbparent.pProcessCloseChannel == 'function')
		   				cbparent.pProcessCloseChannel();							   			
					if(cbparent.auto_redirect_response === true)
		   				cbparent.closeClientChannel(); //cbparent.closeSession();
		   		}
		   		else
		   		{
					if(cbparent.auto_redirect_response === true)
						cbparent.consumeChannelPOST();	   			
				}
			}
			else if(json_response.result[0].hasOwnProperty("close"))		
			{
				cbparent.ds_client_broadcast_id = "";
				console.log('[XMLHttpRequestCallback] cbConsumeChannelPOST: Received CLOSE broadcast message!');
				if(cbparent.show_messages_dialog == 1) alert('Received CLOSE broadcast message!');		
	   			if(cbparent.pProcessCloseChannel != undefined && typeof cbparent.pProcessCloseChannel == 'function')
	   				cbparent.pProcessCloseChannel();									
				if(cbparent.auto_redirect_response === true)
				{
					cbparent.closeClientChannel(); //cbparent.closeSession();
				}
			}
			else
			{				
				console.log('[XMLHttpRequestCallback] cbConsumeChannelPOST: ERROR!');
				if(cbparent.show_messages_dialog == 1) alert('ERROR while receiving broadcast!');			

				console.log('[XMLHttpRequestCallback] cbConsumeChannelPOST: -->'+cbparent.ds_client_broadcast_id);
				// In case this was generated by a Browser Cancel (ESC) operation, tries to make a clean close (use with carefull - danger!!!)
				if(cbparent.ds_client_broadcast_id != undefined && cbparent.ds_client_broadcast_id !== "")
					cbparent.closeBrowser(cbparent).call(cbparent);

				cbparent.ds_client_broadcast_id = "";
			}		
		}
	};
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._cbCloseSession = function (cbparent) {

    return function() {
	    if (this.readyState == 4 || this.readyState == 0) {

		   	console.log('[XMLHttpRequestCallback] cbCloseSession REQUEST COMPLETED!');	   	
		}
	};
};
//-----------------------------------------------------------------------------
DSHWCB.BroadcastChannel.prototype._cbCloseClientChannel = function (cbparent) {

    return function() {
	    if (this.readyState == 4 || this.readyState == 0) {

		   	console.log('[XMLHttpRequestCallback] cbCloseClientChannel REQUEST COMPLETED!');	   	
		}
	};
};
//-----------------------------------------------------------------------------