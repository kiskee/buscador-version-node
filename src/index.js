const http = require('http');
const express = require('express');
const app = express();
const Server = http.createServer(app);

//settings
app.set('port', process.env.PORT || 8080);
app.set('json spaces', 2);

//middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api/bienes', require('./rutas/bienes'));
app.use(express.static('public'))


// starts the server
Server.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
