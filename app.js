const fs = require('fs'),
    http = require('http'),
    socketio = require('socket.io')

const server = http.createServer((req,res)=>{
    res.writeHead(200,{'Content-type':'text/html'})
    res.end(fs.readFileSync(__dirname + '/index.html'))
    console.log(req)
}).listen(8080,()=>{
    console.log('Listening on 8080')
})

socketio.listen(server).on('connection',(socket)=>{
    socket.on('message',(msg)=>{
        console.log('Message Received:',msg)
        socket.broadcast.emit('message',msg)
    })
})