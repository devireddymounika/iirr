(function($) { // JavaScript should be compatible with other libraries than jQuery
    Drupal.behaviors.textResize = { // D7 "Changed Drupal.behaviors to objects having the methods "attach" and "detach"."
        attach: function(context) {
            // Which div or page element are we resizing?
            if (text_resize_scope) { // Admin-specified scope takes precedence.
                if ($('#' + text_resize_scope).length > 0) {
                    var element_to_resize = $('#' + text_resize_scope); // ID specified by admin
                } else if ($('.' + text_resize_scope).length > 0) {
                    var element_to_resize = $('.' + text_resize_scope); // CLASS specified by admin
                } else {
                    var element_to_resize = $(text_resize_scope); // It's just a tag specified by admin
                }
            } else { // Look for some default scopes that might exist.
                if ($('DIV.left-corner').length > 0) {
                    var element_to_resize = $('DIV.left-corner'); // Main body div for Garland
                } else if ($('#content-inner').length > 0) {
                    var element_to_resize = $('#content-inner'); // Main body div for Zen-based themes
                } else if ($('#squeeze > #content').length > 0) {
                    var element_to_resize = $('#squeeze > #content'); // Main body div for Zen Classic
                }
            }
            // Set the initial font size if necessary
            if ($.cookie('text_resize') != null) {
                element_to_resize.css('font-size', parseFloat($.cookie('text_resize')) + 'px');
            }
            if (text_resize_line_height_allow) {
                // Set the initial line height if necessary
                if ($.cookie('text_resize_line_height') != null) {
                    element_to_resize.css('line-height', parseFloat($.cookie('text_resize_line_height')) + 'px');
                }
            }
            // Changer links will change the text size when clicked
            $('a.changer').click(function() {
                // Set the current font size of the specified section as a variable
                var currentFontSize = parseFloat(element_to_resize.css('font-size'), 10);
                // Set the current line-height
                var current_line_height = parseFloat(element_to_resize.css('line-height'), 10);
                // javascript lets us choose which link was clicked, by ID
                if (this.id == 'text_resize_increase') {
                    //var new_font_size = currentFontSize * 1.2;
                    //if (text_resize_line_height_allow) { var new_line_height = current_line_height * 1.2; }
                    var new_font_size = currentFontSize + 1;
                    if (text_resize_line_height_allow) {
                        var new_line_height = current_line_height + 1;
                    }
                    // Allow resizing as long as font size doesn't go above text_resize_maximum.
                    if (new_font_size <= text_resize_maximum) {
                        $.cookie('text_resize', new_font_size, {
                            path: '/'
                        });
                        if (text_resize_line_height_allow) {
                            $.cookie('text_resize_line_height', new_line_height, {
                                path: '/'
                            });
                        }
                        var allow_change = true;
                    } else {
                        $.cookie('text_resize', text_resize_maximum, {
                            path: '/'
                        });
                        if (text_resize_line_height_allow) {
                            $.cookie('text_resize_line_height', text_resize_line_height_max, {
                                path: '/'
                            });
                        }
                        var reset_size_max = true;
                    }
                } else if (this.id == 'text_resize_decrease') {
                    //var new_font_size = currentFontSize / 1.2;
                    //if (text_resize_line_height_allow) { var new_line_height = current_line_height / 1.2; }
                    var new_font_size = currentFontSize - 1;
                    if (text_resize_line_height_allow) {
                        var new_line_height = current_line_height - 1;
                    }
                    if (new_font_size >= text_resize_minimum) {
                        // Allow resizing as long as font size doesn't go below text_resize_minimum.
                        $.cookie('text_resize', new_font_size, {
                            path: '/'
                        });
                        if (text_resize_line_height_allow) {
                            $.cookie('text_resize_line_height', new_line_height, {
                                path: '/'
                            });
                        }
                        var allow_change = true;
                    } else {
                        // If it goes below text_resize_minimum, just leave it at text_resize_minimum.
                        $.cookie('text_resize', text_resize_minimum, {
                            path: '/'
                        });
                        if (text_resize_line_height_allow) {
                            $.cookie('text_resize_line_height', text_resize_line_height_min, {
                                path: '/'
                            });
                        }
                        var reset_size_min = true;
                    }
                } else if (this.id == 'text_resize_reset') {
                    $.cookie('text_resize', null, {
                        path: '/'
                    });
                    if (text_resize_line_height_allow) {
                        $.cookie('text_resize_line_height', null, {
                            path: '/'
                        });
                    }
                    var reset_size_original = true;
                }
                // jQuery lets us set the font size value of the main text div
                if (allow_change == true) {
                    element_to_resize.css('font-size', new_font_size + 'px'); // Add 'px' onto the end, otherwise ems are used as units by default
                    if (text_resize_line_height_allow) {
                        element_to_resize.css('line-height', new_line_height + 'px');
                    }
                    return false;
                } else if (reset_size_min == true) {
                    element_to_resize.css('font-size', text_resize_minimum + 'px');
                    if (text_resize_line_height_allow) {
                        element_to_resize.css('line-height', text_resize_line_height_min + 'px');
                    }
                    return false;
                } else if (reset_size_max == true) {
                    element_to_resize.css('font-size', text_resize_maximum + 'px');
                    if (text_resize_line_height_allow) {
                        element_to_resize.css('line-height', text_resize_line_height_max + 'px');
                    }
                    return false;
                } else if (reset_size_original == true) {
                    element_to_resize.css('font-size', '');
                    if (text_resize_line_height_allow) {
                        element_to_resize.css('line-height', '');
                    }
                    return false;
                }
            });
        }
    };
})(jQuery);;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function($) {

    Drupal.Views = {};

    /**
     * jQuery UI tabs, Views integration component
     */
    Drupal.behaviors.viewsTabs = {
        attach: function(context) {
            if ($.viewsUi && $.viewsUi.tabs) {
                $('#views-tabset').once('views-processed').viewsTabs({
                    selectedClass: 'active'
                });
            }

            $('a.views-remove-link').once('views-processed').click(function(event) {
                var id = $(this).attr('id').replace('views-remove-link-', '');
                $('#views-row-' + id).hide();
                $('#views-removed-' + id).attr('checked', true);
                event.preventDefault();
            });
            /**
             * Here is to handle display deletion
             * (checking in the hidden checkbox and hiding out the row)
             */
            $('a.display-remove-link')
                .addClass('display-processed')
                .click(function() {
                    var id = $(this).attr('id').replace('display-remove-link-', '');
                    $('#display-row-' + id).hide();
                    $('#display-removed-' + id).attr('checked', true);
                    return false;
                });
        }
    };

    /**
     * Helper function to parse a querystring.
     */
    Drupal.Views.parseQueryString = function(query) {
        var args = {};
        var pos = query.indexOf('?');
        if (pos != -1) {
            query = query.substring(pos + 1);
        }
        var pairs = query.split('&');
        for (var i in pairs) {
            if (typeof(pairs[i]) == 'string') {
                var pair = pairs[i].split('=');
                // Ignore the 'q' path argument, if present.
                if (pair[0] != 'q' && pair[1]) {
                    args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
                }
            }
        }
        return args;
    };

    /**
     * Helper function to return a view's arguments based on a path.
     */
    Drupal.Views.parseViewArgs = function(href, viewPath) {
        var returnObj = {};
        var path = Drupal.Views.getPath(href);
        // Ensure we have a correct path.
        if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
            var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
            returnObj.view_args = args;
            returnObj.view_path = path;
        }
        return returnObj;
    };

    /**
     * Strip off the protocol plus domain from an href.
     */
    Drupal.Views.pathPortion = function(href) {
        // Remove e.g. http://example.com if present.
        var protocol = window.location.protocol;
        if (href.substring(0, protocol.length) == protocol) {
            // 2 is the length of the '//' that normally follows the protocol
            href = href.substring(href.indexOf('/', protocol.length + 2));
        }
        return href;
    };

    /**
     * Return the Drupal path portion of an href.
     */
    Drupal.Views.getPath = function(href) {
        href = Drupal.Views.pathPortion(href);
        href = href.substring(Drupal.settings.basePath.length, href.length);
        // 3 is the length of the '?q=' added to the url without clean urls.
        if (href.substring(0, 3) == '?q=') {
            href = href.substring(3, href.length);
        }
        var chars = ['#', '?', '&'];
        for (i in chars) {
            if (href.indexOf(chars[i]) > -1) {
                href = href.substr(0, href.indexOf(chars[i]));
            }
        }
        return href;
    };

})(jQuery);;
/**
 * @file
 * Handles AJAX fetching of views, including filter submission and response.
 */
(function($) {

    /**
     * Attaches the AJAX behavior to Views exposed filter forms and key View links.
     */
    Drupal.behaviors.ViewsAjaxView = {};
    Drupal.behaviors.ViewsAjaxView.attach = function() {
        if (Drupal.settings && Drupal.settings.views && Drupal.settings.views.ajaxViews) {
            $.each(Drupal.settings.views.ajaxViews, function(i, settings) {
                Drupal.views.instances[i] = new Drupal.views.ajaxView(settings);
            });
        }
    };

    Drupal.views = {};
    Drupal.views.instances = {};

    /**
     * Javascript object for a certain view.
     */
    Drupal.views.ajaxView = function(settings) {
        var selector = '.view-dom-id-' + settings.view_dom_id;
        this.$view = $(selector);

        // Retrieve the path to use for views' ajax.
        var ajax_path = Drupal.settings.views.ajax_path;

        // If there are multiple views this might've ended up showing up multiple times.
        if (ajax_path.constructor.toString().indexOf("Array") != -1) {
            ajax_path = ajax_path[0];
        }

        // Check if there are any GET parameters to send to views.
        var queryString = window.location.search || '';
        if (queryString !== '') {
            // Remove the question mark and Drupal path component if any.
            var queryString = queryString.slice(1).replace(/q=[^&]+&?|&?render=[^&]+/, '');
            if (queryString !== '') {
                // If there is a '?' in ajax_path, clean url are on and & should be used to add parameters.
                queryString = ((/\?/.test(ajax_path)) ? '&' : '?') + queryString;
            }
        }

        this.element_settings = {
            url: ajax_path + queryString,
            submit: settings,
            setClick: true,
            event: 'click',
            selector: selector,
            progress: {
                type: 'throbber'
            }
        };

        this.settings = settings;

        // Add the ajax to exposed forms.
        this.$exposed_form = $('#views-exposed-form-' + settings.view_name.replace(/_/g, '-') + '-' + settings.view_display_id.replace(/_/g, '-'));
        this.$exposed_form.once(jQuery.proxy(this.attachExposedFormAjax, this));

        // Add the ajax to pagers.
        this.$view
            // Don't attach to nested views. Doing so would attach multiple behaviors
            // to a given element.
            .filter(jQuery.proxy(this.filterNestedViews, this))
            .once(jQuery.proxy(this.attachPagerAjax, this));

        // Add a trigger to update this view specifically. In order to trigger a
        // refresh use the following code.
        //
        // @code
        // jQuery('.view-name').trigger('RefreshView');
        // @endcode
        // Add a trigger to update this view specifically.
        var self_settings = this.element_settings;
        self_settings.event = 'RefreshView';
        this.refreshViewAjax = new Drupal.ajax(this.selector, this.$view, self_settings);
    };

    Drupal.views.ajaxView.prototype.attachExposedFormAjax = function() {
        var button = $('input[type=submit], button[type=submit], input[type=image]', this.$exposed_form);
        button = button[0];

        this.exposedFormAjax = new Drupal.ajax($(button).attr('id'), button, this.element_settings);
    };

    Drupal.views.ajaxView.prototype.filterNestedViews = function() {
        // If there is at least one parent with a view class, this view
        // is nested (e.g., an attachment). Bail.
        return !this.$view.parents('.view').size();
    };

    /**
     * Attach the ajax behavior to each link.
     */
    Drupal.views.ajaxView.prototype.attachPagerAjax = function() {
        this.$view.find('ul.pager > li > a, th.views-field a, .attachment .views-summary a')
            .each(jQuery.proxy(this.attachPagerLinkAjax, this));
    };

    /**
     * Attach the ajax behavior to a singe link.
     */
    Drupal.views.ajaxView.prototype.attachPagerLinkAjax = function(id, link) {
        var $link = $(link);
        var viewData = {};
        var href = $link.attr('href');
        // Construct an object using the settings defaults and then overriding
        // with data specific to the link.
        $.extend(
            viewData,
            this.settings,
            Drupal.Views.parseQueryString(href),
            // Extract argument data from the URL.
            Drupal.Views.parseViewArgs(href, this.settings.view_base_path)
        );

        // For anchor tags, these will go to the target of the anchor rather
        // than the usual location.
        $.extend(viewData, Drupal.Views.parseViewArgs(href, this.settings.view_base_path));

        this.element_settings.submit = viewData;
        this.pagerAjax = new Drupal.ajax(false, $link, this.element_settings);
    };

    Drupal.ajax.prototype.commands.viewsScrollTop = function(ajax, response, status) {
        // Scroll to the top of the view. This will allow users
        // to browse newly loaded content after e.g. clicking a pager
        // link.
        var offset = $(response.selector).offset();
        // We can't guarantee that the scrollable object should be
        // the body, as the view could be embedded in something
        // more complex such as a modal popup. Recurse up the DOM
        // and scroll the first element that has a non-zero top.
        var scrollTarget = response.selector;
        while ($(scrollTarget).scrollTop() == 0 && $(scrollTarget).parent()) {
            scrollTarget = $(scrollTarget).parent();
        }
        // Only scroll upward
        if (offset.top - 10 < $(scrollTarget).scrollTop()) {
            $(scrollTarget).animate({
                scrollTop: (offset.top - 10)
            }, 500);
        }
    };

})(jQuery);;
/*!
 * jCarousel - Riding carousels with jQuery
 *   http://sorgalla.com/jcarousel/
 *
 * Copyright (c) 2006 Jan Sorgalla (http://sorgalla.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Built on top of the jQuery library
 *   http://jquery.com
 *
 * Inspired by the "Carousel Component" by Bill Scott
 *   http://billwscott.com/carousel/
 */

