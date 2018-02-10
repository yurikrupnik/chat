import {renderToString} from 'react-dom/server';

export default (component, state) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <base href="/" />
        <meta charset="UTF-8">
        <title>Engine</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <div id="root">${renderToString(component)}</div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(state)};</script>
        <script src="vendor.js"></script>
        <script src="app.js"></script>
    </body>
</html>`;