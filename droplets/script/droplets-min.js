/**
 * DROPLETS
 *
 * @version: 2.0.1
 * @author: Ethan Lin
 * @url: https://github.com/oel-mediateam/droplets-for-canvas
 *
 * @license: The MIT License (MIT)
 * Copyright 2018-2019 UWEX CEOEL Media
 *
 */
"use strict";
/**
 * On DOM ready, execute checkEnviroment function.
 * @param {checkEnviroment} fn - the callback to check the enviroment
 */
/**
 * Check to see if Droplets JavaScript is loaded on a allowed domain. If yes,
 * execute the checkDropletsComponents function to check for any Droplet
 * JavaScript components are in use. If not, do nothing.
 * @function checkEnviroment
 * @callback checkEnviroment
 * @since 2.0.0
 */
function checkEnvironment(){isOnAllowedDomains()&&checkDropletsComponents()}
/**
 * Checking the DOM to see if any Droplets components are used. If yes,
 * execute the function to set up the component. If not, ignore.
 * @function checkDropletsComponents
 * @since 2.0.0
 */function checkDropletsComponents(){
// set initial page container x and y as data- attributes
var t=document.getElementById("uws-droplets-page"),e=t.getBoundingClientRect();t.setAttribute("data-x",e.x),t.setAttribute("data-y",e.y);
// component elements
var n="#uws-droplets-page .droplets-",i=document.querySelectorAll(n+"tooltip"),o=document.querySelectorAll(n+"popover"),a=document.querySelectorAll(n+"tabs"),s=document.querySelectorAll(n+"accordion"),r=document.querySelectorAll(n+"resources"),l=document.querySelectorAll(n+"readmore"),c=document.querySelectorAll(n+"reveal"),d=document.querySelectorAll(n+"image-zoom"),u=document.querySelectorAll(n+"lightbox");
// check for components
i.length&&enableToolTips(i),o.length&&enablePopovers(o),a.length&&enableTabs(a),s.length&&enableAccordions(s),r.length&&enableResources(r),l.length&&enableReadMore(l),c.length&&enableReveal(c),d.length&&enableImgZoom(d),u.length&&enableLightbox(u)}
/**
 * Enable all tool tip elements.
 * @function enableToolTips
 * @param {Object[]} toolTips - Collection of tool tip elements.
 * @since 2.0.0
 */function enableToolTips(t){
// loop through each tool tip elements to add mouse enter and leave
// event listener to each tool tip element
Array.prototype.forEach.call(t,function(s){s.addEventListener("mouseenter",function(){var t=this.getAttribute("title"),e={left:this.offsetLeft,top:this.offsetTop,bottom:this.offsetTop-this.offsetHeight},n=0,i=0;
// create an attribute to hold the original tip
s.setAttribute("data-tip",t),
// reset tip variable to data-tip attribute value
t=s.getAttribute("data-tip");
// create tool tip container with classes
var o=document.createElement("div");o.classList.add("tooltip");var a=document.createElement("div");a.classList.add("tooltip-inner"),a.innerHTML=t,o.appendChild(a),
// add the tool tip container to the DOM
this.insertBefore(o,this.firstChild),
// determine tooltip display positions
i=this.classList.contains("top")?(n=e.top-o.offsetHeight-2,e.left):this.classList.contains("bottom")?(n=e.top+o.offsetHeight-5,e.left):this.classList.contains("right")?(n=e.top,e.left+this.offsetWidth+5):this.classList.contains("left")?(n=e.top,e.left-o.offsetWidth-5):(n=e.top-o.offsetHeight-2,e.left),
// set tool tip position
o.style.top=n+"px",o.style.left=i+"px",
// remove title attribute
this.removeAttribute("title"),
// add mouse leave event to remove the tool tip container from DOM
this.addEventListener("mouseleave",function(){null!==o.parentNode&&o.parentNode.removeChild(o),
// add title attribute back
this.setAttribute("title",t)})})})}
/**
 * Enable all popover elements.
 * @function enablePopovers
 * @param {Object[]} popovers - Collection of pop over elements.
 * @since 2.0.0
 */function enablePopovers(t){
// loop through each popovers
Array.prototype.forEach.call(t,function(t){var e="";
// if data-title attribute is specified
// set the title to data-title value
e=(null!==t.getAttribute("data-title")||(
// set title to the title attribute
e=t.getAttribute("title"),
// create data-title to hold the original title attribute value
t.setAttribute("data-title",e)),t.getAttribute("data-title"));
// create the popover container
var o=document.createElement("div");o.classList.add("popover"),o.setAttribute("role","tooltip");var n=document.createElement("div");n.classList.add("popover-content"),n.innerHTML=e,o.appendChild(n),
// add the popover container to the DOM
t.insertBefore(o,t.firstChild),
// add the click event listener
t.addEventListener("click",function(){
// if visible
if("block"===this.querySelector(".popover").style.display)
// hide
this.querySelector(".popover").style.display="none",this.classList.remove("active");else{
// else show
this.classList.add("active"),o.style.display="block";
// and determine popover positions
var t=0,e=0,n=this.offsetWidth-(o.offsetWidth+this.offsetWidth)/2,i=this.offsetHeight-(o.offsetHeight+this.offsetHeight)/2;e=this.classList.contains("top")?(o.classList.add("top"),t=-1*(o.offsetHeight+10),n):this.classList.contains("bottom")?(o.classList.add("bottom"),t=this.offsetHeight+10,n):this.classList.contains("right")?(o.classList.add("right"),t=i,this.offsetWidth+10):this.classList.contains("left")?(o.classList.add("left"),t=i,-1*(o.offsetWidth+10)):(o.classList.add("top"),t=-1*(o.offsetHeight+10),n),
// position the popover on the DOM
o.style.top=t+"px",o.style.left=e+"px"}}),
// add mouse enter event to remove the title attribute
// to prevent default tooltip behavior and add back in on mouse leave
t.addEventListener("mouseenter",function(){this.removeAttribute("title"),this.addEventListener("mouseleave",function(){this.setAttribute("title",e)})})})}
/**
 * Enable all tab elements.
 * @function enableTabs
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 2.0.0
 */function enableTabs(t){
// loop through collection of tab elements
Array.prototype.forEach.call(t,function(t){
// set each tab element's tabs and sections
var n=t.querySelectorAll(".tabs li"),i=t.querySelectorAll(".tab-contents .tab-section");
// for each tab of current tab element iternation
Array.prototype.forEach.call(n,function(t,e){
// add event listener to each tab
t.addEventListener("click",function(t){
// remove active class from all tab
// and hide tab sections
Array.prototype.forEach.call(n,function(t,e){t.classList.remove("active"),t.setAttribute("aria-selected","false"),i[e].classList.remove("active")}),
// add active class to current clicked tab
// and display corresponding tab section
this.classList.add("active"),this.setAttribute("aria-selected","true"),i[e].classList.add("active"),i[e].setAttribute("aria-selected","true"),
// prevent default event action
t.preventDefault()})})})}
/**
 * Enable all accordion elements.
 * @function enableAccordions
 * @param {Object[]} accordions - Collection of accordion elements.
 * @since 2.0.0
 */function enableAccordions(t){
// loop through collection of tab elements
Array.prototype.forEach.call(t,function(t){
// query the accordion title banners
var e=t.querySelectorAll(".accordion-title"),n=document.createElement("div");
// create the accordion controls for each accordion
n.classList.add("accordion-controls");var i=document.createElement("a");i.classList.add("closeAll"),i.setAttribute("role","button"),i.innerHTML="Close All",i.href="javascript:void(0)";var o=document.createElement("a");o.classList.add("openAll"),o.setAttribute("role","button"),o.innerHTML="Open All",o.href="javascript:void(0)",n.appendChild(i),n.appendChild(o),
// add the accordion controls to the DOM
t.insertBefore(n,t.firstChild),
// add event listener to the close all control
i.addEventListener("click",function(t){Array.prototype.forEach.call(e,function(t){closeAccordionItem(t)}),
// prevent default event action
t.preventDefault()}),
// add event listener to open all control
o.addEventListener("click",function(t){Array.prototype.forEach.call(e,function(t){openAccordionItem(t)}),
// prevent default event action
t.preventDefault()}),
// loop through each title banner
Array.prototype.forEach.call(e,function(t){
// if it contains active class, display the accordion content
t.classList.contains("active")&&openAccordionItem(t),
// add event listener to each title banner
t.addEventListener("click",function(t){
// if current target is open, close it
this.classList.contains("active")?closeAccordionItem(this):(
// close all of the accordion
Array.prototype.forEach.call(e,function(t){closeAccordionItem(t)}),
// open the current target
openAccordionItem(this)),
// prevent default event action
t.preventDefault()})})})}
/**
 * Close accordion item.
 * @function closeAccordionItem
 * @param {Object} el - element to be hidden.
 * @since 2.0.0
 */function closeAccordionItem(t){t.classList.contains("active")&&(t.nextElementSibling.style.display="none",t.nextElementSibling.setAttribute("aria-expanded","false"),t.classList.remove("active"))}
