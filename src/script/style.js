$(document).ready(function() {
	
	// Check to see if any components are used
	function checkComponents() {
		
		if ($("abbr").length || $(".with-tooltip").length) {
			getTooltip();
		}
		
		if ($(".with-popover").length) {
			getPopover();
		}
		
		if ($(".with-tabs").length) {
			getTabs();
		}
		
		if ($(".with-accordion").length) {
			getAccordion();
		}
		
		if ($(".with-subnav").length) {
			getSubnav();
		}
		
	} // end checkComponents
	
	// Tooltip
	function getTooltip() {
		
		$("abbr, .with-tooltip").on("mouseover", function() {
	
			var title = $(this).attr("title"),
				position = $(this).position();
			
			$(this).attr("title","").css("position","relative");
			
			if ($(this).hasClass("top")) {
			
				$(this).before("<div class=\"tooltip in top\"><div class=\"tooltip-inner\">"+title+"</div><div class=\"tooltip-arrow\"></div></div>");
				$(".tooltip").css({"top":(position.top - 28)+"px", "left":position.left+"px"});
				
			} else if ($(this).hasClass("bottom")) {
			
				$(this).after("<div class=\"tooltip in bottom\"><div class=\"tooltip-inner\">"+title+"</div><div class=\"tooltip-arrow\"></div></div>");
				$(".tooltip").css({"bottom":(position.bottom + 28)+"px", "left":position.left+"px"});
				
			} else if ($(this).hasClass("right")) {
			
				$(this).before("<div class=\"tooltip in right\"><div class=\"tooltip-inner\">"+title+"</div><div class=\"tooltip-arrow\"></div></div>");
				$(".tooltip").css({"top":position.top+"px", "left":(position.left + $(this).width())+"px"});
				
			} else if ($(this).hasClass("left")) {
			
				$(this).before("<div class=\"tooltip in left\"><div class=\"tooltip-inner\">"+title+"</div><div class=\"tooltip-arrow\"></div></div>");
				$(".tooltip").css({"top":position.top+"px", "left":(position.left - ($(".tooltip").width() + 8))+"px"});
				
			} else {
			
				$(this).before("<div class=\"tooltip in\"><div class=\"tooltip-inner\">"+title+"</div><div class=\"tooltip-arrow\"></div></div>");
				$(".tooltip").css({"top":(position.top - 28)+"px", "left":position.left+"px"});
			}
			
			$("abbr, .with-tooltip").on("mouseout", function() {
				$(this).attr("title",$(".tooltip.in .tooltip-inner").html()).css("position","static");
				$(".tooltip").remove();
			});
	
		});
		
	} // end getTooltip
	
	// Popover
	function getPopover() {
		
		$(".with-popover").each(function(i){
		
			var title = $(this).attr("data-title"), position = $(this).position();
			
			if ($(this).hasClass("top")) {
				
				$("body").append("<div class=\"popover top\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover:eq("+i+")").css({"top":(position.top - ($(".popover:eq("+i+")").innerHeight() + 8))+"px", "left":position.left+"px"});
				
			} else if ($(this).hasClass("bottom")) {
			
				$("body").append("<div class=\"popover bottom\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover:eq("+i+")").css({"top":(position.top + $(this).height() + 4)+"px", "left":position.left+"px"});
				
			} else if ($(this).hasClass("right")) {
			
				$("body").append("<div class=\"popover right\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				if ($(this).is("img")) {
					$(".popover:eq("+i+")").css({"top":(position.top + ($(this).height()/2))+"px", "left":(position.left + $(this).width() + 3)+"px"});
				} else {
					$(".popover:eq("+i+")").css({"top":(position.top - $(this).height())+"px", "left":(position.left + $(this).width() + 3)+"px"});
				}
				
			} else if ($(this).hasClass("left")) {
			
				$("body").append("<div class=\"popover left\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				if ($(this).is("img")) {
					$(".popover:eq("+i+")").css({"top":(position.top + ($(this).height()/2))+"px", "left":(position.left - $(".popover").width()+100)+"px"});
				} else {
					$(".popover:eq("+i+")").css({"top":(position.top - $(this).height())+"px", "left":(position.left - $(".popover").width() - 5)+"px"});
				}
				
			} else {
			
				$("body").append("<div class=\"popover\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover:eq("+i+")").css({"top":(position.top - ($(".popover:eq("+i+")").innerHeight() + 8))+"px", "left":position.left+"px"});
			}
			
		});
		
		$(".with-popover").on("click", function(){
			var index = $(".with-popover").index(this);
			
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
				$(".popover:eq("+index+")").removeClass("in");
			} else {
				$(this).addClass("active");
				$(".popover:eq("+index+")").addClass("in");
			}
			
		});
		
	} // end getPopover
	
	// tabs
	function getTabs() {
	
		$(".with-tabs").each(function(i){
			$(this).attr("data-id",i);
			
			$(".with-tabs[data-id='"+i+"'] .tabs li").on("click",function(){
				
				var index = $(".with-tabs[data-id='"+i+"'] .tabs li").index(this);
				
				$(".with-tabs[data-id='"+i+"'] .tabs li").each(function(){
					if ($(".with-tabs[data-id='"+i+"'] .tabs li").hasClass("active")) {
						$(this).removeClass("active");
					}
				});
				
				$(this).addClass("active");
				
				$(".with-tabs[data-id='"+i+"'] .tab-contents section").each(function(){
					if ($(".with-tabs[data-id='"+i+"'] .tab-contents section").hasClass("active")) {
						$(this).removeClass("active");
					}
				});
				
				$(".with-tabs[data-id='"+i+"'] .tab-contents section:eq("+index+")").addClass("active");
				
				return false;
				
			});
		});
	
	} // end getTabs
	
	// accordion
	function getAccordion() {
		
		$(".with-accordion").each(function(i){
			$(this).attr("id","ai"+i);
			
			$("#ai"+i).prepend("<div class=\"accordion-controls\"><a class=\"closeAll\" href=\"javascript:void(0)\">Close All</a> <a class=\"openAll\" href=\"javascript:void(0)\">Open All</a></div>");
			
			$("#ai"+i+" .closeAll").on("click",function(){
			
				$("#ai"+i+" .accordion-title").each(function(k){
					if ($(this).hasClass("active")) {
						$("#ai"+i+" > .accordion-content:eq("+k+")").slideUp("fast", function(){
							$("#ai"+i+" > .accordion-title:eq("+k+")").removeClass("active");
						});
					}
				});
				
			}); // end closeAll
			
			$("#ai"+i+" .openAll").on("click",function(){
				
				$("#ai"+i+" .accordion-title").each(function(j){
					if (!$(this).hasClass("active")) {
						$("#ai"+i+" > .accordion-content:eq("+j+")").slideDown("fast", function(){
							$("#ai"+i+" > .accordion-title:eq("+j+")").addClass("active");
						});
					}
				});
				
			}); // end openAll
			
			$("#ai"+i+" .accordion-title").each(function(m){
				if ($(this).hasClass("active")) {
					$("#ai"+i+" > .accordion-content:eq("+m+")").show();
				}
			}); // end init state
			
			$("#ai"+i+" .accordion-title").on("click",function(){
			
				var index = $("#ai"+i+" .accordion-title").index(this);
				
				if (!$(this).hasClass("active")) {
					
					$("#ai"+i+" .accordion-title").each(function(n){
						if ($(this).hasClass("active")) {
							$(this).removeClass("active");
							$("#ai"+i+" > .accordion-content:eq("+n+")").slideUp("fast",function(){
								$("#ai"+i+" > .accordion-title:eq("+index+")").addClass("active");
								$("#ai"+i+" > .accordion-content:eq("+index+")").slideDown();
							});
						} else {
							if (n === index) {
								$("#ai"+i+" > .accordion-title:eq("+index+")").addClass("active");
								$("#ai"+i+" > .accordion-content:eq("+index+")").slideDown();
							}
						}
					});
					
				} else {
				
					$("#ai"+i+" > .accordion-content:eq("+index+")").slideUp("fast", function(){
						$("#ai"+i+" > .accordion-title:eq("+index+")").removeClass("active");
					});
					
				}
				
				return false;
				
			}); // end click
			
		});

	} // end getAccordion
	
	// subnav
	function getSubnav() {
	
		var nav = "<ul class=\"page-subnav\">";
		
		$(".with-subnav h2").each(function(i) {
			$(this).before("<a class=\"anchor\" id=\"nav"+i+"\" href=\"#\"></a>");
			nav += "<li><a href=\"#nav"+i+"\">" + $(this).html() + "</a></li>";
		});
		
		nav += "</ul>";
		
		$(".with-subnav").prepend(nav);
		$("body").css("padding-top",$(".page-subnav").innerHeight());
		$(".anchor").css({"display":"block", "position":"relative", "top":($(".page-subnav").innerHeight() * -1)+"px", "visibility":"hidden"});
		
	} // end getSubnav
	
	// call to check available component
	checkComponents();
	
});

