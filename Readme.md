Pandora Toolkit
=====

Dependencies
-----
* No depedencies

Usage
-----
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