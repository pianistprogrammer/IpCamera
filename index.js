const cv = require('opencv4nodejs');
const path = require('path')
const express = require('express');
const app = express();
const server =  require('http').Server(app)
const io = require('socket.io')(server);

const FPS = 10;
const wcap = new cv.VideoCapture(0); // the default camera device; in this case, the front-face webcam
wcap.set(cv.CAP_PROP_FRAME_WIDTH, 300);
wcap.set(cv.CAP_PROP_FRAME_HEIGHT, 300);
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    const frame = wcap.read(); // returns a math object in form of matrix
    const image = cv.imencode('.jpg',frame).toString('base64');
    io.emit('image', image);
}, 1000 / FPS)
server.listen(3000)