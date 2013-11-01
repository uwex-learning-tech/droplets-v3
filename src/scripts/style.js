/* global console */

$(document).ready(function() {
	
	
	/*
	TOOLTIP
	*/
	
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

	});
	
	$("abbr, .with-tooltip").on("mouseout", function() {
		$(this).attr("title",$(".tooltip.in .tooltip-inner").html()).css("position","static");
		$(".tooltip").remove();
	});
	
	/*
	POPOVER
	*/
	
	
/*
	$.fn.initPopover = function() {
		var popover = $("span.with-popover");
		var total = popover.length;
		var index = popover.index(this);
		
		popover.each(function(i) {
			$(this).addClass(""+i+"");
			$(this).on("click",showPopover);
		});
		
	}
*/
	
/*
	function showPopover() {
		var index = $("span.with-popover").index(this);
		var title = $(this).attr("data-title"),
			position = $(this).position();
			
		
		
	}
*/
	
	//$("span.with-popover").initPopover();
	
	/*
$(".with-popover").on("click", function() {
	
		var title = $(this).attr("data-title"),
			position = $(this).position();
			
		var index = $("span.with-popover").index(this);
		
		if ($(".popover."+index).is(":visible")) {
			$(this).css("position","static");
			$(".popover."+index).remove();
		} else {
		
			$(this).css("position","relative");
		
			if ($(this).hasClass("top")) {
			
				$(this).before("<div class=\"popover " + index + " in top\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover").css({"top":(position.top -$(".popover").height() - 15)+"px", "left":position.left+"px"});
				
			} else if ($(this).hasClass("bottom")) {
			
				$(this).after("<div class=\"popover " + index + " in bottom\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover").css({"top":(position.top + 18)+"px", "left":position.left+"px"});
				
			} else if ($(this).hasClass("right")) {
			
				$(this).before("<div class=\"popover " + index + " in right\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover").css({"top":(position.top - ($(this).height() + ($(this).height() / 2)))+"px", "left":(position.left + $(this).width() + 3)+"px"});
				
			} else if ($(this).hasClass("left")) {
			
				$(this).before("<div class=\"popover " + index + " in left\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover").css({"top":(position.top - ($(this).height() + ($(this).height() / 2)))+"px", "left":(position.left - $(".popover").width() - 5)+"px"});
				
			} else {
			
				$(this).before("<div class=\"popover " + index + " in\"><div class=\"popover-content\">"+title+"</div><div class=\"arrow\"></div></div>");
				$(".popover").css({"top":(position.top - 28)+"px", "left":position.left+"px"});
			}
		
			
		}
				
		
		
		
		console.log(index);

	});
*/
	
});