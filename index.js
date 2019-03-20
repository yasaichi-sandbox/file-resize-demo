import loadImage from 'blueimp-load-image';

// NOTE: return Blob object
const resizeImage = file => {
  return new Promise((resolve, reject) => {
    loadImage(
      file,
      canvas =>
        canvas.type === 'error'
          ? reject(canvas)
          : canvas.toBlob(resolve, file.type),
      {
        maxWidth: 460,
        maxHeight: 460,
        canvas: true,
        cotain: true
      }
    );
  });
};

document.getElementById('file-input').onchange = async e => {
  const file = e.target.files[0];
  if (!file.type.match('^image/')) {
    alert('画像を選択してください');
    return;
  }

  // NOTE: You can use `blob` as form data by `fileData.append('foo', blob, file.name)`.
  const blob = await resizeImage(file);

  // NOTE: The following code is for checking that resizing the image is successful
  const reader = new FileReader();
  reader.onload = () => {
    const image = new Image();
    image.src = reader.result;
    document.getElementsByTagName('body')[0].append(image);
  };
  reader.readAsDataURL(blob);
};
