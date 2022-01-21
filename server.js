const express = require('express');
const app = express();

// Port
const PORT = process.env.PORT || 3000;

// Require routes file
const route = require('./app');
app.use('/v1',route);


// Server Up
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})