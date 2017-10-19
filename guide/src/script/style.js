/*
 * DROPLET Framework jQuery Core Script
 *
 * @version: 1.4.7
 * @author: Ethan Lin
 * @url: https://github.com/oel-mediateam/idstyleguide
 * Released date: 09/18/2017
 *
 * @license: The MIT License (MIT)
 * Copyright (c) 2013-2017 UWEX CEOEL Media Services
 *
 */

$(document).ready(function() {

	var iframe = null;

	// calendar inital varibles
	var displayAll = false;
    var savedMonth = 0;

	// if it is in a iFrame
	if ( parent === top ) {
        
        // find D2L's iFrame
		iframe = $( parent.document ).find( "div#ContentView" ).find( "iframe" );
		
		// if no D2L's iFrame is found, set to whatever iFrame is there
		if ( iframe.length <= 0 ){
    		iframe = $( parent.document ).find( "iframe" );
		}
		
		// set iFrame attributes
		iframe.attr( {
    		"scrolling": "no",
    		"allowfullscreen": "",
    		"webkitallowfullscreen": "",
    		"mozallowfullscreen": ""

		} );
		
		// set the height of the iframe using inline CSS
        setIframeHeight( iframe );
		
		// when resizing insiding an iFrame
		$( top ).on("resize", function(){
    		
        	if ( parent === top ) {
            	
            	// update the iFrame height
            	setIframeHeight( iframe );
            	
            	// if this is any active popover elements
            	// reposition them by triggering their click event
            	if ( $( ".with-popover.active" ).length ) {
                	$( ".with-popover.active" ).trigger( 'click', "reposition" );
            	}
            	
        	}
    	
	    });

	}
	
	/* CALL CHECK COMPONENTS FUNCTION
    -----------------------------------------------------------------*/
	checkComponents();
	
	/* FUNCTION TO CHECK JS COMPONENTS AND INITIATE WHEN FOUND
    -----------------------------------------------------------------*/
	function checkComponents() {
        
        var expandable = false;
        
		if ( $( "abbr" ).length || $( ".with-tooltip" ).length ) {
			getTooltip();
		}

		if ( $( ".with-popover" ).length ) {
			getPopover();
		}

		if ( $( ".with-tabs" ).length ) {
    		expandable = true;
			getTabs();
		}

		if ( $( ".with-accordion" ).length ) {
    		expandable = true;
			getAccordion();
		}

		if ( $( ".with-subnav" ).length ) {
			getSubnav();
		}

		if ( $( ".with-zoom" ).length ) {
			getImgZoom();
		}

		if ( $( ".with-readmore" ).length ) {
    		expandable = true;
			getReadMore();
		}
		
		if ( $( ".with-reveal" ).length ) {
    		expandable = true;
			getReveal();
		}
		
		if ( $( ".with-learning-resources" ).length ) {
    		expandable = true;
			getLearningResources();
		}

		if ( expandable && iframe ) {
			setIframeHeight( iframe );
		}

	} // end checkComponents

	/* TOOLTIP FUNCTION
    -----------------------------------------------------------------*/
	function getTooltip() {

		// on mouse hover state
		$( "abbr, .with-tooltip" ).on( "mouseover", function() {

			var title = $( this ).attr( "title" );
			var position = $( this ).position();
			var x = 0;
			var y = 0;
			var arrowPos;
			
			// remove the content inside title attribute
			// and set the element to relative position
			$( this ).attr( "title", "" ).css( "position", "relative" );
            
            // display the tooltip
            $( this ).before( "<div class=\"tooltip in\" role=\"tooltip\"><div class=\"tooltip-inner\">" + title + "</div><div class=\"tooltip-arrow\"></div></div>" );
            
			// calculate positions
			if ( $( this ).hasClass( "top" ) ) {
                
                arrowPos = "top";
                x = position.top - $( ".tooltip" ).outerHeight() - 2;
                y = position.left;

			} else if ( $( this ).hasClass( "bottom" ) ) {
                
                arrowPos = "bottom";
                x = position.bottom + $( ".tooltip" ).outerHeight();
                y = position.left;

			} else if ( $( this ).hasClass( "right" ) ) {
                
                arrowPos = "right";
                x = position.top;
                y = position.left + $( this ).width();

			} else if ( $( this ).hasClass( "left" ) ) {
                
                arrowPos = "left";
                x = position.top;
                y = position.left - $( ".tooltip" ).width() - 8;

			} else {
                
                arrowPos = "top";
                x = position.top - $( ".tooltip" ).outerHeight();
                y = position.left;
                
			}
            
            // display the tooltip
            $( ".tooltip" ).addClass( arrowPos );
            
            // position the tooltip
            if ( arrowPos === "bottom" ) {
                $( ".tooltip" ).css( "bottom", x + "px" );
            } else {
                $( ".tooltip" ).css( "top", x + "px" );
            }
            
            $( ".tooltip" ).css( "left", y + "px" );
            
			// on mouse out event
			$( "abbr, .with-tooltip" ).on( "mouseout", function() {

				$( this ).attr( "title", $( ".tooltip.in .tooltip-inner" ).html() )
				         .css("position","static");
				$( ".tooltip" ).remove();

			} ); // end mouse out state

		} ); // end mouse hover state

	} // end getTooltip

	/* POPOVER FUNCTION
    -----------------------------------------------------------------*/
	function getPopover() {

		// set positions
		$( ".with-popover" ).each( function() {

			var title = $( this ).attr( "data-title" );
			var position = 'top';

			if ( $( this ).hasClass( "top" ) ) {

				position = 'top';

			} else if ( $( this ).hasClass( "bottom" ) ) {

				position = 'bottom';

			} else if ( $( this ).hasClass( "right" ) ) {

				position = 'right';

			} else if ( $( this ).hasClass( "left" ) ) {

				position = 'left';

			}
			
			$( "body" ).append( "<div class=\"popover " + position + "\" role=\"tooltip\"><div class=\"popover-content\">" + title + "</div><div class=\"arrow\"></div></div>" );

		}); // end each looop

		// on mouse click state
		$( ".with-popover" ).on( "click", function( e ) {

			var index = $( ".with-popover" ).index(this);
			var target = $( e.currentTarget );
			var popover = $( ".popover:eq(" + index + ")" );
			var position = target.position();
			var top = position.top;
			var left = position.left;
            
            if ( target.hasClass( "top" ) ) {
                
                top = top - popover.height() - 10;
                
            } else if ( target.hasClass( "bottom" ) ) {
                
                top = top + target.height() + 7;
                
            } else if ( target.hasClass( "left" ) ) {
                
                if (target.is("img")) {
                    
                    top = top + ( target.height() / 2 ) - ( popover.height() / 2 );
                    left = left - popover.width();
                    
                } else {
                    
                    top = top - ( target.height() / 2 ) - 2;
                    left = left - popover.width() - 2;
                    
                }
                
            } else if ( target.hasClass( "right" ) ) {
                
                if ( target.is( "img" ) ) {
                    
                    top = top + ( target.height() / 2 ) - ( popover.height() / 2 );
                    left = left + target.width() + 15;  
                    
                } else {
                    
                    top = top - ( target.height() / 2 ) - 2;
                    left = left + target.width() + 7;
                      
                }
                          
            }
            
			if ( e.isTrigger === undefined ) {
    			
    			if ( $( this ).hasClass( "active" ) ) {

    				$( this ).removeClass( "active" );
    				popover.removeClass( "in" ).css({
        				'top':'',
        				'left': ''
    				});
    
    			} else {
    
    				$( this ).addClass( "active" );
    				popover.addClass( "in" ).css( {
        				'top': top,
        				'left': left
    				} );
    
    			}
    			
			} else {
    			
    			popover.css( {
    				'top': top,
    				'left': left
				} );
    			
			}

		}); // end mouse click state

	} // end getPopover
    
	/* TABS FUNCTION
    -----------------------------------------------------------------*/
	function getTabs() {

		$( ".with-tabs" ).each( function( i ) {

			$( this ).attr( "data-id", i );

			$( ".with-tabs .tab-contents section" ).not( ".two-column > section, .three-column > section" ).addClass( "tab-section" );

			// on mouse click state
			$( ".with-tabs[data-id='" + i + "'] .tabs li" ).on( "click", function() {

				var index = $( ".with-tabs[data-id='" + i + "'] .tabs li" ).not( "li ul li" ).index( this );

				// close all open tabs
				$( ".with-tabs[data-id='" + i + "'] .tabs li" ).each( function() {

					if ( $( ".with-tabs[data-id='" + i + "'] .tabs li" ).hasClass( "active" ) ) {

						$( this ).removeClass( "active" );

					}

				});

				// set currently click tab active
				$( this ).addClass( "active" );

				// hide all tab contents
				$( ".with-tabs[data-id='" + i + "'] .tab-contents section.tab-section" ).each( function() {

					if ( $( ".with-tabs[data-id='" + i + "'] .tab-contents section.tab-section" ).hasClass( "active" )) {

						$( this ).removeClass( "active" );

					}

				});

				// display currently click tab contents
				$( ".with-tabs[data-id='" + i + "'] .tab-contents section.tab-section:eq(" + index + ")" ).addClass( "active" );

                // set height if it is in a iFrame
				if ( iframe ) {
					setIframeHeight( iframe );
				}

				return false;

			}); // end click

			// if it is a calendar
            if ( $( this ).hasClass( "calendar" ) ) {

                getCalendar( i );

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

        calendar.append("<div class=\"calendar_view_controls\"><a class=\"grid-view active\"href=\"#\" title=\"Grid View\" role=\"button\" aria-controls=\"grid view\"><span class=\"sg-icon-grid\"></span></a><a class=\"list-view\"href=\"#\" title=\"List View\" role=\"button\" aria-controls=\"List View\"><span class=\"sg-icon-list\"></span></a><a class=\"toggle-displayall\"href=\"#\" title=\"Display All\" role=\"button\" aria-controls=\"display all\"><span class=\"sg-icon-show-all\"></span></a></div>");
        calendar.append("<div class=\"tab-contents\"></div>");
        calendar.after("<div class=\"clearfix\"></div>");
        tabContent = $(currentCalendar + " .tab-contents");

        // loop trough each month
        months.each(function(i) {

            var year = $(this).attr("data-year") === undefined || $.trim($(this).attr("data-year")) === "" ? currentYear : Number($(this).attr("data-year"));
            var month = Number($(this).attr("data-month"));
            var daysInMonth = new Date(year, month, 0).getDate();
            var dayInWeek = new Date(year, month - 1, 1).getDay();
            var weeksInMonth = Math.ceil((daysInMonth + dayInWeek) / 7);
            var count = 0;
            var grid = "<div class=\"row heading\"><div class=\"grid\">Sunday</div><div class=\"grid\">Monday</div><div class=\"grid\">Tuesday</div><div class=\"grid\">Wednesday</div><div class=\"grid\">Thursday</div><div class=\"grid\">Friday</div><div class=\"grid\">Saturday</div></div>";

            $(this).prepend("<a href=\"#sr-" + monthName[month - 1]  + "\" role=\"tab\" aria-controls=\"" + monthName[month - 1] + " " + year + "\">" + monthName[month - 1] + " " + year + "</a>");

            // create the grid
            for (var r = 0; r < weeksInMonth; r++) {

                grid += "<div class=\"row\">";

                for (var c = 0; c < 7; c++) {

                    grid += "<div class=\"grid\"></div>";

                }

                grid += "</div><div class=\"detailed-view\" data-row=\"" + r + "\"><span class=\"close-btn\" title=\"close\" data-row=\"" + r + "\"><span class=\"sg-icon-close\"></span></span><h3></h3><span class=\"desc\"></span></div>";

            }

            tabContent.append( "<section id=\"sr-" + monthName[month - 1] + "\" data-month=\"" + month + "\" role=\"tabpanel\"><h2>" + monthName[month - 1] + " " + year + "</h2><div class=\"calendar-grid\" role=\"presentation\">" + grid + "</div><div class=\"calendar-list-view\"></div></section>" );

            // nested loop to populate the weeks (rows) and days (columns)
            for (var w = 1; w <= weeksInMonth; w++) {

                for (var d = 0; d < 7; d++) {

                    if (count < daysInMonth) {

                        if (w === 1) {

                            if (d >= dayInWeek) {

                                count++;
                                $(currentCalendar + " .calendar-grid:eq(" + i + ") .row:eq(" + w + ") .grid:eq(" + d + ")").append( "<span class=\"day\">" + count + "</span>" + getAgenda(currentCalendar, month, count, true) );

                                if ( $(currentCalendar + " .tabs li[data-month=\""+month+"\"] ul").length === 0 ) {
                                    $(currentCalendar + " .calendar-list-view:eq(" + i + ")").html( "<p>No agendas for this month!</p>" );
                                } else {
                                    $(currentCalendar + " .calendar-list-view:eq(" + i + ")").append( getAgenda(currentCalendar, month, count) );
                                }



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

            // at the end of the last loop, determine which calendar to display on load
            if (i === months.length - 1) {

                var calYear = $(currentCalendar + " .tabs li[data-month=" + (currentMonth + 1) + "]").attr("data-year");
                calYear = calYear === undefined || calYear === "" ? currentYear : calYear;

                if (calYear === currentYear && $(currentCalendar + " .tabs li[data-month=" + (currentMonth + 1) + "]").length) {

                    $(currentCalendar + " .tabs li[data-month=" + (currentMonth + 1) + "]").addClass("active");
                    $(currentCalendar + " .tab-contents section[data-month=" + (currentMonth + 1) + "]").addClass("active");

                    $($(currentCalendar + " .tab-contents section[data-month=" + (currentMonth + 1) + "] .calendar-grid .row .grid").not(".row.heading .grid").not(".grid.noday").get(currentDate - 1)).addClass("current");

                } else {
                    $(currentCalendar + " .tabs li:first-child").addClass("active");
                    $(currentCalendar + " .tab-contents section:first-child").addClass("active");
                }

            }

        }); // end months loop

        // tab mouse click
		$(currentCalendar + " .tabs li").not("li ul li").on("click",function() {

            var month = Number($(this).attr("data-month"));

			if ($(currentCalendar + " .toggle-displayall").hasClass("active")) {

    			toggleCalendarDisplayAll(currentCalendar, month);

			} else {

                getSelectedMonthCalendar(currentCalendar, month);

			}

			$(currentCalendar + " .detailed-view").hide();
            $(currentCalendar + " .grid").removeClass("arrow");

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

            // switch button state
            $(currentCalendar + " .grid-view").removeClass("active");
            $(this).addClass("active");

            if ( iframe ) {
				setIframeHeight( iframe );
			}

            return false;

        });

        // grid view listening event
        $(currentCalendar + " .grid-view").on("click", function() {

            $(currentCalendar + " .tab-contents h2").removeClass("list-view");
            $(currentCalendar + " .calendar-list-view").hide();
            $(currentCalendar + " .calendar-grid").show();

            // switch button state
            $(currentCalendar + " .list-view").removeClass("active");
            $(this).addClass("active");

            if ( iframe ) {
				setIframeHeight( iframe );
			}

            return false;

        });

        // listen to item click event
        $(currentCalendar + " .item").on("click", {obj: this, target: currentCalendar}, openDetails);

        // listen to item close event
        $(currentCalendar + " .close-btn").on("click", function() {

            var row = $(this).attr("data-row");

            $(currentCalendar + " .detailed-view[data-row="+row+"]").slideUp("slow", function() {

                $(this).prev().find(".grid.arrow").removeClass("arrow");
                $(this).removeClass().addClass("detailed-view");
                $(this).find("h3").html("");
                $(this).find("span.info").html("");
                $(this).prev().find(".item").attr("data-open", "");

                if ( iframe ) {
    				setIframeHeight( iframe );
    			}

            });

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

            var cat = "";

            $(calendar + " .tabs li[data-month=\""+month+"\"] .days li[data-day=\"" + day + "\"]").each(function() {
                var title = $(this).find("span.title").text();
                var info = $(this).find("span.desc").html();
                cat = $(this).find("span.title").attr("data-cat");
                agenda += "<span class=\"item " + cat + "\" title=\"" + title + "\" data-id=\"" + day + "\" data-desc=\"" + escapeHtml(info) + "\">" + shorten(title) + "</span>";

            });

        } else {

            $(calendar + " .tabs li[data-month=\""+month+"\"] .days li[data-day=" + day + "]").each(function(i) {

                if (firstLoop) {
                    agenda += "<div" + today + "><p><em>" + monthName[month-1] + " " + day + "</em></p>";
                    agenda += "<p><strong>" + $(this).find("span.title").html() + "</strong><br />" + $(this).find("span.desc").html() + "</p>";
                    firstLoop = false;
                } else {
                    agenda += "<p><strong>" + $(this).find("span.title").html() + "</strong><br />" + $(this).find("span.desc").html() + "</p>";
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

            $(calendar + " .tab-contents").before("<p class=\"cal-msg\"><small><strong>Notes:</strong> to view each agenda details in the calendar, please exit the \"Display All\" view.</small></p>");

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

            $(calendar + " .item").off("click");
            $(calendar + " .item").css("cursor","default");

            displayAll = true;

        } else {

            $(".cal-msg").remove();

            getSelectedMonthCalendar(calendar, month);

            $(calendar + " .item").on("click", {target: calendar}, openDetails);
            $(calendar + " .item").css("cursor","pointer");

            displayAll = false;

        }

        $(calendar + " .detailed-view").hide();
        $(calendar + " .grid").removeClass("arrow");
        $(calendar + " .toggle-displayall").toggleClass("active");

        if ( iframe ) {
			setIframeHeight( iframe );
		}

		return false;

    }

    function getSelectedMonthCalendar(calendar, month) {

        $(calendar + " .tabs li").each(function() {
                $(this).removeClass("active");
        });

        $(calendar + " .tab-contents section").each(function() {
            $(this).removeClass("active");
        });

        $(calendar + " .tabs li[data-month=" + month + "]").addClass("active");
        $(calendar + " .tab-contents section[data-month=" + month + "]").addClass("active");

    }

    function openDetails(event) {

        var title = $(event.currentTarget).attr("title");
        var info = $(event.currentTarget).attr("data-desc");
        var cat = $(event.currentTarget).attr("class").split(" ")[1];
        var index = $(event.currentTarget).parent().parent().index(".row:visible") - 1;

        if ($(event.currentTarget).attr("data-open") === "true" ) {

            $(event.data.target + " .detailed-view[data-row="+index+"]").slideUp(function() {
                $(event.currentTarget).parent().parent().find(".arrow").removeClass("arrow");
                $(event.data.target + " .detailed-view[data-row="+index+"] h3").html("");
                $(event.data.target + " .detailed-view[data-row="+index+"] .desc").html("");
                
                if ( iframe ) {
        			setIframeHeight( iframe );
        		}
        		
            });
            
            $(event.currentTarget).attr("data-open", "");

        } else {

            $(event.currentTarget).parent().parent().find(".arrow").removeClass("arrow");
            $(event.currentTarget).parent().addClass("arrow");

            $(event.data.target + " .detailed-view[data-row="+index+"]").removeClass().addClass("detailed-view " + cat);
            $(event.data.target + " .detailed-view[data-row="+index+"] h3").html(title);
            $(event.data.target + " .detailed-view[data-row="+index+"] .desc").html(info);
            $(event.data.target + " .detailed-view[data-row="+index+"]").slideDown( function() {

            if ( iframe ) {
				setIframeHeight( iframe );
			}

            });
            $(event.data.target + " .detailed-view[data-row="+index+"]").prev().find(".item").attr("data-open", "");
            $(event.currentTarget).attr("data-open", "true");

        }

    }

    function escapeHtml(string) {
        if (string === undefined || string === "") {
            return "";
        }
        var escaped = string.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
        return escaped;
     }

	/* ACCORDION FUNCTION
    -----------------------------------------------------------------*/
	function getAccordion() {

		$(".with-accordion").each(function(i) {

			$(this).attr("id","ai"+i);

			// set open and close all buttons
			$("#ai"+i).prepend("<div class=\"accordion-controls\"><a class=\"closeAll\" href=\"javascript:void(0)\" role=\"button\" aria-controls=\"close all\">Close All</a> <a class=\"openAll\" href=\"javascript:void(0)\" role=\"button\" aria-controls=\"open all\">Open All</a></div>");

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
							$("#ai"+i+" > .accordion-title:eq("+k+")").attr("aria-expanded", "false");

							if ( iframe ) {
                				setIframeHeight( iframe );
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
							$("#ai"+i+" > .accordion-title:eq("+j+")").attr("aria-expanded", "true");

							if ( iframe ) {
                				setIframeHeight( iframe );
                			}

						});

					}

				});

			}); // end openAll

			// set initial state
			$("#ai"+i+" .accordion-title").each(function(m) {

				if ($(this).hasClass("active")) {

                    $("#ai"+i+" > .accordion-title:eq("+m+")").attr("aria-expanded", "true");
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
								$("#ai"+i+" > .accordion-title:eq("+index+")").attr("aria-expanded", "false");
								$("#ai"+i+" > .accordion-content:eq("+index+")").slideDown();

							});

						} else {

							if (n === index) {

								$("#ai"+i+" > .accordion-title:eq("+index+")").addClass("active");
								$("#ai"+i+" > .accordion-title:eq("+index+")").attr("aria-expanded", "true");
								$("#ai"+i+" > .accordion-content:eq("+index+")").slideDown( function() {

    								if ( iframe ) {
                    					setIframeHeight( iframe, true );
                    				}

								});

							}

						}

					}); // end each

				} else {

					$("#ai"+i+" > .accordion-content:eq("+index+")").slideUp("fast", function() {

						$("#ai"+i+" > .accordion-title:eq("+index+")").removeClass("active");
						$("#ai"+i+" > .accordion-title:eq("+index+")").attr("aria-expanded", "false");

						if ( iframe ) {
        					setIframeHeight( iframe, true );
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

		var nav = "<nav role=\"secondary\"><ul class=\"page-subnav\">";

		$("header").before("<a class=\"anchorTop\" id=\"page-top\" href=\"#\"></a>");
		$(".anchorTop").css({"display":"block", "position":"relative", "top":"-32px", "visibility":"hidden"});

		$(".with-subnav h2").each(function(i) {

			$(this).before("<a class=\"anchor\" id=\"nav"+i+"\" href=\"#\"></a>");

			if (i !== 0) {

				$(this).before("<small><a href=\"#page-top\">Back to top</a></small>");

			}

			nav += "<li role=\"presentation\"><a href=\"#nav"+i+"\">" + $(this).html() + "</a></li>";

		}); // end each

		nav += "</ul></nav>";

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
            $("#more"+i).append("<div class=\"readmore-ctrl\"><a href=\"javascript:void(0)\" role=\"button\" aria-controls=\"click to read more\" aria-expanded=\"false\">+ read more +</a></div>").css({"height":h,"overflow":"hidden"});

            // on mouse click state
            $("#more"+i + " .readmore-ctrl a").on("click", function() {

                var rmID = "#more"+i;
                var rmHeight = Number($(rmID).attr("data-height")) + Number($(rmID + " .readmore-ctrl").height() + 10);

                if ($("#more"+i + " .readmore-ctrl").hasClass("opened")) {

                    $(rmID).animate({

                        height: h

                    }, "fast", "linear", function() {

                        $(rmID + " .readmore-ctrl").removeClass("opened");
                        $(rmID + " .readmore-ctrl a").html("+ read more +");
                        $(rmID + " .readmore-ctrl a").attr("aria-expanded","false");
                        
                        if ( iframe ) {
        					setIframeHeight( iframe );
        				}

                    });

                } else {

                    $(rmID).animate({

                        height: rmHeight + "px"

                    }, "fast", "linear", function() {

                        $(rmID + " .readmore-ctrl").addClass("opened");
                        $(rmID + " .readmore-ctrl a").html("- read less -");
                        $(rmID + " .readmore-ctrl a").attr("aria-expanded","true");
                        
                        if ( iframe ) {
        					setIframeHeight( iframe );
        				}

                    });

                }

            }); // end click

        }); // end each

    } // end read more
    
    /* REVEAL FUNCTION
    -----------------------------------------------------------------*/
    function getReveal() {
        
        var reveal = $(".with-reveal");
        
        reveal.each( function(i) {
            
            var id = "with-reveal-" + (i + 1);
            $(this).attr("id", id);
            
            var btnName = $(this).data("button-name");
            $(this).append("<button class='btn info small' aria-hidden='true'>" + btnName + "</button>");
            
            var button = $( $(this).find("button") );
            
            button.on("click", handleRevealClick);
            
        } );
        
    }
    
    function handleRevealClick(e) {
        
        var currentTarget = $(e.currentTarget);
        var parent = currentTarget.parent();
        var hiddenEl = $( parent ).find(".hidden-content")[0];
        var btnName = $(parent).data("button-name")
        
        if ( $(hiddenEl).hasClass("show") ) {
            
            $(hiddenEl).hide("fast", function() {
                
                $(hiddenEl).removeClass("show");
                currentTarget.html(btnName);
                
                if ( iframe ) {
                    setIframeHeight( iframe );
                }
                
            });

        } else {
            
            $(hiddenEl).show("fast", function() {
                
                $(hiddenEl).addClass("show");
                currentTarget.html("Hide");
                
                if ( iframe ) {
                    setIframeHeight( iframe );
                }
                
            });
            
        }
        
    }
    
    
    /* LEARNING RESOURCES FUNCTION
    -----------------------------------------------------------------*/
    function getLearningResources() {

        var learningResources = $(".with-learning-resources");

        learningResources.each(function(i) {

            var resourcesObject = null;
            var idValue = 'with-learning-resources-' + (i + 1);

            $(this).attr('id', idValue);

            resourcesObject = $("#" + idValue).find(".resource");

            for (var j = 0; j < resourcesObject.length; j++) {

                var resources = [];
                var meta;
                var afterCover;

                resources[j] = resourcesObject[j];
                meta = $(resources[j]).find('.meta');
                afterCover = $(resources[j]).find('.cover-info');
                afterCover.after('<div class="arrow"><span class="indicator"></span></div>');

                if ( meta.find('li').length === 0 ) {
	                
	                meta.hide();
	                
                }
                
                $( resources[j] ).addLREevent( idValue, iframe );

            } // end for loop
            
        }); // end each loop

    } // end learning resources

});

// LEARNING RESOUCES CLICK EVENT
$.fn.addLREevent = function( id, frame ) {

    this.on("click", function() {
		
		var lr = this;
		var index = $(this).index( '.resource' );
		var expandedContent = $( this ).find('.expanded-info').html();
		
		if ( $( this ).hasClass('active') ) {
			
			$( this ).removeClass('active');
			$( this ).find('.indicator').removeClass('open');
			$( '.expanded-panel[data-index='+index+']' ).slideUp( function() {
    			
				$(this).remove();
				
				if ( frame ) {
                    setIframeHeight( frame );
                }
                
			} );
			
		} else {
			
			$( this ).addClass( 'active' );
			$( this ).find('.indicator').addClass('open');
			$( this ).after('<div class="expanded-panel" data-index="'+index+'"><span class="close-btn"><span class="sg-icon-close"></span></span>'+expandedContent+'</div>');
			$( '.expanded-panel[data-index='+index+']' ).slideDown( function() {
    			
    			if ( frame ) {
                    setIframeHeight( frame );
                }
                
                $( '.expanded-panel[data-index='+index+'] .close-btn' ).on( 'click', function() {
				
    				if ( $( lr ).hasClass('active') ) {
    			
        				$( lr ).removeClass('active');
        				$( lr ).find('.indicator').removeClass('open');
        				$( '.expanded-panel[data-index='+index+']' ).slideUp( function() {
            				
            				$(this).off('click');
        					$(this).remove();
        					
        					if ( frame ) {
                                setIframeHeight( frame );
                            }
        					
    				    } );
    				
        			}
    				
    			} );
    			
			} );
			
		}

    } );

};

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

function setIframeHeight( iframe, animate ) {
    
    animate = typeof animate != 'undefined' ? animate : false;
    
    if ( animate ) {
        
        iframe.animate( {
			height: calIframeHeight() + "px"
		}, "fast" );
        
    } else {
        iframe.css("height", calIframeHeight() + "px");
    }

}

function calIframeHeight() {
    return $(document).find("body").outerHeight(true);

}
/* jshint ignore:end */