let fs = require("fs");
var request = require("request");
let imageIds = require("./ids");

let baseUrl = "https://www.gstatic.com/prettyearth/assets/data/";

let resize = false;
let index = process.argv.findIndex(val => val === "-resize");
let sharp;

if (index !== -1) {
  sharp = require("sharp");
  resize = true;
}

function download(i) {
  if (i < imageIds.length) {
    let reqUrl = baseUrl + imageIds[i] + ".json";
    request(reqUrl, function(err, res, body) {
      if (err) {
        console.log(err);
      } else {
        try {
          let json = JSON.parse(body);
          let base64 = json.dataUri.replace("data:image\/jpeg;base64,", "");

          createImage(base64, json.id, i, resize);
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
}

function createImage(base64, id, i, resize) {
  if (resize) {
    let buf = Buffer.from(base64, "base64");
    let dimens = process.argv[index + 1].split(",");
    // See http://sharp.dimens.io/ for docs
    sharp(buf)
      .resize(parseInt(dimens[0]), parseInt(dimens[1]))
      .toFile(`./images/${id}.jpg`, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Downloaded image ${id}, image number ${i}`);
          download(i + 1);
        }
      });
  } else {
    fs.writeFile(`./images/${id}.jpg`, base64, "base64", err => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Downloaded image ${id}, image number ${i}`);
        download(i + 1);
      }
    });
  }
}

download(0);
