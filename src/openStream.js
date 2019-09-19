const $ = require('jquery');
const Peer = require('simple-peer');
var wrtc = require('electron-webrtc');
const playVideo = require('./playVideo');
function openStream(cb) {
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
      cb(stream);
    })
    .catch(function (err) {
      console.log(err.name + ": " + err.message);
    });
};
module.exports = openStream;