require('dotenv').config();
const express = require('express');
const massive = require('massive');
const products_controller = require('./products_controller.js');

// create server with express API (contains lots of functionality and data)
const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;
console.log(CONNECTION_STRING)
massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance);
})
.catch(err => console.log(err));

// middleware
app.use(express.json());

//endpoints
app.get('/api/products', products_controller.getAll);
app.get('/api/products/:id', products_controller.getOne);
app.put('/api/products/:id', products_controller.update);
app.post('/api/products', products_controller.create);
app.delete('/api/products/:id', products_controller.delete);

app.listen(SERVER_PORT, () => console.log(`Rogue 1 you are cleared for entry to port ${SERVER_PORT}`));