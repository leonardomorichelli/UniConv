<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <title>SAML2 Post Form</title>
    <link rel="icon" type="image/x-icon"
        href="https://www.unicam.it//themes/custom/italiagov/unicam/img/favicon/favicon.ico">
    <style>
        body {
            background-color: #e2001a;
        }

        img {
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
    </style>
</head>

<body onload="document.forms['saml2PostForm'].submit();">
    <img id="UnicamLogo" src="https://www.unicam.it/themes/custom/italiagov/unicam/webp/logo.webp" alt="UnicamLogo">
    <form action="{{ $saml2AuthRequest['url'] }}" method="post" name="saml2PostForm">
        @foreach ($saml2AuthRequest['parameters'] as $key => $value)
            <input type="hidden" name="{{ $key }}" value="{{ $value }}"><br>
        @endforeach
    </form>
</body>

</html>
