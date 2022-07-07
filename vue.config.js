const webpack = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production'
    //   ? '/' + 'vie-associative' + '/'
    //   : '/'
    publicPath:'',
    configureWebpack: {
        plugins: [
            // ...
            new webpack.DefinePlugin({
              'process.env.NODE_ENV': JSON.stringify('production')
            }),
            // new BundleAnalyzerPlugin()
        ],
    }
}