# HGW webpack boilerplate

### webpack 4 boilerplate on steroids

##### HTML5, ES6/ES7, SCSS

[HappyPack](https://github.com/amireh/happypack) speeding up development cycle making use of multiple VM's.

[HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin) speeding up development cycle making use of caching. 

[CompressionWebpackPlugin](https://webpack.js.org/plugins/compression-webpack-plugin/) for compressing assest to gzip.

[UglifyJS Webpack Plugin](https://github.com/webpack-contrib/uglifyjs-webpack-plugin) for minifying JS, removing unused code, comments, consoles etc.

[Tree Shaking](https://webpack.js.org/guides/tree-shaking/) Removing unused imports in ES6.

[HTML Webpack Plugin](https://github.com/jantimon/html-webpack-plugin) Plugin that simplifies creation of HTML files to serve your bundles.

[Clean for WebPack](https://github.com/johnagan/clean-webpack-plugin) A webpack plugin to remove/clean your build folder(s) before building.

Added versioning for your css and js. 

### Development webpack server
`npm i & npm run dev` 

### Build setup
`npm run build`

### NodeJS Development server
`npm run server`

#### Information

If you need to add new markup, update array in `htmlfiles.js` and create new file in `src/markup/`

If you want to add new subfolder to existing root folder add them into `public`, Node routing will take care of the rest.

No need to add link rel or script tags in your markup, they will be injected via webpack.