/**
 * Open accordion item.
 * @function openAccordionItem
 * @param {Object} el - element to be displayed.
 * @since 2.0.0
 */function openAccordionItem(t){t.classList.add("active"),t.nextElementSibling.setAttribute("aria-expanded","true"),t.nextElementSibling.style.display="block"}
/**
 * Enable all resource elements.
 * @function enableResources
 * @param {Object[]} resources - Collection of resource elements.
 * @since 2.0.0
 */function enableResources(t){
// loop through collection of resource elements
Array.prototype.forEach.call(t,function(t){
// get the resource class selector
var e=t.querySelectorAll(".resource");
// loop through each resouces
Array.prototype.forEach.call(e,function(t){
// get the cover info selector
var e=t.querySelectorAll(".cover-info");
// loop through the cover info of each resource
// There is only 1 element in the array (NodeList) because there is
// only 1 cover info per resource
Array.prototype.forEach.call(e,function(t){
// create arrow element
var e=document.createElement("div");e.classList.add("arrow"),
// add the arrow next to the cover info
t.parentNode.insertBefore(e,t.nextSibling),
// add event listener to the arrow to toggle the resource
e.addEventListener("click",function(){this.parentNode.classList.contains("expanded")?this.parentNode.classList.remove("expanded"):this.parentNode.classList.add("expanded")})})})})}
/**
 * Enable all read more elements.
 * @function enableReadMore
 * @param {Object[]} readMore - Collection of read more elements.
 * @since 2.0.0
 */function enableReadMore(t){
// loop through collection of read more elements
Array.prototype.forEach.call(t,function(e){
// create the read more control
var t=document.createElement("div");t.classList.add("readmore-cntrl"),t.setAttribute("aria-hidden","true"),
// add the read more control to the DOM
e.appendChild(t),
// on click event lisitener
t.addEventListener("click",function(){if(this.classList.contains("opened"))this.classList.remove("opened"),e.style.height=null,e.style.overflow="hidden";else{var t=e.scrollHeight+"px";this.classList.add("opened"),e.style.height=t,e.style.overflow="unset"}})})}
/**
 * Enable all reveal elements.
 * @function enableReveal
 * @param {Object[]} reveals - Collection of reveal elements.
 * @since 2.0.0
 */function enableReveal(t){
// loop through collection of reveal elements
Array.prototype.forEach.call(t,function(e){
// create a toggle button
var t=document.createElement("a");t.classList.add("btn","success","small"),t.setAttribute("aria-hidden","true"),t.innerHTML=e.getAttribute("data-button-name"),
// add the toggle button to the DOM
e.appendChild(t),
// show/hide hidden content on click
t.addEventListener("click",function(){var t=e.querySelectorAll(".hidden-content")[0];"unset"!==t.style.display?(t.style.display="unset",this.classList.remove("success"),this.innerHTML="Hide"):(t.style.display="none",this.classList.add("success"),this.innerHTML=e.getAttribute("data-button-name"))})})}
/**
 * Enable all image zoom elements.
 * @function enableImgZoom
 * @param {Object[]} imgZooms - Collection of image zoom elements.
 * @since 2.0.0
 */function enableImgZoom(t){
// loop through collection of image zoom elements
Array.prototype.forEach.call(t,function(t){
// get sibiling image src
var u=t.querySelector("img"),f=document.createElement("div");
// create magnified container
f.classList.add("magnify"),f.style.backgroundImage='url("'+u.src+'")',
// add the magnify div to the DOM
t.appendChild(f),
// show manified version on mousemove over image
t.addEventListener("mousemove",function(t){
// get and set native width and height as data- attributes
var e=new Image;e.src=u.src,u.setAttribute("data-width",e.width),u.setAttribute("data-height",e.height);var n=u.getAttribute("data-width"),i=u.getAttribute("data-height"),o=document.getElementById("uws-droplets-page"),a=Number(o.getAttribute("data-x")),s=Number(o.getAttribute("data-y")),r=t.pageX-a-this.offsetLeft,l=t.pageY-s-this.offsetTop;
// show / hide magnified image
if(r<this.offsetWidth&&l<this.offsetHeight&&0<r&&0<l){f.classList.add("show");var c=-1*Math.round(r/u.offsetWidth*n-f.offsetWidth/2),d=-1*Math.round(l/u.offsetHeight*i-f.offsetHeight/2);f.style.left=r-f.offsetWidth/2+"px",f.style.top=l-f.offsetHeight/2+"px",f.style.backgroundPosition=c+"px "+d+"px"}else f.classList.remove("show")})})}
/**
 * Enable all lightbox elements.
 * @function enableLightbox
 * @param {Object[]} lightboxes - Collection of lightbox elements.
 * @since 2.0.0
 */function enableLightbox(t){
// get page element
var e=document.getElementById("uws-droplets-page"),r=document.createElement("div");
// create overlay element and its controls
r.classList.add("droplets-lightbox-overlay"),r.setAttribute("aria-hidden","true");var l=document.createElement("div");l.classList.add("overlay-content");var n=document.createElement("a");n.classList.add("overlay-close-btn"),n.setAttribute("role","button");
// create left and right arrows
var c=document.createElement("a");c.classList.add("overlay-left-arrow"),c.setAttribute("role","button");var d=document.createElement("a");d.classList.add("overlay-right-arrow"),d.setAttribute("role","button"),
// add them all to the overlay div
r.appendChild(c),r.appendChild(d),r.appendChild(n),r.appendChild(l),
// add overlay element to DOM
e.appendChild(r),
// event listeners to close overlay
r.addEventListener("click",function(t){t.target===this&&r.classList.contains("show-overlay")&&r.classList.remove("show-overlay")}),n.addEventListener("click",function(){r.classList.contains("show-overlay")&&r.classList.remove("show-overlay")}),
// loop through collection of image zoom elements to show the selected image
Array.prototype.forEach.call(t,function(t){var e;
// check to see if there is mixed of img and figure
// if true, show error and exit main loop
if(isImgFigCombo(t.querySelectorAll("img, figure"))){var n=document.createElement("div");n.classList.add("callout","danger","lightbox-error");var i=document.createElement("p");return i.innerHTML="<strong>Error:</strong> Do not mix img and figure tags.",n.appendChild(i),void t.appendChild(n)}
// determind which element is used
var o=t.querySelectorAll("img"),a=t.querySelectorAll("figure"),s=a;0===a.length&&(s=o),
// loop throug the elements to add event listeners
Array.prototype.forEach.call(s,function(e,n){var i=0;e.addEventListener("click",function(t){
// add event listener to left and right button if more than 1
1<s.length?(d.style.display="inherit",d.addEventListener("click",function(t){++i>s.length-1&&(i=0),selectImage(s[i],l),t.preventDefault()}),c.style.display="inherit",c.addEventListener("click",function(t){--i<0&&(i=s.length-1),selectImage(s[i],l),t.preventDefault()})):(d.style.display="none",d.removeEventListener("click",function(){}),c.style.display="none",c.removeEventListener("click",function(){})),selectImage(e,l),r.classList.add("show-overlay"),i=n,t.preventDefault()})})})}
/**
 * Check to see if the lightbox is mixed of img and figure tag
 * @function isImgFigCombo
 * @param {Object[]} selectiors - Collection of img or figure elements.
 * @since 2.0.0
 */function isImgFigCombo(t){var e=0,n=0;return Array.prototype.forEach.call(t,function(t){"IMG"===t.nodeName?e++:"FIGURE"===t.nodeName&&n++}),1<=e&&1<=n&&n<e}
