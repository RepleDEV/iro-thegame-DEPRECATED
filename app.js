const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', (req,res) => res.sendFile(path.join(__dirname + '/src/index.html')));
app.use(express.static(__dirname + '/src'));
app.listen(port, () => console.log(`iro listening on port ${port}!`));