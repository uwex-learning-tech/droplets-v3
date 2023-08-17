const path = require( 'path' );

module.exports = {
    entry: './droplets/script/droplets-dev.js',
    output: {
        filename: 'droplets.js',
        path: path.resolve( __dirname, 'dist' ),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    
};