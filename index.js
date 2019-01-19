const express = require('express');
const mongoose = require('mongoose');

mongoose.conenct('', { newUrlParser: true });
mongoose.Connection.once('open', () => {
    console.log('connected to datasbase')
});

const app = express()
app.listenerCount(4000, () => {
    console.log('now listening on port 4000')
});
