<?php
session_start();
?><html>
<head>
    <meta charset="UTF-8">
    <title>I have &#x1F36A;s</title>
    <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script type="text/javascript" src="jquery.ihavecookies.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        // Be sure that the main JS has the correct language to save code
        $('body').ihavecookies({
            forceDisplayPanel: true
        });
        if ($.fn.ihavecookies.preference('marketing') === true) {
            console.log('This should run because marketing is accepted.');
        }
        if ($.fn.ihavecookies.preference('analytics') === true) {
            console.log('This should run because analytics is accepted.');
        }

        // Links with "gdpr-cookie-preferences" class will reopen the preferences
        $('.gdpr-cookie-preferences').on('click',function(){
            if( $('#gdpr-cookie-message').length == 0 ){
                $('body').ihavecookies({
                    forceDisplayPanel: true,
                    delay: 0
                });
            }
        });

    });
    </script>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Quicksand:400,500" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="ihavecookies.css">
</head>
<body>
    <a href="https://github.com/steinhaug/ihavecookies" title="Fork me on Github" class="github-badge">
		<img src="img/github-logo.svg" alt="Github">
	</a>

    <div class="container">
        <h1>ihavecookies jQuery Plugin in action</h1>
        <p>When you load this page you will see an example of the cookie message popup in the bottom right corner.</p>
        <p>If you don't see it, clear your cookies or delete the cookie called <code>cookieControl</code>.</p>

        <h3>Checkboxes</h3>

        <p>With the recent EU regulations, visitors now must be able to opt-in to marketing, preferences, etc themselves. The plugin has an option that enables checkboxes to be unchecked automatically on page load.</p>

        <ul>
            <li><input type="checkbox" id="opt1" value="Y" checked> <label for="opt1">Checked by default &dash; remains checked</label>
            <li><input type="checkbox" id="opt2" value="Y"> <label for="opt2">Unchecked by default &dash; remains unchecked</label>
            <li><input type="checkbox" id="opt3" value="Y" class="ihavecookies" checked> <label for="opt3">Checked by default &dash; <em>ihavecookies</em> automatically unchecks this on page load because is has the class <code>ihavecookies</code> applied to it.</label>
        </ul>

        <button class="gdpr-cookie-preferences">Reopen settings</button>

        <h1>Model 2: Implied Consent</h1>
        <p>In summary: We are using and have set cookies, but you can switch them off if you want.</p>
        <p>The key differentiator to the Information Only model is that the site provides the ability to
        directly opt-out or refuse cookies, even though they are set by default on first arrival.<p>
        <h2>Good Practice Tips:</h2>
        <p>When offering opt-out controls there is balance to be struck between usability and the effort
        required to opt-out.
        Creating options for different levels of opt-out is good. Best practice suggests grouping or
        categorising cookies by purpose, and giving control at that level – perhaps over 3-5
        different categories. This gives real choice to users, without it being too difficult to choose,
        or too many clicks to make.</p>
        <p>It is also a good idea to explain the consequences of opting out, especially if it may
        negatively impact user experience.
        If people do opt-out it is also perfectly acceptable to incentivise them to opt back in again
        later. You may find you have to block certain functionality when users opt-out of some
        types of cookies. When you do this, make it clear that this is the result of their choice – and
        you can then enable them to opt back in, if they want to use the blocked functionality.
        If you want to there is nothing to stop you preventing access to premium/valuable content or
        services after users have opted-out, even if these do not rely on cookies to work, but at the
        same time don’t try to trick users into opting back in.
        It is also a good idea to make sure that the controls to opt-out or in again are always readily
        accessible to the user, such as a page element or link that is on every page, and is clearly
        identified.</p>
        <p>We also believe that implied consent can also be done without the need for banners or popups
        that automatically appear when users first arrive on a site, although this may not be
        consistently true in all jurisdictions. 
        As users become familiar with the concept of being able to control and opt-out of cookies,
        those with an interest in doing so will automatically seek out access to information and
        control mechanisms. As long as links or buttons are easily identifiable, always available,
        and offer real choice, there is less need to interrupt the user experience which many visitors
        find annoying.</p>
        <p>However, if you do want to introduce a banner message, an approach that works well with
        implied consent is the banner that automatically disappears after a period of time. It works
        to tell users you are complying whilst not requiring an action to get rid of the message. As
        long as there is another always available link to the opt-out controls, this can be an
        additional assurance that you have given clear notice to visitors.
        <h2>Mistakes to Avoid:</h2>
        <p>Probably the biggest mistake we see is confusion between the Information Only and
        Implied Consent models. As noted above a lot of sites try to use the language of implied
        consent in an information only notice, but implied consent notices can also be easily
        confused with explicit consent.</p>
        <p>An opt-out mechanism will inevitably require you to make some technical changes to your
        site, in the event that users choose to stop cookies being set. It is vital therefore that you
        put those changes in place and test them. If you are using a pre-built script or service,
        make sure you read the documentation, and where necessary involve your web developer.
        This includes making sure you understand the requirements for using such a script before
        you purchase or licence it. Giving your visitors the appearance of choice when their choices
        don’t actually do anything can easily be seen as being deliberately misleading, which is
        clearly something to avoid.</p>
        <p>Try to avoid forcing people off-site or requiring them to install third party tools to exercise
        their opt-out. Some opt-out mechanisms do this – for example requiring installation of
        browser plug-ins for Google Analytics. It can seem like an easy option, but has some
        significant drawbacks.</p>
        <p>It is not only annoying for users, but it puts control into the hands of a third party rather that
        you. It also means that you may not be able to incentivise users to opt back in again at a
        later date – which could be critical for some businesses. If relying on the installation of third 
        party software – some users may not be able to do this (for example users at work may
        have had this disabled by their IT department) – and therefore cannot exercise their rights
        properly. Plus of course, if you direct people off-site, there is a significant risk they won’t
        <p>come back again.</p>
        You don’t need to worry about deleting cookies already set if users opt-out. Technically this
        is more challenging to do, especially with third party cookies. Opting out means stopping
        reading existing cookies, however if you use the right mechanisms to stop setting of new
        cookies, this will also prevent reading if existing cookies, which is consistent with the
        implied consent model.</p>
        <h2>Risk Factors</h2>
        <p>Implied consent is potentially the least user-interruptive model for compliance, if done in the
        right way. It can give real choice without getting in the way of the user journey for those
        that are genuinely not interested in exercising their choice.</p>
        <p>Not only is it considerably lower risk from a regulators’ point of view than the information
        only approach, it also shows respect for visitors who want to exercise control.</p>
        <p>Research suggests that web users are employing more privacy defensive technologies than
        ever before. Though this makes life easier in the short term for site owners, it has bigger
        long term consequences in terms of loss of control over your own websites. It is much
        better to try to prevent that by using a little more effort to give users choices that you can
        remain ultimately in control of</p>

    </div>



<?php

    echo '<div>';
    if(GDPR('analytics')){
        echo '<p>Analytics enabled</p>';
    }
    echo '</div>';

/**
 *  The three different cookie groups that can be used are:
 *  preferences, analytics, marketing
 */
function GDPR($type){

    // User has not yet given concent 
    if( !isset($_COOKIE['cookieControlPrefs']) )
        return true;

    // User has now given consent and we obey that
    $prefs = $_COOKIE['cookieControlPrefs'];
    if( strpos($prefs, $type) === false )
        return false;

    return true;
}

var_dump( $_COOKIE );

?>

</body>
</html>
