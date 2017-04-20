let fs = require('fs')
var request = require('request')
let sharp = require('sharp')
let imageIds = require('./ids')

let baseUrl = 'https://www.gstatic.com/prettyearth/assets/data/'

function download(i) {
	if (i < imageIds.length) {
		let reqUrl = baseUrl + imageIds[i] + '.json';
		request(reqUrl, function(err, res, body) {
			if (err) {
				console.log(err)
			} else {
				try {
					let json = JSON.parse(body)
					let base64 = json.dataUri.replace('data:image\/jpeg;base64,', '')
					let buf = Buffer.from(base64, 'base64')
					// See http://sharp.dimens.io/ for docs
					sharp(buf)
						.resize(1920, 1080)
						.toFile(`./images/${json.id}.jpg`, (err, info) => {
							if (err) {
								console.log(err)
							} else {
								console.log(`Downloaded image ${json.id}, image number ${i}`)
								download(i + 1)
							}
						})
				} catch (err) {
					console.log(err)
				}
			}
		})
	}
}

download(0)