function getParameterByName(url,name) {
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(url);
	
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	
	if (results === null) {
		return "";
	} else {
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

// D2L BUTTONS/ACTION CALLS
function gotoToC(){
	var tocURL = 'd2l/le/content/'+getParameterByName(window.location.href,'ou')+'/Home';
	top.location.href = tocURL;
}

function gotoGrades() {
	var tocURL = 'd2l/lms/grades/my_grades/main.d2l?ou='+getParameterByName(window.location.href,'ou');
	top.location.href = tocURL;
}

function gotoDropbox() {
	var tocURL = 'd2l/lms/dropbox/user/folders_list.d2l?ou='+getParameterByName(window.location.href,'ou');
	top.location.href = tocURL;
}

function gotoDiscussions() {
	var tocURL = 'd2l/le/'+getParameterByName(window.location.href,'ou')+'/discussions/List';
	top.location.href = tocURL;
}

/*********************************************
SCROLL TO TOP JS
*********************************************/
/*

 scrollup v2.1.0
 Author: Mark Goodyear - http://markgoodyear.com
 Git: https://github.com/markgoodyear/scrollup

 Copyright 2013 Mark Goodyear.
 Licensed under the MIT license
 http://www.opensource.org/licenses/mit-license.php

 Twitter: @markgdyr

 */
!function(a,b,c){a.fn.scrollUp=function(b){a.data(c.body,"scrollUp")||(a.data(c.body,"scrollUp",!0),a.fn.scrollUp.init(b))},a.fn.scrollUp.init=function(d){var e=a.fn.scrollUp.settings=a.extend({},a.fn.scrollUp.defaults,d),f=e.scrollTitle?e.scrollTitle:e.scrollText,g=a("<a/>",{id:e.scrollName,href:"#top",title:f}).appendTo("body");e.scrollImg||g.html(e.scrollText),g.css({display:"none",position:"fixed",zIndex:e.zIndex}),e.activeOverlay&&a("<div/>",{id:e.scrollName+"-active"}).css({position:"absolute",top:e.scrollDistance+"px",width:"100%",borderTop:"1px dotted"+e.activeOverlay,zIndex:e.zIndex}).appendTo("body"),scrollEvent=a(b).scroll(function(){switch(scrollDis="top"===e.scrollFrom?e.scrollDistance:a(c).height()-a(b).height()-e.scrollDistance,e.animation){case"fade":a(a(b).scrollTop()>scrollDis?g.fadeIn(e.animationInSpeed):g.fadeOut(e.animationOutSpeed));break;case"slide":a(a(b).scrollTop()>scrollDis?g.slideDown(e.animationInSpeed):g.slideUp(e.animationOutSpeed));break;default:a(a(b).scrollTop()>scrollDis?g.show(0):g.hide(0))}}),g.click(function(b){b.preventDefault(),a("html, body").animate({scrollTop:0},e.topSpeed,e.easingType)})},a.fn.scrollUp.defaults={scrollName:"scrollUp",scrollDistance:300,scrollFrom:"top",scrollSpeed:300,easingType:"linear",animation:"fade",animationInSpeed:200,animationOutSpeed:200,scrollText:"Scroll to top",scrollTitle:!1,scrollImg:!1,activeOverlay:!1,zIndex:2147483647},a.fn.scrollUp.destroy=function(d){a.removeData(c.body,"scrollUp"),a("#"+a.fn.scrollUp.settings.scrollName).remove(),a("#"+a.fn.scrollUp.settings.scrollName+"-active").remove(),a.fn.jquery.split(".")[1]>=7?a(b).off("scroll",d):a(b).unbind("scroll",d)},a.scrollUp=a.fn.scrollUp}(jQuery,window,document);