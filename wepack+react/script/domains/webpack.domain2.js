const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('../webpack.common.js');
const merge = require('webpack-merge');

const name = 'domain2';
const domain = {
    name:`${name}`,
    plugins:[
        new HtmlWebpackPlugin({
            template:`./src/${name}/index.html`,
            title:`${name}`,
            chunks:['common','styles',`${name}`]
        })
    ]
};
domain.entry={};
domain.entry[name]=`./src/${name}/index.js`;
module.exports = merge(common,domain);