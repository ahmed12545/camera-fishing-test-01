const video = document.getElementById('videoElement');
const captureButton = document.getElementById('captureButton');
const downloadButton = document.getElementById('downloadButton');

let capturedImage = null;

// Get access to the camera and stream video to the video element
navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(error) {
    console.error('Error accessing the camera:', error);
  });

// Capture the frame from the video stream
captureButton.addEventListener('click', function() {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  // Set canvas dimensions to match the video element
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw the current frame from the video onto the canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Get the captured image as a data URL
  capturedImage = canvas.toDataURL('image/jpeg');

  // Display the download button
  downloadButton.style.display = 'block';
});

// Download the captured image when the download button is clicked
downloadButton.addEventListener('click', function() {
  if (capturedImage) {
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = 'captured-image.jpg';
    link.click();
  }
});