(function(c) {
    var d = {
            vertical: false,
            rtl: false,
            start: 1,
            offset: 1,
            size: null,
            scroll: 3,
            visible: null,
            animation: "normal",
            easing: "swing",
            auto: 0,
            wrap: null,
            initCallback: null,
            setupCallback: null,
            reloadCallback: null,
            itemLoadCallback: null,
            itemFirstInCallback: null,
            itemFirstOutCallback: null,
            itemLastInCallback: null,
            itemLastOutCallback: null,
            itemVisibleInCallback: null,
            itemVisibleOutCallback: null,
            animationStepCallback: null,
            buttonNextHTML: "<div></div>",
            buttonPrevHTML: "<div></div>",
            buttonNextEvent: "click",
            buttonPrevEvent: "click",
            buttonNextCallback: null,
            buttonPrevCallback: null,
            itemFallbackDimension: null
        },
        b = false;
    c(window).bind("load.jcarousel", function() {
        b = true
    });
    c.jcarousel = function(l, g) {
        this.options = c.extend({}, d, g || {});
        this.locked = false;
        this.autoStopped = false;
        this.container = null;
        this.clip = null;
        this.list = null;
        this.buttonNext = null;
        this.buttonPrev = null;
        this.buttonNextState = null;
        this.buttonPrevState = null;
        if (!g || g.rtl === undefined) {
            this.options.rtl = (c(l).attr("dir") || c("html").attr("dir") || "").toLowerCase() == "rtl"
        }
        this.wh = !this.options.vertical ? "width" : "height";
        this.lt = !this.options.vertical ? (this.options.rtl ? "right" : "left") : "top";
        var q = "",
            n = l.className.split(" ");
        for (var k = 0; k < n.length; k++) {
            if (n[k].indexOf("jcarousel-skin") != -1) {
                c(l).removeClass(n[k]);
                q = n[k];
                break
            }
        }
        if (l.nodeName.toUpperCase() == "UL" || l.nodeName.toUpperCase() == "OL") {
            this.list = c(l);
            this.clip = this.list.parents(".jcarousel-clip");
            this.container = this.list.parents(".jcarousel-container")
        } else {
            this.container = c(l);
            this.list = this.container.find("ul,ol").eq(0);
            this.clip = this.container.find(".jcarousel-clip")
        }
        if (this.clip.size() === 0) {
            this.clip = this.list.wrap("<div></div>").parent()
        }
        if (this.container.size() === 0) {
            this.container = this.clip.wrap("<div></div>").parent()
        }
        if (q !== "" && this.container.parent()[0].className.indexOf("jcarousel-skin") == -1) {
            this.container.wrap('<div class=" ' + q + '"></div>')
        }
        this.buttonPrev = c(".jcarousel-prev", this.container);
        if (this.buttonPrev.size() === 0 && this.options.buttonPrevHTML !== null) {
            this.buttonPrev = c(this.options.buttonPrevHTML).appendTo(this.container)
        }
        this.buttonPrev.addClass(this.className("jcarousel-prev"));
        this.buttonNext = c(".jcarousel-next", this.container);
        if (this.buttonNext.size() === 0 && this.options.buttonNextHTML !== null) {
            this.buttonNext = c(this.options.buttonNextHTML).appendTo(this.container)
        }
        this.buttonNext.addClass(this.className("jcarousel-next"));
        this.clip.addClass(this.className("jcarousel-clip")).css({
            position: "relative"
        });
        this.list.addClass(this.className("jcarousel-list")).css({
            overflow: "hidden",
            position: "relative",
            top: 0,
            margin: 0,
            padding: 0
        }).css((this.options.rtl ? "right" : "left"), 0);
        this.container.addClass(this.className("jcarousel-container")).css({
            position: "relative"
        });
        if (!this.options.vertical && this.options.rtl) {
            this.container.addClass("jcarousel-direction-rtl").attr("dir", "rtl")
        }
        var m = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
        var p = this.list.children("li");
        var r = this;
        if (p.size() > 0) {
            var f = 0,
                h = this.options.offset;
            p.each(function() {
                r.format(this, h++);
                f += r.dimension(this, m)
            });
            this.list.css(this.wh, (f + 100) + "px");
            if (!g || g.size === undefined) {
                this.options.size = p.size()
            }
        }
        this.container.css("display", "block");
        this.buttonNext.css("display", "block");
        this.buttonPrev.css("display", "block");
        this.funcNext = function() {
            r.next();
            return false
        };
        this.funcPrev = function() {
            r.prev();
            return false
        };
        this.funcResize = function() {
            if (r.resizeTimer) {
                clearTimeout(r.resizeTimer)
            }
            r.resizeTimer = setTimeout(function() {
                r.reload()
            }, 100)
        };
        if (this.options.initCallback !== null) {
            this.options.initCallback(this, "init")
        }
        if (!b && a.isSafari()) {
            this.buttons(false, false);
            c(window).bind("load.jcarousel", function() {
                r.setup()
            })
        } else {
            this.setup()
        }
    };
    var a = c.jcarousel;
    a.fn = a.prototype = {
        jcarousel: "0.2.9"
    };
    a.fn.extend = a.extend = c.extend;
    a.fn.extend({
        setup: function() {
            this.first = null;
            this.last = null;
            this.prevFirst = null;
            this.prevLast = null;
            this.animating = false;
            this.timer = null;
            this.resizeTimer = null;
            this.tail = null;
            this.inTail = false;
            if (this.locked) {
                return
            }
            this.list.css(this.lt, this.pos(this.options.offset) + "px");
            var e = this.pos(this.options.start, true);
            this.prevFirst = this.prevLast = null;
            this.animate(e, false);
            c(window).unbind("resize.jcarousel", this.funcResize).bind("resize.jcarousel", this.funcResize);
            if (this.options.setupCallback !== null) {
                this.options.setupCallback(this)
            }
        },
        reset: function() {
            this.list.empty();
            this.list.css(this.lt, "0px");
            this.list.css(this.wh, "10px");
            if (this.options.initCallback !== null) {
                this.options.initCallback(this, "reset")
            }
            this.setup()
        },
        reload: function() {
            if (this.tail !== null && this.inTail) {
                this.list.css(this.lt, a.intval(this.list.css(this.lt)) + this.tail)
            }
            this.tail = null;
            this.inTail = false;
            if (this.options.reloadCallback !== null) {
                this.options.reloadCallback(this)
            }
            if (this.options.visible !== null) {
                var g = this;
                var h = Math.ceil(this.clipping() / this.options.visible),
                    f = 0,
                    e = 0;
                this.list.children("li").each(function(j) {
                    f += g.dimension(this, h);
                    if (parseInt(jQuery(this).attr("jcarouselindex")) < g.first) {
                        e = f
                    }
                });
                this.list.css(this.wh, f + "px");
                this.list.css(this.lt, -e + "px")
            }
            this.scroll(this.first, false)
        },
        lock: function() {
            this.locked = true;
            this.buttons()
        },
        unlock: function() {
            this.locked = false;
            this.buttons()
        },
        size: function(e) {
            if (e !== undefined) {
                this.options.size = e;
                if (!this.locked) {
                    this.buttons()
                }
            }
            return this.options.size
        },
        has: function(g, h) {
            if (h === undefined || !h) {
                h = g
            }
            if (this.options.size !== null && h > this.options.size) {
                h = this.options.size
            }
            for (var f = g; f <= h; f++) {
                var k = this.get(f);
                if (!k.length || k.hasClass("jcarousel-item-placeholder")) {
                    return false
                }
            }
            return true
        },
        get: function(e) {
            return c(">.jcarousel-item-" + e, this.list)
        },
        add: function(l, q) {
            var m = this.get(l),
                h = 0,
                g = c(q);
            if (m.length === 0) {
                var p, k = a.intval(l);
                m = this.create(l);
                while (true) {
                    p = this.get(--k);
                    if (k <= 0 || p.length) {
                        if (k <= 0) {
                            this.list.prepend(m)
                        } else {
                            p.after(m)
                        }
                        break
                    }
                }
            } else {
                h = this.dimension(m)
            }
            if (g.get(0).nodeName.toUpperCase() == "LI") {
                m.replaceWith(g);
                m = g
            } else {
                m.empty().append(q)
            }
            this.format(m.removeClass(this.className("jcarousel-item-placeholder")), l);
            var o = this.options.visible !== null ? Math.ceil(this.clipping() / this.options.visible) : null;
            var f = this.dimension(m, o) - h;
            if (l > 0 && l < this.first) {
                this.list.css(this.lt, a.intval(this.list.css(this.lt)) - f + "px")
            }
            this.list.css(this.wh, a.intval(this.list.css(this.wh)) + f + "px");
            return m
        },
        remove: function(f) {
            var g = this.get(f);
            if (!g.length || (f >= this.first && f <= this.last)) {
                return
            }
            var h = this.dimension(g);
            if (f < this.first) {
                this.list.css(this.lt, a.intval(this.list.css(this.lt)) + h + "px")
            }
            g.remove();
            this.list.css(this.wh, a.intval(this.list.css(this.wh)) - h + "px")
        },
        next: function() {
            if (this.tail !== null && !this.inTail) {
                this.scrollTail(false)
            } else {
                this.scroll(((this.options.wrap == "both" || this.options.wrap == "last") && this.options.size !== null && this.last == this.options.size) ? 1 : this.first + this.options.scroll)
            }
        },
        prev: function() {
            if (this.tail !== null && this.inTail) {
                this.scrollTail(true)
            } else {
                this.scroll(((this.options.wrap == "both" || this.options.wrap == "first") && this.options.size !== null && this.first == 1) ? this.options.size : this.first - this.options.scroll)
            }
        },
        scrollTail: function(e) {
            if (this.locked || this.animating || !this.tail) {
                return
            }
            this.pauseAuto();
            var f = a.intval(this.list.css(this.lt));
            f = !e ? f - this.tail : f + this.tail;
            this.inTail = !e;
            this.prevFirst = this.first;
            this.prevLast = this.last;
            this.animate(f)
        },
        scroll: function(f, e) {
            if (this.locked || this.animating) {
                return
            }
            this.pauseAuto();
            this.animate(this.pos(f), e)
        },
        pos: function(C, k) {
            var n = a.intval(this.list.css(this.lt));
            if (this.locked || this.animating) {
                return n
            }
            if (this.options.wrap != "circular") {
                C = C < 1 ? 1 : (this.options.size && C > this.options.size ? this.options.size : C)
            }
            var z = this.first > C;
            var E = this.options.wrap != "circular" && this.first <= 1 ? 1 : this.first;
            var H = z ? this.get(E) : this.get(this.last);
            var B = z ? E : E - 1;
            var F = null,
                A = 0,
                w = false,
                G = 0,
                D;
            while (z ? --B >= C : ++B < C) {
                F = this.get(B);
                w = !F.length;
                if (F.length === 0) {
                    F = this.create(B).addClass(this.className("jcarousel-item-placeholder"));
                    H[z ? "before" : "after"](F);
                    if (this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (B <= 0 || B > this.options.size)) {
                        D = this.get(this.index(B));
                        if (D.length) {
                            F = this.add(B, D.clone(true))
                        }
                    }
                }
                H = F;
                G = this.dimension(F);
                if (w) {
                    A += G
                }
                if (this.first !== null && (this.options.wrap == "circular" || (B >= 1 && (this.options.size === null || B <= this.options.size)))) {
                    n = z ? n + G : n - G
                }
            }
            var s = this.clipping(),
                u = [],
                h = 0,
                t = 0;
            H = this.get(C - 1);
            B = C;
            while (++h) {
                F = this.get(B);
                w = !F.length;
                if (F.length === 0) {
                    F = this.create(B).addClass(this.className("jcarousel-item-placeholder"));
                    if (H.length === 0) {
                        this.list.prepend(F)
                    } else {
                        H[z ? "before" : "after"](F)
                    }
                    if (this.first !== null && this.options.wrap == "circular" && this.options.size !== null && (B <= 0 || B > this.options.size)) {
                        D = this.get(this.index(B));
                        if (D.length) {
                            F = this.add(B, D.clone(true))
                        }
                    }
                }
                H = F;
                G = this.dimension(F);
                if (G === 0) {
                    throw new Error("jCarousel: No width/height set for items. This will cause an infinite loop. Aborting...")
                }
                if (this.options.wrap != "circular" && this.options.size !== null && B > this.options.size) {
                    u.push(F)
                } else {
                    if (w) {
                        A += G
                    }
                }
                t += G;
                if (t >= s) {
                    break
                }
                B++
            }
            for (var r = 0; r < u.length; r++) {
                u[r].remove()
            }
            if (A > 0) {
                this.list.css(this.wh, this.dimension(this.list) + A + "px");
                if (z) {
                    n -= A;
                    this.list.css(this.lt, a.intval(this.list.css(this.lt)) - A + "px")
                }
            }
            var q = C + h - 1;
            if (this.options.wrap != "circular" && this.options.size && q > this.options.size) {
                q = this.options.size
            }
            if (B > q) {
                h = 0;
                B = q;
                t = 0;
                while (++h) {
                    F = this.get(B--);
                    if (!F.length) {
                        break
                    }
                    t += this.dimension(F);
                    if (t >= s) {
                        break
                    }
                }
            }
            var o = q - h + 1;
            if (this.options.wrap != "circular" && o < 1) {
                o = 1
            }
            if (this.inTail && z) {
                n += this.tail;
                this.inTail = false
            }
            this.tail = null;
            if (this.options.wrap != "circular" && q == this.options.size && (q - h + 1) >= 1) {
                var y = a.intval(this.get(q).css(!this.options.vertical ? "marginRight" : "marginBottom"));
                if ((t - y) > s) {
                    this.tail = t - s - y
                }
            }
            if (k && C === this.options.size && this.tail) {
                n -= this.tail;
                this.inTail = true
            }
            while (C-- > o) {
                n += this.dimension(this.get(C))
            }
            this.prevFirst = this.first;
            this.prevLast = this.last;
            this.first = o;
            this.last = q;
            return n
        },
        animate: function(i, e) {
            if (this.locked || this.animating) {
                return
            }
            this.animating = true;
            var f = this;
            var g = function() {
                f.animating = false;
                if (i === 0) {
                    f.list.css(f.lt, 0)
                }
                if (!f.autoStopped && (f.options.wrap == "circular" || f.options.wrap == "both" || f.options.wrap == "last" || f.options.size === null || f.last < f.options.size || (f.last == f.options.size && f.tail !== null && !f.inTail))) {
                    f.startAuto()
                }
                f.buttons();
                f.notify("onAfterAnimation");
                if (f.options.wrap == "circular" && f.options.size !== null) {
                    for (var k = f.prevFirst; k <= f.prevLast; k++) {
                        if (k !== null && !(k >= f.first && k <= f.last) && (k < 1 || k > f.options.size)) {
                            f.remove(k)
                        }
                    }
                }
            };
            this.notify("onBeforeAnimation");
            if (!this.options.animation || e === false) {
                this.list.css(this.lt, i + "px");
                g()
            } else {
                var j = !this.options.vertical ? (this.options.rtl ? {
                    right: i
                } : {
                    left: i
                }) : {
                    top: i
                };
                var h = {
                    duration: this.options.animation,
                    easing: this.options.easing,
                    complete: g
                };
                if (c.isFunction(this.options.animationStepCallback)) {
                    h.step = this.options.animationStepCallback
                }
                this.list.animate(j, h)
            }
        },
        startAuto: function(f) {
            if (f !== undefined) {
                this.options.auto = f
            }
            if (this.options.auto === 0) {
                return this.stopAuto()
            }
            if (this.timer !== null) {
                return
            }
            this.autoStopped = false;
            var e = this;
            this.timer = window.setTimeout(function() {
                e.next()
            }, this.options.auto * 1000)
        },
        stopAuto: function() {
            this.pauseAuto();
            this.autoStopped = true
        },
        pauseAuto: function() {
            if (this.timer === null) {
                return
            }
            window.clearTimeout(this.timer);
            this.timer = null
        },
        buttons: function(g, f) {
            if (g == null) {
                g = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != "first") || this.options.size === null || this.last < this.options.size);
                if (!this.locked && (!this.options.wrap || this.options.wrap == "first") && this.options.size !== null && this.last >= this.options.size) {
                    g = this.tail !== null && !this.inTail
                }
            }
            if (f == null) {
                f = !this.locked && this.options.size !== 0 && ((this.options.wrap && this.options.wrap != "last") || this.first > 1);
                if (!this.locked && (!this.options.wrap || this.options.wrap == "last") && this.options.size !== null && this.first == 1) {
                    f = this.tail !== null && this.inTail
                }
            }
            var e = this;
            if (this.buttonNext.size() > 0) {
                this.buttonNext.unbind(this.options.buttonNextEvent + ".jcarousel", this.funcNext);
                if (g) {
                    this.buttonNext.bind(this.options.buttonNextEvent + ".jcarousel", this.funcNext)
                }
                this.buttonNext[g ? "removeClass" : "addClass"](this.className("jcarousel-next-disabled")).attr("disabled", g ? false : true);
                if (this.options.buttonNextCallback !== null && this.buttonNext.data("jcarouselstate") != g) {
                    this.buttonNext.each(function() {
                        e.options.buttonNextCallback(e, this, g)
                    }).data("jcarouselstate", g)
                }
            } else {
                if (this.options.buttonNextCallback !== null && this.buttonNextState != g) {
                    this.options.buttonNextCallback(e, null, g)
                }
            }
            if (this.buttonPrev.size() > 0) {
                this.buttonPrev.unbind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev);
                if (f) {
                    this.buttonPrev.bind(this.options.buttonPrevEvent + ".jcarousel", this.funcPrev)
                }
                this.buttonPrev[f ? "removeClass" : "addClass"](this.className("jcarousel-prev-disabled")).attr("disabled", f ? false : true);
                if (this.options.buttonPrevCallback !== null && this.buttonPrev.data("jcarouselstate") != f) {
                    this.buttonPrev.each(function() {
                        e.options.buttonPrevCallback(e, this, f)
                    }).data("jcarouselstate", f)
                }
            } else {
                if (this.options.buttonPrevCallback !== null && this.buttonPrevState != f) {
                    this.options.buttonPrevCallback(e, null, f)
                }
            }
            this.buttonNextState = g;
            this.buttonPrevState = f
        },
        notify: function(e) {
            var f = this.prevFirst === null ? "init" : (this.prevFirst < this.first ? "next" : "prev");
            this.callback("itemLoadCallback", e, f);
            if (this.prevFirst !== this.first) {
                this.callback("itemFirstInCallback", e, f, this.first);
                this.callback("itemFirstOutCallback", e, f, this.prevFirst)
            }
            if (this.prevLast !== this.last) {
                this.callback("itemLastInCallback", e, f, this.last);
                this.callback("itemLastOutCallback", e, f, this.prevLast)
            }
            this.callback("itemVisibleInCallback", e, f, this.first, this.last, this.prevFirst, this.prevLast);
            this.callback("itemVisibleOutCallback", e, f, this.prevFirst, this.prevLast, this.first, this.last)
        },
        callback: function(j, m, e, k, h, g, f) {
            if (this.options[j] == null || (typeof this.options[j] != "object" && m != "onAfterAnimation")) {
                return
            }
            var n = typeof this.options[j] == "object" ? this.options[j][m] : this.options[j];
            if (!c.isFunction(n)) {
                return
            }
            var o = this;
            if (k === undefined) {
                n(o, e, m)
            } else {
                if (h === undefined) {
                    this.get(k).each(function() {
                        n(o, this, k, e, m)
                    })
                } else {
                    var p = function(q) {
                        o.get(q).each(function() {
                            n(o, this, q, e, m)
                        })
                    };
                    for (var l = k; l <= h; l++) {
                        if (l !== null && !(l >= g && l <= f)) {
                            p(l)
                        }
                    }
                }
            }
        },
        create: function(e) {
            return this.format("<li></li>", e)
        },
        format: function(k, h) {
            k = c(k);
            var g = k.get(0).className.split(" ");
            for (var f = 0; f < g.length; f++) {
                if (g[f].indexOf("jcarousel-") != -1) {
                    k.removeClass(g[f])
                }
            }
            k.addClass(this.className("jcarousel-item")).addClass(this.className("jcarousel-item-" + h)).css({
                "float": (this.options.rtl ? "right" : "left"),
                "list-style": "none"
            }).attr("jcarouselindex", h);
            return k
        },
        className: function(e) {
            return e + " " + e + (!this.options.vertical ? "-horizontal" : "-vertical")
        },
        dimension: function(h, i) {
            var g = c(h);
            if (i == null) {
                return !this.options.vertical ? ((g.innerWidth() + a.intval(g.css("margin-left")) + a.intval(g.css("margin-right")) + a.intval(g.css("border-left-width")) + a.intval(g.css("border-right-width"))) || a.intval(this.options.itemFallbackDimension)) : ((g.innerHeight() + a.intval(g.css("margin-top")) + a.intval(g.css("margin-bottom")) + a.intval(g.css("border-top-width")) + a.intval(g.css("border-bottom-width"))) || a.intval(this.options.itemFallbackDimension))
            } else {
                var f = !this.options.vertical ? i - a.intval(g.css("marginLeft")) - a.intval(g.css("marginRight")) : i - a.intval(g.css("marginTop")) - a.intval(g.css("marginBottom"));
                c(g).css(this.wh, f + "px");
                return this.dimension(g)
            }
        },
        clipping: function() {
            return !this.options.vertical ? this.clip[0].offsetWidth - a.intval(this.clip.css("borderLeftWidth")) - a.intval(this.clip.css("borderRightWidth")) : this.clip[0].offsetHeight - a.intval(this.clip.css("borderTopWidth")) - a.intval(this.clip.css("borderBottomWidth"))
        },
        index: function(e, f) {
            if (f == null) {
                f = this.options.size
            }
            return Math.round((((e - 1) / f) - Math.floor((e - 1) / f)) * f) + 1
        }
    });
    a.extend({
        defaults: function(e) {
            return c.extend(d, e || {})
        },
        intval: function(e) {
            e = parseInt(e, 10);
            return isNaN(e) ? 0 : e
        },
        windowLoaded: function() {
            b = true
        },
        isSafari: function() {
            var g = navigator.userAgent.toLowerCase(),
                f = /(chrome)[ \/]([\w.]+)/.exec(g) || /(webkit)[ \/]([\w.]+)/.exec(g) || [],
                e = f[1] || "";
            return e === "webkit"
        }
    });
    c.fn.jcarousel = function(g) {
        if (typeof g == "string") {
            var e = c(this).data("jcarousel"),
                f = Array.prototype.slice.call(arguments, 1);
            return e[g].apply(e, f)
        } else {
            return this.each(function() {
                var h = c(this).data("jcarousel");
                if (h) {
                    if (g) {
                        c.extend(h.options, g)
                    }
                    h.reload()
                } else {
                    c(this).data("jcarousel", new a(this, g))
                }
            })
        }
    }
})(jQuery);;
/**
 * @file
 * Add jCarousel behaviors to the page and provide Views-support.
 */

