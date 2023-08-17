const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
    entry: {
        'droplets' : [
            path.resolve(__dirname, './droplets/assets/droplets-dev.js'),
            path.resolve(__dirname, './droplets/assets/prism.js'),
        ],
    },
    output: {
        filename: '[name].js',
        path: path.resolve( __dirname, 'dist', 'assets' ),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                          // Prefer `dart-sass`
                          implementation: require.resolve('sass'),
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin( {
            template: 'droplets/index.html',
            chunksSortMode: 'auto',
            filename: path.resolve( __dirname, 'dist', 'index.html' ),
        } ),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        } ),
    ],
};