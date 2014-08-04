var anchors = [];

$(document).ready(function () {

    var aCount = 0;
    
    $("h1").each(function() {
        if ($(this).is("[id]")) {
            anchors[aCount] = this;
            aCount++;
        }
    });
    
    $(".guide_container .side_nav #primary li").on("click", function() {
    
        var i = $(".guide_container .side_nav #primary li").index(this);
        
        if ( !$(".guide_container .side_nav #primary li:eq("+i+") a").hasClass('active'))  {
            $(".guide_container .side_nav #primary li:eq("+i+") > ul").slideToggle();
        }
        
    });

});

$(document).scroll(function(){
    
    if ($(".side_nav").length) {
    
        var topPos = $(document).scrollTop();
        
        if (topPos >= $(".guide_container .side_nav").position().top) {
        
            $(".guide_container .side_nav").css({ "position":"fixed", "top":"0px" });
            $(".guide_container .guide_outlayer").css("margin-left","220px");
            
            if (topPos <= $(".guide_container .side_nav").position().top) {
            
                $(".guide_container .side_nav").css({ "position":"static", "top":"75px" });
                $(".guide_container .guide_outlayer").css("margin-left","0px");
            
            }
        
        }
    
        $.fn.setActive(topPos);
    
    }
    
});

$.fn.setActive = function(topPos) {

    var target = "";

    jQuery.each(anchors, function(i) {
    
        if (topPos >= ($(anchors[i]).position().top)) {
        
            if (topPos <= $(anchors[(i < anchors.length) ? ( (i === anchors.length-1) ? i : i+1 ) : anchors.length-1 ]).position().top) {
            
                target = $(anchors[i]).attr("id");
            
            } else if (topPos >= $(anchors[anchors.length-1]).position().top) {
            
                target = $(anchors[anchors.length-1]).attr("id");
            
            }
            
        }
    
    });

    if (target !== "") {
    
        $(".guide_container .side_nav #primary li > ul li a").each(function() {
    
            if ($(this).hasClass("active")) { $(this).removeClass("active"); }
    
        });
    
        $(".guide_container .side_nav #primary li > ul li a[data-link='"+target+"']").addClass("active");
    
    }

};