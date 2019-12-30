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
      port: keys.ssh_port,
      host: keys.host,
      username: keys.user,
      password: keys.pw,
  });
  }

  upload(file, date) {
    const dir = keys.DEST_DIR + date;
    console.log('mkdir: ', dir);
    client.mkdir(dir, err => {
      if (err) {
        console.log('mkdir error: ', err);
      } else {
        console.log('mkdir: sucess');
        console.log('uploading: ', file);
        client.scp(file, this.dest + date + '/' + file, err => {
          if (err) {
            console.log('upload error: ', err);
          } else {
            console.log('upload sucess: ', file);
          }
        });
      }
    })
  }

};
