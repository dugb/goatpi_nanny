/**
 * Handles processing images, resizing, convert png to jpg, for a single camera or image location.
 *
 */

const Jimp = require("jimp");
const config = require("./config");
const keys = require('./keys');

const IMAGE_QUALITY /** @type {number} */ = 85;
const IMAGE_WIDTH /** @type {number} */ = 800;

module.exports = class ImageHandler {
  constructor(width = undefined, quality = undefined) {
    this.imageWidth = width || IMAGE_WIDTH;
    this.imageQuality = quality || IMAGE_QUALITY;
  }

  /**
   * @param srcImagePath {string} the source image path.
   * @param srcImageName {string} the source image name.
   * @param destPath {string} the destination path for the downsized image.
   */
  async resize(srcImagePath, srcImageName, destPath) {
    console.log(srcImagePath);
    console.log(srcImageName);
    console.log(destPath);
    let destImage = destPath + '/' + srcImageName.substr(0,15) + '-new.jpg';
    console.log('dest: ', destImage);
    await Jimp.read(srcImagePath).then(img => {
      img
        .resize(this.imageWidth, Jimp.AUTO)
        .quality(this.imageQuality)
        .writeAsync(destImage); // save
    });
  }
};
