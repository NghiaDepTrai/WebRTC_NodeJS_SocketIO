const WEBPACK = require('webpack');
const PATH = require('path');

module.exports = {
resolve: {
    extensions: ['.js', '.jsx']
},
context: __dirname,
entry: {
    app: ['./src/app.js'] // app: ['./MY_FOLDER_INPUT/MY_FILE_INDEX.jsx']
},
output: {
    path: PATH.join(__dirname,'public'),
    filename: 'bundle.js'
},
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }
    ]
}
};