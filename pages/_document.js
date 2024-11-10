import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <link rel="shortcut icon" href="/assets/img/favicon.png" />
            <link rel="preconnect" href="https://fonts.bunny.net" />
            <link href="https://fonts.bunny.net/css?family=outfit:100,200,300,400,500,600,700|playfair-display:400,400i,500,500i,600,600i,700,700i,800,800i|plus-jakarta-sans:400,400i,500,500i,600,600i,700,700i,800,800i" rel="stylesheet" />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
