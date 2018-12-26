
const ExtractPlugin = require('extract-text-webpack-plugin');
const HTMLPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: `${__dirname}/src/main.jsx`,
    output: {
        filename: 'bundle-[hash].js',
        path: `${__dirname}/build`,
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
    performance: {
        hints: false,
    },
    plugins: [
        new HTMLPlugin(),
        new ExtractPlugin('bundle-[hash].css'),
    ],
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_module/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loader: ExtractPlugin.extract(['css-loader', 'sass-loader']),
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            // path where the images will be saved
                            name: 'assets/img/[name].[ext]',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                quality: 65,
                            },
                            pngquant: {
                                quality: '10-20',
                                speed: 4,
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false,
                                    },
                                    {
                                        removeEmptyAttrs: false,
                                    },
                                ],
                            },
                            gifsicle: {
                                optimizationLevel: 7,
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                                interlaced: false,
                            },
                        },
                    },
                ],
            },
        ],
    },
};
