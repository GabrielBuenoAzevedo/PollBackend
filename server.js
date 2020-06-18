const dbConfig = require('./config/db.config');
const db = require('./app/models');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const corsOptions = { origin: 'https://localhost:8081' };
const port = process.env.PORT || 8081;

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).catch( err => {
  console.log(err);
});

//Create middleware to initiate dbData inside request.
app.use((req,res,next) => {
  req.dbData = {};
  next();
});

//routes
require('./app/routes')(app);

app.listen(port, () => {
  console.log('Abriu o server');
});