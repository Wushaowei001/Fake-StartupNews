/*
 * pjax(ajax + history.pushState) for jquery
 * by welefen
 */
(function(e){var t={support:{pjax:window.history&&window.history.pushState&&window.history.replaceState&&!navigator.userAgent.match(/(iPod|iPhone|iPad|WebApps\/.+CFNetwork)/),storage:!!window.localStorage},toInt:function(e){return parseInt(e)},stack:{},getTime:function(){return new Date*1},getRealUrl:function(e){e=(e||"").replace(/\#.*?$/,"");e=e.replace("?pjax=true","").replace("&pjax=true","");return e},getUrlHash:function(e){return e.replace(/^[^\#]*(?:\#(.*?))?$/,"$1")},getLocalKey:function(e){var t="pjax_"+encodeURIComponent(e);return{data:t+"_data",time:t+"_time",title:t+"_title"}},removeAllCache:function(){if(!t.support.storage)return;for(var e in localStorage){if((e.split("_")||[""])[0]==="pjax"){delete localStorage[e]}}},getCache:function(e,n,r){var i,s,o,u;n=t.toInt(n);if(e in t.stack){i=t.stack[e],ctime=t.getTime();if(i.time+n*1e3>ctime){return i}else{delete t.stack[e]}}else if(r&&t.support.storage){var a=t.getLocalKey(e);s=a.data;o=a.time;i=localStorage.getItem(s);if(i){u=t.toInt(localStorage.getItem(o));if(u+n*1e3>t.getTime()){return{data:i,title:localStorage.getItem(a.title)}}else{localStorage.removeItem(s);localStorage.removeItem(o);localStorage.removeItem(a.title)}}}return null},setCache:function(e,n,r,i){var s=t.getTime(),o;t.stack[e]={data:n,title:r,time:s};if(i&&t.support.storage){o=t.getLocalKey(e);localStorage.setItem(o.data,n);localStorage.setItem(o.time,s);localStorage.setItem(o.title,r)}},removeCache:function(e){e=t.getRealUrl(e||location.href);delete t.stack[e];if(t.support.storage){var n=t.getLocalKey(e);localStorage.removeItem(n.data);localStorage.removeItem(n.time);localStorage.removeItem(n.title)}}};var n=function(r){r=e.extend({selector:"",container:"",callback:function(){},fitler:function(){}},r);if(!r.container||!r.selector){throw new Error("selector & container options must be set")}e("body").delegate(r.selector,"click",function(i){if(i.which>1||i.metaKey){return true}var s=e(this),o=s.attr("href");if(typeof r.filter==="function"){if(r.filter.call(this,o,this)===true){return true}}if(o===location.href){return true}if(t.getRealUrl(o)==t.getRealUrl(location.href)){var u=t.getUrlHash(o);if(u){location.hash=u;r.callback&&r.callback.call(this,{type:"hash"})}return true}i.preventDefault();r=e.extend(true,r,{url:o,element:this});n.request(r)})};n.xhr=null;n.options={};n.state={};n.defaultOptions={timeout:2e3,element:null,cache:24*3600,storage:true,url:"",push:true,show:"",title:"",titleSuffix:"",type:"GET",data:{pjax:true},dataType:"html",callback:null,beforeSend:function(t){e(n.options.container).trigger("pjax.start",[t,n.options]);t&&t.setRequestHeader("X-PJAX",true)},error:function(){n.options.callback&&n.options.callback.call(n.options.element,{type:"error"});location.href=n.options.url},complete:function(t){e(n.options.container).trigger("pjax.end",[t,n.options])}};n.showFx={_default:function(e,t,n){this.html(e);t&&t.call(this,e,n)},fade:function(e,t,n){var r=this;if(n){r.html(e);t&&t.call(r,e,n)}else{this.fadeOut(500,function(){r.html(e).fadeIn(500,function(){t&&t.call(r,e,n)})})}}};n.showFn=function(t,r,i,s,o){var u=null;if(typeof t==="function"){u=t}else{if(!(t in n.showFx)){t="_default"}u=n.showFx[t]}u&&u.call(r,i,function(){var t=location.hash;if(t!=""){location.href=t;if(/Firefox/.test(navigator.userAget)){history.replaceState(e.extend({},n.state,{url:null}),document.title)}}else{window.scrollTo(0,0)}s&&s.call(this,i,o)},o)};n.success=function(r,i){if(i!==true){i=false}if((r||"").indexOf("<html")!=-1){n.options.callback&&n.options.callback.call(n.options.element,{type:"error"});location.href=n.options.url;return false}var s=n.options.title,o;if(!s){var u=r.match(/<title>(.*?)<\/title>/);if(u){s=u[1]}if(!s&&n.options.element){o=e(n.options.element);s=o.attr("title")||o.text()}}if(s){if(s.indexOf(n.options.titleSuffix)==-1){s+=n.options.titleSuffix}document.title=s}n.state={container:n.options.container,timeout:n.options.timeout,cache:n.options.cache,storage:n.options.storage,show:n.options.show,title:s,url:n.options.oldUrl};var a=e.param(n.options.data);if(a!=""){n.state.url=n.options.url+(/\?/.test(n.options.url)?"&":"?")+a}if(n.options.push){if(!n.active){history.replaceState(e.extend({},n.state,{url:null}),document.title);n.active=true}history.pushState(n.state,document.title,n.options.oldUrl)}else if(n.options.push===false){history.replaceState(n.state,document.title,n.options.oldUrl)}n.options.showFn&&n.options.showFn(r,function(){n.options.callback&&n.options.callback.call(n.options.element,{type:i?"cache":"success"})},i);if(n.options.cache&&!i){t.setCache(n.options.url,r,s,n.options.storage)}};n.request=function(r){r=e.extend(true,n.defaultOptions,r);var i,s=e(r.container);r.oldUrl=r.url;r.url=t.getRealUrl(r.url);if(e(r.element).length){i=t.toInt(e(r.element).attr("data-pjax-cache"));if(i){r.cache=i}}if(r.cache===true){r.cache=24*3600}r.cache=t.toInt(r.cache);if(r.cache===0){t.removeAllCache()}if(!r.showFn){r.showFn=function(e,t,i){n.showFn(r.show,s,e,t,i)}}n.options=r;n.options.success=n.success;if(r.cache&&(i=t.getCache(r.url,r.cache,r.storage))){r.beforeSend();r.title=i.title;n.success(i.data,true);r.complete();return true}if(n.xhr&&n.xhr.readyState<4){n.xhr.onreadystatechange=e.noop;n.xhr.abort()}n.xhr=e.ajax(n.options)};var r="state"in window.history,i=location.href;e(window).bind("popstate",function(t){var s=!r&&location.href==i;r=true;if(s)return;var o=t.state;if(o&&o.container){if(e(o.container).length){var u={url:o.url||location.href,container:o.container,push:null,timeout:o.timeout,cache:o.cache,storage:o.storage};n.request(u)}else{window.location=location.href}}});if(!t.support.pjax){n=function(){return true};n.request=function(e){if(e&&e.url){location.href=e.url}}}e.pjax=n;e.pjax.util=t;if(e.inArray("state",e.event.props)<0){e.event.props.push("state")}})(jQuery)