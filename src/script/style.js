/* global calIframeHeight */

$(document).ready(function() {
	
	var child = false, iframe = null;
	
	// if it is in a iFrame
	if ( parent === top ) {
	
		iframe = $( parent.document ).find( "div#ContentView" ).find( "iframe" ); // dependent on parent iFrame
		iframe.attr( "allowfullscreen", "" );
		iframe.attr( "webkitallowfullscreen", "" );
		iframe.attr( "mozallowfullscreen", "" );
		
		child = true;
		
	}
	
	/* FUNCTION TO CHECK JS COMPONENTS
    -----------------------------------------------------------------*/
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
		
		if ($(".with-readmore").length) {
		
			getReadMore();
			
		}
		
		if ($(".with-accordion").length || $(".with-tabs").length || $(".with-readmore").length) {
		
			if (child) {
			
				iframe.css("height", calIframeHeight() + "px");
				
			}
			
		}
		
	} // end checkComponents
	
	/* TOOLTIP FUNCTION
    -----------------------------------------------------------------*/
	function getTooltip() {
		
		// on mouse hover state
		$("abbr, .with-tooltip").on("mouseover", function() {
		
			var title = $(this).attr("title"), position = $(this).position();
			
			$(this).attr("title","").css("position","relative");
			
			// positions
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
			
			// on mouse out state
			$("abbr, .with-tooltip").on("mouseout", function() {
			
				$(this).attr("title",$(".tooltip.in .tooltip-inner").html()).css("position","static");
				$(".tooltip").remove();
				
			}); // end mouse out state
	
		}); // end mouse hover state
		
	} // end getTooltip
	
	/* POPOVER FUNCTION
    -----------------------------------------------------------------*/
	function getPopover() {
		
		// set positions
		$(".with-popover").each(function(i) {
		
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
			
		}); // end each looop
		
		// on mouse click state
		$(".with-popover").on("click", function() {
		
			var index = $(".with-popover").index(this);
			
			if ($(this).hasClass("active")) {
			
				$(this).removeClass("active");
				$(".popover:eq("+index+")").removeClass("in");
				
			} else {
			
				$(this).addClass("active");
				$(".popover:eq("+index+")").addClass("in");
				
			}
			
		}); // end mouse click state
		
	} // end getPopover
	
	/* TABS FUNCTION
    -----------------------------------------------------------------*/
	function getTabs() {
	
		$(".with-tabs").each(function(i) {
		
			$(this).attr("data-id",i);
			
			// on mouse click state
			$(".with-tabs[data-id='"+i+"'] .tabs li").on("click",function() {
				
				var index = $(".with-tabs[data-id='"+i+"'] .tabs li").index(this);
				
				// close all open tabs
				$(".with-tabs[data-id='"+i+"'] .tabs li").each(function(){
				
					if ($(".with-tabs[data-id='"+i+"'] .tabs li").hasClass("active")) {
					
						$(this).removeClass("active");
						
					}
					
				});
				
				// set currently click tab active
				$(this).addClass("active");
				
				// hide all tab contents
				$(".with-tabs[data-id='"+i+"'] .tab-contents section").each(function(){
				
					if ($(".with-tabs[data-id='"+i+"'] .tab-contents section").hasClass("active")) {
					
						$(this).removeClass("active");
						
					}
					
				});
				
				// display currently click tab contents
				$(".with-tabs[data-id='"+i+"'] .tab-contents section:eq("+index+")").addClass("active");
				
				// set height if it is in a iFrame
				if (child) {
				
					iframe.css("height", calIframeHeight() + "px");
					
				}
				
				return false;
				
			}); // end click
						
		}); // end each loop
	
	} // end getTabs
	
	/* ACCORDION FUNCTION
    -----------------------------------------------------------------*/
	function getAccordion() {
		
		$(".with-accordion").each(function(i) {
			
			$(this).attr("id","ai"+i);
			
			// set open and close all buttons
			$("#ai"+i).prepend("<div class=\"accordion-controls\"><a class=\"closeAll\" href=\"javascript:void(0)\">Close All</a> <a class=\"openAll\" href=\"javascript:void(0)\">Open All</a></div>");
			
			// loop through to add arrow to title bars if no "no-arrow" class
			if (!$(this).hasClass("no-arrow")) {
			
				$(this).find(".accordion-title").each(function() {
				
					$(this).append("<div class=\"indicator\"></div>");
					
				});
				
			}
			
            // close all sections
			$("#ai"+i+" .closeAll").on("click",function() {
			
				$("#ai"+i+" .accordion-title").each(function(k) {
				
					if ($(this).hasClass("active")) {
					
						$("#ai"+i+" > .accordion-content:eq("+k+")").slideUp("fast", function() {
						
							$("#ai"+i+" > .accordion-title:eq("+k+")").removeClass("active");
							
							if (child) {
							
								iframe.css("height", calIframeHeight() + "px");
								
							}
							
						});
					}
					
				});
				
			}); // end closeAll
			
			// open all section
			$("#ai"+i+" .openAll").on("click", function() {
				
				$("#ai"+i+" .accordion-title").each(function(j) {
				
					if (!$(this).hasClass("active")) {
					
						$("#ai"+i+" > .accordion-content:eq("+j+")").slideDown("fast", function() {
						
							$("#ai"+i+" > .accordion-title:eq("+j+")").addClass("active");
							
						});
						
					}
					
				});
				
			}); // end openAll
			
			// set initial state
			$("#ai"+i+" .accordion-title").each(function(m) {
			
				if ($(this).hasClass("active")) {
				
					$("#ai"+i+" > .accordion-content:eq("+m+")").show();
					
				}
				
			});
				
            // on mouse click state
			$("#ai"+i+" .accordion-title").on("click", function() {
			
				var index = $("#ai"+i+" .accordion-title").index(this);
				
				if (!$(this).hasClass("active")) {
					
					$("#ai"+i+" .accordion-title").each(function(n) {
					
						if ($(this).hasClass("active")) {
						
							$(this).removeClass("active");
							
							$("#ai"+i+" > .accordion-content:eq("+n+")").slideUp("fast", function() {
							
								$("#ai"+i+" > .accordion-title:eq("+index+")").addClass("active");
								$("#ai"+i+" > .accordion-content:eq("+index+")").slideDown();
								
								if (child) {
								
									iframe.css("height", calIframeHeight() + "px");
									
								}
								
							});
							
						} else {
						
							if (n === index) {
							
								$("#ai"+i+" > .accordion-title:eq("+index+")").addClass("active");
								$("#ai"+i+" > .accordion-content:eq("+index+")").slideDown();
								
							}
							
						}
						
					}); // end each
					
				} else {
				
					$("#ai"+i+" > .accordion-content:eq("+index+")").slideUp("fast", function() {
					
						$("#ai"+i+" > .accordion-title:eq("+index+")").removeClass("active");
						
						if (child) {
						
							iframe.css("height", calIframeHeight() + "px");
							
						}
						
					});
					
				}

				return false;
				
			}); // end click
			
		}); // end each

	} // end getAccordion
	
	/* INTERNAL PAGE NAVIGATION FUNCTION
    -----------------------------------------------------------------*/
	function getSubnav() {
	
		var nav = "<ul class=\"page-subnav\">";
		
		$("header").before("<a class=\"anchorTop\" id=\"page-top\" href=\"#\"></a>");
		$(".anchorTop").css({"display":"block", "position":"relative", "top":"-32px", "visibility":"hidden"});
		
		$(".with-subnav h2").each(function(i) {
		
			$(this).before("<a class=\"anchor\" id=\"nav"+i+"\" href=\"#\"></a>");
			
			if (i !== 0) {
			
				$(this).before("<small><a href=\"#page-top\">Back to top</a></small>");
				
			}
			
			nav += "<li><a href=\"#nav"+i+"\">" + $(this).html() + "</a></li>";
			
		}); // end each
		
		nav += "</ul>";
		
		$(".with-subnav").prepend(nav);
		$(".anchor").css({"display":"block", "position":"relative", "top":"32px", "visibility":"hidden"});
		
	} // end getSubnav
	
	/* IMAGE ZOOM FUNCTION
    -----------------------------------------------------------------*/
	function getImgZoom() {
	
		var native_width = 0;
		var native_height = 0;
		
		$(".with-zoom").each(function(i) {
		
			$(this).attr("id","wiz"+i);
			$("#wiz"+i).css("width",$("#wiz"+i+" .small").width()+"px");
			$("#wiz"+i+" .magnify").css({"background-image":"url("+$("#wiz"+i+" .small").attr("src")+")", "background-repeat":"no-repeat"});
			
			// on mouse movement state
			$("#wiz"+i).mousemove(function(e) {
		
				if (!native_width && !native_height) {
			
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
			
			}); // end mouse movement state
			
		}); // end each loop
		
	}
	
	/* READ MORE FUNCTION
    -----------------------------------------------------------------*/
    function getReadMore() {
    
        var h = "250px";
    
        $(".with-readmore").each(function(i) {
        
            $(this).attr("id","more"+i);
            $("#more"+i).attr("data-height",$("#more"+i).height());
            $("#more"+i).append("<div class=\"readmore-ctrl\"><a href=\"javascript:void(0)\">READ MORE...</a></div>").css({"height":h,"overflow":"hidden"});
            
            // on mouse click state
            $("#more"+i + " .readmore-ctrl a").on("click", function() {
                
                var rmID = "#more"+i;
                var rmHeight = Number($(rmID).attr("data-height")) + Number($(rmID + " .readmore-ctrl").height()) + 10;
                
                if ($("#more"+i + " .readmore-ctrl").hasClass("opened")) {
                    
                    $(rmID).animate({
                    
                        height: h
                        
                    }, "slow", "linear", function() {
                    
                        $(rmID + " .readmore-ctrl").removeClass("opened");
                        $(rmID + " .readmore-ctrl a").html("READ MORE...");
                        
                    });
                    
                } else {
                    
                    $(rmID).animate({
                    
                        height: rmHeight+"px"
                        
                    }, "slow", "linear", function() {
                    
                        $(rmID + " .readmore-ctrl").addClass("opened");
                        $(rmID + " .readmore-ctrl a").html("READ LESS");
                        
                    });
                    
                }
                
            }); // end click
            
        }); // end each
    
    } // end read more
    
	/* CALL CHECK COMPONENTS FUNCTION
    -----------------------------------------------------------------*/
	checkComponents();
	
});

