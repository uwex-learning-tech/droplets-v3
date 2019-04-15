// resouce https://forums.adobe.com/thread/1193750

function canAcceptCommand() {
    return true;
}

function commandButtons() {
    return new Array( 'Yes!', 'clean()', 'Cancel', 'window.close()' );
}

function clean() {
    
    var log = document.getElementById( 'log' );
    var clicks = 0;
    
    // remove title tag content
    
    log.innerHTML = '<li>Removing title tag content... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="title" qconvertednls="true"></qtag></find><replace action="removeTagAndContents" param1="" param2=""/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // find the CSS link href and update it to the latest
    
    log.innerHTML += '<li>Updating Droplets CSS link... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="link" qconvertednls="true"><qattribute qname="href" qcompare="=" qvalue="([\\S])*(content\/support\/css\/style.css)"></qattribute></qtag></find><replace action="setAttribute" param1="href" param2="https://media.uwex.edu/app/droplets/css/droplets.css"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // find the Flexible Option CSS link href and remove
    
    log.innerHTML += '<li>Removing Flexible Options CSS link... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="link" qconvertednls="true"><qattribute qname="href" qcompare="=" qvalue="([\\S])*(content\/support\/fonts\/flexicon.css)"></qattribute></qtag></find><replace action="removeTagAndContents" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // find the script src and update it to the latest
    
    log.innerHTML += '<li>Updating Droplets JavaScript source... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="script" qconvertednls="true"><qattribute qname="src" qcompare="=" qvalue="([\\S])*(content\\/support\\/scripts\\/style.js)"></qattribute></qtag></find><replace action="setAttribute" param1="src" param2="https://media.uwex.edu/app/droplets/script/droplets.js" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // find and remove comments
    
    log.innerHTML += '<li>Removing HTML comments... ';
    
    dreamweaver.setUpFindReplace( {  
        searchString: "(<!--)([\\s\\S]*?)(-->)",  
        replaceString: "",  
        searchWhat: "site",  
        searchSource: true,
        useRegularExpressions: true
    } );  
    
    dreamweaver.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // steps to find and update page container div and add id
    
    log.innerHTML += '<li>Updating page container... adding ID... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="page-container"></qattribute></qtag></find><replace action="setAttribute" param1="id" param2="uws-droplets-page"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'removing class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="page-container"></qattribute></qtag></find><replace action="removeAttribute" param1="class" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // steps to replace page header to section header
    
    log.innerHTML += '<li>Updating page header... adding class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="header" qconvertednls="true"><qtag qname="h1"></qtag></qtag></find><replace action="setAttribute" param1="class" param2="section-header"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing h1 to h2... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="h1" qconvertednls="true"><qtag qname="header" qinside="true"></qtag></qtag></find><replace action="changeTag" param1="h2" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing header to div... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="header" qconvertednls="true"> <qattributeqname="class" qcompare="=" qvalue="section-header"></qattribute></qtag></find><replace action="changeTag" param1="div" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // find and remove footer
    
    log.innerHTML += '<li>Removing footer... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="footer" qconvertednls="true"><qtag qname="p"></qtag></qtag></find><replace action="removeTagAndContents" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // find and remove hr tag with class
    
    log.innerHTML += '<li>Removing class on hr tag... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="hr" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="wide"></qattribute></qtag></find><replace action="removeAttribute" param1="class" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // steps to find and replace blockquote small tag
    
    log.innerHTML += '<li>Updating small tag in blockquote... adding class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="small" qconvertednls="true"><qtag qname="blockquote" qinside="true"></qtag></qtag></find><replace action="setAttribute" param1="class" param2="author"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'change small to p... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="small" qconvertednls="true"><qtag qname="blockquote" qinside="true"></qtag></qtag></find><replace action="changeTag" param1="p" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // steps find and replace blockquote quote class to with-quote-mark
    
    log.innerHTML += '<li>Updating blockquote quote mark class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="blockquote" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="quote"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="with-quote-mark"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'checking all varitites... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="blockquote" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="((pull-right)\\s)*(quote)(\\s(pull-right))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="with-quote-mark pull-right"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';

     // find and replace two-/three- columns with columns
    
    log.innerHTML += '<li>Updating two-/three-columns... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*((two|three)(-column))(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="columns"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing section tag to div... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="section" qconvertednls="true"><qtag qname="div" qinside="true"><qattribute qname="class" qcompare="=" qvalue="columns"></qattribute></qtag></qtag></find><replace action="changeTag" param1="div" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
	
	log.innerHTML += 'done!</li>';
	
	// find and replace aside tag in columns
	
	log.innerHTML += '<li>Updating aside tag in column... adding wider class to first div... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="" qnegate="true"></qattribute><qtag qname="div" qinside="true"><qattribute qname="class" qcompare="=" qvalue="columns"></qattribute><qtag qname="aside"></qtag></qtag></qtag></find><replace action="setAttribute" param1="class" param2="wider"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
	
	log.innerHTML += 'adding aside class to aside tag... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="aside"></qtag></find><replace action="setAttribute" param1="class" param2="aside"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'change aside tag to div tag... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="aside" qconvertednls="true"></qtag></find><replace action="changeTag" param1="div" param2="aside"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Steps to update tables
    
    log.innerHTML += '<li>Updating tables... changing no-bordered class to no-border... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="table" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(no-bordered)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="no-border"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing horz-left to left... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="td" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(horz-left)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="left"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing horz-center to center... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="td" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(horz-center)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="center"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing horz-right to right... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="td" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(horz-right)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="right"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing neutral class to gray on table row... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="tr" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(neutral)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="gray"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing neutral class to gray on table cell... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="td" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(neutral)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="gray"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and remove external-link icons
    log.innerHTML += '<li>Removing external link icons...';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="span" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(icon-external-link)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="removeTagAndContents" param1="" param2=""/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and replace image/figure
    
    log.innerHTML += '<li>Updating image / figure... removing polariod class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="figure" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(polaroid)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="removeAttribute" param1="class" /></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    

    // Find and replace tooltip
    log.innerHTML += '<li>Updating tooltip... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="[any tag]" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-tooltip)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-tooltip"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';

    
    // Find and replace popover
    log.innerHTML += '<li>Updating popover... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="[any tag]" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-popover)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-popover"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
   // Find and replace accordions
    log.innerHTML += '<li>Updating accordions... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-accordion)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-accordion"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and replace tabs
    log.innerHTML += '<li>Updating tabs... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-tabs)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-tabs"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'adding tab-section class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="section" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="active"></qattribute><qtag qname="div" qinside="true" qnegate="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*((two|three)(-column))(\\s([\\s\\S]*))*"></qattribute><qtag qname="div" qinside="true"><qattribute qname="class" qcompare="=" qvalue="tab-contents"></qattribute></qtag></qtag></qtag></find><replace action="setAttribute" param1="class" param2="tab-section active"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="section" qconvertednls="true"><qattribute qname="class" qcompare="" qvalue="" qnegate="true"></qattribute><qtag qname="div" qinside="true" qnegate="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*((two|three)(-column))(\\s([\\s\\S]*))*"></qattribute><qtag qname="div" qinside="true"><qattribute qname="class" qcompare="=" qvalue="tab-contents"></qattribute></qtag></qtag></qtag></find><replace action="setAttribute" param1="class" param2="tab-section"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing section tag to div... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="section" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="tab-section( active)*"></qattribute></qtag></find><replace action="changeTag" param1="div" param2=""/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and replace read more
    log.innerHTML += '<li>Updating read more... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-readmore)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-readmore"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and replace reveal
    log.innerHTML += '<li>Updating reveal... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-reveal)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-reveal"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and replace image zoom
    log.innerHTML += '<li>Updating image zoom... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-zoom)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-image-zoom"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'removing div tag with magnify class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="magnify"></qattribute><qtag qname="div" qinside="true"><qattribute qname="class" qcompare="=" qvalue="droplets-image-zoom"></qattribute></qtag></qtag></find><replace action="stripTag" param1="" param2=""/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'removing img class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="img" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="magnify" qanyvalue="true"></qattribute><qtag qname="div" qinside="true"><qattribute qname="class" qcompare="=" qvalue="droplets-image-zoom"></qattribute></qtag></qtag></find><replace action="removeAttribute" param1="class" param2=""/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and replace lightbox
    log.innerHTML += '<li>Updating lightbox class... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-lightbox)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-lightbox"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'removing lightbox class from figure... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="figure" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="with-lightbox"></qattribute></qtag></find><replace action="removeAttribute" param1="class" param2=""/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'removing lightbox class from img... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="true" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="img" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="with-lightbox"></qattribute></qtag></find><replace action="removeAttribute" param1="class" param2=""/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done!</li>';
    
    // Find and update learning resources
    log.innerHTML += '<li>Updating learning resources... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="true" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="(([\\s\\S]*)\\s)*(with-learning-resources)(\\s([\\s\\S]*))*"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="droplets-resources"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'changing expanded-info class to expandable-panel... ';
    
    dreamweaver.setUpComplexFindReplace('<dwquery><queryparams matchcase="false" ignorewhitespace="false" useregexp="false" wholeword="false" textonly="false" /><find searchmode="site"><qtag qname="div" qconvertednls="true"><qattribute qname="class" qcompare="=" qvalue="expanded-info"></qattribute></qtag></find><replace action="setAttribute" param1="class" param2="expandable-panel"/></dwquery>');
    
    dw.replaceAll();
    clicks++;
    
    log.innerHTML += 'done! Double check that you are not mixing img and figure tags.</li>';
    
    // final message
    log.innerHTML += '<li>Done! ' + clicks + ' clicks.</li>';
    
}