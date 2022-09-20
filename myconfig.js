"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.my_path = void 0;

const path = require('path');
const root = path.resolve(__dirname, './');
const src = path.resolve(root, './src');
const database = path.resolve(src, './database');

exports.my_path = {
    'dist': path.resolve(root, './dist'),
    'data': path.resolve(root, './data'),
    'src' : src,
    'app': path.resolve(src, './app'),
    'assets': path.resolve(src, './assets'),
    'assets_data': path.resolve(src, './assets/data'),
    'assets_momentum': path.resolve(src, './assets/momentum'),
    'components': path.resolve(src, './components'),
    'locale': path.resolve(src, './locale'),
    'scss': path.resolve(src, './scss'),
    'database': database,
    'database_content': path.resolve(database, './content.json')
};