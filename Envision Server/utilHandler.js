const multer = require("multer");
const path = require("path");
const fs = require("fs");

function getCurrentTimestamp() {
  const currentDate = new Date();
  const formattedTimestamp = currentDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return formattedTimestamp;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

function getImage(imagePath) {
  const imagePathOnServer = path.join(__dirname, imagePath);
  // console.log(imagePathOnServer);

  try {
    const data = fs.readFileSync(imagePathOnServer);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = {
  getCurrentTimestamp,
  upload,
  getImage,
};
