const merge = require('webpack-merge');
const domains = require('./domains/index.js');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

domains.forEach((domain,index) => {
    domains[index] = merge(domain,{
        devServer: {
            contentBase:'./dist',
            hot: true
        },
        output:{
            filename: '[name].[hash].js',
            path: path.resolve(__dirname, `../dist/${domain.name}`),
            publicPath: `/${domain.name}`
        },
        plugins:[
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            new ManifestPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                      'style-loader',
                      'css-loader'
                    ]
                }
            ]
        },
        mode:'development',
        devtool: 'inline-source-map'
    });
});
module.exports = domains;