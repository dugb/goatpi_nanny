/**
 * Handles file operations ie getting most recent file in a folder.
 */

const fs = require('fs');
const config = require('./config');

module.exports = class FileHandler {
  constructor() {

  }

  /**
   * @param {string} dir Absolute path.
   * @returns {string}
   */
  getMostRecentlyModifiedFile(dir) {
    return this._getMostRecentlyModifiedFile(fs.readdirSync(dir), dir);
  }

  /**
   * @private
   * @param {Array<string>} files 
   * @param {string} path 
   */
  _getMostRecentlyModifiedFile(files, path) {
    let out = [];
    files.forEach(function (file) {
      const stats = fs.statSync(path + "/" + file);
      if (stats.isFile()) {
        out.push({
          "file": file,
          "mtime": stats.mtime.getTime()
        });
      }
    });
    out.sort(function (a, b) {
      return b.mtime - a.mtime;
    })
    return (out.length > 0) ? out[0].file : "";
  }

  /**
   * Finds the most recent directory with available and suitable images,
   * to upload.
   * @param {string} path The base directory.
   * @returns {string} 
   */
  findMostRecentDir(path) {
    console.log('path: ', path);
    // get a directory listing of path.
    let dirList = this.getDirectories(path + '/');

    // sort the directory listing by name/date.
    dirList.sort().reverse();

    // return dir that is not empty.
    for (const dir of dirList) {
      if (fs.readdirSync(path + '/' + dir + '/images').length > 0) {
        return dir + '/images/';
      }
    }
    return undefined;  // did not find a suitable dir.
  }

  getDirectories(source) {
    let dirListing = fs.readdirSync(source);
    let dirList = [];
    for (const i of dirListing) {
      if(fs.statSync(source + i).isDirectory()){
        dirList.push(i);
      }
    }
    return dirList;
  }

}