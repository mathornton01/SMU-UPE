// DOM scanner - (c)2003 Shopping.com, Inc 
var w=window;
var d=document;
var debugFlag=(d.URL.indexOf('sdc_debug_roi')>0);
var sdc_seek=new Object();
var sdc_scanFlag=0;
var sdc_newYahoo=0;

// sdc-name-spaced globally available object to stash data used in the CTD helper file
 var SdcPageContext = {
   merchantId:"",
   orderAmt:"",
   orderId:""
}


function sdc_add_seek(id,label,offset){
  sdc_scanFlag=1;
  sdc_seek[id]=new Object();
  sdc_seek[id]['label']=label;
  sdc_seek[id]['offset']=offset;
}

var finding_id="";
var found=new Object();
function sdc_scan_node(node){
  for(var i=0;i<node.childNodes.length;i++){
    child=node.childNodes[i];
    if(child.nodeType==3){
      id='';
      for(id in sdc_seek){
        if(child.nodeValue.indexOf(sdc_seek[id].label)>=0) finding_id=id;
      }
      if(!id) return -1;
      if(finding_id){
        if(sdc_seek[finding_id].offset==0){
          found[finding_id]=child.nodeValue;
          delete sdc_seek[finding_id];
          finding_id="";
        }else sdc_seek[finding_id].offset=sdc_seek[finding_id].offset-1;
      }
    }
    ret=sdc_scan_node(child);
    if(ret==-1) return -1;
  }
  return 0;
}

function scan_doc(){
  if(sdc_scanFlag && d.getElementById) sdc_scan_node(d.body);
  return found;
}

function sdc_is_yahoo(){
  if(d.URL.indexOf('order.store.yahoo.net') > 0||d.URL.indexOf('new_yahoo_roi')>0) sdc_newYahoo=1;
  return(d.URL.indexOf('order.store.yahoo.com/cgi-bin/wg-thank-you')>0||d.URL.indexOf('yahoo_roi')>0||sdc_newYahoo>0)
}

function sdc_roi_track (){ 
 if(d.getElementById&&sdc_is_yahoo()){
    if(sdc_newYahoo>0){
    order_id=orderNum;
    order_amt=orderSubTotal;
    }else{
	sdc_add_seek('order_id',"Or"+"der Number:",1);
	sdc_add_seek('order_amt',"To"+"tal:",2);
	scanned=scan_doc();
	if (scanned['order_id']){
	  order_id=scanned['order_id'];
	  order_amt=scanned['order_amt'];
	}else{
	  sdc_add_seek('order_id',"order "+"number",1);
	  sdc_add_seek('order_amt',"To"+"tal for",1);
	  scanned=scan_doc();
	  order_id=scanned['order_id'];
	  order_amt=parseFloat(scanned['order_amt']);
	}
    }
    currency_iso_code='USD';
  }

  random=(Math.random()+'').substring(2,11);
  merchant_id=w.merchant_id?escape(merchant_id):'';
  // save this page value for later retrieval in CTD helper
  SdcPageContext.merchantId = merchant_id;
  order_amt=w.order_amt?escape(order_amt):'';
  // save this page value for later retrieval in CTD helper
  SdcPageContext.orderAmt = order_amt;
  category_name=w.category_name?escape(category_name):'';
  category_id=w.category_id?escape(category_id):'';
  product_id=w.product_id?escape(product_id):'';
  product_name=w.product_name?escape(product_name):'';
  order_id=w.order_id?escape(order_id):'';
  // save this page value for later retrieval in CTD helper
  SdcPageContext.orderId = order_id;
  currency_iso_code=w.currency_iso_code?escape(currency_iso_code):'';
  var referrer=escape(d.referrer);
  foreign_merchant_id=w.foreign_merchant_id?escape(foreign_merchant_id):'';
  merchant_aggregator_id=w.merchant_aggregator_id?escape(merchant_aggregator_id):'';
  votf_user_id='';
  votf_start=d.cookie.indexOf('VOTF=',0);
  if(votf_start > -1) {
    votf_start=votf_start+5;
    votf_end=d.cookie.indexOf('!',votf_start);
    if (votf_end > -1 ) votf_user_id=escape(d.cookie.substring(votf_start,votf_end));
  }
  var url=d.location.protocol+"//stat.dealtime.com/pixel/"+random+"?ROI_EvnTyp=ROI&ROI_SrvPgTyp=ROICHKO&ROI_MrcID="+merchant_id+"&ROI_OrdAmn="+order_amt+"&ROI_CtgNm="+category_name+"&ROI_CtgID="+category_id+"&ROI_PrdID="+product_id+"&ROI_PrdNm="+product_name+"&ROI_OrdID="+order_id+"&ROI_OrgHttpRfr="+referrer+"&ROI_FrgMrcID="+foreign_merchant_id+"&ROI_MrcAggID="+merchant_aggregator_id+"&ROI_VOTFUsrID="+votf_user_id+"&ROI_OrdCrr="+currency_iso_code;
  roi_img=new Image(1,1);
  roi_img.src=url;
  if(debugFlag) prompt ('order_id:'+order_id+"\norder_amt:"+order_amt+"\ncurrency_iso_code:"+currency_iso_code+"\nroi url:",url);
}

if(d.getElementById&&sdc_is_yahoo()){
  w.old_onload=w.onload;
  w.onload=new Function( "sdc_roi_track();"+(w.old_onload?"window.old_onload()":"") );
}else sdc_roi_track();


var ctd_url=d.location.protocol+"//sc.dealtime.com/sc/ctd/roi_ctd_helper.js";

// CTD code use sdc-name-spaced object to avoid conflicts with publisher code 
var SdcContentLoader =
{
   HELPER_JS_URL: ctd_url,
   loadHelperFile: function() {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = SdcContentLoader.HELPER_JS_URL + '?r=' + Math.random();
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
   },
   // Since we don't want to assign (overwrite) a publishers onload handler, we want to add behavior instead.
   // However, the publisher might assign an onload event handler that would overwrite what we have added.
   // Therefore, it this approach is unsafe without some integration agreements with the publisher.
   // If unsure, don't use the deferred approach. Rather, don't rely on the onload event loadHelperFile.
   // Note that this does not negate the possibility of using a setTimeout if that is preferred.
   // For this reason, that window onload treatment for yahoo might break in the future...
   addOnLoad: function (fn) {
      if (window.addEventListener) {
        window.addEventListener('load', fn, false);
      } else if (window.attachEvent) {
        window.attachEvent('onload', fn);
      }
   }
}

SdcContentLoader.loadHelperFile();