(function($) {

    Drupal.behaviors.jcarousel = {};
    Drupal.behaviors.jcarousel.attach = function(context, settings) {
        settings = settings || Drupal.settings;

        // If no carousels exist on this part of the page, work no further. 
        if (!settings.jcarousel || !settings.jcarousel.carousels) {
            return;
        }

        $("ul.jcarousel li").css("display", "");

        $.each(settings.jcarousel.carousels, function(key, options) {
            var $carousel = $(options.selector + ':not(.jcarousel-processed)', context);

            // If this carousel has already been processed or doesn't exist, move on.
            if (!$carousel.length) {
                return;
            }

            // Callbacks need to be converted from a string to an actual function.
            $.each(options, function(optionKey) {
                if (optionKey.match(/Callback$/) && typeof options[optionKey] == 'string') {
                    var callbackFunction = window;
                    var callbackParents = options[optionKey].split('.');
                    $.each(callbackParents, function(objectParent) {
                        callbackFunction = callbackFunction[callbackParents[objectParent]];
                    });
                    options[optionKey] = callbackFunction;
                }
            });

            // Add standard options required for AJAX functionality.
            if (options.ajax && !options.itemLoadCallback) {
                options.itemLoadCallback = Drupal.jcarousel.ajaxLoadCallback;
            }

            // If auto-scrolling, pause animation when hoving over the carousel.
            if (options.auto && options.autoPause && !options.initCallback) {
                options.initCallback = function(carousel, state) {
                    Drupal.jcarousel.autoPauseCallback(carousel, state);
                };
            }

            // Add responsive behavior.
            if (options.responsive && !options.reloadCallback) {
                options.vertical = false;
                options.visible = null;
                options.reloadCallback = Drupal.jcarousel.reloadCallback;
            }

            // Add navigation to the carousel if enabled.
            if (!options.setupCallback) {
                options.setupCallback = function(carousel) {
                    Drupal.jcarousel.setupCarousel(carousel);
                    if (options.navigation) {
                        Drupal.jcarousel.addNavigation(carousel, options.navigation);
                    }
                    if (options.responsive) {
                        carousel.reload();
                    }
                };
                if (options.navigation && !options.itemVisibleInCallback) {
                    options.itemLastInCallback = {
                        onAfterAnimation: Drupal.jcarousel.updateNavigationActive
                    };
                }
            }

            if (!options.hasOwnProperty('buttonNextHTML') && !options.hasOwnProperty('buttonPrevHTML')) {
                options.buttonNextHTML = Drupal.theme('jCarouselButton', 'next');
                options.buttonPrevHTML = Drupal.theme('jCarouselButton', 'previous');
            }

            // Initialize the jcarousel.
            $carousel.addClass('jcarousel-processed').jcarousel(options);
        });
    };

    Drupal.jcarousel = {};
    Drupal.jcarousel.reloadCallback = function(carousel) {
        // Set the clip and container to auto width so that they will fill
        // the available space.
        carousel.container.css('width', 'auto');
        carousel.clip.css('width', 'auto');
        var clipWidth = carousel.clip.width();
        var containerExtra = carousel.container.width() - carousel.clip.outerWidth(true);
        // Determine the width of an item.
        var itemWidth = carousel.list.find('li').first().outerWidth(true);
        var numItems = Math.floor(carousel.clip.width() / itemWidth) || 1;
        // Set the new scroll number.
        carousel.options.scroll = numItems;
        var newClipWidth = numItems * itemWidth;
        var newContainerWidth = newClipWidth + containerExtra;
        // Resize the clip and container.
        carousel.clip.width(newClipWidth);
        carousel.container.width(newContainerWidth);
    };
    Drupal.jcarousel.ajaxLoadCallback = function(jcarousel, state) {
        // Check if the requested items already exist.
        if (state == 'init' || jcarousel.has(jcarousel.first, jcarousel.last)) {
            return;
        }

        var $list = jcarousel.list;
        var $view = $list.parents('.view:first');
        var ajaxPath = Drupal.settings.jcarousel.ajaxPath;
        var target = $view.get(0);

        // Find this view's settings in the Views AJAX settings.
        var settings;
        $.each(Drupal.settings.jcarousel.carousels, function(domID, carouselSettings) {
            if ($list.is('.' + domID)) {
                settings = carouselSettings['view_options'];
            }
        });

        // Copied from ajax_view.js:
        var viewData = {
            'js': 1,
            'first': jcarousel.first - 1,
            'last': jcarousel.last
        };
        // Construct an object using the settings defaults and then overriding
        // with data specific to the link.
        $.extend(
            viewData,
            settings
        );

        $.ajax({
            url: ajaxPath,
            type: 'GET',
            data: viewData,
            success: function(response) {
                Drupal.jcarousel.ajaxResponseCallback(jcarousel, target, response);
            },
            error: function(xhr) {
                Drupal.jcarousel.ajaxErrorCallback(xhr, ajaxPath);
            },
            dataType: 'json'
        });

    };

    /**
     * Init callback for jCarousel. Pauses the carousel when hovering over.
     */
    Drupal.jcarousel.autoPauseCallback = function(carousel, state) {
        function pauseAuto() {
            carousel.stopAuto();
        }

        function resumeAuto() {
            carousel.startAuto();
        }
        carousel.clip.hover(pauseAuto, resumeAuto);
        carousel.buttonNext.hover(pauseAuto, resumeAuto);
        carousel.buttonPrev.hover(pauseAuto, resumeAuto);
    };

    /**
     * Setup callback for jCarousel. Calculates number of pages.
     */
    Drupal.jcarousel.setupCarousel = function(carousel) {
        // Determine the number of pages this carousel includes.
        // This only works for a positive starting point. Also, .first is 1-based
        // while .last is a count, so we need to reset the .first number to be
        // 0-based to make the math work.
        carousel.pageSize = carousel.last - (carousel.first - 1);

        // jCarousel's Views integration sets "size" in the carousel options. Use that
        // if available, otherwise count the number of items in the carousel.
        var itemCount = carousel.options.size ? carousel.options.size : $(carousel.list).children('li').length;
        carousel.pageCount = Math.ceil(itemCount / carousel.pageSize);
        carousel.pageNumber = 1;

        // Disable the previous/next arrows if there is only one page.
        if (carousel.options.wrap != 'circular' && carousel.pageCount == 1) {
            carousel.buttons(false, false);
        }

        // Always remove the hard-coded display: block from the navigation.
        carousel.buttonNext.css('display', '');
        carousel.buttonPrev.css('display', '');
    }

    /**
     * Setup callback for jCarousel. Adds the navigation to the carousel if enabled.
     */
    Drupal.jcarousel.addNavigation = function(carousel, position) {
        // Don't add a pager if there's only one page of results.
        if (carousel.pageCount <= 1) {
            return;
        }

        // Add a class to the wrapper so it can adjust CSS.
        $(carousel.list).parents('.jcarousel-container:first').addClass('jcarousel-navigation-' + position);

        var navigation = $('<ul class="jcarousel-navigation"></ul>');

        for (var i = 1; i <= carousel.pageCount; i++) {
            var pagerItem = $(Drupal.theme('jCarouselPageLink', i));
            var listItem = $('<li></li>').attr('jcarousel-page', i).append(pagerItem);
            navigation.append(listItem);

            // Make the first page active by default.
            if (i === 1) {
                listItem.addClass('active');
            }

            // Scroll to the correct page when a pager is clicked.
            pagerItem.bind('click', function() {
                // We scroll to the new page based on item offsets. This works with
                // circular carousels that do not divide items evenly, making it so that
                // going back or forward in pages will not skip or repeat any items.
                var newPageNumber = $(this).parent().attr('jcarousel-page');
                var itemOffset = (newPageNumber - carousel.pageNumber) * carousel.pageSize;

                if (itemOffset) {
                    carousel.scroll(carousel.first + itemOffset);
                }

                return false;
            });
        }

        $(carousel.list).parents('.jcarousel-clip:first')[position](navigation);
    }

    /**
     * itemVisibleInCallback for jCarousel. Update the navigation after page change.
     */
    Drupal.jcarousel.updateNavigationActive = function(carousel, item, idx, state) {
        // The navigation doesn't even exist yet when this is called on init.
        var $listItems = $(carousel.list).parents('.jcarousel-container:first').find('.jcarousel-navigation li');
        if ($listItems.length == 0) {
            return;
        }

        // jCarousel does some very odd things with circular wraps. Items before the
        // first item are given negative numbers and items after the last are given
        // numbers beyond the total number of items. This complicated logic calculates
        // which page number is active based off this numbering scheme.
        var pageNumber = Math.ceil(idx / carousel.pageSize);
        if (pageNumber <= 0 || pageNumber > carousel.pageCount) {
            pageNumber = pageNumber % carousel.pageCount;
            pageNumber = pageNumber == 0 ? carousel.pageCount : pageNumber;
            pageNumber = pageNumber < 0 ? pageNumber + carousel.pageCount : pageNumber;
        }
        carousel.pageNumber = pageNumber;
        var currentPage = $listItems.get(carousel.pageNumber - 1);

        // Set the current page to be active.
        $listItems.not(currentPage).removeClass('active');
        $(currentPage).addClass('active');
    }

    /**
     * AJAX callback for all jCarousel-style views.
     */
    Drupal.jcarousel.ajaxResponseCallback = function(jcarousel, target, response) {
        if (response.debug) {
            alert(response.debug);
        }

        var $view = $(target);
        var jcarousel = $view.find('ul.jcarousel').data('jcarousel');

        // Add items to the jCarousel.
        $('ul.jcarousel > li', response.display).each(function(i) {
            var itemNumber = this.className.replace(/.*?jcarousel-item-(\d+).*/, '$1');
            jcarousel.add(itemNumber, this.innerHTML);
        });

        // Add Drupal behaviors to the content of the carousel to affect new items.
        Drupal.attachBehaviors(jcarousel.list.get(0));

        // Treat messages the same way that Views typically handles messages.
        if (response.messages) {
            // Show any messages (but first remove old ones, if there are any).
            $view.find('.views-messages').remove().end().prepend(response.messages);
        }
    };

    /**
     * Display error messages using the same mechanism as Views module.
     */
    Drupal.jcarousel.ajaxErrorCallback = function(xhr, path) {
        var error_text = '';

        if ((xhr.status == 500 && xhr.responseText) || xhr.status == 200) {
            error_text = xhr.responseText;

            // Replace all &lt; and &gt; by < and >
            error_text = error_text.replace("/&(lt|gt);/g", function(m, p) {
                return (p == "lt") ? "<" : ">";
            });

            // Now, replace all html tags by empty spaces
            error_text = error_text.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");

            // Fix end lines
            error_text = error_text.replace(/[\n]+\s+/g, "\n");
        } else if (xhr.status == 500) {
            error_text = xhr.status + ': ' + Drupal.t("Internal server error. Please see server or PHP logs for error information.");
        } else {
            error_text = xhr.status + ': ' + xhr.statusText;
        }

        alert(Drupal.t("An error occurred at @path.\n\nError Description: @error", {
            '@path': path,
            '@error': error_text
        }));
    };

    Drupal.theme.prototype.jCarouselButton = function(type) {
        // Use links for buttons for accessibility.
        return '<a href="javascript:void(0)"></a>';
    };

    Drupal.theme.prototype.jCarouselPageLink = function(pageNumber) {
        return '<a href="javascript:void(0)"><span>' + (pageNumber) + '</span></a>';
    };

})(jQuery);;
(function($) {
    Drupal.behaviors.lang_dropdown = {
        attach: function(context, settings) {
            var settings = settings || Drupal.settings;

            if (settings.lang_dropdown) {
                var flags, msddSettings;
                for (key in settings.lang_dropdown) {
                    msddSettings = settings.lang_dropdown[key].jsWidget;
                    flags = msddSettings.languageicons;
                    if (flags) {
                        $.each(flags, function(index, value) {
                            if (msddSettings.widget == "msdropdown") {
                                $('select#lang-dropdown-select-' + key + ' option[value="' + index + '"]', context).attr('data-image', value);
                            } else if (msddSettings.widget == "ddslick" && Boolean(msddSettings.showSelectedHTML)) {
                                $('select#lang-dropdown-select-' + key + ' option[value="' + index + '"]', context).attr('data-imagesrc', value);
                            }
                        });
                    }

                    if (msddSettings.widget == "msdropdown") {
                        try {
                            $('select#lang-dropdown-select-' + key, context).msDropDown({
                                visibleRows: msddSettings.visibleRows,
                                roundedCorner: Boolean(msddSettings.roundedCorner),
                                animStyle: msddSettings.animStyle,
                                event: msddSettings.event,
                                mainCSS: msddSettings.mainCSS
                            });
                        } catch (e) {
                            if (console) {
                                console.log(e);
                            }
                        }
                    } else if (msddSettings.widget == "chosen") {
                        $('select#lang-dropdown-select-' + key, context).chosen({
                            disable_search: msddSettings.disable_search,
                            no_results_text: msddSettings.no_results_text
                        });
                    } else if (msddSettings.widget == "ddslick") {
                        $('select#lang-dropdown-select-' + key, context).ddslick({
                            width: (msddSettings.width == 0) ? null : msddSettings.width,
                            height: (msddSettings.height == 0) ? null : msddSettings.height,
                            showSelectedHTML: Boolean(msddSettings.showSelectedHTML),
                            imagePosition: msddSettings.imagePosition,
                            onSelected: function(data) {
                                // ddselect also fires this function on initialization, so we have
                                // to make sure this select has already been initialized.
                                if (!data.selectedItem.parent().data('ddslick-has-been-initialized')) {
                                    data.selectedItem.parent().data('ddslick-has-been-initialized', true);
                                    return;
                                }

                                var lang = data.selectedData.value;
                                var href = $('#lang-dropdown-select-' + key, context).parents('form').find('input[name="' + lang + '"]').val();
                                window.location.href = href;
                            }
                        });
                    }
                }
            }

            $('select.lang-dropdown-select-element', context).change(function() {
                var lang = this.options[this.selectedIndex].value;
                var href = $(this).closest('form').find('input[name="' + lang + '"]').val();
                window.location.href = href;
            });

            $('form.lang-dropdown-form', context).after('<div style="clear:both;"></div>');
        }
    };
})(jQuery);;
(function($) {
    Drupal.settings.views = Drupal.settings.views || {
        'ajax_path': '/views/ajax'
    };

    Drupal.quicktabs = Drupal.quicktabs || {};

    Drupal.quicktabs.getQTName = function(el) {
        return el.id.substring(el.id.indexOf('-') + 1);
    }

    Drupal.behaviors.quicktabs = {
        attach: function(context, settings) {
            $.extend(true, Drupal.settings, settings);
            $('.quicktabs-wrapper', context).once(function() {
                Drupal.quicktabs.prepare(this);
            });
        }
    }

    // Setting up the inital behaviours
    Drupal.quicktabs.prepare = function(el) {
        // el.id format: "quicktabs-$name"
        var qt_name = Drupal.quicktabs.getQTName(el);
        var $ul = $(el).find('ul.quicktabs-tabs:first');
        $ul.find('li a').each(function(i, element) {
            element.myTabIndex = i;
            element.qt_name = qt_name;
            var tab = new Drupal.quicktabs.tab(element);
            var parent_li = $(element).parents('li').get(0);
            if ($(parent_li).hasClass('active')) {
                $(element).addClass('quicktabs-loaded');
            }
            $(element).once(function() {
                $(this).bind('click', {
                    tab: tab
                }, Drupal.quicktabs.clickHandler);
            });
        });
    }

    Drupal.quicktabs.clickHandler = function(event) {
        var tab = event.data.tab;
        var element = this;
        // Set clicked tab to active.
        $(this).parents('li').siblings().removeClass('active');
        $(this).parents('li').addClass('active');

        // Hide all tabpages.
        tab.container.children().addClass('quicktabs-hide');

        if (!tab.tabpage.hasClass("quicktabs-tabpage")) {
            tab = new Drupal.quicktabs.tab(element);
        }

        tab.tabpage.removeClass('quicktabs-hide');
        return false;
    }

    // Constructor for an individual tab
    Drupal.quicktabs.tab = function(el) {
        this.element = el;
        this.tabIndex = el.myTabIndex;
        var qtKey = 'qt_' + el.qt_name;
        var i = 0;
        for (var i = 0; i < Drupal.settings.quicktabs[qtKey].tabs.length; i++) {
            if (i == this.tabIndex) {
                this.tabObj = Drupal.settings.quicktabs[qtKey].tabs[i];
                this.tabKey = i;
            }
        }
        this.tabpage_id = 'quicktabs-tabpage-' + el.qt_name + '-' + this.tabKey;
        this.container = $('#quicktabs-container-' + el.qt_name);
        this.tabpage = this.container.find('#' + this.tabpage_id);
    }

    if (Drupal.ajax) {
        /**
         * Handle an event that triggers an AJAX response.
         *
         * We unfortunately need to override this function, which originally comes from
         * misc/ajax.js, in order to be able to cache loaded tabs, i.e. once a tab
         * content has loaded it should not need to be loaded again.
         *
         * I have removed all comments that were in the original core function, so that
         * the only comments inside this function relate to the Quicktabs modification
         * of it.
         */
        Drupal.ajax.prototype.eventResponse = function(element, event) {
            var ajax = this;

            if (ajax.ajaxing) {
                return false;
            }

            try {
                if (ajax.form) {
                    if (ajax.setClick) {
                        element.form.clk = element;
                    }

                    ajax.form.ajaxSubmit(ajax.options);
                } else {
                    // Do not perform an ajax request for already loaded Quicktabs content.
                    if (!$(element).hasClass('quicktabs-loaded')) {
                        ajax.beforeSerialize(ajax.element, ajax.options);
                        $.ajax(ajax.options);
                        if ($(element).parents('ul').hasClass('quicktabs-tabs')) {
                            $(element).addClass('quicktabs-loaded');
                        }
                    }
                }
            } catch (e) {
                ajax.ajaxing = false;
                alert("An error occurred while attempting to process " + ajax.options.url + ": " + e.message);
            }
            return false;
        };
    }


})(jQuery);;
/**
 * @file
 */

