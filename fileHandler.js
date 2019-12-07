// Handles file operations ie getting most recent file in a folder.

const fs = require('fs')
const config = require('./config');

const SOURCEDIR = config.testImagesLocation;

module.exports = class FileHandler {
  constructor(sourcedir = undefined) {
    this.sourceDir = sourcedir || SOURCEDIR;
  }

  async getMostRecentlyModifiedFile() {
    return await this._getMostRecentlyModifiedFile(fs.readdirSync(this.sourceDir), this.sourceDir);
  }

  // @private
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