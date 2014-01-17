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
		
		if ($(".with-zoom").length) {
			getImgZoom();
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
		
		$("header").before("<a class=\"anchorTop\" id=\"page-top\" href=\"#\"></a>");
		$(".anchorTop").css({"display":"block", "position":"relative", "top":"-32px", "visibility":"hidden"});
		
		$(".with-subnav h2").each(function(i) {
			$(this).before("<a class=\"anchor\" id=\"nav"+i+"\" href=\"#\"></a>");
			if (i !==0) {
				$(this).before("<small><a href=\"#page-top\">Back to top</a></small>");
			}
			nav += "<li><a href=\"#nav"+i+"\">" + $(this).html() + "</a></li>";
		});
		
		nav += "</ul>";
		
		$(".with-subnav").prepend(nav);
		/* $("body").css("padding-top",$(".page-subnav").innerHeight()); */
		$(".anchor").css({"display":"block", "position":"relative", "top":"32px", "visibility":"hidden"});
		
	} // end getSubnav
	
	// image zoom
	function getImgZoom() {
	
		var native_width = 0;
		var native_height = 0;
		
		$(".with-zoom").each(function(i){
			$(this).attr("id","wiz"+i);
			$("#wiz"+i).css("width",$("#wiz"+i+" .small").width()+"px");
			$("#wiz"+i+" .magnify").css({"background-image":"url("+$("#wiz"+i+" .small").attr("src")+")", "background-repeat":"no-repeat"});
			
			$("#wiz"+i).mousemove(function(e){
		
				if(!native_width && !native_height) {
			
					var image_object = new Image();
					image_object.src = $("#wiz"+i+" .small").attr("src");
			
					native_width = image_object.width;
					native_height = image_object.height;
			
				} else {
			
					var magnify_offset = $(this).offset();
					var mx = e.pageX - magnify_offset.left;
					var my = e.pageY - magnify_offset.top;
			
					if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0) {
						$("#wiz"+i+" .magnify").fadeIn(100);
					} else {
						$("#wiz"+i+" .magnify").fadeOut(100);
						native_width = 0;
						native_height = 0;
					}
			
					if($("#wiz"+i+" .magnify").is(":visible")) {
			
						var rx = Math.round(mx/$("#wiz"+i+" .small").width()*native_width - $("#wiz"+i+" .magnify").width()/2)*-1;
						var ry = Math.round(my/$("#wiz"+i+" .small").height()*native_height - $("#wiz"+i+" .magnify").height()/2)*-1;
						var bgp = rx + "px " + ry + "px";
			
						var px = mx - $("#wiz"+i+" .magnify").width()/2;
						var py = my - $("#wiz"+i+" .magnify").height()/2;
			
						$("#wiz"+i+" .magnify").css({"left": px, "top": py, "background-position": bgp});
						
					}
			
				}
			
			});
			
		});
		
	}
	
	// call to check available component
	checkComponents();
	
});

/* jshint ignore:start */

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

var D2LROOT = "https://uwli.courses.wisconsin.edu/";

function gotoToC(){
	var tocURL = 'd2l/le/content/'+getParameterByName(window.location.href,'ou')+'/Home';
	top.location.href = D2LROOT+tocURL;
}

function gotoGrades() {
	var tocURL = 'd2l/lms/grades/my_grades/main.d2l?ou='+getParameterByName(window.location.href,'ou');
	top.location.href = D2LROOT+tocURL;
}

function gotoDropbox() {
	var tocURL = 'd2l/lms/dropbox/user/folders_list.d2l?ou='+getParameterByName(window.location.href,'ou')+'&isprv=0';
	top.location.href = D2LROOT+tocURL;
}

function gotoDiscussions() {
	var tocURL = 'd2l/le/'+getParameterByName(window.location.href,'ou')+'/discussions/List';
	top.location.href = D2LROOT+tocURL;
}
/* jshint ignore:end */