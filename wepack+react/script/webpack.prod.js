const path = require('path');
// webpack 合并插件
const merge = require('webpack-merge');
// 导出的领域组件
const domains = require('./domains/index.js');
// 清空编译目录插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// javascript 压缩插件
const TerserJSPlugin = require('terser-webpack-plugin');
// 提取javascript中的css插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// css 压缩插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 生成说明文件插件
const ManifestPlugin = require('webpack-manifest-plugin');

domains.forEach((domain,index) => {
    domains[index] = merge(domain,{
        output:{
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, `../dist/${domain.name}`),
            publicPath: `/${domain.name}/`
        },
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
            splitChunks: {
              cacheGroups: {
                commons: {
                  name: 'common',
                  chunks: "all",
                  minChunks: 1
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
              }
            }
        },
        plugins:[
            new ManifestPlugin(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].[contenthash].css',
            })
        ],
        module: {
            rules: [
              {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
              }
            ]
        },
        mode:'production',
        devtool: 'source-map'
    });
});
module.exports = domains;