(function($) {

    'use strict';

    Drupal.intlink = Drupal.intlink || {};

    Drupal.intlink.attach = function(context, settings) {
        if (!settings.hasOwnProperty('intlink')) {
            return;
        }

        // Strip the host name down, removing ports, subdomains, or www.
        var pattern = /^(([^\/:]+?\.)*)([^\.:]{1,})((\.[a-z0-9]{1,253})*)(:[0-9]{1,5})?$/;
        var host = window.location.host.replace(pattern, '$2$3$6');
        var subdomain = window.location.host.replace(host, '');

        // Determine what subdomains are considered internal.
        var subdomains;
        if (settings.intlink.extSubdomains) {
            subdomains = '([^/]*\\.)?';
        } else if (subdomain === 'www.' || subdomain === '') {
            subdomains = '(www\\.)?';
        } else {
            subdomains = subdomain.replace('.', '\\.');
        }

        // Build regular expressions that define an internal link.
        var internal_link = new RegExp('^https?://([^@]*@)?' + subdomains + host, 'i');

        // Extra internal link matching.
        var extInclude = false;
        if (settings.intlink.extInclude) {
            extInclude = new RegExp(settings.intlink.extInclude.replace(/\\/, '\\'), 'i');
        }

        // Extra external link matching.
        var extExclude = false;
        if (settings.intlink.extExclude) {
            extExclude = new RegExp(settings.intlink.extExclude.replace(/\\/, '\\'), 'i');
        }

        // Extra external link CSS selector exclusion.
        var extCssExclude = false;
        if (settings.intlink.extCssExclude) {
            extCssExclude = settings.intlink.extCssExclude;
        }

        // Extra external link CSS selector explicit.
        var extCssExplicit = false;
        if (settings.intlink.extCssExplicit) {
            extCssExplicit = settings.intlink.extCssExplicit;
        }

        // Define the jQuery method (either 'append' or 'prepend') of placing the icon, defaults to 'append'.
        var extIconPlacement = settings.intlink.extIconPlacement || 'append';

        // Find all links which are NOT internal and begin with http as opposed
        // to ftp://, javascript:, etc. other kinds of links.
        // When operating on the 'this' variable, the host has been appended to
        // all links by the browser, even local ones.
        // In jQuery 1.1 and higher, we'd use a filter method here, but it is not
        // available in jQuery 1.0 (Drupal 5 default).
        var external_links = [];
        var mailto_links = [];
        $('a:not([data-intlink]), area:not([data-intlink])', context).each(function(el) {
            try {
                var url = '';
                if (typeof this.href == 'string') {
                    url = this.href.toLowerCase();
                }
                // Handle SVG links (xlink:href).
                else if (typeof this.href == 'object') {
                    url = this.href.baseVal;
                }
                if (url.indexOf('http') === 0 &&
                    ((!url.match(internal_link) && !(extExclude && url.match(extExclude))) || (extInclude && url.match(extInclude))) &&
                    !(extCssExclude && $(this).is(extCssExclude)) &&
                    !(extCssExclude && $(this).parents(extCssExclude).length > 0) &&
                    !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
                    external_links.push(this);
                }
                // Do not include area tags with begin with mailto: (this prohibits
                // icons from being added to image-maps).
                else if (this.tagName !== 'AREA' &&
                    url.indexOf('mailto:') === 0 &&
                    !(extCssExclude && $(this).parents(extCssExclude).length > 0) &&
                    !(extCssExplicit && $(this).parents(extCssExplicit).length < 1)) {
                    mailto_links.push(this);
                }
            }
            // IE7 throws errors often when dealing with irregular links, such as:
            // <a href="node/10"></a> Empty tags.
            // <a href="http://user:pass@example.com">example</a> User:pass syntax.
            catch (error) {
                return false;
            }
        });

        if (settings.intlink.extClass) {
            Drupal.intlink.applyClassAndSpan(external_links, settings.intlink.extClass, extIconPlacement);
        }

        if (settings.intlink.mailtoClass) {
            Drupal.intlink.applyClassAndSpan(mailto_links, settings.intlink.mailtoClass, extIconPlacement);
        }

        if (settings.intlink.extTarget) {
            // Apply the target attribute to all links.
            $(external_links).attr('target', settings.intlink.extTarget);
            // Add rel attributes noopener and noreferrer.
            $(external_links).attr('rel', function(i, val) {
                // If no rel attribute is present, create one with the values noopener and noreferrer.
                if (val == null) {
                    return 'noopener noreferrer';
                }
                // Check to see if rel contains noopener or noreferrer. Add what doesn't exist.
                if (val.indexOf('noopener') > -1 || val.indexOf('noreferrer') > -1) {
                    if (val.indexOf('noopener') === -1) {
                        return val + ' noopener';
                    }
                    if (val.indexOf('noreferrer') === -1) {
                        return val + ' noreferrer';
                    }
                    // Both noopener and noreferrer exist. Nothing needs to be added.
                    else {
                        return val;
                    }
                }
                // Else, append noopener and noreferrer to val.
                else {
                    return val + ' noopener noreferrer';
                }
            });
        }

        Drupal.intlink = Drupal.intlink || {};

        // Set up default click function for the external links popup. This should be
        // overridden by modules wanting to alter the popup.
        Drupal.intlink.popupClickHandler = Drupal.intlink.popupClickHandler || function() {
            if (settings.intlink.extAlert) {
                return confirm(settings.intlink.extAlertText);
            }
        };

        $(external_links).click(function(e) {
            return Drupal.intlink.popupClickHandler(e, this);
        });
    };

    /**
     * Apply a class and a trailing <span> to all links not containing images.
     *
     * @param {object[]} links
     *   An array of DOM elements representing the links.
     * @param {string} class_name
     *   The class to apply to the links.
     * @param {string} icon_placement
     *   'append' or 'prepend' the icon to the link.
     */
    Drupal.intlink.applyClassAndSpan = function(links, class_name, icon_placement) {
        var $links_to_process;
        if (Drupal.settings.intlink.extImgClass) {
            $links_to_process = $(links);
        } else {
            var links_with_images = $(links).find('img').parents('a');
            $links_to_process = $(links).not(links_with_images);
        }
        // Add data-intlink attribute.
        $links_to_process.attr('data-intlink', '');
        var i;
        var length = $links_to_process.length;
        for (i = 0; i < length; i++) {
            var $link = $($links_to_process[i]);
            if ($link.css('display') === 'inline' || $link.css('display') === 'inline-block') {
                if (Drupal.settings.intlink.extUseFontAwesome) {
                    if (class_name === Drupal.settings.intlink.mailtoClass) {
                        $link[icon_placement]('<span class="fa-' + class_name + ' intlink"><span class="fa fa-envelope-o" title="' + Drupal.settings.intlink.mailtoLabel + '"></span><span class="element-invisible">' + Drupal.settings.intlink.mailtoLabel + '</span></span>');
                    } else {
                        $link[icon_placement]('<span class="fa-' + class_name + ' intlink"><span class="fa fa-external-link" title="' + Drupal.settings.intlink.extLabel + '"></span><span class="element-invisible">' + Drupal.settings.intlink.extLabel + '</span></span>');
                    }
                } else {
                    if (class_name === Drupal.settings.intlink.mailtoClass) {
                        $link[icon_placement]('<span class="' + class_name + '"><span class="element-invisible">' + Drupal.settings.intlink.mailtoLabel + '</span></span>');
                    } else {
                        $link[icon_placement]('<span class="' + class_name + '"><span class="element-invisible">' + Drupal.settings.intlink.extLabel + '</span></span>');
                    }
                }
            }
        }
    };

    Drupal.behaviors.intlink = Drupal.behaviors.intlink || {};
    Drupal.behaviors.intlink.attach = function(context, settings) {
        // Backwards compatibility, for the benefit of modules overriding intlink
        // functionality by defining an "intlinkAttach" global function.
        if (typeof intlinkAttach === 'function') {
            intlinkAttach(context);
        } else {
            Drupal.intlink.attach(context, settings);
        }
    };

})(jQuery);;
/**
 * hoverIntent r6 // 2011.02.26 // jQuery 1.5.1+
 * <http://cherne.net/brian/resources/jquery.hoverIntent.html>
 * 
 * @param  f  onMouseOver function || An object with configuration options
 * @param  g  onMouseOut function  || Nothing (use configuration options object)
 * @author    Brian Cherne brian(at)cherne(dot)net
 */
