/**
 * Handles uploading images and data to goatpi_billy.
 */

const client = require('scp2');
const fs = require('fs');

const keys = require('./keys');
const DEST = keys.DEST;

module.exports = class UploadHandler {
  constructor() {
    this.dest = DEST;
    client.defaults({
      port: 22,
      host: 'dugb.net',
      username: 'doug',
      password: keys.pw,
  });
  }

  upload(file) {
    console.log('uploading: ', file);
    client.scp(file, this.dest, err => {
      if (err) {
        console.log(err);
      } else {
        console.log('sucess: ', file);
      }
    });
  }

  mkdir(date) {
    const dir = keys.DEST_DIR + date
    console.log('mkdir: ', dir)
    client.mkdir(dir, err => {
      if (err) {
        console.log(err);
      } else {
        console.log('sucess: ', dir);
      }
    });
  }
};
