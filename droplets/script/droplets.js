/**
 * DROPLETS
 *
 * @version: 2.0.0
 * @author: Ethan Lin
 * @url: https://github.com/oel-mediateam/droplets-for-canvas
 *
 * @license: The MIT License (MIT)
 * Copyright 2018 UWEX CEOEL Media
 *
 */

"use strict";

/**
 * On DOM ready, execute checkEnviroment function.
 * @param {checkEnviroment} fn - the callback to check the enviroment
 */
( function ready( fn ) {
    
    if ( document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading' ) {
        
        fn();
        
    } else {
        
        document.addEventListener( 'DOMContentLoaded', checkEnvironment);
        
    }
    
} )( checkEnvironment );

 /**
 * Check to see if Droplets JavaScript is loaded on a allowed domain. If yes,
 * execute the checkDropletsComponents function to check for any Droplet
 * JavaScript components are in use. If not, do nothing.
 * @function checkEnviroment
 * @callback checkEnviroment
 * @since 2.0.0
 */
function checkEnvironment() {
    
    if ( isOnAllowedDomains() ) {
            
        checkDropletsComponents();
        
    }
    
}

/**
 * Checking the DOM to see if any Droplets components are used. If yes,
 * execute the function to set up the component. If not, ignore.
 * @function checkDropletsComponents
 * @since 2.0.0
 */
function checkDropletsComponents() {
    
    var pageContainerId = '#uws-droplets-page';
    var toolTipSelector = document.querySelectorAll( pageContainerId + ' .droplets-tooltip' );
    var popoverSelector = document.querySelectorAll( pageContainerId + ' .droplets-popover' );
    var tabsSelector = document.querySelectorAll( pageContainerId + ' .droplets-tabs' );
    var accordionsSelector = document.querySelectorAll( pageContainerId + ' .droplets-accordion' );
    var resourcesSelector = document.querySelectorAll( pageContainerId + ' .droplets-resources' );
    var readMoreSelector = document.querySelectorAll( pageContainerId + ' .droplets-readmore' );
    
    if ( toolTipSelector.length ) {
        enableToolTips( toolTipSelector );
    }
    
    if ( popoverSelector.length ) {
        enablePopovers( popoverSelector );
    }
	
    if ( tabsSelector.length ) {
        enableTabs( tabsSelector );
    }
    
    if ( accordionsSelector.length ) {
        enableAccordions( accordionsSelector );
    }
    
    if ( resourcesSelector.length ) {
        enableResources( resourcesSelector );
    }
    
    if ( readMoreSelector.length ) {
        enableReadMore( readMoreSelector );
    }
    
}

/**
 * Enable all tool tip elements.
 * @function enableToolTips
 * @param {Object[]} toolTips - Collection of tool tip elements.
 * @since 2.0.0
 */