(function($) {
    $.fn.hoverIntent = function(f, g) {
        var cfg = {
            sensitivity: 7,
            interval: 100,
            timeout: 0
        };
        cfg = $.extend(cfg, g ? {
            over: f,
            out: g
        } : f);
        var cX, cY, pX, pY;
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY
        };
        var compare = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            if ((Math.abs(pX - cX) + Math.abs(pY - cY)) < cfg.sensitivity) {
                $(ob).unbind("mousemove", track);
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob, [ev])
            } else {
                pX = cX;
                pY = cY;
                ob.hoverIntent_t = setTimeout(function() {
                    compare(ev, ob)
                }, cfg.interval)
            }
        };
        var delay = function(ev, ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob, [ev])
        };
        var handleHover = function(e) {
            var ev = jQuery.extend({}, e);
            var ob = this;
            if (ob.hoverIntent_t) {
                ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t)
            }
            if (e.type == "mouseenter") {
                pX = ev.pageX;
                pY = ev.pageY;
                $(ob).bind("mousemove", track);
                if (ob.hoverIntent_s != 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        compare(ev, ob)
                    }, cfg.interval)
                }
            } else {
                $(ob).unbind("mousemove", track);
                if (ob.hoverIntent_s == 1) {
                    ob.hoverIntent_t = setTimeout(function() {
                        delay(ev, ob)
                    }, cfg.timeout)
                }
            }
        };
        return this.bind('mouseenter', handleHover).bind('mouseleave', handleHover)
    }
})(jQuery);;
/*
 * sf-Smallscreen v1.2b - Provides small-screen compatibility for the jQuery Superfish plugin.
 *
 * Developer's note:
 * Built as a part of the Superfish project for Drupal (http://drupal.org/project/superfish)
 * Found any bug? have any cool ideas? contact me right away! http://drupal.org/user/619294/contact
 *
 * jQuery version: 1.3.x or higher.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */

