var express = require('express'),
    io = require('socket.io'),
    fs = require('fs');

var app    = express(),
    server = require('http').createServer(app),
    io     = io.listen(server);


app.configure(function() {
    // app.use(express.static(__dirname + '/public'));
});

// Server.
app.get('/', function(req, res){
    fs.readFile(__dirname + '/public/index.html', function(err, data){
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }
        res.writeHead(200);
        res.end(data);
    });
});
server.listen(5000);

// Sockets.
io.sockets.on('connection', function(socket){

    // on ball move
    socket.on('move', function(data){
        io.sockets.emit('move', { x: data.x, y: data.y });
    });
    
});