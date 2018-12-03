const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../client/dist'));

app.get('/game', (req, res) => {
  res.status(200).send('gameState');
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
