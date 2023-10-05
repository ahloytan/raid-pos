const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
    cors({
      // origin: 'http://localhost:8081',
      origin: 'http://localhost:3000',
    //   credentials: true
    })
  );

const apiRouter = require('./routes/api/index');
app.use('/api', apiRouter);
app.get('/healthCheck', (req, res) => {
  res.sendStatus(200).json("ok");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
