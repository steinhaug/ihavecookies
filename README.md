# jQuery Cookie Consent Plugin (WIP)

A lightweight jQuery plugin that displays a cookie &#x1F36A; consent message as required by EU regulation. The plugin displays a message on the user's first visit to your website and, by default, again 30 days after their last visit.

The visitor __must__ click the accept button within the popup for the cookie to be set thus granting their consent (GDPR).

By reopening the popup the user may revise their consents, this makes it perfect for the "*implied consent model*". See example.php for good description of this method.

As described by the [Five Models for Cookie Law Consent](https://www.cookielaw.org/media/105101/five-models-for-cookie-law-consent.pdf) this plugin will cover model 1 and model 2.

## Usage

Download the latest version and include it within your page along with jQuery (1.7.4 or later).

```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.x.x/jquery.min.js"></script>
<script type="text/javascript" src="jquery.ihavecookies.min.js"></script>
```

Then initialise the plugin using:

```
$('body').ihavecookies();
```

This will append the cookie popup to the `<body>` tag with the default settings and message.

### Settings

There are a number of options available to help with customisation, defaults are used in description:

```
$('body').ihavecookies({
    // boolean, display the popup regardless of existing cookies or not
    forceDisplayPanel: false, 

    // advanced or compact, reflects model 2 and model 1 in example page.
    GDPRmode: 'advanced',

    // Default preselects all cookies in advanced mode
    preselectAllCookietypes: true,

    // A custom title for the popup
    title: '&#x1F36A; Implied Consent: Cookies info',

    // Add your own cookie message here, if you prefer not to use the
    // default one. HTML can be included within this message.
    message: "Cookies enable you to use shopping carts and to personalize
              your experience on our sites, tell us which parts of our
              websites people have visited, help us measure the effectiveness
              of ads and web searches, and give us insights into user
              behavior so we can improve our communications and products.",

    // Compact mode has slightly different behaviour thus requiring alterations
    // within the message displayed. A custom title and message for the popup. 
    // HTML can be included within this message.
    titleCompact: "This site uses cookies",
    messageCompact: 'By clicking "Accept Cookies" or by continuing to use our
              website, you give your consent and you agree to the use of
              these Cookies.',

    // Link to your privacy policy for more information
    link: "/privacy-policy",

    // Time before the popup is displayed after page load (in milliseconds)
    delay: 600,

    // Days for the cookie to expire
    expires: 30,

    // Optional callbacks.
    onDisplay: function(){
        // Popup is displayed ...
    },
    onAccept: function() {
        // 'Accept' button was clicked...
    },

    // Unchecks all checkboxes on page load that have class .ihavecookies
    // applied to them. Set to true to turn this option on
    uncheckBoxes: false,

    // Set labels for links and buttons
    moreInfoLabel: 'More information',
    acceptBtnLabel: 'Accept Cookies',
    advancedBtnLabel: 'Customise Cookies',
    cookieTypesTitle: 'Select cookies to accept',

    // Labels and description for the "Necessary" cookie type
    fixedCookieTypeLabel:'Necessary',
    fixedCookieTypeDesc: 'These are essential for the website to work 
                          correctly.',

    // Array of cookie types for which to show checkboxes.
    // - type: Type of cookie. This is also the label that is displayed.
    // - value: Value of the checkbox so it can be easily identified in
    //          your application.
    // - description: Description for this cookie type. Displayed in
    //                title attribute.
    cookieTypes: [
            {
                type: 'Site Preferences',
                value: 'preferences',
                description: 'These are cookies that are related to your site 
                preferences, e.g. remembering your username, site colours, etc.'
            },
            {
                type: 'Analytics',
                value: 'analytics',
                description: 'Cookies related to site visits, browser types, 
                              etc.'
            },
            {
                type: 'Marketing',
                value: 'marketing',
                description: 'Cookies related to marketing, e.g. newsletters, 
                              social media, etc'
            }
    ],
});
```
### Methods

`$.fn.ihavecookies.cookie()` returns the value of the `cookieControlPrefs` cookie.

`$.fn.ihavecookies.preference(cookieTypeValue)` returns `true` if the the cookie type has been accepted, otherwise `false`.


### Styling

ihavecookies.css contains the default style used in the example. The cookie message has an ID of `#gdpr-cookie-message`.

### Cookie

When the visitor accepts the message, the cookie `cookieControl` with value `true` is set along with cookie `cookieControlPrefs` which contains an array of accepted cookie types e.g. `["preferences","analytics","marketing"]`. This will enable you to perform additional checks where necessary within your application (with regard to GDPR regulations).

## Example

An example of the cookie consent message can be viewed at https://projects.steinhaug.com/ihavecookies/ or in the accompanying `example.php` file.

Make sure to reopen the preferences so that you get to change your existing preferences aswell.

## Authors
- [Ketan Mistry](https://iamketan.com.au) ([@ketanumistry](https://twitter.com/ketanumistry))
- [Kim Steinhaug](https://github.com/steinhaug) ([@steinhaug](https://twitter.com/steinhaug))


## License

This plugin is available under the MIT license.
