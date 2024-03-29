const express = require('express');
const app = express();
const port = 8080;
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => { return res.render('index'); });
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
