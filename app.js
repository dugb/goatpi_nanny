// goatpi_nanny
const config = require('./config');
const keys = require('./keys');
const UploadHandler = require('./uploadHandler');
const ImageHandler = require('./imageHandler');
const FileHandler = require('./fileHandler');

const MINUTE = 60 * 1000;
const INTERVAL = 2 * MINUTE;

// where are the raw images?
const RAWDIR = config.testImagesLocation;  // for dev.
// const RAWDIR = keys.SOURCE;  // for prod.

// where do we save resized images?
const UPLOADDIR = config.testUploadDir; // for dev.
// const UPLOADDIR = keys.RESIZE_DIR; // for prod.

const uploader = new UploadHandler();
const images = new ImageHandler();
const files = new FileHandler();

function main() {
  // get most recent raw image.
  const imageDir = RAWDIR + '/' + todayStr() + '/images/';
  const mostRecentImage = files.getMostRecentlyModifiedFile(imageDir)
  const imagePath = imageDir + files.getMostRecentlyModifiedFile(imageDir);
  console.log('mostRecentImage: ', mostRecentImage);
  // resize, save, upload.
  images.resize(imagePath, mostRecentImage, UPLOADDIR).then(() => {
    const dest = UPLOADDIR + '/' + mostRecentImage.substr(0,15) + '-new.jpg';
    uploader.upload(dest);
  });
}

function todayStr() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  return yyyy + mm + dd;
}

main();
setInterval(() => {
  main();
}, INTERVAL);
