const express = require('express');
const app = express();
const port = 3000 || process.env.port

app.use(express.json())

app.listen(port, () => console.log("running in " + port))