var queryEngSec = getQueryUrl("engsec");
var queryCaptureResolution = getQueryUrl("clcsr");
var clpaddesktimer = null;
var fbtracktimer = null;
var fbtracktimerCount = 0;

if (typeof clpconfig !== 'undefined' && typeof clpconfig === 'object' && clpconfig !== null)
{
	if (queryEngSec==null || queryEngSec=="0" || isNaN(queryEngSec))
	{
		queryEngSec = clpconfig["engsec"] != null ? clpconfig["engsec"] : "0";
	}
	if (queryCaptureResolution == null)
	{
		var queryCaptureResolution = clpconfig["clcsr"] != null ? clpconfig["clcsr"] : 0;
	}
}
var hidLocation = document.getElementById("hidLocation");

if (queryEngSec!=null && queryEngSec!="0" && !isNaN(queryEngSec) && hidLocation!=null && hidLocation.value!='')
{
	setTimeout("trackEngage()", queryEngSec*1000);
}

if (queryCaptureResolution!=null && queryCaptureResolution=="1" && hidLocation!=null && hidLocation.value!='')
{
	clpaddesktimer = setTimeout(desktopDetails, 1000);
}

function getQueryUrl(ji) {
	hu = window.location.search.substring(1);
	gy = hu.split("&");
	for (i=0;i<gy.length;i++) {
		ft = gy[i].split("=");
		if (ft[0] == ji)
			return decodeURIComponent(ft[1]);
	}
	return null;
}

var keyStr = "ABCDEFGHIJKLMNOP" +
"QRSTUVWXYZabcdef" +
"ghijklmnopqrstuv" +
"wxyz0123456789+/" +
"=";

function trim(str) {
	return str.replace(/^\s*|\s*$|\n|\r/g,"");
}

function encode64(input) {
	var output = "";
	var chr1, chr2, chr3 = "";
	var enc1, enc2, enc3, enc4 = "";
	var i = 0;

	do {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output +
		keyStr.charAt(enc1) +
		keyStr.charAt(enc2) +
		keyStr.charAt(enc3) +
		keyStr.charAt(enc4);
		chr1 = chr2 = chr3 = "";
		enc1 = enc2 = enc3 = enc4 = "";
	} while (i < input.length);

	return output;
}

function trackEngage()
{
	var pic=document.createElement('img');
	pic.src = hidLocation.value + 'adeng.php?rnd=' + Math.random();
	pic.setAttribute("style", "display:none");
	hidLocation.parentNode.appendChild(pic);
}

function checkdirect(c,l,i)
{
	if (typeof clpaddesktimer !== 'undefined' && clpaddesktimer != null)
	{
		clearTimeout(clpaddesktimer);
	}
	if (typeof clpmvlcalltimer !== 'undefined' && clpmvlcalltimer != null)
	{
		clearTimeout(clpmvlcalltimer);
	}
	if (i===undefined)
		i='';
	var resolutionData = typeof clpconfig !== 'undefined' && typeof clpconfig === 'object' && clpconfig["clcsr"] != null && clpconfig["clcsr"] == 1 ?
		'&clpreslw=' + screen.width + '&clpreslh=' + screen.height + 
		//'&clpreslaw=' + screen.availWidth + '&clpreslah=' + screen.availHeight + 
		'&clpreslr=' + (window.devicePixelRatio ? window.devicePixelRatio : 1) : '';
	var mvlVarsElem = document.getElementById("clpmvlvarshid");
	var mvlVars = mvlVarsElem != null && mvlVarsElem.value != '' ? '&' + mvlVarsElem.value : '';
	var pic = document.createElement("img");
	pic.src = hidLocation.value + 'adck.php?c=' + c + '&l=' +  l + '&id=' + i + '&' + window.location.search.substring(1) + 
		mvlVars + resolutionData + '&r=' + encode64(trim(document.referrer)) + "&rnd=" + Math.random();
	pic.setAttribute("style", "display:none");
	hidLocation.parentNode.appendChild(pic);
}

function desktopDetails()
{
	var pic=document.createElement('img');
	pic.src = hidLocation.value + 'addesk.php?w=' + screen.width + '&h=' + screen.height + '&rnd=' + Math.random();
	pic.setAttribute("style", "display:none");
	hidLocation.parentNode.appendChild(pic);
}

function resetCookie(l)
{
	if (l===undefined)
		l=1;
	var pic = document.createElement("img");
	pic.src = hidLocation.value + 'resetcookie.php?l=' + l + '&t=image&rnd=' + Math.random();
	pic.setAttribute("style", "display:none");
	hidLocation.parentNode.appendChild(pic);
}

function fbCapiTrack(timeoutSec)
{
	if (timeoutSec == undefined)
		timeoutSec = 2000;
	fbtracktimer = setInterval(function(){
		var fbc = get_cookie('_fbc');
		var fbp = get_cookie('_fbp');
		if (fbc != '' || fbp != '')
		{
			var pic=document.createElement('img');
			pic.src = hidLocation.value + 'tokens-fb.php?fbc=' + fbc + '&fbp=' + fbp + '&rnd=' + Math.random();
			pic.setAttribute("style", "display:none");
			hidLocation.parentNode.appendChild(pic);
			clearInterval(fbtracktimer);
		}
		fbtracktimerCount++;
		if (fbtracktimerCount > 10)
		{
			clearInterval(fbtracktimer);
		}
	}, timeoutSec);
}

function appendParamToLink(link, paramName, controlID)
{
	var control = document.getElementById(controlID);
	if (link != null && control != null)
	{
		var sep = link.href.indexOf("?") == -1 ? "?" : "&";
		link.href += sep + paramName + '=' + control.value;
	}
	return true;
}

function appendParamToLinkID(linkID, paramName, controlID)
{
	var link = document.getElementById(linkID);
	if (link != null)
	{
		appendParamToLink(link, paramName, controlID);
	}
	return true;
}

function get_cookie(name) {
	var matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : '';
}
