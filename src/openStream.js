const $ = require('jquery');
const Peer = require('simple-peer');
var wrtc = require('electron-webrtc');
const playVideo = require('./playVideo');
function openStream() {
  //The MediaDevices.getUserMedia() method prompts the user for permission to use a media input 
  if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
  }
  if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function (constraints) {
      var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

      if (!getUserMedia) {
        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      }

      return new Promise(function (resolve, reject) {
        getUserMedia.call(navigator, constraints, resolve, reject);
      });
    }
  }

  navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then((stream) => {
      playVideo(stream,'localStream');
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

      peer.on('stream',(stream) => {
        const video = document.getElementById('friendStream');
        // Older browsers may not have srcObject
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        };
      });
     
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
};
module.exports = openStream;