(function($) {
    $.fn.sfsmallscreen = function(options) {
        options = $.extend({
            mode: 'inactive',
            type: 'accordion',
            breakpoint: 768,
            breakpointUnit: 'px',
            useragent: '',
            title: '',
            addSelected: false,
            menuClasses: false,
            hyperlinkClasses: false,
            excludeClass_menu: '',
            excludeClass_hyperlink: '',
            includeClass_menu: '',
            includeClass_hyperlink: '',
            accordionButton: 1,
            expandText: 'Expand',
            collapseText: 'Collapse'
        }, options);

        // We need to clean up the menu from anything unnecessary.
        function refine(menu) {
            var
                refined = menu.clone(),
                // Things that should not be in the small-screen menus.
                rm = refined.find('span.sf-sub-indicator, span.sf-description'),
                // This is a helper class for those who need to add extra markup that shouldn't exist
                // in the small-screen versions.
                rh = refined.find('.sf-smallscreen-remove'),
                // Mega-menus has to be removed too.
                mm = refined.find('ul.sf-megamenu');
            for (var a = 0; a < rh.length; a++) {
                rh.eq(a).replaceWith(rh.eq(a).html());
            }
            for (var b = 0; b < rm.length; b++) {
                rm.eq(b).remove();
            }
            if (mm.length > 0) {
                mm.removeClass('sf-megamenu');
                var ol = refined.find('div.sf-megamenu-column > ol');
                for (var o = 0; o < ol.length; o++) {
                    ol.eq(o).replaceWith('<ul>' + ol.eq(o).html() + '</ul>');
                }
                var elements = ['div.sf-megamenu-column', '.sf-megamenu-wrapper > ol', 'li.sf-megamenu-wrapper'];
                for (var i = 0; i < elements.length; i++) {
                    obj = refined.find(elements[i]);
                    for (var t = 0; t < obj.length; t++) {
                        obj.eq(t).replaceWith(obj.eq(t).html());
                    }
                }
                refined.find('.sf-megamenu-column').removeClass('sf-megamenu-column');
            }
            refined.add(refined.find('*')).css({
                width: ''
            });
            return refined;
        }

        // Creating <option> elements out of the menu.
        function toSelect(menu, level) {
            var
                items = '',
                childLI = $(menu).children('li');
            for (var a = 0; a < childLI.length; a++) {
                var list = childLI.eq(a),
                    parent = list.children('a, span');
                for (var b = 0; b < parent.length; b++) {
                    var
                        item = parent.eq(b),
                        path = item.is('a') ? item.attr('href') : '',
                        // Class names modification.
                        itemClone = item.clone(),
                        classes = (options.hyperlinkClasses) ? ((options.excludeClass_hyperlink && itemClone.hasClass(options.excludeClass_hyperlink)) ? itemClone.removeClass(options.excludeClass_hyperlink).attr('class') : itemClone.attr('class')) : '',
                        classes = (options.includeClass_hyperlink && !itemClone.hasClass(options.includeClass_hyperlink)) ? ((options.hyperlinkClasses) ? itemClone.addClass(options.includeClass_hyperlink).attr('class') : options.includeClass_hyperlink) : classes;
                    // Retaining the active class if requested.
                    if (options.addSelected && item.hasClass('active')) {
                        classes += ' active';
                    }
                    // <option> has to be disabled if the item is not a link.
                    disable = item.is('span') || item.attr('href') == '#' ? ' disabled="disabled"' : '',
                        // Crystal clear.
                        subIndicator = 1 < level ? Array(level).join('-') + ' ' : '';
                    // Preparing the <option> element.
                    items += '<option value="' + path + '" class="' + classes + '"' + disable + '>' + subIndicator + $.trim(item.text()) + '</option>',
                        childUL = list.find('> ul');
                    // Using the function for the sub-menu of this item.
                    for (var u = 0; u < childUL.length; u++) {
                        items += toSelect(childUL.eq(u), level + 1);
                    }
                }
            }
            return items;
        }

        // Create the new version, hide the original.
        function convert(menu) {
            var menuID = menu.attr('id'),
                // Creating a refined version of the menu.
                refinedMenu = refine(menu);
            // Currently the plugin provides two reactions to small screens.
            // Converting the menu to a <select> element, and converting to an accordion version of the menu.
            if (options.type == 'accordion') {
                var
                    toggleID = menuID + '-toggle',
                    accordionID = menuID + '-accordion';
                // Making sure the accordion does not exist.
                if ($('#' + accordionID).length == 0) {
                    var
                        // Getting the style class.
                        styleClass = menu.attr('class').split(' ').filter(function(item) {
                            return item.indexOf('sf-style-') > -1 ? item : '';
                        }),
                        // Creating the accordion.
                        accordion = $(refinedMenu).attr('id', accordionID);
                    // Removing unnecessary classes.
                    accordion.removeClass('sf-horizontal sf-vertical sf-navbar sf-shadow sf-js-enabled');
                    // Adding necessary classes.
                    accordion.addClass('sf-accordion sf-hidden');
                    // Removing style attributes and any unnecessary class.
                    accordion.children('li').removeAttr('style').removeClass('sfHover');
                    // Doing the same and making sure all the sub-menus are off-screen (hidden).
                    accordion.find('ul').removeAttr('style').not('.sf-hidden').addClass('sf-hidden');
                    // Creating the accordion toggle switch.
                    var toggle = '<div class="sf-accordion-toggle ' + styleClass + '"><a href="#" id="' + toggleID + '"><span>' + options.title + '</span></a></div>';

                    // Adding Expand\Collapse buttons if requested.
                    if (options.accordionButton == 2) {
                        var parent = accordion.find('li.menuparent');
                        for (var i = 0; i < parent.length; i++) {
                            parent.eq(i).prepend('<a href="#" class="sf-accordion-button">' + options.expandText + '</a>');
                        }
                    }
                    // Inserting the according and hiding the original menu.
                    menu.before(toggle).before(accordion).hide();

                    var
                        accordionElement = $('#' + accordionID),
                        // Deciding what should be used as accordion buttons.
                        buttonElement = (options.accordionButton < 2) ? 'a.menuparent,span.nolink.menuparent' : 'a.sf-accordion-button',
                        button = accordionElement.find(buttonElement);

                    // Attaching a click event to the toggle switch.
                    $('#' + toggleID).bind('click', function(e) {
                        // Preventing the click.
                        e.preventDefault();
                        // Adding the sf-expanded class.
                        $(this).toggleClass('sf-expanded');

                        if (accordionElement.hasClass('sf-expanded')) {
                            // If the accordion is already expanded:
                            // Hiding its expanded sub-menus and then the accordion itself as well.
                            accordionElement.add(accordionElement.find('li.sf-expanded')).removeClass('sf-expanded')
                                .end().find('ul').hide()
                                // This is a bit tricky, it's the same trick that has been in use in the main plugin for sometime.
                                // Basically we'll add a class that keeps the sub-menu off-screen and still visible,
                                // and make it invisible and removing the class one moment before showing or hiding it.
                                // This helps screen reader software access all the menu items.
                                .end().hide().addClass('sf-hidden').show();
                            // Changing the caption of any existing accordion buttons to 'Expand'.
                            if (options.accordionButton == 2) {
                                accordionElement.find('a.sf-accordion-button').text(options.expandText);
                            }
                        } else {
                            // But if it's collapsed,
                            accordionElement.addClass('sf-expanded').hide().removeClass('sf-hidden').show();
                        }
                    });

                    // Attaching a click event to the buttons.
                    button.bind('click', function(e) {
                        // Making sure the buttons does not exist already.
                        if ($(this).closest('li').children('ul').length > 0) {
                            e.preventDefault();
                            // Selecting the parent menu items.
                            var parent = $(this).closest('li');
                            // Creating and inserting Expand\Collapse buttons to the parent menu items,
                            // of course only if not already happened.
                            if (options.accordionButton == 1 && parent.children('a.menuparent,span.nolink.menuparent').length > 0 && parent.children('ul').children('li.sf-clone-parent').length == 0) {
                                var
                                    // Cloning the hyperlink of the parent menu item.
                                    cloneLink = parent.children('a.menuparent,span.nolink.menuparent').clone(),
                                    // Wrapping the hyerplinks in <li>.
                                    cloneLink = $('<li class="sf-clone-parent" />').html(cloneLink);
                                // Adding a helper class and attaching them to the sub-menus.
                                parent.children('ul').addClass('sf-has-clone-parent').prepend(cloneLink);
                            }
                            // Once the button is clicked, collapse the sub-menu if it's expanded.
                            if (parent.hasClass('sf-expanded')) {
                                parent.children('ul').slideUp('fast', function() {
                                    // Doing the accessibility trick after hiding the sub-menu.
                                    $(this).closest('li').removeClass('sf-expanded').end().addClass('sf-hidden').show();
                                });
                                // Changing the caption of the inserted Collapse link to 'Expand', if any is inserted.
                                if (options.accordionButton == 2 && parent.children('.sf-accordion-button').length > 0) {
                                    parent.children('.sf-accordion-button').text(options.expandText);
                                }
                            }
                            // Otherwise, expand the sub-menu.
                            else {
                                // Doing the accessibility trick and then showing the sub-menu.
                                parent.children('ul').hide().removeClass('sf-hidden').slideDown('fast')
                                    // Changing the caption of the inserted Expand link to 'Collape', if any is inserted.
                                    .end().addClass('sf-expanded').children('a.sf-accordion-button').text(options.collapseText)
                                    // Hiding any expanded sub-menu of the same level.
                                    .end().siblings('li.sf-expanded').children('ul')
                                    .slideUp('fast', function() {
                                        // Doing the accessibility trick after hiding it.
                                        $(this).closest('li').removeClass('sf-expanded').end().addClass('sf-hidden').show();
                                    })
                                    // Assuming Expand\Collapse buttons do exist, resetting captions, in those hidden sub-menus.
                                    .parent().children('a.sf-accordion-button').text(options.expandText);
                            }
                        }
                    });
                }
            } else {
                var
                    // Class names modification.
                    menuClone = menu.clone(),
                    classes = (options.menuClasses) ? ((options.excludeClass_menu && menuClone.hasClass(options.excludeClass_menu)) ? menuClone.removeClass(options.excludeClass_menu).attr('class') : menuClone.attr('class')) : '',
                    classes = (options.includeClass_menu && !menuClone.hasClass(options.includeClass_menu)) ? ((options.menuClasses) ? menuClone.addClass(options.includeClass_menu).attr('class') : options.includeClass_menu) : classes,
                    classes = (classes) ? ' class="' + classes + '"' : '';

                // Making sure the <select> element does not exist already.
                if ($('#' + menuID + '-select').length == 0) {
                    // Creating the <option> elements.
                    var newMenu = toSelect(refinedMenu, 1),
                        // Creating the <select> element and assigning an ID and class name.
                        selectList = $('<select' + classes + ' id="' + menuID + '-select"/>')
                        // Attaching the title and the items to the <select> element.
                        .html('<option>' + options.title + '</option>' + newMenu)
                        // Attaching an event then.
                        .change(function() {
                            // Except for the first option that is the menu title and not a real menu item.
                            if ($('option:selected', this).index()) {
                                window.location = selectList.val();
                            }
                        });
                    // Applying the addSelected option to it.
                    if (options.addSelected) {
                        selectList.find('.active').attr('selected', !0);
                    }
                    // Finally inserting the <select> element into the document then hiding the original menu.
                    menu.before(selectList).hide();
                }
            }
        }

        // Turn everything back to normal.
        function turnBack(menu) {
            var
                id = '#' + menu.attr('id');
            // Removing the small screen version.
            $(id + '-' + options.type).remove();
            // Removing the accordion toggle switch as well.
            if (options.type == 'accordion') {
                $(id + '-toggle').parent('div').remove();
            }
            // Crystal clear!
            $(id).show();
        }

        // Return original object to support chaining.
        // Although this is unnecessary because of the way the module uses these plugins.
        for (var s = 0; s < this.length; s++) {
            var
                menu = $(this).eq(s),
                mode = options.mode;
            // The rest is crystal clear, isn't it? :)
            if (mode == 'always_active') {
                convert(menu);
            } else if (mode == 'window_width') {
                var breakpoint = (options.breakpointUnit == 'em') ? (options.breakpoint * parseFloat($('body').css('font-size'))) : options.breakpoint,
                    windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
                    timer;
                if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint) {
                    convert(menu);
                } else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
                    convert(menu);
                }
                $(window).resize(function() {
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                        if ((typeof Modernizr === 'undefined' || typeof Modernizr.mq !== 'function') && windowWidth < breakpoint) {
                            convert(menu);
                        } else if (typeof Modernizr !== 'undefined' && typeof Modernizr.mq === 'function' && Modernizr.mq('(max-width:' + (breakpoint - 1) + 'px)')) {
                            convert(menu);
                        } else {
                            turnBack(menu);
                        }
                    }, 50);
                });
            } else if (mode == 'useragent_custom') {
                if (options.useragent != '') {
                    var ua = RegExp(options.useragent, 'i');
                    if (navigator.userAgent.match(ua)) {
                        convert(menu);
                    }
                }
            } else if (mode == 'useragent_predefined' && navigator.userAgent.match(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i)) {
                convert(menu);
            }
        }
        return this;
    }
})(jQuery);;
/*
 * Supposition v0.2 - an optional enhancer for Superfish jQuery menu widget.
 *
 * Copyright (c) 2008 Joel Birch - based mostly on work by Jesse Klaasse and credit goes largely to him.
 * Special thanks to Karl Swedberg for valuable input.
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 */
/*
 * This is not the original jQuery Supposition plugin.
 * Please refer to the README for more information.
 */

