const connectToMongoose = require('./db')
const express = require('express')
const app = express();
const port = 5000;
var cors = require('cors')
connectToMongoose();

app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
    res.send('hello world');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})