function enableToolTips( toolTips ) {
    
    // loop through each tool tip elements to add mouse enter and leave
    // event listener to each tool tip element
    Array.prototype.forEach.call( toolTips, function( el ) {
        
        el.addEventListener( 'mouseenter', function() {
            
            var tip = this.getAttribute( 'title' );
            var position = {
                left: this.offsetLeft,
                top: this.offsetTop,
                bottom: this.offsetTop - this.offsetHeight
            };
            var x = 0, y = 0;
            
            // create an attribute to hold the original tip
            el.setAttribute( 'data-tip', tip );
            
            // reset tip variable to data-tip attribute value
            tip = el.getAttribute( 'data-tip' );
            
            // create tool tip container with classes
            var toolTipNode = document.createElement( 'div' );
            
            toolTipNode.classList.add( 'tooltip' );
            
            var toolTipInnerNode = document.createElement( 'div' );
            
            toolTipInnerNode.classList.add( 'tooltip-inner' );
            toolTipInnerNode.innerHTML = tip;
            
            toolTipNode.appendChild( toolTipInnerNode );
            
            // add the tool tip container to the DOM
            this.insertBefore( toolTipNode, this.firstChild );
			
            // determine tooltip display positions
            if ( this.classList.contains( 'top' ) ) {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            } else if ( this.classList.contains( 'bottom' ) ) {
                x = position.top + toolTipNode.offsetHeight - 5;
                y = position.left;
            } else if ( this.classList.contains( "right" ) ) {
                x = position.top;
                y = position.left + this.offsetWidth + 5;
            } else if ( this.classList.contains( "left" ) ) {
                x = position.top;
                y = position.left - toolTipNode.offsetWidth - 5;
            } else {
                x = position.top - toolTipNode.offsetHeight - 2;
                y = position.left;
            }
			
            // set tool tip position
            toolTipNode.style.top = x + 'px';
            toolTipNode.style.left = y + 'px';
            
            // remove title attribute
            this.removeAttribute( 'title' );
            
            // add mouse leave event to remove the tool tip container from DOM
            this.addEventListener( "mouseleave", function() {
            
                if ( toolTipNode.parentNode !== null ) {
                    toolTipNode.parentNode.removeChild(toolTipNode);
                }
                
                // add title attribute back
                this.setAttribute( 'title', tip );
            
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all popover elements.
 * @function enablePopovers
 * @param {Object[]} popovers - Collection of pop over elements.
 * @since 2.0.0
 */
function enablePopovers( popovers ) {
    
    // loop through each popovers
    Array.prototype.forEach.call( popovers, function( el ) {
        
        var title = el.getAttribute( 'title' );
        
        // create data-title to hold the original title attribute value
        el.setAttribute( 'data-title', title );
        
        // reset the title variable to data-title instead
        title = el.getAttribute( 'data-title' );
        
        // create the popover container
        var popoverDiv = document.createElement( 'div' );
                
        popoverDiv.classList.add( 'popover' );
        popoverDiv.setAttribute( 'role', 'tooltip' );
        
        var popoverContentDiv = document.createElement( 'div' );
        
        popoverContentDiv.classList.add( 'popover-content' );
        popoverContentDiv.innerHTML = title;
        
        popoverDiv.appendChild( popoverContentDiv );
        
        // add the popover container to the DOM
        el.insertBefore( popoverDiv, el.firstChild );
        
        // add the click event listener
        el.addEventListener( 'click', function() {
            
            // if visible
            if ( this.querySelectorAll( '.popover' )[0].style.display === 'block' ) {
                
                // hide
                this.querySelectorAll( '.popover' )[0].style.display = 'none';
                this.classList.remove( 'active' );
                
            } else {
                
                // else show
                this.classList.add( 'active' );
                popoverDiv.style.display = 'block';
                
                // and determine popover positions
                var x = 0, y = 0;
                var horzCenter = this.offsetWidth - ( ( popoverDiv.offsetWidth + this.offsetWidth ) / 2 );
                var vertzCenter = this.offsetHeight - ( ( popoverDiv.offsetHeight + this.offsetHeight ) / 2 );
                
                if ( this.classList.contains( 'top' ) ) {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( 'bottom' ) ) {
                    
                    popoverDiv.classList.add( 'bottom' );
                    x = this.offsetHeight + 10;
                    y = horzCenter;
                    
                } else if ( this.classList.contains( "right" ) ) {
                    
                    popoverDiv.classList.add( 'right' );
                    x = vertzCenter;
                    y = this.offsetWidth + 10;
                    
                } else if ( this.classList.contains( "left" ) ) {
                    
                    popoverDiv.classList.add( 'left' );
                    x = vertzCenter;
                    y = ( popoverDiv.offsetWidth + 10 ) * -1;
                    
                } else {
                    
                    popoverDiv.classList.add( 'top' );
                    x = ( popoverDiv.offsetHeight + 10 ) * -1;
                    y = horzCenter;
                    
                }
                
                // position the popover on the DOM
                popoverDiv.style.top = x + 'px';
                popoverDiv.style.left = y + 'px';
                
            }
            
        } );
        
        // add mouse enter event to remove the title attribute
        // to prevent default tooltip behavior and add back in on mouse leave
        el.addEventListener( 'mouseenter', function() {
            
            this.removeAttribute( 'title' );
            
            this.addEventListener( 'mouseleave', function() {
            
                this.setAttribute( 'title', title );
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all tab elements.
 * @function enableTabs
 * @param {Object[]} tabs - Collection of tab elements.
 * @since 2.0.0
 */
function enableTabs( tabs ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( tabs, function( tabWrapper ) {
        
        // set each tab element's tabs and sections
        var tabBtns = tabWrapper.querySelectorAll( '.tabs li' );
        var tabSections = tabWrapper.querySelectorAll( '.tab-contents .tab-section' );
        
        // for each tab of current tab element iternation
        Array.prototype.forEach.call( tabBtns, function( tab, i ) {
            
            // add event listener to each tab
            tab.addEventListener( 'click', function( evt ) {
                
                // remove active class from all tab
                // and hide tab sections
                Array.prototype.forEach.call( tabBtns, function( el, i ) {
                    
                    el.classList.remove( 'active' );
                    el.children[0].setAttribute( 'aria-selected', 'false');
                    tabSections[i].classList.remove( 'active' );
                    
                });
                
                // add active class to current clicked tab
                // and display corresponding tab section
                this.classList.add( 'active' );
                this.children[0].setAttribute( 'aria-selected', 'true');
                tabSections[i].classList.add( 'active' );
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        });
        
    } );
    
}

/**
 * Enable all accordion elements.
 * @function enableAccordions
 * @param {Object[]} accordions - Collection of accordion elements.
 * @since 2.0.0
 */
function enableAccordions( accordions ) {
    
    // loop through collection of tab elements
    Array.prototype.forEach.call( accordions, function( accordionWrapper ) {
        
        // query the accordion title banners
        var titleBanners = accordionWrapper.querySelectorAll( '.accordion-title' );
        
        // create the accordion controls for each accordion
        var accordionControlsWrapper = document.createElement( 'div' );
        accordionControlsWrapper.classList.add( 'accordion-controls' );
        
        var closeBtn = document.createElement( 'a' );
        closeBtn.classList.add( 'closeAll' );
        closeBtn.setAttribute( 'role', 'button' );
        closeBtn.setAttribute( 'aria-control', 'close all' );
        closeBtn.innerHTML = 'Close All';
        closeBtn.href = 'javascript:void(0)';
        
        var openBtn = document.createElement( 'a' );
        openBtn.classList.add( 'openAll' );
        openBtn.setAttribute( 'role', 'button' );
        openBtn.setAttribute( 'aria-control', 'open all' );
        openBtn.innerHTML = 'Open All';
        openBtn.href = 'javascript:void(0)';
        
        accordionControlsWrapper.appendChild( closeBtn );
        accordionControlsWrapper.appendChild( openBtn );
        
        // add the accordion controls to the DOM
        accordionWrapper.insertBefore( accordionControlsWrapper, accordionWrapper.firstChild );
        
        // add event listener to the close all control
        closeBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                closeAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // add event listener to open all control
        openBtn.addEventListener( 'click', function( evt ) {
            
            Array.prototype.forEach.call( titleBanners, function( banner ) {
                openAccordionItem( banner );
            } );
            
            // prevent default event action
            evt.preventDefault();
            
        } );
        
        // loop through each title banner
        Array.prototype.forEach.call( titleBanners, function( banner ) {
            
            // if it contains active class, display the accordion content
            if ( banner.classList.contains( 'active' ) ) {
                openAccordionItem( banner );
            }
            
            // add event listener to each title banner
            banner.addEventListener( 'click', function( evt ) {
                
                // if current target is open, close it
                if ( this.classList.contains( 'active' ) ) {
                    closeAccordionItem( this );
                } else {
                    
                    // close all of the accordion
                    Array.prototype.forEach.call( titleBanners, function( el ) {
                        closeAccordionItem( el );
                    } );
                    
                    // open the current target
                    openAccordionItem( this );
                    
                }
                
                // prevent default event action
                evt.preventDefault();
                
            } );
            
        } );
        
    } );
    
}

/**
 * Close accordion item.
 * @function closeAccordionItem
 * @param {Object} el - element to be hidden.
 * @since 2.0.0
 */
function closeAccordionItem( el ) {
    
    if ( el.classList.contains( 'active' ) ) {
                            
        el.nextElementSibling.style.display = 'none';
        el.setAttribute( 'aria-expanded', 'false' );
        el.classList.remove( 'active' );
        
    }
    
}

/**
 * Open accordion item.
 * @function openAccordionItem
 * @param {Object} el - element to be displayed.
 * @since 2.0.0
 */
function openAccordionItem( el ) {
    
    el.setAttribute( 'aria-expanded', 'true' );
    el.classList.add( 'active' );
    el.nextElementSibling.style.display = 'block';
    
}

/**
 * Enable all resource elements.
 * @function enableResources
 * @param {Object[]} resources - Collection of resource elements.
 * @since 2.0.0
 */
function enableResources( resources ) {
    
    // loop through collection of resource elements
    Array.prototype.forEach.call( resources, function( resourcesWrapper ) {
        
        // get the resource class selector
        var resourceItems = resourcesWrapper.querySelectorAll( '.resource' );
        
        // loop through each resouces
        Array.prototype.forEach.call( resourceItems, function( resource ) {
            
            // get the cover info selector
            var coverEl = resource.querySelectorAll( '.cover-info' );
            
            // loop through the cover info of each resource
            // There is only 1 element in the array (NodeList) because there is
            // only 1 cover info per resource
            Array.prototype.forEach.call( coverEl, function( el ) {
                
                // create arrow element
                var arrow = document.createElement( 'div' );
                arrow.classList.add( 'arrow' );
                
                // add the arrow next to the cover info
                el.parentNode.insertBefore( arrow, el.nextSibling );
                
                // add event listener to the arrow to toggle the resource
                arrow.addEventListener( 'click', function() {
                    
                    if ( this.parentNode.classList.contains( 'expanded' ) ) {
                        
                        this.parentNode.classList.remove( 'expanded' );
                        
                    } else {
                        
                        this.parentNode.classList.add( 'expanded' );
                        
                    }
                    
                } );
                
            } );
            
        } );
        
    } );
    
}

/**
 * Enable all read more elements.
 * @function enableReadMore
 * @param {Object[]} readMore - Collection of read more elements.
 * @since 2.0.0
 */
function enableReadMore( readMore ) {
    
    // loop through collection of read more elements
    Array.prototype.forEach.call( readMore, function( el ) {
        
        // create the read more control
        var readMoreCntrl = document.createElement( 'div' );
        
        readMoreCntrl.classList.add( 'readmore-cntrl' );
        readMoreCntrl.setAttribute( 'role', 'button');
        readMoreCntrl.setAttribute( 'aria-controls', 'click to read more' );
        readMoreCntrl.setAttribute( 'aria-expanded', 'false' );
        
        // add the read more control to the DOM
        el.appendChild( readMoreCntrl );
        
        // on click event lisitener
        readMoreCntrl.addEventListener( 'click', function() {
            
            if ( this.classList.contains( 'opened' ) ) {
                
                this.classList.remove( 'opened' );
                this.setAttribute( 'aria-expanded', 'false' );
                
                el.style.height = null;
                el.style.overflow = 'hidden';
                
            } else {
                
                var expandedHeight = el.scrollHeight + 'px';
                
                this.classList.add( 'opened' );
                this.setAttribute( 'aria-expanded', 'true' );
                
                el.style.height = expandedHeight;
                el.style.overflow = 'unset';
                
            }
            
        } );
        
    } );
    
}

/**
 * Check to see if JavaScript is loaded on one of the allowed domain or in the
 * intended enviroment. Droplets is being used outside of Canvas. So, we want
 * to make sure it will still work for users on "non-Canvas" environment.
 * @function isOnAllowedDomains
 * @since 2.0.0
 * @return {boolean} true if matched, else false
 */
function isOnAllowedDomains() {
    
    // set arrary of allowed domains
    var allowedDomains = [ 
        'localhost/', 
        'media.uwex.edu/',
        '.instructure.com/',
        'laethanlin.local:'
    ];
    var found = false;
    
    // loop through the allowedDomains array
    Array.prototype.forEach.call( allowedDomains, function( el ) {
        
        // use the current domain string to create regular expression object
        var regex = new RegExp( el );
        
        // if it matched with DOM/Window URL
        if ( location.href.match( regex ) ) {
            
            // if the domain is Canvas
            if ( el === '.instructure.com\/' ) {
                
                // check to see if it is on a course content page
                found = onCanvasContentPage( /\/pages/ );
                
                // exit the loop
                return;
                
            }
            
            // set found to true and exit the loop
            found = true;
            return;
            
        }
        
    } )
    
    return found;
    
}

/**
 * Check to see if the page is a content page on Canvas
 * @function onCanvasContentPage
 * @param {Object} regex - a regular expression object.
 * @since 2.0.0
 * @return {boolean} true if matched, else false
 */
function onCanvasContentPage( regex ) {
    
    if ( location.pathname.match( regex ) ) {
        
        return true;
        
    }
    
    return false;
    
}