(function($) {
    $.fn.supposition = function() {
        var $w = $(window),
            /*do this once instead of every onBeforeShow call*/
            _offset = function(dir) {
                return window[dir == 'y' ? 'pageYOffset' : 'pageXOffset'] ||
                    document.documentElement && document.documentElement[dir == 'y' ? 'scrollTop' : 'scrollLeft'] ||
                    document.body[dir == 'y' ? 'scrollTop' : 'scrollLeft'];
            },
            onHide = function() {
                this.css({
                    bottom: ''
                });
            },
            onBeforeShow = function() {
                this.each(function() {
                    var $u = $(this);
                    $u.css('display', 'block');
                    var $mul = $u.closest('.sf-menu'),
                        level = $u.parents('ul').length,
                        menuWidth = $u.width(),
                        menuParentWidth = $u.closest('li').outerWidth(true),
                        menuParentLeft = $u.closest('li').offset().left,
                        totalRight = $w.width() + _offset('x'),
                        menuRight = $u.offset().left + menuWidth,
                        exactMenuWidth = (menuRight > (menuParentWidth + menuParentLeft)) ? menuWidth - (menuRight - (menuParentWidth + menuParentLeft)) : menuWidth;
                    if ($u.parents('.sf-js-enabled').hasClass('rtl')) {
                        if (menuParentLeft < exactMenuWidth) {
                            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)) {
                                $u.css({
                                    left: 0,
                                    right: 'auto'
                                });
                            } else {
                                $u.css({
                                    left: menuParentWidth + 'px',
                                    right: 'auto'
                                });
                            }
                        }
                    } else {
                        if (menuRight > totalRight && menuParentLeft > menuWidth) {
                            if (($mul.hasClass('sf-horizontal') && level == 1) || ($mul.hasClass('sf-navbar') && level == 2)) {
                                $u.css({
                                    right: 0,
                                    left: 'auto'
                                });
                            } else {
                                $u.css({
                                    right: menuParentWidth + 'px',
                                    left: 'auto'
                                });
                            }
                        }
                    }
                    var windowHeight = $w.height(),
                        offsetTop = $u.offset().top,
                        menuParentShadow = ($mul.hasClass('sf-shadow') && $u.css('padding-bottom').length > 0) ? parseInt($u.css('padding-bottom').slice(0, -2)) : 0,
                        menuParentHeight = ($mul.hasClass('sf-vertical')) ? '-' + menuParentShadow : $u.parent().outerHeight(true) - menuParentShadow,
                        menuHeight = $u.height(),
                        baseline = windowHeight + _offset('y');
                    var expandUp = ((offsetTop + menuHeight > baseline) && (offsetTop > menuHeight));
                    if (expandUp) {
                        $u.css({
                            bottom: menuParentHeight + 'px',
                            top: 'auto'
                        });
                    }
                    $u.css('display', 'none');
                });
            };

        return this.each(function() {
            var o = $.fn.superfish.o[this.serial]; /* get this menu's options */

            /* if callbacks already set, store them */
            var _onBeforeShow = o.onBeforeShow,
                _onHide = o.onHide;

            $.extend($.fn.superfish.o[this.serial], {
                onBeforeShow: function() {
                    onBeforeShow.call(this); /* fire our Supposition callback */
                    _onBeforeShow.call(this); /* fire stored callbacks */
                },
                onHide: function() {
                    onHide.call(this); /* fire our Supposition callback */
                    _onHide.call(this); /* fire stored callbacks */
                }
            });
        });
    };
})(jQuery);;
/*
 * Superfish v1.4.8 - jQuery menu widget
 * Copyright (c) 2008 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * CHANGELOG: http://users.tpg.com.au/j_birch/plugins/superfish/changelog.txt
 */
