const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/short-module18', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mongo queries
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`connected to localhost: ${PORT}`));