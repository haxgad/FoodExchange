const express = require('express');

const app = express()
app.listenerCount(4000, () => {
    console.log('now listening on port 4000')
});
