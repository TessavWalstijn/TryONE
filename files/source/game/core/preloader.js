const images = [];
const sounds = [];

let imagesLoaded = 0;

const preloader = {
  Init (callback)
  {
    this._callback = callback;
    this._HandleImageLoad = this._HandleImageLoad.bind(this);

    this._LoadImage(`./files/images/${settings.image.name}`, 'sprite');
  },

  _LoadImage (fileString, fileName)
  {
    const image = new Image();
    image.src = fileString;
    image.onload = this._HandleImageLoad;
    // Set to images array
    images.push({
      image: image,
      name: fileName,
    });
  },

  _LoadSound (fileString, fileName)
  {
    // Set to sound array
    sounds.push({
      sound: {
        src: fileString,
      },
      name: fileName,
    });
  },

  _HandleImageLoad ()
  {
    imagesLoaded += 1;

    if (imagesLoaded >= images.length) {
      this._PrepareGame();
    }
  },

  _PrepareGame ()
  {
    this._callback && this._callback();
  },
}