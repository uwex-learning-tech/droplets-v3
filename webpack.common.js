const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
    entry: {
        'droplets' : path.resolve(__dirname, './droplets/assets/droplets-dev.js'),
    },
    output: {
        filename: 'assets/[name].js',
        path: path.resolve( __dirname, 'dist' ),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        }
                    },
                    "postcss-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                          // Prefer `dart-sass`
                          implementation: require('sass'),
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css',
            chunkFilename: 'assets/[id].css',
        } ),
    ],
};