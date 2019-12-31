// goatpi_nanny
const mysql = require('mysql');
const config = require('./config');
const keys = require('./keys');
const UploadHandler = require('./uploadHandler');
const ImageHandler = require('./imageHandler');
const FileHandler = require('./fileHandler');

const MINUTE = 60 * 1000;
const INTERVAL = 2 * MINUTE;

// const db = mysql.createConnection ({
//   host: keys.host,
//   user: keys.user,
//   password: keys.password,
//   database: keys.database,
// });
// db.connect((err) => {
//   if (err) {
//       throw err;
//   }
//   console.log('Connected to database');
// });
// global.db = db;

// where are the raw images?
// const RAWDIR = config.testImagesLocation;  // for dev.
const RAWDIR = keys.SOURCE;  // for prod.

// where do we save resized images?
// const UPLOADDIR = config.testUploadDir; // for dev.
const UPLOADDIR = keys.RESIZE_DIR; // for prod.

const uploader = new UploadHandler();
const images = new ImageHandler();
const files = new FileHandler();

function main() {
  // get most recent raw image.
  
  // todo change this to get the most recent date(dir) that contains images.
  // since todayStr() can change before an image has been updated to the new date(dir).
  const imageDir = RAWDIR + '/' + files.findMostRecentDir(RAWDIR);

  if (imageDir) {
    const mostRecentImage = files.getMostRecentlyModifiedFile(imageDir)
    const imagePath = imageDir + files.getMostRecentlyModifiedFile(imageDir);
    console.log('mostRecentImage: ', mostRecentImage);
  
    // resize, save, upload.
    images.resize(imagePath, mostRecentImage, UPLOADDIR).then(() => {
      const dest = UPLOADDIR + '/' + mostRecentImage.substr(0,15) + '-new.jpg';
      uploader.upload(dest, todayStr());
    });
  } else {
    console.log('can not find a suitable directory to upload images from.')
  }

  // fetch data.
  // const data = fetchData();
  // writeData(data)
}

function writeData(data) {
  // writes data to the database.
  let query = "INSERT INTO GoatData (temp, level) VALUES('" + data.temp + "', '" + data.level + "');";
  db.query(query, (err, result) => {
    if (err) {
        console.log('error: ', err);
    }
    console.log('db write successful');
    });  
}

function fetchData() {
  // returns test data.
  return {
    temp: 35,
    level: 83,
  }
  
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
