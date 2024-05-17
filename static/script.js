const dropArea=document.getElementById("drop-area");
const inputFile=document.getElementById("input-file");
imageView=document.getElementById("img-view");

inputFile.addEventListener("change", uploadImage);

function uploadImage(){
    let imgLink=URL.createObjectURL(inputFile.files[0]);
    imageView.style.backgroundImage= `url(${imgLink})`;
    imageView.textContent="";
    imageView.style.border=0;
}

dropArea.addEventListener("dragover", function(e){
    e.preventDefault();
});
dropArea.addEventListener("drop", function(e){
    e.preventDefault();
    inputFile.files=e.dataTransfer.files;
    uploadImage();
});

document.getElementById('upload-button').addEventListener('click', handleUpload);

function handleUpload() {
  var fileInput = document.getElementById('input-file');
  var file = fileInput.files[0];

  if (file) {
      var formData = new FormData();
      formData.append('image', file);

      var loadingOverlay = document.getElementById('loading-overlay');
      var resultContainer = document.getElementById('result-container');
      var resultImage = document.getElementById('img-view');

      loadingOverlay.style.display = 'block';

      fetch('/upscale', {
          method: 'POST',
          body: formData
      })
      .then(response => response.blob())
      .then(blob => {
          loadingOverlay.style.display = 'none';
          resultContainer.style.display = 'block';
          resultImage.src = URL.createObjectURL(blob);
          resultImage = URL.createObjectURL(blob);
          imageView.style.backgroundImage= `url(${resultImage})`;
          imageView.textContent="";
          imageView.style.border=0;
      })
      .catch(error => {
          console.error('Error:', error);
          loadingOverlay.style.display = 'none';
      });
  }
}

document.getElementById('download-link').addEventListener('click', function() {
  var resultImageSrc = document.getElementById('img-view').src;
  var a = document.createElement('a');
  a.href = resultImageSrc;
  a.download = 'upscaled-image.png';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});