/*
 * This is not the original jQuery Superfish plugin.
 * Please refer to the README for more information.
 */

(function($) {
    $.fn.superfish = function(op) {
        var sf = $.fn.superfish,
            c = sf.c,
            $arrow = $(['<span class="', c.arrowClass, '"> &#187;</span>'].join('')),
            over = function() {
                var $$ = $(this),
                    menu = getMenu($$);
                clearTimeout(menu.sfTimer);
                $$.showSuperfishUl().siblings().hideSuperfishUl();
            },
            out = function() {
                var $$ = $(this),
                    menu = getMenu($$),
                    o = sf.op;
                clearTimeout(menu.sfTimer);
                menu.sfTimer = setTimeout(function() {
                    if ($$.children('.sf-clicked').length == 0) {
                        o.retainPath = ($.inArray($$[0], o.$path) > -1);
                        $$.hideSuperfishUl();
                        if (o.$path.length && $$.parents(['li.', o.hoverClass].join('')).length < 1) {
                            over.call(o.$path);
                        }
                    }
                }, o.delay);
            },
            getMenu = function($menu) {
                var menu = $menu.parents(['ul.', c.menuClass, ':first'].join(''))[0];
                sf.op = sf.o[menu.serial];
                return menu;
            },
            addArrow = function($a) {
                $a.addClass(c.anchorClass).append($arrow.clone());
            };

        return this.each(function() {
            var s = this.serial = sf.o.length;
            var o = $.extend({}, sf.defaults, op);
            o.$path = $('li.' + o.pathClass, this).slice(0, o.pathLevels),
                p = o.$path;
            for (var l = 0; l < p.length; l++) {
                p.eq(l).addClass([o.hoverClass, c.bcClass].join(' ')).filter('li:has(ul)').removeClass(o.pathClass);
            }
            sf.o[s] = sf.op = o;

            $('li:has(ul)', this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over, out).each(function() {
                    if (o.autoArrows) addArrow($(this).children('a:first-child, span.nolink:first-child'));
                })
                .not('.' + c.bcClass)
                .hideSuperfishUl();

            var $a = $('a, span.nolink', this);
            $a.each(function(i) {
                var $li = $a.eq(i).parents('li');
                $a.eq(i).focus(function() {
                    over.call($li);
                }).blur(function() {
                    out.call($li);
                });
            });
            o.onInit.call(this);

        }).each(function() {
            var menuClasses = [c.menuClass],
                addShadow = true;
            if ($.browser !== undefined) {
                if ($.browser.msie && $.browser.version < 7) {
                    addShadow = false;
                }
            }
            if (sf.op.dropShadows && addShadow) {
                menuClasses.push(c.shadowClass);
            }
            $(this).addClass(menuClasses.join(' '));
        });
    };

    var sf = $.fn.superfish;
    sf.o = [];
    sf.op = {};
    sf.IE7fix = function() {
        var o = sf.op;
        if ($.browser !== undefined) {
            if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity != undefined) {
                this.toggleClass(sf.c.shadowClass + '-off');
            }
        }
    };
    sf.c = {
        bcClass: 'sf-breadcrumb',
        menuClass: 'sf-js-enabled',
        anchorClass: 'sf-with-ul',
        arrowClass: 'sf-sub-indicator',
        shadowClass: 'sf-shadow'
    };
    sf.defaults = {
        hoverClass: 'sfHover',
        pathClass: 'overideThisToUse',
        pathLevels: 1,
        delay: 800,
        animation: {
            opacity: 'show'
        },
        speed: 'fast',
        autoArrows: true,
        dropShadows: true,
        disableHI: false, // true disables hoverIntent detection
        onInit: function() {}, // callback functions
        onBeforeShow: function() {},
        onShow: function() {},
        onHide: function() {}
    };
    $.fn.extend({
        hideSuperfishUl: function() {
            var o = sf.op,
                not = (o.retainPath === true) ? o.$path : '';
            o.retainPath = false;
            var $ul = $(['li.', o.hoverClass].join(''), this).add(this).not(not).removeClass(o.hoverClass)
                .children('ul').addClass('sf-hidden');
            o.onHide.call($ul);
            return this;
        },
        showSuperfishUl: function() {
            var o = sf.op,
                sh = sf.c.shadowClass + '-off',
                $ul = this.addClass(o.hoverClass)
                .children('ul.sf-hidden').hide().removeClass('sf-hidden');
            sf.IE7fix.call($ul);
            o.onBeforeShow.call($ul);
            $ul.animate(o.animation, o.speed, function() {
                sf.IE7fix.call($ul);
                o.onShow.call($ul);
            });
            return this;
        }
    });
})(jQuery);;
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend(jQuery.easing, {
    def: 'easeOutQuad',
    swing: function(x, t, b, c, d) {
        //alert(jQuery.easing.default);
        return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
    },
    easeInQuad: function(x, t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function(x, t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    easeInCubic: function(x, t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function(x, t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function(x, t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function(x, t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function(x, t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function(x, t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function(x, t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function(x, t, b, c, d) {
        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function(x, t, b, c, d) {
        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function(x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function(x, t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function(x, t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOutCirc: function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function(x, t, b, c, d) {
        var s = 1.70158;
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function(x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function(x, t, b, c, d) {
        return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b;
    },
    easeOutBounce: function(x, t, b, c, d) {
        if ((t /= d) < (1 / 2.75)) {
            return c * (7.5625 * t * t) + b;
        } else if (t < (2 / 2.75)) {
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
        } else if (t < (2.5 / 2.75)) {
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
        }
    },
    easeInOutBounce: function(x, t, b, c, d) {
        if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b;
        return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
;
/*
 * Supersubs v0.4b - jQuery plugin
 * Copyright (c) 2013 Joel Birch
 *
 * Dual licensed under the MIT and GPL licenses:
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 * This plugin automatically adjusts submenu widths of suckerfish-style menus to that of
 * their longest list item children. If you use this, please expect bugs and report them
 * to the jQuery Google Group with the word 'Superfish' in the subject line.
 *
 */
/*
 * This is not the original jQuery Supersubs plugin.
 * Please refer to the README for more information.
 */

(function($) { // $ will refer to jQuery within this closure
    $.fn.supersubs = function(options) {
        var opts = $.extend({}, $.fn.supersubs.defaults, options);
        // return original object to support chaining
        // Although this is unnecessary due to the way the module uses these plugins.
        for (var a = 0; a < this.length; a++) {
            // cache selections
            var $$ = $(this).eq(a),
                // support metadata
                o = $.meta ? $.extend({}, opts, $$.data()) : opts;
            // Jump one level if it's a "NavBar"
            if ($$.hasClass('sf-navbar')) {
                $$ = $$.children('li').children('ul');
            }
            // cache all ul elements
            var $ULs = $$.find('ul'),
                // get the font size of menu.
                // .css('fontSize') returns various results cross-browser, so measure an em dash instead
                fontsize = $('<li id="menu-fontsize">&#8212;</li>'),
                size = fontsize.attr('style', 'padding:0;position:absolute;top:-99999em;width:auto;')
                .appendTo($$)[0].clientWidth; //clientWidth is faster than width()
            // remove em dash
            fontsize.remove();

            // loop through each ul in menu
            for (var b = 0; b < $ULs.length; b++) {
                var
                    // cache this ul
                    $ul = $ULs.eq(b);
                // If a multi-column sub-menu, and only if correctly configured.
                if (o.megamenu && $ul.hasClass('sf-megamenu') && $ul.find('.sf-megamenu-column').length > 0) {
                    // Look through each column.
                    var $column = $ul.find('div.sf-megamenu-column > ol'),
                        // Overall width.
                        mwWidth = 0;
                    for (var d = 0; d < $column.length; d++) {
                        resize($column.eq(d));
                        // New column width, in pixels.
                        var colWidth = $column.width();
                        // Just a trick to convert em unit to px.
                        $column.css({
                                width: colWidth
                            })
                            // Making column parents the same size.
                            .parents('.sf-megamenu-column').css({
                                width: colWidth
                            });
                        // Overall width.
                        mwWidth += parseInt(colWidth);
                    }
                    // Resizing the columns container too.
                    $ul.add($ul.find('li.sf-megamenu-wrapper, li.sf-megamenu-wrapper > ol')).css({
                        width: mwWidth
                    });
                } else {
                    resize($ul);
                }
            }
        }

        function resize($ul) {
            var
                // get all (li) children of this ul
                $LIs = $ul.children(),
                // get all anchor grand-children
                $As = $LIs.children('a');
            // force content to one line and save current float property
            $LIs.css('white-space', 'nowrap');
            // remove width restrictions and floats so elements remain vertically stacked
            $ul.add($LIs).add($As).css({
                float: 'none',
                width: 'auto'
            });
            // this ul will now be shrink-wrapped to longest li due to position:absolute
            // so save its width as ems.
            var emWidth = $ul.get(0).clientWidth / size;
            // add more width to ensure lines don't turn over at certain sizes in various browsers
            emWidth += o.extraWidth;
            // restrict to at least minWidth and at most maxWidth
            if (emWidth > o.maxWidth) {
                emWidth = o.maxWidth;
            } else if (emWidth < o.minWidth) {
                emWidth = o.minWidth;
            }
            emWidth += 'em';
            // set ul to width in ems
            $ul.css({
                width: emWidth
            });
            // restore li floats to avoid IE bugs
            // set li width to full width of this ul
            // revert white-space to normal
            $LIs.add($As).css({
                float: '',
                width: '',
                whiteSpace: ''
            });
            // update offset position of descendant ul to reflect new width of parent.
            // set it to 100% in case it isn't already set to this in the CSS
            for (var c = 0; c < $LIs.length; c++) {
                var $childUl = $LIs.eq(c).children('ul');
                var offsetDirection = $childUl.css('left') !== undefined ? 'left' : 'right';
                $childUl.css(offsetDirection, '100%');
            }
        }
        return this;
    };
    // expose defaults
    $.fn.supersubs.defaults = {
        megamenu: true, // define width for multi-column sub-menus and their columns.
        minWidth: 12, // requires em unit.
        maxWidth: 27, // requires em unit.
        extraWidth: 1 // extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
    };
})(jQuery); // plugin code ends
;
/**
 * @file
 * The Superfish Drupal Behavior to apply the Superfish jQuery plugin to lists.
 */

(function($) {
    Drupal.behaviors.superfish = {
        attach: function(context, settings) {
            // Take a look at each list to apply Superfish to.
            $.each(settings.superfish || {}, function(index, options) {
                // Process all Superfish lists.
                $('#superfish-' + options.id, context).once('superfish', function() {
                    var list = $(this);

                    // Check if we are to apply the Supersubs plug-in to it.
                    if (options.plugins || false) {
                        if (options.plugins.supersubs || false) {
                            list.supersubs(options.plugins.supersubs);
                        }
                    }

                    // Apply Superfish to the list.
                    list.superfish(options.sf);

                    // Check if we are to apply any other plug-in to it.
                    if (options.plugins || false) {
                        if (options.plugins.touchscreen || false) {
                            list.sftouchscreen(options.plugins.touchscreen);
                        }
                        if (options.plugins.smallscreen || false) {
                            list.sfsmallscreen(options.plugins.smallscreen);
                        }
                        if (options.plugins.automaticwidth || false) {
                            list.sfautomaticwidth();
                        }
                        if (options.plugins.supposition || false) {
                            list.supposition();
                        }
                        if (options.plugins.bgiframe || false) {
                            list.find('ul').bgIframe({
                                opacity: false
                            });
                        }
                    }
                });
            });
        }
    };
})(jQuery);;