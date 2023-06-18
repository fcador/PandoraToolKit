# Pandora Toolkit v1.1

## What's new in v1.1

### Refactoring

We've undertaken a comprehensive refactoring of the different tools used in our project. The primary motivation behind this revamp was to improve the readability of the code and to simplify ongoing and future maintenance efforts. This restructuring offers a cleaner, more modularized, and efficient architecture for our codebase.

### Changes in Pandora Consent

Significant changes have been made to how Pandora Consent operates. Previously, Pandora Consent was responsible for both reading and writing cookies. We have now moved away from this approach. Instead of directly handling cookies, Pandora Consent now emits events.

## About Pandora Toolkit

Pandora is a toolkit to help making basic modal boxes to display infos, to ask user for cookie consent or to display videos.

Pandora Consent is a customizable web component designed to handle user consent for the use of cookies on your site. Upon the completion of DOM loading, Pandora Consent displays a comprehensive list of cookies for which you are seeking user approval.
It provides users with the option to either refuse all cookies, accept all, or selectively accept some. Upon user interaction, the component emits custom events to signify the user's decision. You can listen to these events - namely 'cookies-accepted', 'cookies-partially-accepted', and 'cookies-refused' - to adapt your site's behavior accordingly.
To listen to these events in your project, you can use the addEventListener function on the Pandora Consent element. Here's how you can do it:

```javascript
const pandoraConsentElement = document.querySelector('pandora-consent');

pandoraConsentElement.addEventListener('cookies-accepted', (e) => {
  // Handle the event
  console.log('User has accepted cookies:', e.detail.acceptedCookies);
});

// Listen for the 'cookies-partially-accepted' event
pandoraConsentElement.addEventListener('cookies-partially-accepted', (e) => {
  // Handle the event
  console.log('User has partially accepted cookies:', e.detail.acceptedCookies);
});

// Listen for the 'cookies-refused' event
pandoraConsentElement.addEventListener('cookies-refused', (e) => {
  // Handle the event
  console.log('User has refused cookies:', e.detail.refusedCookies);
});
```

Pandora Info will show a modal of information with only one button to close the modal.

Pandora Display will show a modal containing an iframe adapted to your video.

## Dependencies

* No depedencies

## Usage

PandoraConsent will show right after the loading of the DOM.
For PandoraDisplay and PandoraInfo, you will need an element as trigger, with the correct class value (pandora-i-open or pandora-d-open).
```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Pandora Box</title>
    <link rel="stylesheet" content="width=device-width, initial-scale=1.0" href="pandora_info.css">
    <script src="PandoraInfo.js"></script>
</head>
<body>
    <!-- PANDORA INFO -->
    <div class="container">
        <div class="pandora-i-open">Open Pandora Info</div>
        <pandora-info <!--add some custom styles here-->>
            <span slot="title">Pandora Info</span>
            <span slot="message">Mauris lobortis massa id massa suscipit molestie. Donec odio ligula, tincidunt sit amet accumsan eget, tristique non nisl. Cras leo ligula, placerat ac bibendum eget, accumsan sed orci. Sed viverra dapibus commodo. Nulla pretium ex ac enim gravida lacinia. Fusce est diam, tincidunt sed pulvinar non, pellentesque ac tellus. Aliquam erat volutpat. Vivamus velit metus, sodales vitae est ac, cursus pellentesque justo.</span>
            <span slot="valid">Haaaa, OK !</span>
        </pandora-info>
    </div>

    <!-- PANDORA CONSENT -->
    <pandora-consent
            pandora-cookie='Chocolate:Chocolate cookies,Nut:Nut cookies,Fruit:Fruit cookies'
            pandora-accept="Yes I want all cookies!"
            pandora-partial="I just want selected cookies"
            pandora-refuse="I don't like cookies"
            <!--and add some custom styles here-->>
        <span slot="title">Pandora Consent</span>
    </pandora-consent>

    <!-- PANDORA DISPLAY -->
    <div class="container">
        <div class="pandora-d-open">Open Pandora Display</div>
        <pandora-display 
                pandora-player="vimeo"
                pandora-src="744288201"
                <!-- and add some custom styles here-->>
        </pandora-display>
    </div>
</body>
</html>
```

Customized styles
-----
Use data-attributes in the pandora-* tag to customize the style of your modal box.
Here is a list of all the data-attributes you can use :
* pandora-backdrop-opacity
* pandora-backdrop-color
* pandora-title-color(*)
* pandora-title-bg(*)
* pandora-msg-color(*)
* pandora-msg-bg(*)
* pandora-valid-btn-color(*)
* pandora-valid-btn-bg(*)

(*) = not in Pandora Display

Only for Pandora Consent :
* pandora-refuse-btn-color
* pandora-refuse-btn-bg

Only for Pandora Display :
* pandora-closeBg-color

Features in progress
-----
* having the possibility to have more than one Pandora Info and Pandora Display per page
