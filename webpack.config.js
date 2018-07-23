const isProd = process.argv.indexOf( '-p' ) !== -1

const webpack = require( 'webpack' )
const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const path = require( 'path' )

const config = {
    context: path.resolve( __dirname, './src' ),
    entry: {
        app: __dirname + "/src/index.js"
    },
    output:{
        path: path.resolve( __dirname, "./dist" ),
        filename: "js/app.js"
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react', 'stage-2']
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve( './src' ),
            path.resolve( './node_modules' )
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './dist/'
    },
    watchOptions: {
        aggregateTimeout: 100,
        poll: 200,
        ignored: '/node_modules/'
    },
    plugins: [],
    devtool: 'source-map',
    mode: 'development'
}

config.plugins.push( new webpack.HotModuleReplacementPlugin() )
config.plugins.push( new HtmlWebpackPlugin( {
    template: 'index.html',
    filename: 'index.html',
    inject: false
} ) )
config.plugins.push( new webpack.DefinePlugin( {
    'process.env':{
        'NODE_ENV': JSON.stringify( isProd?'production':'development' )
    }
} ) )
config.plugins.push( new webpack.optimize.AggressiveMergingPlugin() )

module.exports = config