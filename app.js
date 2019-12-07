// goatpi_nanny
const config = require('./config');
const UploadHandler = require('./uploadHandler');
const ImageHandler = require('./imageHandler');
const FileHandler = require('./fileHandler');

const MINUTE = 60 * 1000;
const INTERVAL = 1 * MINUTE;

// where are the raw images?
const RAWDIR = config.testImagesLocation;  // for dev.

// where do we save resized images?
const UPLOADDIR = config.testUploadDir; // for dev.

const uploader = new UploadHandler();
const images = new ImageHandler();
const files = new FileHandler();

function main() {
  // get most recent raw image.
  const imageDir = RAWDIR + '/' + todayStr() + '/images/';
  const mostRecentImage =
    imageDir + files.getMostRecentlyModifiedFile(imageDir);
  console.log('mostRecentImage: ', mostRecentImage);
  // resize, save, upload.
  const dest = UPLOADDIR + '/new.jpg';
  images.resize(mostRecentImage, dest).then(() => {
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
