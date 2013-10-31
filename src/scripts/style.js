/* global console */

$(document).ready(function() {
	
	$("abbr, .with-tooltip").on("mouseover", function() {
	
		var title = $(this).attr("title"), position = $(this).position();
		
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
	
});