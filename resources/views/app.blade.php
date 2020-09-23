<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Bigscreen Survey</title>
    <!-- Styles -->
    <link href="{{ secure_asset('css/app.css') }}" rel="stylesheet">
    <!-- Icone -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{ secure_asset(images/apple-touch-icon.png) }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ secure_asset(images/favicon-32x32.png) }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ secure_asset(images/favicon-16x16.png) }}">
</head>

<script>
    window.Laravel = {
        csrfToken: '{{csrf_token()}}'
    }
</script>

<body>
    <div id=" app">
    </div>

    <script src="{{ secure_asset('js/app.js') }}"></script>
</body>

</html>