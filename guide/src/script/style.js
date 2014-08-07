/* global calIframeHeight */

$(document).ready(function() {
	
	var child = false, iframe = null;
	
	// calendar inital varibles
	var displayAll = false;
    var savedMonth = 0;
	
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
				
				var index = $(".with-tabs[data-id='"+i+"'] .tabs li").not("li ul li").index(this);
				
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
			
			// if it is a calendar
            if ($(this).hasClass("calendar")) {
                
                getCalendar(i);
                
            }
						
		}); // end each loop
	
	} // end getTabs
	
	/* GET CALENDAR FUNCTION
    -----------------------------------------------------------------*/
    function getCalendar(index) {
    
        // variables
        var currentDate = new Date().getDate();
        var currentMonth = new Date().getMonth();
        var currentYear = new Date().getFullYear();
        var monthName = ["January", "February", "March", "April", "May", "June",
                         "July", "August", "September", "October", "November", "December"];
        
        // HTML elements variable
        var currentCalendar = ".with-tabs.calendar[data-id="+index+"]";
        var calendar = $(currentCalendar);
        var tabContent = "";
        var months = $(currentCalendar + " .tabs li").not("li ul li");
        var lastCat = "";
        
        calendar.append("<div class=\"calendar_view_controls\"><a class=\"grid-view active\"href=\"#\" title=\"Grid View\"><span class=\"sg-icon-grid\"></span></a><a class=\"list-view\"href=\"#\" title=\"List View\"><span class=\"sg-icon-list\"></span></a><a class=\"toggle-displayall\"href=\"#\" title=\"Display All\"><span class=\"sg-icon-show-all\"></span></a></div>");
        calendar.append("<div class=\"tab-contents\"></div>");
        calendar.after("<div class=\"clearfix\"></div>");
        tabContent = $(currentCalendar + " .tab-contents");
        
        // loop trough each month
        months.each(function(i) {
            
            var year = ($(this).attr("data-year") === undefined || $.trim($(this).attr("data-year")) === "") ? currentYear : Number($(this).attr("data-year"));
            var month = Number($(this).attr("data-month"));
            var daysInMonth = new Date(year, month, 0).getDate();
            var dayInWeek = new Date(year, month - 1, 1).getDay();
            var weeksInMonth = Math.ceil((daysInMonth + dayInWeek) / 7);
            var count = 0;
            var grid = "<div class=\"row heading\"><div class=\"grid\">Sunday</div><div class=\"grid\">Monday</div><div class=\"grid\">Tuesday</div><div class=\"grid\">Wednesday</div><div class=\"grid\">Thursday</div><div class=\"grid\">Friday</div><div class=\"grid\">Saturday</div></div>";
            
            $(this).prepend("<a href=\"#\">" + monthName[month - 1] + " " + year + "</a>");
            
            // create the grid
            for (var r = 0; r < weeksInMonth; r++) {
                
                grid += "<div class=\"row\">";
                
                for (var c = 0; c < 7; c++) {
                
                    grid += "<div class=\"grid\"></div>";
                    
                }
                
                grid += "</div><div class=\"detailed-view\" data-row=\"" + r + "\"><h3></h3><span class=\"info\"></span></div>";
                
            }
            
            tabContent.append( "<section data-month=\"" + month + "\"><h2>" + monthName[month - 1] + " " + year + "</h2><div class=\"calendar-grid\">" + grid + "</div><div class=\"calendar-list-view\"></div></section>" );
            
            // nested loop to populate the weeks (rows) and days (columns)
            for (var w = 1; w <= weeksInMonth; w++) {
                
                for (var d = 0; d < 7; d++) {
                    
                    if (count < daysInMonth) {
                        
                        if (w === 1) {
                            
                            if (d >= dayInWeek) {
                            
                                count++;
                                $(currentCalendar + " .calendar-grid:eq(" + i + ") .row:eq(" + w + ") .grid:eq(" + d + ")").append( "<span class=\"day\">" + count + "</span>" + getAgenda(currentCalendar, month, count, true) );
                                $(currentCalendar + " .calendar-list-view:eq(" + i + ")").append( getAgenda(currentCalendar, month, count) );
                                
                                
                            } else {
                            
                                $(currentCalendar + " .calendar-grid:eq(" + i + ") .row:eq(" + w + ") .grid:eq(" + d + ")").addClass("noday");
                                
                            }
                            
                        } else {
                            
                            count++;
                            
                            $(currentCalendar + " .calendar-grid:eq(" + i + ") .row:eq(" + w + ") .grid:eq(" + d + ")").append( "<span class=\"day\">" + count + "</span>" + getAgenda(currentCalendar, month, count, true) );
                            $(currentCalendar + " .calendar-list-view:eq(" + i + ")").append( getAgenda(currentCalendar, month, count, false) );
                            
                        }
                                                
                    } else {
                    
                        $(currentCalendar + " .calendar-grid:eq(" + i + ") .row:eq(" + w + ") .grid:eq(" + d + ")").addClass("noday");
                        
                    }
                    
                } // end days loop

            } // end weeks loop
            
            if (i === months.length - 1) {
                
                if (year === currentYear && $(currentCalendar + " .tabs li[data-month=" + (currentMonth + 1) + "]").length > 0) {
                    
                    $(currentCalendar + " .tabs li[data-month=" + (currentMonth + 1) + "]").addClass("active");
                    $(currentCalendar + " .tab-contents section[data-month=" + (currentMonth + 1) + "]").addClass("active");
                    
                    $($(currentCalendar + " .tab-contents section[data-month=" + (currentMonth + 1) + "] .calendar-grid .row .grid").not(".row.heading .grid").not(".grid.noday").get(currentDate - 1)).addClass("current");
                            
                    
                } else {
                
                    $(currentCalendar + " .tabs li:first-child").addClass("active");
                    $(currentCalendar + " .tab-contents section:first-child").addClass("active");
                    
                }
            }
            
        }); // end months loop
        
        calendar.append("<div class=\"legends\"><p>Legends:</p><ul><li class=\"discussion\">Discussion</li><li class=\"assignment\">Assignment</li><li class=\"quiz\">Quiz</li><li class=\"project\">Project</li><li class=\"exam\">Midterm/Final</li><li class=\"reading\">Readings</li><li class=\"open\">Lesson Opens</li><li class=\"close\">Lesson Closes</li></ul></div>");
        
        // tab mouse click
		$(currentCalendar + " .tabs li").not("li ul li").on("click",function() {
			
			if ($(currentCalendar + " .toggle-displayall").hasClass("active")) {
			    var month = Number($(this).attr("data-month"));
    			toggleCalendarDisplayAll(currentCalendar, month);
			}
			return false;
			
		});
        
        // toggle display all
        $(currentCalendar + " .toggle-displayall").on("click", function() {
            
            toggleCalendarDisplayAll(currentCalendar, savedMonth);
            return false;
            
        });
        
        // list view listening event 
        $(currentCalendar + " .list-view").on("click", function() {
            
            $(currentCalendar + " .calendar-grid").hide();
            $(currentCalendar + " .tab-contents h2").addClass("list-view");
            $(currentCalendar + " .calendar-list-view").show();
            $(currentCalendar + " .legends").hide();
            
            // switch button state
            $(currentCalendar + " .grid-view").removeClass("active");
            $(this).addClass("active");
            return false;
            
        });
        
        // grid view listening event
        $(currentCalendar + " .grid-view").on("click", function() {
            
            $(currentCalendar + " .tab-contents h2").removeClass("list-view");
            $(currentCalendar + " .calendar-list-view").hide();
            $(currentCalendar + " .calendar-grid").show();
            $(currentCalendar + " .legends").show();
            
            // switch button state
            $(currentCalendar + " .list-view").removeClass("active");
            $(this).addClass("active");
            return false;
            
        });
        
        $(currentCalendar + " .item").on("click", function() {
        
            var day = $(this).attr("data-id");
            var title = $(this).attr("title");
            var cat = $(this).attr("class").split(" ")[1];
            var index = $(this).parent().parent().index(".row:visible") - 1;
            var info = $(currentCalendar + " .tabs li:visible .days li[data-day=" + day + "] .info").html();

            $(".detailed-view[data-row="+index+"]").removeClass(lastCat).addClass(cat);
            $(".detailed-view[data-row="+index+"] h3").html(title);
            $(".detailed-view[data-row="+index+"] .info").html(info);
            $(".detailed-view[data-row="+index+"]").slideDown();
            lastCat = cat;
                
        });
        
    }
    
    function getAgenda(calendar, month, day, titleOnly) {
    
        var agenda = "";
        var monthName = ["January", "February", "March", "April", "May", "June",
                         "July", "August", "September", "October", "November", "December"];
        var currentDate = new Date().getDate();
        var currentMonth = new Date().getMonth() + 1;
        var firstLoop = true;
        var today = "";
        
        if (day === currentDate && month === currentMonth) {
            today = " class=\"current\"";
        }
        
        if (titleOnly) {
            
            var legend = "";
            
            $(calendar + " .tabs li[data-month=\""+month+"\"] .days li[data-day=\"" + day + "\"]").each(function() {
                var title = $(this).find("span.title").text();
                legend = $(this).find("span.title").attr("data-cat");
                agenda += "<span class=\"item " + legend + "\" title=\"" + title + "\" data-id=\"" + day + "\">" + shorten(title) + "</span>";
            
            });
            
        } else {
            
            $(calendar + " .tabs li[data-month=\""+month+"\"] .days li[data-day=" + day + "]").each(function(i) {
            
                if (firstLoop) {
                    agenda += "<div" + today + "><p><em>" + monthName[month-1] + " " + day + "</em></p>";
                    agenda += "<p><strong>" + $(this).find("span.title").html() + "</strong><br />" + $(this).find("span.info").html() + "</p>";
                    firstLoop = false;
                } else {
                    agenda += "<p><strong>" + $(this).find("span.title").html() + "</strong><br />" + $(this).find("span.info").html() + "</p>";
                }
            
                if (i === $(calendar + " .tabs li[data-month=\""+month+"\"] .days li[data-day=" + day + "]").length) {
                    agenda += "</div>";
                }
                
            });
            
        }
        
        return agenda;
        
    }
    
    function shorten(string) {
        
        if (string.length > 17) {
            var result = "";
            result = string.substring(0, 17) + "...";
            return result;
        }
        
        return string;
        
    }
    
    function toggleCalendarDisplayAll(calendar, month) {
    
        if (displayAll === false) {
                
            $(calendar + " .tab-contents section").each(function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
                $(this).toggleClass("active");
            });
        
            $(calendar + " .tabs li").not("li ul li").each(function() {
                if ($(this).hasClass("active")) {
                    savedMonth = Number($(this).attr("data-month"));
                    $(this).removeClass("active");
                }
                $(this).toggleClass("active");
            });
            
            displayAll = true;
            
        } else {
            
            $(calendar + " .tabs li").each(function() {
                $(this).removeClass("active");
            });
            
            $(calendar + " .tab-contents section").each(function() {
                $(this).removeClass("active");
            });
            
            $(calendar + " .tabs li[data-month=" + (month) + "]").addClass("active");
            $(calendar + " .tab-contents section[data-month=" + (month) + "]").addClass("active");
            
            displayAll = false;
            
        }
        
        $(calendar + " .toggle-displayall").toggleClass("active");
        
    }
	
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
            $("#more"+i).attr("data-height",$("#more"+i).innerHeight()+24);
            $("#more"+i).append("<div class=\"readmore-ctrl\"><a href=\"javascript:void(0)\">CLICK TO READ MORE...</a></div>").css({"height":h,"overflow":"hidden"});
            
            // on mouse click state
            $("#more"+i + " .readmore-ctrl a").on("click", function() {
                
                var rmID = "#more"+i;
                var rmHeight = Number($(rmID).attr("data-height")) + Number($(rmID + " .readmore-ctrl").height() + 10);
                
                if ($("#more"+i + " .readmore-ctrl").hasClass("opened")) {
                    
                    $(rmID).animate({
                    
                        height: h
                        
                    }, "slow", "linear", function() {
                    
                        $(rmID + " .readmore-ctrl").removeClass("opened");
                        $(rmID + " .readmore-ctrl a").html("CLICK TO READ MORE...");
                        
                    });
                    
                } else {
                    
                    $(rmID).animate({
                    
                        height: rmHeight + "px"
                        
                    }, "slow", "linear", function() {
                    
                        $(rmID + " .readmore-ctrl").addClass("opened");
                        $(rmID + " .readmore-ctrl a").html("CLICK TO READ LESS");
                        
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
    var clicks = Math.floor(Math.random() * 4 + 3);
    var clickCount = 0;
    $("span[class^='icon-'], span[class*=' icon-']").on("click", function() {
        clickCount++;
        if (clickCount >= clicks) {
            $(this).css({color: getRandomColor()});
        }
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