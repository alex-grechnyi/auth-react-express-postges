const express = require ('express');
const config = require ('dotenv');
const bodyParser = require ('body-parser');
const User = require ('./models/User');
const cors = require('cors');

// Database
const db = require('./index');

// Test DB
db.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

config.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8002;

app.use('/users', require('./routes/users'));

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});
