const Peer = require('simple-peer');
var wrtc = require('electron-webrtc');
const openStream = require('./openStream');
const $ = require('jquery');
openStream();

const peer = new Peer({
    wrtc:wrtc,
    initiator: location.hash === '#1',
    trickle: false
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
peer.on('connect',() => console.log('connect successful'));
console.log('hello World...');
peer.end();