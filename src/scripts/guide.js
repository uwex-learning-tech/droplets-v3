/* global SyntaxHighlighter */
$(document).ready(function() {
	
	/******************** GLOBAL-VARIABLES ********************/
	var pages;
	var pIndex = -1;
	var hIndex = -1;
	var isHome = false;
	var pageId;
	
	/******************** FUNCTIONS ********************/
	
	function determinePage() {
		pageId = $("html").attr("id");
		
		if (pageId === "lytele") {
			pages = ["pageheaders","typo","layouts","emphasis","callouts-inline","callouts-block-level","tables","image","helpers"];
		} else if (pageId === "advEx") {
			pages = [""];
			SyntaxHighlighter.highlight();
		} else if (pageId === "cmpnt") {
			pages = ["tooltip","popover","tab","accordion","button-plus"];
		} else if (pageId === "landing") {
		
			var wHeight = $(".guide-wrapper").outerHeight(),
				cHeight = $(".cover").outerHeight(),
				middle = ((wHeight - cHeight) / 2) - 82;
			
			$(".cover").css("padding-top",middle+"px");
			
			$(window).resize(function(){
				var wHeight = $(".guide-wrapper").outerHeight(),
					cHeight = $(".cover").outerHeight(),
					middle = ((wHeight - cHeight) / 2) - 40;
			
				$(".cover").css("padding-top",middle+"px");
			});
			
			isHome = true;
			
		} else {
			pages = ["404"];
		}
		
	}
	
	function checkIfExist(page) {
		var exist = false;
		
		$.each(pages, function(i,val) {
			if (page === val) {
				exist = true;
				hIndex = i;
				return false;
			}
		});

		return exist;
	}
	
	function getContent(page) {
		$("#page-content").hide();
		$("#page-content").load("src/parts/"+page+".html", function(){
			SyntaxHighlighter.highlight();
			$(this).fadeIn("slow");
			// call to check available component
			checkComponents();
		});
	}
	
	function makeCurrent(i) {
		$(".toc ul li a").each(function() {
			$(this).removeClass("active");
		});
		if (i >= 0) {
			$(".toc ul li a:eq("+i+")").addClass("active");
		}
		pIndex = i;
	}
	
	function checkForHash() {
		var hash = window.location.hash;
		
		hash = hash.replace("#","").trim(hash).toLowerCase();

		if (hash !== "") {
			if (checkIfExist(hash)) {
				if (hIndex !== pIndex) {
					makeCurrent(hIndex);
					getContent(hash);
					return (1);
				}
			} else {
				//makeCurrent(-1);
				//getContent("404");
				return (0);
			}
		} else {
			return (-1);
		}
		
	}
	
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
		
		$(".with-popover").css("position","relative");
		
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
		$(".with-tabs .tabs li").on("click",function(){
		
			var index = $(".with-tabs .tabs li").index(this);
			
			$(".with-tabs .tabs li").each(function(){
				if ($(".with-tabs .tabs li").hasClass("active")) {
					$(this).removeClass("active");
				}
			});
			
			$(this).addClass("active");
			
			$(".with-tabs .tab-contents section").each(function(){
				if ($(".with-tabs .tab-contents section").hasClass("active")) {
					$(this).removeClass("active");
				}
			});
			
			$(".with-tabs .tab-contents section:eq("+index+")").addClass("active");
			
			return false;
			
		});
	} // end getTabs
	
	// accordion
	function getAccordion() {
	
		$(".with-accordion .accordion-title").each(function(i){
			if ($(this).hasClass("active")) {
				$(".accordion-content:eq("+i+")").show();
			}
		});
	
		$(".with-accordion .accordion-title").on("click",function(){
		
			var index = $(".with-accordion .accordion-title").index(this);
			
			if (!$(this).hasClass("active")) {
				
				$(".with-accordion .accordion-title").each(function(i){
					if ($(this).hasClass("active")) {
						$(this).removeClass("active");
						$(".accordion-content:eq("+i+")").slideUp("fast",function(){
							$(".accordion-title:eq("+index+")").addClass("active");
							$(".accordion-content:eq("+index+")").slideDown();
						});
					} else {
						if (i === index) {
							$(".accordion-title:eq("+index+")").addClass("active");
							$(".accordion-content:eq("+index+")").slideDown();
						}
					}
				});
				
			} else {
			
				$(".accordion-content:eq("+index+")").slideUp("fast", function(){
					$(".accordion-title:eq("+index+")").removeClass("active");
				});
				
			}
			
			return false;
			
		});
		
	} // end getAccordion
	
	/******************** MAIN CODE ********************/
	
	$.ajaxSetup ({ cache: false });
	
	determinePage();
	
	if (!isHome) {
	
		if (checkForHash() === -1 || checkForHash() === 0) {
			if (pageId === "lytele" || pageId === "cmpnt") {
				makeCurrent(0);
				getContent(pages[0]);
			}
		}
		
		$(window).on('hashchange', function() {
			checkForHash();
		});
		
		$(".toc ul li a").on("click", function() {
			
			var exist = false;
			var parent = this.parentNode;
			var index = $(parent).index();
			var current = $(this).data("name");
			exist = checkIfExist(current);
			
			if (exist) {
				if (index !== pIndex) {
					makeCurrent(index);
					getContent(current);
				}
			} else {
				makeCurrent(-1);
				getContent("404");
			}
			
		});
		
		$(function(){ $.scrollUp(); });
	}
	
});