/**
 * Handles processing images, resizing, convert png to jpg, for a single camera or image location.
 *
 */

const Jimp = require("jimp");
const config = require("./config");
const keys = require('./keys');

const IMAGE_QUALITY /** @type {number} */ = 85;
const IMAGE_WIDTH /** @type {number} */ = 800;
const SOURCE_DIR /** @type {string} */ = config.testImagesLocation;

module.exports = class ImageHandler {
  constructor(width = undefined, src = undefined, quality = undefined) {
    this.imageWidth = width || IMAGE_WIDTH;
    this.sourceDir = src || SOURCE_DIR;
    this.imageQuality = quality || IMAGE_QUALITY;
  }

  /**
   * @param srcImage {string} the source png image file location.
   * @param destImage {string} location to write the downsized jpg file.
   */
  async resize(srcImage, destImage) {
    await Jimp.read(srcImage).then(img => {
      img
        .resize(this.imageWidth, Jimp.AUTO)
        .quality(this.imageQuality)
        .writeAsync(destImage); // save
    });
  }
};
