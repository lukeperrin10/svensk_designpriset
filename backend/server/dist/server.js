const express = require('express');
const app = express();
const port = 8001;
app.get('/', (_req, res) => {
    console.log('request');
    res.send('Hello World!');
});
app.listen(port, () => console.log('Example app listening on port 8001!'));
//# sourceMappingURL=server.js.map