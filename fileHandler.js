/**
 * Handles file operations ie getting most recent file in a folder.
 */

const fs = require('fs')
const config = require('./config');

/** @type {string} */
const SOURCE_DIR /** @type {string} */ = config.testImagesLocation;

module.exports = class FileHandler {
  constructor(src = undefined) {
    this.sourceDir = src || SOURCE_DIR;
  }

  /**
   * @returns {string}
   */
  getMostRecentlyModifiedFile() {
    return this._getMostRecentlyModifiedFile(fs.readdirSync(this.sourceDir), this.sourceDir);
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
}