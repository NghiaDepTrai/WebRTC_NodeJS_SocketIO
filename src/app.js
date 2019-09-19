
const openStream = require('./openStream');
const $ = require('jquery');
const Peer = require('simple-peer');
var wrtc = require('electron-webrtc');
const playVideo = require('./playVideo');
openStream((stream) => {
    playVideo(stream, 'localStream');
    // Peer to peer The sender and receiver Peer 
    const peer = new Peer({
        wrtc: wrtc,
        initiator: location.hash === '#1',
        trickle: false,
        stream: stream
    });
    peer.on('signal', token => {
        console.log(token);
        $('#textMySignal').val(JSON.stringify(token));

    });

    $('#buttonSignal').click(() => {
        // retrieve data from INPUT
        const friendSignal = JSON.parse($('#textFriendSignal').val());
        console.log(friendSignal);
        // báo tín hiệu 
        peer.signal(friendSignal);
    });

    peer.on('stream', (stream) => {
        const video = document.getElementById('friendStream');
        // Older browsers may not have srcObject
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        };
    });

});