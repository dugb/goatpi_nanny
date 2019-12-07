/**
 * Handles uploading images and data to goatpi_billy.
 */

const client = require("scp2");
const fs = require("fs");

const keys = require("./keys");
const DEST = keys.DEST;

module.exports = class UploadHandler {
  constructor() {
    this.dest = DEST;
  }

  upload(file) {
    console.log("uploading: ", file);
    client.scp(file, this.dest, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("sucess: ", file);
      }
    });
  }
};
