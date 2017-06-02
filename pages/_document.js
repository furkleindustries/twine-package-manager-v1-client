/* react */
import React from 'react';

/* next */
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render () {
        return (
            <html lang="en">
                <Head>
                    <meta charset="utf-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1" />
                    <meta name="theme-color" content="red" />
                    <link
                        rel="shortcut icon"
                        sizes="192x192"
                        href="static/images/icon_192.png" />
                    <link rel="manifest" href="static/manifest.json" />
                    <link
                        rel="stylesheet"
                        type="text/css"
                        href="https://fonts.googleapis.com/css?family=Lato" />
                    <title>TwinePM Client</title>
                </Head>

                <body>
                    <noscript>
                        The TwinePM client requires Javascript to operate.
                        Please enable Javascript to continue.
                    </noscript>
                    
                    <Main />
                    <NextScript />
                </body>
            </html>
        );
    }
}

