// handles processing images, resizing, convert png to jpg.

const Jimp = require('jimp');
const config = require('./config');

const IMAGE_QUALITY = 85;
const IMAGE_WIDTH = 800;
const SOURCEDIR = config.testImagesLocation;

module.exports = class ImageHandler {
  constructor() {
    this.imageWidth = IMAGE_WIDTH;
    this.sourceDir = SOURCEDIR;
    this.imageQuality = IMAGE_QUALITY;
  }

  resize(srcImage, destImage){
    Jimp.read(srcImage, (err, img) => {
        if (err) throw err;
        img
          .resize(this.imageWidth, Jimp.AUTO)
          .quality(this.imageQuality)
          .write(destImage);  // save
      });
  }

}