/**
 * Select and display the full lightbox image
 * @function selectImage
 * @param {Object} img - img or figure element.
 * @param {Object} img - container to append img element.
 * @since 2.0.0
 */function selectImage(t,e){e.innerHTML="";var n=document.createElement("img"),i=document.createElement("p");if("IMG"===t.nodeName)n.src=t.src,i.classList.add("caption"),i.innerHTML=t.getAttribute("alt");else if("FIGURE"===t.nodeName){var o=t.querySelector("img"),a=t.querySelector("figcaption");n.src=o.src,i.classList.add("caption"),i.innerHTML=a?a.innerHTML:o.getAttribute("alt")}e.appendChild(n),e.appendChild(i)}
/* --------------------------- HELPER FUNCTIONS ----------------------------- */
/**
 * Check to see if JavaScript is loaded on one of the allowed domain or in the
 * intended enviroment. Droplets is being used outside of Canvas. So, we want
 * to make sure it will still work for users on "non-Canvas" environment.
 * @function isOnAllowedDomains
 * @since 2.0.0
 * @return {boolean} true if matched, else false
 */function isOnAllowedDomains(){
// set arrary of allowed domains
var t=["localhost/","media.uwex.edu/",".instructure.com/","laethanlin.local:"],i=!1;
// loop through the allowedDomains array
return Array.prototype.forEach.call(t,function(t){
// use the current domain string to create regular expression object
var e=new RegExp(t);
// if it matched with DOM/Window URL
if(location.href.match(e)){
// if the domain is Canvas
if(".instructure.com/"!==t)
// set found to true and exit the loop
return void(i=!0);var n=document.getElementById("uws-droplets-page");null!=n&&(
// add canvas-net no matter if it is found or not also as
// it is in Canvas
n.classList.add("canvas-net"),
// add no-js class to page container if not content page
!1===(
// check to see if it is on a course content page
i=onCanvasContentPage(/\/pages/))&&n.classList.add("no-js"));
// exit the loop
}else;}),i}
/**
 * Check to see if the page is a content page on Canvas
 * @function onCanvasContentPage
 * @param {Object} regex - a regular expression object.
 * @since 2.0.0
 * @return {boolean} true if matched, else false
 */function onCanvasContentPage(t){return!!location.pathname.match(t)}
/**
 * On DOM ready, execute checkEnviroment function.
 * @param {checkEnviroment} fn - the callback to check the enviroment
 */
!function t(e){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?e():document.addEventListener("DOMContentLoaded",checkEnvironment)}(checkEnvironment);