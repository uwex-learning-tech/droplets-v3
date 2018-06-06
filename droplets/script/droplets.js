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
    
    // set initial page container x and y as data- attributes
    var page = document.getElementById( 'uws-droplets-page' );
    var pageBounding = page.getBoundingClientRect();
    
    page.setAttribute( 'data-x', pageBounding.x );
    page.setAttribute( 'data-y', pageBounding.y );
    
    // component elements
    var prefix = '#uws-droplets-page .droplets-';
    var toolTipSelector = document.querySelectorAll( prefix + 'tooltip' );
    var popoverSelector = document.querySelectorAll( prefix + 'popover' );
    var tabsSelector = document.querySelectorAll( prefix + 'tabs' );
    var accordionsSelector = document.querySelectorAll( prefix + 'accordion' );
    var resourcesSelector = document.querySelectorAll( prefix + 'resources' );
    var readMoreSelector = document.querySelectorAll( prefix + 'readmore' );
    var revealSelector = document.querySelectorAll( prefix + 'reveal' );
    var imgZoomSelector = document.querySelectorAll( prefix + 'image-zoom' );
    var lighboxSelector = document.querySelectorAll( prefix + 'lightbox' );
    
    // check for components
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
    
    if ( revealSelector.length ) {
        enableReveal( revealSelector );
    }
    
    if ( imgZoomSelector.length ) {
        enableImgZoom( imgZoomSelector );
    }
    
    if ( lighboxSelector.length ) {
        enableLightbox( lighboxSelector );
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
        
        var title = '';
        
        // if data-title attribute is specified
        if ( el.getAttribute( 'data-title' ) !== null ) {
            
            // set the title to data-title value
            title = el.getAttribute( 'data-title' );
            
        } else {
            
            // set title to the title attribute
            title = el.getAttribute( 'title' )
            
            // create data-title to hold the original title attribute value
            el.setAttribute( 'data-title', title );
            
            // reset the title variable to data-title instead
            title = el.getAttribute( 'data-title' );
            
        }
        
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
            if ( this.querySelector( '.popover' ).style.display === 'block' ) {
                
                // hide
                this.querySelector( '.popover' ).style.display = 'none';
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
 * Enable all reveal elements.
 * @function enableReveal
 * @param {Object[]} reveals - Collection of reveal elements.
 * @since 2.0.0
 */
function enableReveal( reveals ) {
    
    // loop through collection of reveal elements
    Array.prototype.forEach.call( reveals, function( el ) {
        
        // create a toggle button
        var toggleBtn = document.createElement( 'a' );
        
        toggleBtn.classList.add( 'btn', 'success', 'small' );
        toggleBtn.setAttribute( 'aria-hidden', 'true' );
        toggleBtn.innerHTML = el.getAttribute( 'data-button-name' );
        
        // add the toggle button to the DOM
        el.appendChild(toggleBtn);
        
        // show/hide hidden content on click
        toggleBtn.addEventListener( 'click', function() {
            
            var hiddenContent = el.querySelectorAll( '.hidden-content' )[0];
            
            if ( hiddenContent.style.display !== 'unset' ) {
                
                hiddenContent.style.display = 'unset';
            
                this.classList.remove( 'success' );
                this.innerHTML = 'Hide';
                
            } else {
                
                hiddenContent.style.display = 'none';
            
                this.classList.add( 'success' );
                this.innerHTML = el.getAttribute( 'data-button-name' );
                
            }
            
        } );
        
    } );
    
}

/**
 * Enable all image zoom elements.
 * @function enableImgZoom
 * @param {Object[]} imgZooms - Collection of image zoom elements.
 * @since 2.0.0
 */
function enableImgZoom( imgZooms ) {
    
    // loop through collection of image zoom elements
    Array.prototype.forEach.call( imgZooms, function( el ) {
        
        // get sibiling image src
        var img = el.querySelector( 'img' );
        
        // create magnified container
        var magnifyDiv = document.createElement( 'div' );
        
        magnifyDiv.classList.add( 'magnify' );
        magnifyDiv.style.backgroundImage = 'url(\"' + img.src + '\")';
        
        // add the magnify div to the DOM
        el.appendChild( magnifyDiv );
        
        // show manified version on mousemove over image
        el.addEventListener( 'mousemove', function( evt ) {
            
            // get and set native width and height as data- attributes
            var imgObj = new Image();
            imgObj.src = img.src;
            
            img.setAttribute( 'data-width', imgObj.width );
            img.setAttribute( 'data-height', imgObj.height );
            
            var nativeWidth = img.getAttribute( 'data-width' );
            var nativeHeight = img.getAttribute( 'data-height' );
            
            // get positions
            var page = document.getElementById( 'uws-droplets-page' );
            var pageX = Number( page.getAttribute( 'data-x' ) );
            var pageY = Number( page.getAttribute( 'data-y' ) );
            var magnifyX = evt.pageX - pageX - this.offsetLeft;
            var magnifyY = evt.pageY - pageY - this.offsetTop;

            // show / hide magnified image
            if ( magnifyX < this.offsetWidth && magnifyY < this.offsetHeight 
                 && magnifyX > 0 && magnifyY > 0 ) {
                 
                magnifyDiv.classList.add( 'show' );
                 
                var rx = Math.round( magnifyX / img.offsetWidth * nativeWidth - magnifyDiv.offsetWidth / 2 ) * -1;
                var ry = Math.round( magnifyY / img.offsetHeight * nativeHeight - magnifyDiv.offsetHeight / 2 ) * -1;
                
                magnifyDiv.style.left = ( magnifyX - magnifyDiv.offsetWidth / 2 ) + 'px';
                magnifyDiv.style.top = ( magnifyY - magnifyDiv.offsetHeight / 2 ) + 'px';
                
                magnifyDiv.style.backgroundPosition = rx + "px " + ry + "px";
                 
            } else {
                
                magnifyDiv.classList.remove( 'show' );
                
            }
            
        } );
        
    } );
    
}

/**
 * Enable all lightbox elements.
 * @function enableLightbox
 * @param {Object[]} lightboxes - Collection of lightbox elements.
 * @since 2.0.0
 */
function enableLightbox( lightboxes ) {
    
    // get page element
    var page = document.getElementById( 'uws-droplets-page' );
    
    // create overlay element and its controls
    var overlayDiv = document.createElement( 'div' );
    
    overlayDiv.classList.add( 'droplets-lightbox-overlay' );
    overlayDiv.setAttribute( 'aria-hidden', 'true' );
    
    var contentDiv = document.createElement( 'div' );
    
    contentDiv.classList.add( 'overlay-content' );
    
    var closeOverlayBtn = document.createElement( 'a' );
    
    closeOverlayBtn.classList.add( 'overlay-close-btn' );
    closeOverlayBtn.setAttribute( 'role', 'button' );
    
    // create left and right arrows
    var leftArrow = document.createElement( 'a' );
    
    leftArrow.classList.add( 'overlay-left-arrow' );
    leftArrow.setAttribute( 'role', 'button' );
    
    var rightArrow = document.createElement( 'a' );
    
    rightArrow.classList.add( 'overlay-right-arrow' );
    rightArrow.setAttribute( 'role', 'button' );
    
    // add them all to the overlay div
    overlayDiv.appendChild( leftArrow );
    overlayDiv.appendChild( rightArrow );
    overlayDiv.appendChild( closeOverlayBtn );
    overlayDiv.appendChild( contentDiv );
    
    // add overlay element to DOM
    page.appendChild( overlayDiv );
    
    // event listeners to close overlay
    overlayDiv.addEventListener( 'click', function( evt ) {
                
        if ( evt.target === this ) {
            
            if ( overlayDiv.classList.contains( 'show-overlay' ) ) {
            
                overlayDiv.classList.remove( 'show-overlay' );
                
            } 
            
        }
        
    } );
    
    closeOverlayBtn.addEventListener( 'click', function() {
                
        if ( overlayDiv.classList.contains( 'show-overlay' ) ) {
            
            overlayDiv.classList.remove( 'show-overlay' );
            
        } 
        
    } );
    
    // loop through collection of image zoom elements to show the selected image
    Array.prototype.forEach.call( lightboxes, function( lightbox ) {
        
        var imgFigSelector = lightbox.querySelectorAll( 'img, figure' );
        
        // check to see if there is mixed of img and figure
        // if true, show error and exit main loop
        if ( isImgFigCombo( imgFigSelector ) ) {
            
            var err = document.createElement( 'div' );
            err.classList.add( 'callout', 'danger', 'lightbox-error' );
            
            var msg = document.createElement( 'p' );
            msg.innerHTML = '<strong>Error:</strong> Do not mix img and figure tags.';
            
            err.appendChild( msg );
            lightbox.appendChild( err );
            
            return;
            
        }
        
        // determind which element is used
        var imgSelector = lightbox.querySelectorAll( 'img' );
        var figSelector = lightbox.querySelectorAll( 'figure' );
        var targetSelector = figSelector;
        
        if ( figSelector.length === 0 ) {
            targetSelector = imgSelector;
        }
        
        // loop throug the elements to add event listeners
        Array.prototype.forEach.call( targetSelector, function( img, index ) {
            
            var currentIndex = 0;
            
            img.addEventListener( 'click', function( evt ) {
                
                // add event listener to left and right button if more than 1
                if ( targetSelector.length > 1 ) {
                    
                    rightArrow.style.display = 'inherit';
                    
                    rightArrow.addEventListener( 'click', function ( evt ) {
                        
                        currentIndex++;
                        
                        if ( currentIndex > targetSelector.length - 1 ) {
                            
                            currentIndex = 0;
                            
                        }
                        
                        selectImage( targetSelector[currentIndex], contentDiv );
                        evt.preventDefault();
                        
                    } );
                    
                    leftArrow.style.display = 'inherit';
                    
                    leftArrow.addEventListener( 'click', function ( evt ) {
                        
                        currentIndex--;
                        
                        if ( currentIndex < 0 ) {
                            
                            currentIndex = targetSelector.length - 1;
                            
                        }
                        
                        selectImage( targetSelector[currentIndex], contentDiv );
                        
                        evt.preventDefault();
                        
                    } );
                    
                } else {
                    
                    rightArrow.style.display = 'none';
                    rightArrow.removeEventListener( 'click', function() {} );
                    
                    leftArrow.style.display = 'none';
                    leftArrow.removeEventListener( 'click', function() {} );
                    
                }
                
                selectImage( img, contentDiv )
                overlayDiv.classList.add( 'show-overlay' );
                currentIndex = index;
                evt.preventDefault();
                
            } );
            
        } );
        
    } );
    
}

/**
 * Check to see if the lightbox is mixed of img and figure tag
 * @function isImgFigCombo
 * @param {Object[]} selectiors - Collection of img or figure elements.
 * @since 2.0.0
 */
function isImgFigCombo( selectors ) {
    
    var img = 0;
    var fig = 0;
    
    Array.prototype.forEach.call( selectors, function( el ) {
        
        if ( el.nodeName === 'IMG' ) {
            
            img++;
            
        } else if ( el.nodeName === 'FIGURE' ) {
            
            fig++;
            
        }
            
    } );
    
    if ( img >= 1 && fig >= 1 && img > fig ) {
        return true;
    }
    
    return false;
    
}

/**
 * Select and display the full lightbox image
 * @function selectImage
 * @param {Object} img - img or figure element.
 * @param {Object} img - container to append img element.
 * @since 2.0.0
 */
function selectImage( img, contentDiv ) {
    
    contentDiv.innerHTML = '';
                
    var fullImg = document.createElement( 'img' );
    var caption = document.createElement( 'p' );
    
    if ( img.nodeName === "IMG" ) {
        
        fullImg.src = img.src;
    
        caption.classList.add( 'caption' );
        caption.innerHTML = img.getAttribute( 'alt' );
        
    } else if ( img.nodeName === "FIGURE" ) {
        
        var innerImg = img.querySelector( 'img' );
        var figcaption = img.querySelector( 'figcaption' );
        
        fullImg.src = innerImg.src;
    
        caption.classList.add( 'caption' );

        if ( figcaption ) {
            
            caption.innerHTML = figcaption.innerHTML;
            
        } else {
            
            caption.innerHTML = innerImg.getAttribute( 'alt' );
            
        }
        
    }

    contentDiv.appendChild( fullImg );
    contentDiv.appendChild( caption );
    
}

/* --------------------------- HELPER FUNCTIONS ----------------------------- */

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
                
                var page = document.getElementById( 'uws-droplets-page' );
                
                // add canvas-net no matter if it is found or not also as
                // it is in Canvas
                page.classList.add( 'canvas-net' );
                
                // check to see if it is on a course content page
                found = onCanvasContentPage( /\/pages/ );
                
                // add no-js class to page container if not content page
                if ( found === false ) {
                    
                    page.classList.add( 'no-js' );
                    
                }
                                
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