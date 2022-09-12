Pandora Toolkit v1
=====

About Pandora Toolkit
-----
Pandora is a toolkit to help making basic modal boxes to display infos, to ask user for cookie consent or to display videos.

Pandora Consent will show after the loading of the DOM the different cookies you are asking user to consent. You can let the user choose between refuse, accept all, or accept selected ones. After submit, Pandora Consent will automatically treat the form and add the cookies who need to be registered.

Pandora Info will show a modal of information with only one button to close the modal.

Pandora Display will show a modal containing an iframe adapted to your video.

Dependencies
-----
* No depedencies

Usage
-----
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
            pandora-cookie-samesite='strict'
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
