Pandora Toolkit
=====

About Pandora Toolkit
-----
Pandora is a toolkit to help making basic modal boxes to display infos, cookie consent or videos.

Dependencies
-----
* No depedencies

Usage
-----
PandoraConsent will show right after the loading of the DOM.
For PandoraPlayer and PandoraInfo, you will need an element as trigger, with the correct class value (pandora-i-open or pandora-v-open).
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
    <div class="container">
        <div class="pandora-i-open">Open Pandora Info</div>
        <pandora-info <!--add some custom styles here-->>
            <span slot="title">Pandora Info</span>
            <span slot="message">Mauris lobortis massa id massa suscipit molestie. Donec odio ligula, tincidunt sit amet accumsan eget, tristique non nisl. Cras leo ligula, placerat ac bibendum eget, accumsan sed orci. Sed viverra dapibus commodo. Nulla pretium ex ac enim gravida lacinia. Fusce est diam, tincidunt sed pulvinar non, pellentesque ac tellus. Aliquam erat volutpat. Vivamus velit metus, sodales vitae est ac, cursus pellentesque justo.</span>
            <span slot="valid">Haaaa, OK !</span>
        </pandora-info>
    </div>
</body>
</html>
```

Customized styles
-----
Use data-attributes in the pandora-* tag to customize the style of your modal box.
Here is a list of all the data-attributes you can use:
* pandora-backdrop-opacity
* pandora-backdrop-color
* pandora-color-title
* pandora-bg-title
* pandora-msg-color
* pandora-msg-bg
* pandora-valid-btn-color
* pandora-valid-btn-bg