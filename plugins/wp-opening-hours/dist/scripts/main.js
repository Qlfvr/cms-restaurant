!function($){$.extend($.ui,{timepicker:{version:"0.3.3"}});var PROP_NAME="timepicker",tpuuid=(new Date).getTime();function Timepicker(){this.debug=!0,this._curInst=null,this._disabledInputs=[],this._timepickerShowing=!1,this._inDialog=!1,this._dialogClass="ui-timepicker-dialog",this._mainDivId="ui-timepicker-div",this._inlineClass="ui-timepicker-inline",this._currentClass="ui-timepicker-current",this._dayOverClass="ui-timepicker-days-cell-over",this.regional=[],this.regional[""]={hourText:"Hour",minuteText:"Minute",amPmText:["AM","PM"],closeButtonText:"Done",nowButtonText:"Now",deselectButtonText:"Deselect"},this._defaults={showOn:"focus",button:null,showAnim:"fadeIn",showOptions:{},appendText:"",beforeShow:null,onSelect:null,onClose:null,timeSeparator:":",periodSeparator:" ",showPeriod:!1,showPeriodLabels:!0,showLeadingZero:!0,showMinutesLeadingZero:!0,altField:"",defaultTime:"now",myPosition:"left top",atPosition:"left bottom",onHourShow:null,onMinuteShow:null,hours:{starts:0,ends:23},minutes:{starts:0,ends:55,interval:5,manual:[]},rows:4,showHours:!0,showMinutes:!0,optionalMinutes:!1,showCloseButton:!1,showNowButton:!1,showDeselectButton:!1,maxTime:{hour:null,minute:null},minTime:{hour:null,minute:null}},$.extend(this._defaults,this.regional[""]),this.tpDiv=$('<div id="'+this._mainDivId+'" class="ui-timepicker ui-widget ui-helper-clearfix ui-corner-all " style="display: none"></div>')}function extendRemove(e,t){for(var i in $.extend(e,t),t)null!=t[i]&&null!=t[i]||(e[i]=t[i]);return e}$.extend(Timepicker.prototype,{markerClassName:"hasTimepicker",log:function(){this.debug&&console.log.apply("",arguments)},_widgetTimepicker:function(){return this.tpDiv},setDefaults:function(e){return extendRemove(this._defaults,e||{}),this},_attachTimepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("time:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(e){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline="div"==nodeName||"span"==nodeName;target.id||(this.uuid+=1,target.id="tp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),"input"==nodeName?(this._connectTimepicker(target,inst),this._setTimeFromField(inst)):inline&&this._inlineTimepicker(target,inst)},_newInst:function(e,t){return{id:e[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1"),input:e,inline:t,tpDiv:t?$('<div class="'+this._inlineClass+' ui-timepicker ui-widget  ui-helper-clearfix"></div>'):this.tpDiv}},_connectTimepicker:function(e,n){var t=$(e);n.append=$([]),n.trigger=$([]),t.hasClass(this.markerClassName)||(this._attachments(t,n),t.addClass(this.markerClassName).keydown(this._doKeyDown).keyup(this._doKeyUp).bind("setData.timepicker",function(e,t,i){n.settings[t]=i}).bind("getData.timepicker",function(e,t){return this._get(n,t)}),$.data(e,PROP_NAME,n))},_doKeyDown:function(e){var t=$.timepicker._getInst(e.target),i=!0;if(t._keyEvent=!0,$.timepicker._timepickerShowing)switch(e.keyCode){case 9:$.timepicker._hideTimepicker(),i=!1;break;case 13:return $.timepicker._updateSelectedValue(t),$.timepicker._hideTimepicker(),!1;case 27:$.timepicker._hideTimepicker();break;default:i=!1}else 36==e.keyCode&&e.ctrlKey?$.timepicker._showTimepicker(this):i=!1;i&&(e.preventDefault(),e.stopPropagation())},_doKeyUp:function(e){var t=$.timepicker._getInst(e.target);$.timepicker._setTimeFromField(t),$.timepicker._updateTimepicker(t)},_attachments:function(e,t){var i=this._get(t,"appendText"),n=this._get(t,"isRTL");t.append&&t.append.remove(),i&&(t.append=$('<span class="'+this._appendClass+'">'+i+"</span>"),e[n?"before":"after"](t.append)),e.unbind("focus.timepicker",this._showTimepicker),e.unbind("click.timepicker",this._adjustZIndex),t.trigger&&t.trigger.remove();var s=this._get(t,"showOn");if("focus"!=s&&"both"!=s||(e.bind("focus.timepicker",this._showTimepicker),e.bind("click.timepicker",this._adjustZIndex)),"button"==s||"both"==s){var r=this._get(t,"button");null==r&&(r=$('<button class="ui-timepicker-trigger" type="button">...</button>'),e.after(r)),$(r).bind("click.timepicker",function(){return $.timepicker._timepickerShowing&&$.timepicker._lastInput==e[0]?$.timepicker._hideTimepicker():t.input.is(":disabled")||$.timepicker._showTimepicker(e[0]),!1})}},_inlineTimepicker:function(e,n){var t=$(e);t.hasClass(this.markerClassName)||(t.addClass(this.markerClassName).append(n.tpDiv).bind("setData.timepicker",function(e,t,i){n.settings[t]=i}).bind("getData.timepicker",function(e,t){return this._get(n,t)}),$.data(e,PROP_NAME,n),this._setTimeFromField(n),this._updateTimepicker(n),n.tpDiv.show())},_adjustZIndex:function(e){e=e.target||e,$.timepicker._getInst(e).tpDiv.css("zIndex",$.timepicker._getZIndex(e)+1)},_showTimepicker:function(e){if("input"!=(e=e.target||e).nodeName.toLowerCase()&&(e=$("input",e.parentNode)[0]),!$.timepicker._isDisabledTimepicker(e)&&$.timepicker._lastInput!=e){$.timepicker._hideTimepicker();var t=$.timepicker._getInst(e);$.timepicker._curInst&&$.timepicker._curInst!=t&&$.timepicker._curInst.tpDiv.stop(!0,!0);var i=$.timepicker._get(t,"beforeShow");extendRemove(t.settings,i?i.apply(e,[e,t]):{}),t.lastVal=null,$.timepicker._lastInput=e,$.timepicker._setTimeFromField(t),$.timepicker._inDialog&&(e.value=""),$.timepicker._pos||($.timepicker._pos=$.timepicker._findPos(e),$.timepicker._pos[1]+=e.offsetHeight);var n=!1;$(e).parents().each(function(){return!(n|="fixed"==$(this).css("position"))});var s={left:$.timepicker._pos[0],top:$.timepicker._pos[1]};if($.timepicker._pos=null,t.tpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.timepicker._updateTimepicker(t),!t.inline&&"object"==typeof $.ui.position){t.tpDiv.position({of:t.input,my:$.timepicker._get(t,"myPosition"),at:$.timepicker._get(t,"atPosition"),collision:"flip"});s=t.tpDiv.offset();$.timepicker._pos=[s.top,s.left]}if(t._hoursClicked=!1,t._minutesClicked=!1,s=$.timepicker._checkOffset(t,s,n),t.tpDiv.css({position:$.timepicker._inDialog&&$.blockUI?"static":n?"fixed":"absolute",display:"none",left:s.left+"px",top:s.top+"px"}),!t.inline){function r(){$.timepicker._timepickerShowing=!0;var e=$.timepicker._getBorders(t.tpDiv);t.tpDiv.find("iframe.ui-timepicker-cover").css({left:-e[0],top:-e[1],width:t.tpDiv.outerWidth(),height:t.tpDiv.outerHeight()})}var a=$.timepicker._get(t,"showAnim"),o=$.timepicker._get(t,"duration");$.timepicker._adjustZIndex(e),$.effects&&$.effects[a]?t.tpDiv.show(a,$.timepicker._get(t,"showOptions"),o,r):t.tpDiv.show(a?o:null,r),a&&o||r(),t.input.is(":visible")&&!t.input.is(":disabled")&&t.input.focus(),$.timepicker._curInst=t}}},_getZIndex:function(e){for(var t,i,n=$(e),s=0;n.length&&n[0]!==document;)"absolute"!==(t=n.css("position"))&&"relative"!==t&&"fixed"!==t||(i=parseInt(n.css("zIndex"),10),isNaN(i)||0===i||s<i&&(s=i)),n=n.parent();return s},_refreshTimepicker:function(e){var t=this._getInst(e);t&&this._updateTimepicker(t)},_updateTimepicker:function(e){e.tpDiv.empty().append(this._generateHTML(e)),this._rebindDialogEvents(e)},_rebindDialogEvents:function(e){var t=$.timepicker._getBorders(e.tpDiv),i=this;e.tpDiv.find("iframe.ui-timepicker-cover").css({left:-t[0],top:-t[1],width:e.tpDiv.outerWidth(),height:e.tpDiv.outerHeight()}).end().find(".ui-timepicker-minute-cell").unbind().bind("click",{fromDoubleClick:!1},$.proxy($.timepicker.selectMinutes,this)).bind("dblclick",{fromDoubleClick:!0},$.proxy($.timepicker.selectMinutes,this)).end().find(".ui-timepicker-hour-cell").unbind().bind("click",{fromDoubleClick:!1},$.proxy($.timepicker.selectHours,this)).bind("dblclick",{fromDoubleClick:!0},$.proxy($.timepicker.selectHours,this)).end().find(".ui-timepicker td a").unbind().bind("mouseout",function(){$(this).removeClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&$(this).removeClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&$(this).removeClass("ui-timepicker-next-hover")}).bind("mouseover",function(){i._isDisabledTimepicker(e.inline?e.tpDiv.parent()[0]:e.input[0])||($(this).parents(".ui-timepicker-calendar").find("a").removeClass("ui-state-hover"),$(this).addClass("ui-state-hover"),-1!=this.className.indexOf("ui-timepicker-prev")&&$(this).addClass("ui-timepicker-prev-hover"),-1!=this.className.indexOf("ui-timepicker-next")&&$(this).addClass("ui-timepicker-next-hover"))}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end().find(".ui-timepicker-now").bind("click",function(e){$.timepicker.selectNow(e)}).end().find(".ui-timepicker-deselect").bind("click",function(e){$.timepicker.deselectTime(e)}).end().find(".ui-timepicker-close").bind("click",function(e){$.timepicker._hideTimepicker()}).end()},_generateHTML:function(e){var t,i,n,s,r=1==this._get(e,"showPeriod"),a=1==this._get(e,"showPeriodLabels"),o=1==this._get(e,"showLeadingZero"),u=1==this._get(e,"showHours"),c=1==this._get(e,"showMinutes"),d=this._get(e,"amPmText"),p=this._get(e,"rows"),l=0,h=0,m=0,f=0,g=0,k=0,_=Array(),v=this._get(e,"hours"),y=null,$=0,b=this._get(e,"hourText"),w=this._get(e,"showCloseButton"),T=this._get(e,"closeButtonText"),D=this._get(e,"showNowButton"),C=this._get(e,"nowButtonText"),x=this._get(e,"showDeselectButton"),I=this._get(e,"deselectButtonText"),N=w||D||x;for(t=v.starts;t<=v.ends;t++)_.push(t);if(y=Math.ceil(_.length/p),a){for($=0;$<_.length;$++)_[$]<12?m++:f++;$=0,p!=(l=Math.floor(m/_.length*p))+(h=Math.floor(f/_.length*p))&&(m&&(!f||!l||h&&f/h<=m/l)?l++:h++),g=Math.min(l,1),k=l+1,y=0==l?Math.ceil(f/h):0==h?Math.ceil(m/l):Math.ceil(Math.max(m/l,f/h))}if(s='<table class="ui-timepicker-table ui-widget-content ui-corner-all"><tr>',u){for(s+='<td class="ui-timepicker-hours"><div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+b+'</div><table class="ui-timepicker">',i=1;i<=p;i++){for(s+="<tr>",i==g&&a&&(s+='<th rowspan="'+l.toString()+'" class="periods" scope="row">'+d[0]+"</th>"),i==k&&a&&(s+='<th rowspan="'+h.toString()+'" class="periods" scope="row">'+d[1]+"</th>"),n=1;n<=y;n++)a&&i<k&&12<=_[$]?s+=this._generateHTMLHourCell(e,void 0,r,o):(s+=this._generateHTMLHourCell(e,_[$],r,o),$++);s+="</tr>"}s+="</table></td>"}if(c&&(s+='<td class="ui-timepicker-minutes">',s+=this._generateHTMLMinutes(e),s+="</td>"),s+="</tr>",N){var M='<tr><td colspan="3"><div class="ui-timepicker-buttonpane ui-widget-content">';D&&(M+='<button type="button" class="ui-timepicker-now ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" >'+C+"</button>"),x&&(M+='<button type="button" class="ui-timepicker-deselect ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" >'+I+"</button>"),w&&(M+='<button type="button" class="ui-timepicker-close ui-state-default ui-corner-all"  data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" >'+T+"</button>"),s+=M+"</div></td></tr>"}return s+="</table>"},_updateMinuteDisplay:function(e){var t=this._generateHTMLMinutes(e);e.tpDiv.find("td.ui-timepicker-minutes").html(t),this._rebindDialogEvents(e)},_generateHTMLMinutes:function(e){var t,n,s="",r=this._get(e,"rows"),a=Array(),o=this._get(e,"minutes"),u=0,c=1==this._get(e,"showMinutesLeadingZero"),d=this._get(e,"onMinuteShow"),p=this._get(e,"minuteText");for(o.starts||(o.starts=0),o.ends||(o.ends=59),o.manual||(o.manual=[]),h=o.starts;h<=o.ends;h+=o.interval)a.push(h);for(i=0;i<o.manual.length;i++){var l=o.manual[i];"number"!=typeof l||l<0||59<l||0<=$.inArray(l,a)||a.push(l)}if(a.sort(function(e,t){return e-t}),n=Math.round(a.length/r+.49),d&&0==d.apply(e.input?e.input[0]:null,[e.hours,e.minutes]))for(u=0;u<a.length;u+=1)if(h=a[u],d.apply(e.input?e.input[0]:null,[e.hours,h])){e.minutes=h;break}for(s+='<div class="ui-timepicker-title ui-widget-header ui-helper-clearfix ui-corner-all">'+p+'</div><table class="ui-timepicker">',u=0,t=1;t<=r;t++){for(s+="<tr>";u<t*n;){var h,m="";void 0!==(h=a[u])&&(m=h<10&&c?"0"+h.toString():h.toString()),s+=this._generateHTMLMinuteCell(e,h,m),u++}s+="</tr>"}return s+="</table>"},_generateHTMLHourCell:function(e,t,i,n){var s=t;12<t&&i&&(s=t-12),0==s&&i&&(s=12),s<10&&n&&(s="0"+s);var r=!0,a=this._get(e,"onHourShow"),o=this._get(e,"maxTime"),u=this._get(e,"minTime");return null==t?'<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':(a&&(r=a.apply(e.input?e.input[0]:null,[t])),r&&(!isNaN(parseInt(o.hour))&&t>o.hour&&(r=!1),!isNaN(parseInt(u.hour))&&t<u.hour&&(r=!1)),r?'<td class="ui-timepicker-hour-cell" data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" data-hour="'+t.toString()+'"><a class="ui-state-default '+(t==e.hours?"ui-state-active":"")+'">'+s.toString()+"</a></td>":'<td><span class="ui-state-default ui-state-disabled '+(t==e.hours?" ui-state-active ":" ")+'">'+s.toString()+"</span></td>")},_generateHTMLMinuteCell:function(e,t,i){var n=!0,s=e.hours,r=this._get(e,"onMinuteShow"),a=this._get(e,"maxTime"),o=this._get(e,"minTime");return r&&(n=r.apply(e.input?e.input[0]:null,[e.hours,t])),null==t?'<td><span class="ui-state-default ui-state-disabled">&nbsp;</span></td>':(n&&null!==s&&(!isNaN(parseInt(a.hour))&&!isNaN(parseInt(a.minute))&&s>=a.hour&&t>a.minute&&(n=!1),!isNaN(parseInt(o.hour))&&!isNaN(parseInt(o.minute))&&s<=o.hour&&t<o.minute&&(n=!1)),n?'<td class="ui-timepicker-minute-cell" data-timepicker-instance-id="#'+e.id.replace(/\\\\/g,"\\")+'" data-minute="'+t.toString()+'" ><a class="ui-state-default '+(t==e.minutes?"ui-state-active":"")+'" >'+i+"</a></td>":'<td><span class="ui-state-default ui-state-disabled" >'+i+"</span></td>")},_destroyTimepicker:function(e){var t=$(e),i=$.data(e,PROP_NAME);if(t.hasClass(this.markerClassName)){var n=e.nodeName.toLowerCase();$.removeData(e,PROP_NAME),"input"==n?(i.append.remove(),i.trigger.remove(),t.removeClass(this.markerClassName).unbind("focus.timepicker",this._showTimepicker).unbind("click.timepicker",this._adjustZIndex)):"div"!=n&&"span"!=n||t.removeClass(this.markerClassName).empty()}},_enableTimepicker:function(e){var t=$(e),i=t.attr("id"),n=$.data(e,PROP_NAME);if(t.hasClass(this.markerClassName)){var s=e.nodeName.toLowerCase();if("input"==s){e.disabled=!1;var r=this._get(n,"button");$(r).removeClass("ui-state-disabled").disabled=!1,n.trigger.filter("button").each(function(){this.disabled=!1}).end()}else if("div"==s||"span"==s){var a=t.children("."+this._inlineClass);a.children().removeClass("ui-state-disabled"),a.find("button").each(function(){this.disabled=!1})}this._disabledInputs=$.map(this._disabledInputs,function(e){return e==i?null:e})}},_disableTimepicker:function(t){var e=$(t),i=$.data(t,PROP_NAME);if(e.hasClass(this.markerClassName)){var n=t.nodeName.toLowerCase();if("input"==n){var s=this._get(i,"button");$(s).addClass("ui-state-disabled").disabled=!0,t.disabled=!0,i.trigger.filter("button").each(function(){this.disabled=!0}).end()}else if("div"==n||"span"==n){var r=e.children("."+this._inlineClass);r.children().addClass("ui-state-disabled"),r.find("button").each(function(){this.disabled=!0})}this._disabledInputs=$.map(this._disabledInputs,function(e){return e==t?null:e}),this._disabledInputs[this._disabledInputs.length]=e.attr("id")}},_isDisabledTimepicker:function(e){if(!e)return!1;for(var t=0;t<this._disabledInputs.length;t++)if(this._disabledInputs[t]==e)return!0;return!1},_checkOffset:function(e,t,i){var n=e.tpDiv.outerWidth(),s=e.tpDiv.outerHeight(),r=e.input?e.input.outerWidth():0,a=e.input?e.input.outerHeight():0,o=document.documentElement.clientWidth+$(document).scrollLeft(),u=document.documentElement.clientHeight+$(document).scrollTop();return t.left-=this._get(e,"isRTL")?n-r:0,t.left-=i&&t.left==e.input.offset().left?$(document).scrollLeft():0,t.top-=i&&t.top==e.input.offset().top+a?$(document).scrollTop():0,t.left-=Math.min(t.left,t.left+n>o&&n<o?Math.abs(t.left+n-o):0),t.top-=Math.min(t.top,t.top+s>u&&s<u?Math.abs(s+a):0),t},_findPos:function(e){for(var t=this._getInst(e),i=this._get(t,"isRTL");e&&("hidden"==e.type||1!=e.nodeType);)e=e[i?"previousSibling":"nextSibling"];var n=$(e).offset();return[n.left,n.top]},_getBorders:function(e){function t(e){return{thin:1,medium:2,thick:3}[e]||e}return[parseFloat(t(e.css("border-left-width"))),parseFloat(t(e.css("border-top-width")))]},_checkExternalClick:function(e){if($.timepicker._curInst){var t=$(e.target);t[0].id==$.timepicker._mainDivId||0!=t.parents("#"+$.timepicker._mainDivId).length||t.hasClass($.timepicker.markerClassName)||t.hasClass($.timepicker._triggerClass)||!$.timepicker._timepickerShowing||$.timepicker._inDialog&&$.blockUI||$.timepicker._hideTimepicker()}},_hideTimepicker:function(e){var t=this._curInst;if(t&&(!e||t==$.data(e,PROP_NAME))&&this._timepickerShowing){function i(){$.timepicker._tidyDialog(t),this._curInst=null}var n=this._get(t,"showAnim"),s=this._get(t,"duration");$.effects&&$.effects[n]?t.tpDiv.hide(n,$.timepicker._get(t,"showOptions"),s,i):t.tpDiv["slideDown"==n?"slideUp":"fadeIn"==n?"fadeOut":"hide"](n?s:null,i),n||i(),this._timepickerShowing=!1,this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.tpDiv))),this._inDialog=!1;var r=this._get(t,"onClose");r&&r.apply(t.input?t.input[0]:null,[t.input?t.input.val():"",t])}},_tidyDialog:function(e){e.tpDiv.removeClass(this._dialogClass).unbind(".ui-timepicker")},_getInst:function(e){try{return $.data(e,PROP_NAME)}catch(e){throw"Missing instance data for this timepicker"}},_get:function(e,t){return void 0!==e.settings[t]?e.settings[t]:this._defaults[t]},_setTimeFromField:function(e){if(e.input.val()!=e.lastVal){var t=this._get(e,"defaultTime"),i="now"==t?this._getCurrentTimeRounded(e):t;if(0==e.inline&&""!=e.input.val()&&(i=e.input.val()),i instanceof Date)e.hours=i.getHours(),e.minutes=i.getMinutes();else{var n=e.lastVal=i;if(""==i)e.hours=-1,e.minutes=-1;else{var s=this.parseTime(e,n);e.hours=s.hours,e.minutes=s.minutes}}$.timepicker._updateTimepicker(e)}},_optionTimepicker:function(e,t,i){var n=this._getInst(e);if(2==arguments.length&&"string"==typeof t)return"defaults"==t?$.extend({},$.timepicker._defaults):n?"all"==t?$.extend({},n.settings):this._get(n,t):null;var s=t||{};"string"==typeof t&&((s={})[t]=i),n&&(extendRemove(n.settings,s),this._curInst==n&&(this._hideTimepicker(),this._updateTimepicker(n)),n.inline&&this._updateTimepicker(n))},_setTimeTimepicker:function(e,t){var i=this._getInst(e);i&&(this._setTime(i,t),this._updateTimepicker(i),this._updateAlternate(i,t))},_setTime:function(e,t,i){var n=e.hours,s=e.minutes;if(t instanceof Date)e.hours=t.getHours(),e.minutes=t.getMinutes();else{t=this.parseTime(e,t);e.hours=t.hours,e.minutes=t.minutes}n==e.hours&&s==e.minutes||i||e.input.trigger("change"),this._updateTimepicker(e),this._updateSelectedValue(e)},_getCurrentTimeRounded:function(e){var t=new Date,i=t.getMinutes(),n=this._get(e,"minutes"),s=Math.round(i/n.interval)*n.interval;return t.setMinutes(s),t},parseTime:function(e,t){var i=new Object;if(i.hours=-1,i.minutes=-1,!t)return"";var n=this._get(e,"timeSeparator"),s=this._get(e,"amPmText"),r=this._get(e,"showHours"),a=this._get(e,"showMinutes"),o=this._get(e,"optionalMinutes"),u=1==this._get(e,"showPeriod"),c=t.indexOf(n);if(-1!=c?(i.hours=parseInt(t.substr(0,c),10),i.minutes=parseInt(t.substr(c+1),10)):!r||a&&!o?!r&&a&&(i.minutes=parseInt(t,10)):i.hours=parseInt(t,10),r){var d=t.toUpperCase();i.hours<12&&u&&-1!=d.indexOf(s[1].toUpperCase())&&(i.hours+=12),12==i.hours&&u&&-1!=d.indexOf(s[0].toUpperCase())&&(i.hours=0)}return i},selectNow:function(e){var t=$(e.target).attr("data-timepicker-instance-id"),i=$(t),n=this._getInst(i[0]),s=new Date;n.hours=s.getHours(),n.minutes=s.getMinutes(),this._updateSelectedValue(n),this._updateTimepicker(n),this._hideTimepicker()},deselectTime:function(e){var t=$(e.target).attr("data-timepicker-instance-id"),i=$(t),n=this._getInst(i[0]);n.hours=-1,n.minutes=-1,this._updateSelectedValue(n),this._hideTimepicker()},selectHours:function(e){var t=$(e.currentTarget),i=t.attr("data-timepicker-instance-id"),n=parseInt(t.attr("data-hour")),s=e.data.fromDoubleClick,r=$(i),a=this._getInst(r[0]),o=1==this._get(a,"showMinutes");if($.timepicker._isDisabledTimepicker(r.attr("id")))return!1;t.parents(".ui-timepicker-hours:first").find("a").removeClass("ui-state-active"),t.children("a").addClass("ui-state-active"),a.hours=n;var u=this._get(a,"onMinuteShow"),c=this._get(a,"maxTime"),d=this._get(a,"minTime");return!u&&isNaN(parseInt(c.minute))&&isNaN(parseInt(d.minute))||this._updateMinuteDisplay(a),this._updateSelectedValue(a),a._hoursClicked=!0,(a._minutesClicked||s||0==o)&&$.timepicker._hideTimepicker(),!1},selectMinutes:function(e){var t=$(e.currentTarget),i=t.attr("data-timepicker-instance-id"),n=parseInt(t.attr("data-minute")),s=e.data.fromDoubleClick,r=$(i),a=this._getInst(r[0]),o=1==this._get(a,"showHours");return $.timepicker._isDisabledTimepicker(r.attr("id"))||(t.parents(".ui-timepicker-minutes:first").find("a").removeClass("ui-state-active"),t.children("a").addClass("ui-state-active"),a.minutes=n,this._updateSelectedValue(a),a._minutesClicked=!0,(a._hoursClicked||s||0==o)&&$.timepicker._hideTimepicker()),!1},_updateSelectedValue:function(e){var t=this._getParsedTime(e);e.input&&(e.input.val(t),e.input.trigger("change"));var i=this._get(e,"onSelect");return i&&i.apply(e.input?e.input[0]:null,[t,e]),this._updateAlternate(e,t),t},_getParsedTime:function(e){if(-1==e.hours&&-1==e.minutes)return"";(e.hours<e.hours.starts||e.hours>e.hours.ends)&&(e.hours=0),(e.minutes<e.minutes.starts||e.minutes>e.minutes.ends)&&(e.minutes=0);var t="",i=1==this._get(e,"showPeriod"),n=1==this._get(e,"showLeadingZero"),s=1==this._get(e,"showHours"),r=1==this._get(e,"showMinutes"),a=1==this._get(e,"optionalMinutes"),o=this._get(e,"amPmText"),u=e.hours?e.hours:0,c=e.minutes?e.minutes:0,d=u||0,p="";-1==d&&(d=0),-1==c&&(c=0),i&&(0==e.hours&&(d=12),e.hours<12?t=o[0]:(t=o[1],12<d&&(d-=12)));var l=d.toString();n&&d<10&&(l="0"+l);var h=c.toString();return c<10&&(h="0"+h),s&&(p+=l),!s||!r||a&&0==h||(p+=this._get(e,"timeSeparator")),!r||a&&0==h||(p+=h),s&&0<t.length&&(p+=this._get(e,"periodSeparator")+t),p},_updateAlternate:function(e,i){var t=this._get(e,"altField");t&&$(t).each(function(e,t){$(t).val(i)})},_getTimeAsDateTimepicker:function(e){var t=this._getInst(e);return-1==t.hours&&-1==t.minutes?"":((t.hours<t.hours.starts||t.hours>t.hours.ends)&&(t.hours=0),(t.minutes<t.minutes.starts||t.minutes>t.minutes.ends)&&(t.minutes=0),new Date(0,0,0,t.hours,t.minutes,0))},_getTimeTimepicker:function(e){var t=this._getInst(e);return this._getParsedTime(t)},_getHourTimepicker:function(e){var t=this._getInst(e);return null==t?-1:t.hours},_getMinuteTimepicker:function(e){var t=this._getInst(e);return null==t?-1:t.minutes}}),$.fn.timepicker=function(e){$.timepicker.initialized||($(document).mousedown($.timepicker._checkExternalClick),$.timepicker.initialized=!0),0===$("#"+$.timepicker._mainDivId).length&&$("body").append($.timepicker.tpDiv);var t=Array.prototype.slice.call(arguments,1);return"string"!=typeof e||"getTime"!=e&&"getTimeAsDate"!=e&&"getHour"!=e&&"getMinute"!=e?"option"==e&&2==arguments.length&&"string"==typeof arguments[1]?$.timepicker["_"+e+"Timepicker"].apply($.timepicker,[this[0]].concat(t)):this.each(function(){"string"==typeof e?$.timepicker["_"+e+"Timepicker"].apply($.timepicker,[this].concat(t)):$.timepicker._attachTimepicker(this,e)}):$.timepicker["_"+e+"Timepicker"].apply($.timepicker,[this[0]].concat(t))},$.timepicker=new Timepicker,$.timepicker.initialized=!1,$.timepicker.uuid=(new Date).getTime(),$.timepicker.version="0.3.3",window["TP_jQuery_"+tpuuid]=$}(jQuery),function(s){s.fn.opExtendedSettings=function(){return this.each(function(){var e=s(this),t=e.find(".settings-container"),i=e.find(".collapse-toggle"),n=t.hasClass("hidden");i.click(function(){(n=!n)?(t.addClass("hidden"),i.html(openingHoursData.translations.moreSettings)):(t.removeClass("hidden"),i.html(openingHoursData.translations.fewerSettings))})})},s(document).ready(function(){s(".extended-settings").opExtendedSettings(),s(document).on("widget-updated widget-added",function(e,t){s(t).find(".extended-settings").opExtendedSettings()})})}(jQuery),jQuery.fn.opHolidays=function(){var e=jQuery(this),i=e.find("tbody"),t=e.find(".add-holiday");i.find("tr.op-holiday").each(function(e,t){jQuery(t).opSingleHoliday()}),t.click(function(e){e.preventDefault(),jQuery.post(ajax_object.ajax_url,{action:"op_render_single_dummy_holiday"},function(e){var t=jQuery(e).clone();t.opSingleHoliday(),i.append(t)})})},jQuery.fn.opSingleHoliday=function(){var t=jQuery(this);if(1<t.length)t.each(function(e,t){jQuery(t).opSingleHoliday()});else{var e=t.find(".remove-holiday"),i=t.find("input.date-start"),n=t.find("input.date-end");e.click(function(e){e.preventDefault(),t.remove()}),i.datepicker({dateFormat:"yy-mm-dd",firstDay:openingHoursData.startOfWeek||0,dayNames:openingHoursData.weekdays.full,dayNamesMin:openingHoursData.weekdays.short,dayNamesShort:openingHoursData.weekdays.short,onClose:function(e){n.datepicker("option","minDate",e)}}),n.datepicker({dateFormat:"yy-mm-dd",firstDay:openingHoursData.startOfWeek||0,dayNames:openingHoursData.weekdays.full,dayNamesMin:openingHoursData.weekdays.short,dayNamesShort:openingHoursData.weekdays.short,onClose:function(e){i.datepicker("option","maxDate",e)}}),i.focus(function(){i.blur()}),n.focus(function(){n.blur()})}},jQuery(document).ready(function(){jQuery("#op-holidays-wrap").opHolidays()}),jQuery.fn.opIOs=function(){var e=jQuery(this),i=e.find("tbody"),t=jQuery(e.find(".add-io"));i.find("tr.op-irregular-opening").each(function(e,t){jQuery(t).opSingleIO()}),t.click(function(e){e.preventDefault(),jQuery.post(ajax_object.ajax_url,{action:"op_render_single_dummy_irregular_opening"},function(e){var t=jQuery(e).clone();t.opSingleIO(),i.append(t)})})},jQuery.fn.opSingleIO=function(){var t=jQuery(this);if(1<t.length)t.each(function(e,t){jQuery(t).opSingleIO()});else{var e=t.find(".remove-io"),i=t.find("input.date"),n=t.find("input.input-timepicker");n.timepicker({hourText:translations.tp_hour,minuteText:translations.tp_minute}),n.focus(function(){n.blur()}),i.datepicker({dateFormat:"yy-mm-dd",firstDay:openingHoursData.startOfWeek||0,dayNames:openingHoursData.weekdays.full,dayNamesMin:openingHoursData.weekdays.short,dayNamesShort:openingHoursData.weekdays.short}),i.focus(function(){i.blur()}),e.click(function(e){e.preventDefault(),t.remove()})}},jQuery(document).ready(function(){jQuery("#op-irregular-openings-wrap").opIOs()}),function(e){e(document).ready(function(){var t=e(".op-criteria-date-start"),i=e(".op-criteria-date-end");t.addClass("input-gray"),i.addClass("input-gray"),t.datepicker({dateFormat:"yy-mm-dd",firstDay:openingHoursData.startOfWeek||0,dayNames:openingHoursData.weekdays.full,dayNamesMin:openingHoursData.weekdays.short,dayNamesShort:openingHoursData.weekdays.short,onClose:function(e){i.datepicker("option","minDate",e)}}),i.datepicker({dateFormat:"yy-mm-dd",firstDay:openingHoursData.startOfWeek||0,dayNames:openingHoursData.weekdays.full,dayNamesMin:openingHoursData.weekdays.short,dayNamesShort:openingHoursData.weekdays.short,onClose:function(e){t.datepicker("option","maxDate",e)}}),t.focus(function(){t.blur()}),i.focus(function(){i.blur()}),e("#op-set-detail-child-set-notice").parents(".field").hide()})}(jQuery),function(r){r.fn.opPeriodsDay=function(){return this.each(function(e,t){var i=r(t),n=i.find(".period-container"),s=n.find("tbody");i.find("a.add-period").click(function(){var e;e={action:"op_render_single_period",weekday:n.attr("data-day"),set:n.attr("data-set")},r.post(ajax_object.ajax_url,e,function(e){var t=r(e).clone();t.opSinglePeriod(),s.append(t)})})})},r.fn.opSinglePeriod=function(){return this.each(function(e,t){var i=r(t),n=i.find(".delete-period"),s=i.find(".input-timepicker");n.click(function(){i.remove()}),s.timepicker({hourText:translations.tp_hour,minuteText:translations.tp_minute}),s.focus(function(){s.blur()})})},r(document).ready(function(){var e=r(".form-opening-hours");e.find("tr.periods-day").opPeriodsDay(),e.find("tr.period").opSinglePeriod()})}(jQuery),function(s){s.fn.opShortcodeBuilderLink=function(){this.each(function(e,t){var i=s(t),n=i.data("shortcode-builder-url");i.click(function(e){e.preventDefault(),window.open(n,"Shortcode Builder","width=1024,height=768,status=yes,scrollbars=yes,resizable=yes")})})},s(document).ready(function(){s(".op-generate-sc-link").opShortcodeBuilderLink()})}(jQuery);
//# sourceMappingURL=main.js.map