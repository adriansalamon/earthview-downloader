# Earthview-downloader
Downloads all images used in https://earthview.withgoogle.com with a node.js script. Uses [sharp](https://github.com/lovell/sharp) to resize image. If resizing is not needed, sharp is not needed.
## Installation
```
$ git clone git@github.com:adriansalamon/earthview-downloader.git
$ cd earthview-downloader
$ npm install
```
Note: If you don't want to resize the images, you can remove the `sharp` package from the `package.json` file.
### Usage
```
$ node download -resize 1920,1080
```