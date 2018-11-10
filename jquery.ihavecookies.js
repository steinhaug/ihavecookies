/*!
 * ihavecookies - jQuery plugin for displaying cookie/privacy message
 * v0.3.2 + 0.2
 *
 * Copyright (c) 2018 Ketan Mistry (https://iamketan.com.au)
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Changes made from above version:
 * v0.1
 * - Updated so that the settings reflects the already set preferences.
 * - Added button to reopen the cookie preferences
 * v0.2
 * - Added compact mode, model 1
 * - Added all cookies preselected for model 2
 *   Kim Steinhaug / kim@steinhaug.com 
 * 
 */
(function($) {

    /*
    |--------------------------------------------------------------------------
    | Cookie Message
    |--------------------------------------------------------------------------
    |
    | Displays the cookie message on first visit or 30 days after their
    | last visit.
    |
    | Options:
    |  - title : Title for the popup
    |  - titleCompact : Title for the popup, compact mode
    |  - message : Message to display within the popup
    |  - messageCompact : Message to display within the popup, compact mode
    |  - link : Link to privacy page
    |  - delay : Time before the popup is displayed after page load
    |  - expires : Days for the cookie to expire
    |  - onDisplay : Optional callback function when popup is displayed
    |  - onAccept : Optional callback function when 'Accept' button is clicked
    |  - uncheckBoxes : Unchecks all checkboxes on page load that have class
    |                   .ihavecookies applied to them. Set to true to turn this
    |                   option on
    | - moreInfoLabel : Label for the link to privacy policy
    | - acceptBtnLabel : Label for the accept cookies button
    | - cookieTypes : Array of cookie types to list with checkboxes
    | - GDPRmode : advanced or compact, reflects model 2 and model 1 from example page
    | - preselectAllCookietypes : In advanced mode, preselects all cookies first time
    |
    */
    $.fn.ihavecookies = function(options) {

        var $element = $(this);

        // Set defaults
        var settings = $.extend({
            forceDisplayPanel: false,
            GDPRmode: 'advanced', // compact, advanced
            preselectAllCookietypes: true,
            fixedCookieTypeLabel:'Necessary',
            fixedCookieTypeDesc: 'These are essential for the website to work correctly.',
            cookieTypes: [
                {
                    type: 'Site Preferences',
                    value: 'preferences',
                    description: 'These are cookies that are related to your site preferences, e.g. remembering your username, site colours, etc.'
                },
                {
                    type: 'Analytics',
                    value: 'analytics',
                    description: 'Cookies related to site visits, browser types, etc.'
                },
                {
                    type: 'Marketing',
                    value: 'marketing',
                    description: 'Cookies related to marketing, e.g. newsletters, social media, etc'
                }
            ],
            title: '&#x1F36A; Implied Consent: Cookies info',
            message: 'Cookies enable you to use shopping carts and to personalize your experience on our sites, tell us which parts of our websites people have visited, help us measure the effectiveness of ads and web searches, and give us insights into user behavior so we can improve our communications and products.',
            titleCompact: 'This site uses cookies',
            messageCompact: 'By clicking "Accept Cookies" or by continuing to use our website, you give your consent and you agree to the use of these Cookies.',
            link: '/privacy-policy',
            moreInfoLabel: 'More information',
            delay: 600,
            expires: 30,
            acceptBtnLabel: 'Accept Cookies',
            advancedBtnLabel: 'Customise Cookies',
            cookieTypesTitle: 'Select cookies to accept',
            uncheckBoxes: false,
            onDisplay: function(){},
            onDisplayCookieSelector: function(){},
            onAccept: function(){},
            code_needed_only_for_example: false
        }, options);

        var myCookie = getCookie('cookieControl');
        var myCookiePrefs = getCookie('cookieControlPrefs');
        if (!myCookie || !myCookiePrefs || settings.forceDisplayPanel) {
            var myCookie = getCookie('cookieControl');

            // Set the 'necessary' cookie type checkbox which can not be unchecked
            var cookieTypes = '<li><input type="checkbox" name="gdpr[]" value="necessary" checked="checked" disabled="disabled"> <label title="' + settings.fixedCookieTypeDesc + '">' + settings.fixedCookieTypeLabel + '</label></li>';

            // Generate list of cookie type checkboxes
            $.each(settings.cookieTypes, function(index, field) {
                if (field.type !== '' && field.value !== '') {
                    var cookieTypeDescription = '';
                    if (field.description !== false){
                        cookieTypeDescription = ' title="' + field.description + '"';
                    }
                    cookieTypes += '<li><input type="checkbox" id="gdpr-cookietype-' + field.value + '" name="gdpr[]" value="' + field.value + '" data-auto="on"> <label for="gdpr-cookietype-' + field.value + '"' + cookieTypeDescription + '>' + field.type + '</label></li>';
                }

            });

            // Display cookie message on page
            if( settings.GDPRmode == 'compact' ){
                var cookieMessage = '<div id="gdpr-cookie-message" class="gdpr-compact"><h4>' + 
                settings.titleCompact + '</h4><p>' + settings.messageCompact + ' ' + 
                '<div id="gdpr-cookie-types" style="display:none;"><h5>' + settings.cookieTypesTitle + '</h5><ul>' + cookieTypes + 
                '</ul></div><p>' + 
                '<button id="gdpr-cookie-policy" type="button">' + settings.moreInfoLabel + '</button>' + 
                '<button id="gdpr-cookie-accept" type="button">' + settings.acceptBtnLabel + '</button>' +
                '</p></div>';
            } else {
                var cookieMessage = '<div id="gdpr-cookie-message"><h4>' + 
                settings.title + '</h4><p>' + settings.message + ' <a href="' + settings.link + '">' + settings.moreInfoLabel + 
                '</a><div id="gdpr-cookie-types" style="display:none;"><h5>' + settings.cookieTypesTitle + '</h5><ul>' + cookieTypes + 
                '</ul></div><p>' + 
                '<button id="gdpr-cookie-advanced" type="button">' + settings.advancedBtnLabel + '</button>' + 
                '<button id="gdpr-cookie-accept" type="button">' + settings.acceptBtnLabel + '</button>' +
                '</p></div>';
            }

            setTimeout(function(){
                $($element).append(cookieMessage);
                $('#gdpr-cookie-message').hide().fadeIn('slow');

                // Run callback function
                settings.onDisplay.call(this);
            }, settings.delay);

            // Compact mode, cookie policy button
            $('body').on('click','#gdpr-cookie-policy', function(e){

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                window.location = settings.link;

            });

            // When accept button is clicked drop cookie
            $('body').on('click','#gdpr-cookie-accept', function(e){

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                // Set cookie
                dropCookie(true, settings.expires);

                if(!myCookiePrefs){
                    // If 'data-auto' is set to ON, tick all checkboxes because
                    // the user hasn't clicked the customise cookies button
                    $('input[name="gdpr[]"][data-auto="on"]').prop('checked', true);
                } else {
                    $('input[name="gdpr[]"][data-auto="on"]').prop('checked', false);
                    if( $('#gdpr-cookietype-marketing').data('auto') == 'on' ){
                        if ($.fn.ihavecookies.preference('marketing') === true) {
                            $('#gdpr-cookietype-marketing').prop('checked', true);
                        }
                    }
                    if( $('#gdpr-cookietype-preferences').data('auto') == 'on' ){
                        if ($.fn.ihavecookies.preference('preferences') === true) {
                            $('#gdpr-cookietype-preferences').prop('checked', true);
                        }
                    }
                    if( $('#gdpr-cookietype-analytics').data('auto') == 'on' ){
                        if ($.fn.ihavecookies.preference('analytics') === true) {
                            $('#gdpr-cookietype-analytics').prop('checked', true);
                        }
                    }
                }

                // Save users cookie preferences (in a cookie!)
                var prefs = [];
                $.each($('input[name="gdpr[]"]').serializeArray(), function(i, field){
                    prefs.push(field.value);
                });
                // https://www.webdeveloper.com/forum/d/77256-strip-double-quotes-of-beginning-and-end-of-string
                setCookie('cookieControlPrefs', JSON.stringify(prefs).replace(/(^")|("$)|(\\)/g, ''), 365);

                // Run callback function
                settings.onAccept.call(this);
            });

            // Toggle advanced cookie options
            $('body').on('click', '#gdpr-cookie-advanced', function(e){

                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                cbReturn = settings.onDisplayCookieSelector.call(this);

                if(settings.code_needed_only_for_example){
                    if (cbReturn !== undefined) {
                        settings.preselectAllCookietypes = cbReturn;
                    }
                }

                // Uncheck all checkboxes except for the disabled 'necessary'
                // one and set 'data-auto' to OFF for all. The user can now
                // select the cookies they want to accept.
                $('input[name="gdpr[]"]:not(:disabled)').attr('data-auto', 'off').prop('checked', false);
                if( settings.preselectAllCookietypes ){
                    if ($.fn.ihavecookies.preference_state('marketing') !== false) {
                        $('#gdpr-cookietype-marketing').prop('checked', true);
                    }
                    if ($.fn.ihavecookies.preference_state('preferences') !== false) {
                        $('#gdpr-cookietype-preferences').prop('checked', true);
                    }
                    if ($.fn.ihavecookies.preference_state('analytics') !== false) {
                        $('#gdpr-cookietype-analytics').prop('checked', true);
                    }
                } else {
                    if ($.fn.ihavecookies.preference('marketing') === true) {
                        $('#gdpr-cookietype-marketing').prop('checked', true);
                    }
                    if ($.fn.ihavecookies.preference('preferences') === true) {
                        $('#gdpr-cookietype-preferences').prop('checked', true);
                    }
                    if ($.fn.ihavecookies.preference('analytics') === true) {
                        $('#gdpr-cookietype-analytics').prop('checked', true);
                    }
                }

                $('#gdpr-cookie-types').slideDown('fast', function(){
                    $('#gdpr-cookie-advanced').prop('disabled', true);
                });
            });

        } else {
            var cookieVal = true;
            if (myCookie == 'false') {
                cookieVal = false;
            }
            dropCookie(cookieVal, settings.expires);
        }

        // Uncheck any checkboxes on page load
        if (settings.uncheckBoxes === true){
            $('input[type="checkbox"].ihavecookies').prop('checked', false);
        }

        // - - - - - - - - - - - - - - - - - - -
        // Update example page settings display
        if(settings.code_needed_only_for_example){
            if (settings.GDPRmode === 'advanced')
                $("#example_opt4a").prop("checked", true);
                else
                $("#example_opt4b").prop("checked", true);
            $("#example_opt5").prop("checked", settings.preselectAllCookietypes);
        }
        // - - - - - - - - - - - - - - - - - - -

    };

    // Method to get cookie value
    $.fn.ihavecookies.cookie = function() {
        var preferences = getCookie('cookieControlPrefs');
        return JSON.parse(preferences);
    };

    // Method to check if user cookie preference exists
    $.fn.ihavecookies.preference = function(cookieTypeValue) {
        var control = getCookie('cookieControl');
        var preferences = getCookie('cookieControlPrefs');
        preferences = JSON.parse(preferences);
        if (control === false) {
            return false;
        }
        if (preferences === false || preferences.indexOf(cookieTypeValue) === -1) {
            return false;
        }
        return true;
    };
    // Method to check if user cookie preference exists, enabled or disabled
    $.fn.ihavecookies.preference_state = function(cookieTypeValue) {
        var control = getCookie('cookieControl');
        var preferences = getCookie('cookieControlPrefs');
        preferences = JSON.parse(preferences);
        if (control === false || preferences === false) {
            return null;
        }
        if (preferences.indexOf(cookieTypeValue) === -1) {
            return false;
        }
        return true;
    };

    /*
    |--------------------------------------------------------------------------
    | Drop Cookie
    |--------------------------------------------------------------------------
    |
    | Function to drop the cookie with a boolean value of true.
    |
    */
    var dropCookie = function(value, expiryDays) {
        setCookie('cookieControl', value, expiryDays);
        $('#gdpr-cookie-message').fadeOut('fast', function() {
            $(this).remove();
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Set Cookie
    |--------------------------------------------------------------------------
    |
    | Sets cookie with 'name' and value of 'value' for 'expiry_days'.
    |
    */
    var setCookie = function(name, value, expiry_days) {
        var d = new Date();
        d.setTime(d.getTime() + (expiry_days*24*60*60*1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
        return getCookie(name);
    };

    /*
    |--------------------------------------------------------------------------
    | Get Cookie
    |--------------------------------------------------------------------------
    |
    | Gets cookie called 'name'.
    |
    */
    var getCookie = function(name) {
        var cookie_name = name + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(cookie_name) === 0) {
                return c.substring(cookie_name.length, c.length).replace(/(^")|("$)|(\\)/g, '');
            }
        }
        return false;
    };

}(jQuery));