/* KEYPRESS EASTER EGG
-----------------------------------------------------------------*/
$(document).on("keydown", function(e) {

    if (e.altKey && e.which === 78) {
        if (!$("body").hasClass("gnite")) {
            $("body").addClass("gnite");
        }
    }
    
    if (e.altKey && e.which === 77) {
        if ($("body").hasClass("gnite")) {
            $("body").removeClass("gnite");
        }
    }

});

/* MOUSE CLICK EASTER EGG
-----------------------------------------------------------------*/
$(document).ready(function() {
    $("span[class^='icon-'], span[class*=' icon-']").on("click", function() {
        $(this).css({color: getRandomColor()});
    });
    function getRandomColor() {
        var letters = "0123456789ABCDEF".split("");
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});

/* jshint ignore:start */
/* D2L ACTION BUTTON FUNCTIONS
-----------------------------------------------------------------*/
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

/* HELPER FUNCTIONS
-----------------------------------------------------------------*/
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

function calIframeHeight() {

	var pageContainer = $(document).find("div.page-container");
	var oriHeight = 0;
	
	pageContainer.children().each(function() {
	
		oriHeight += $(this).outerHeight(true);
		
	});
	
	oriHeight += $(document).find("footer").outerHeight(true);
	
	return oriHeight;
	
}
/* jshint ignore:end */