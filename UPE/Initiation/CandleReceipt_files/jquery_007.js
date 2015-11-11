
(function(jQuery){jQuery.fn.textlimit=function(counter_el,thelimit,speed){var charDelSpeed=speed||15;var toggleCharDel=speed!=-1;var toggleTrim=true;var that=this[0];var isCtrl=false;updateCounter();function updateCounter(){if(typeof that=="object")
jQuery(counter_el).text(thelimit-that.value.length+" characters remaining");};this.keydown(function(e){if(e.which==17)isCtrl=true;var ctrl_a=(e.which==65&&isCtrl==true)?true:false;var ctrl_v=(e.which==86&&isCtrl==true)?true:false;if(this.value.length>=thelimit&&e.which!='8'&&e.which!='46'&&ctrl_a==false&&ctrl_v==false)
e.preventDefault();}).keyup(function(e){updateCounter();if(e.which==17)
isCtrl=false;if(this.value.length>=thelimit&&toggleTrim){if(toggleCharDel){if((this.value.length-thelimit)>10)
that.value=that.value.substr(0,thelimit+100);var init=setInterval
(function(){if(that.value.length<=thelimit){init=clearInterval(init);updateCounter()}
else{that.value=that.value.substring(0,that.value.length-1);jQuery(counter_el).text('Trimming... '+(thelimit-that.value.length));}},charDelSpeed);}
else this.value=that.value.substr(0,thelimit);}});};})(jQuery);