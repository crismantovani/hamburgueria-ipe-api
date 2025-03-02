const express = require('express');
const routes = require('./server/routes/index');

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(routes);

app.listen(port, (error) => {
  if (error) {
    console.log(`There was a problem: ${error}`);
    return;
  }
  console.log(`App listening at http://localhost:${port}`);
});

// DEFAULT
// const express = require('express');
// const routes = require('./server/routes/index');

// const app = express();
// const port = 3000;

// app.use('/', routes);

// app.get('*', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });
