function playVideo(stream,idVideo) {
    navigator.mediaDevices.getUserMedia({ audio: false, video: true })
    .then(stream => {
        const video = document.getElementById('localStream');
        // Older browsers may not have srcObject
        video.srcObject = stream;
        video.onloadedmetadata = () => {
            video.play();
        };
    })
    .catch(err => console.log(err));
};
module.exports = playVideo;