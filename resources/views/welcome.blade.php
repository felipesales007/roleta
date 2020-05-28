<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- tags -->
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <!-- título -->
        <title>Roleta</title>

        <!-- css -->
        <link rel="stylesheet" href="{{ asset('css/global.css') }}">
    </head>
    <body>
        <!-- roleta -->
        <div class="roulette">
            <!-- opções -->
            <div class="spinner"></div>

            <!-- sombra -->
            <div class="shadow"></div>

            <!-- marcação -->
            <div class="markers">
                <div class="triangle"></div>
            </div>

            <!-- botão -->
            <div class="button">
                <span>Girar</span>
            </div>
        </div>

        <!-- js -->
        <script src="{{ asset('js/plugins/jquery.min.js') }}"></script>
        <script src="{{ asset('js/plugins/velocity.min.js') }}"></script>
        <script src="{{ asset('js/plugins/lodash.min.js') }}"></script>
        <script src="{{ asset('js/plugins/backbone-min.js') }}"></script>
        <script src="{{ asset('js/global.js') }}"></script>
    </body>
</html>
