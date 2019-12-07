module.exports = {
  /**@type {string} folder with goat cam images. */
  goatImagesLocation: "",

  /** @type {string} ip address of goatpi_kid.*/
  goatDataLocation: "",

  /** @type {string} folder with test images.*/
  testImagesLocation: "./testImages",

  /** @type {string} folder to upload from (during testing).*/
  testUploadDir: "./testUploadDIr",

  testGoatPiKidData: {
    /** @type {number} water temp, degrees F.*/
    temp: 49,

    /** @type {number} water level, percentage.*/
    level: 85,

    /** @type {boolean} heater current sensor.*/
    heaterOn: false
  }
};
