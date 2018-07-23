let config
if ( process.env.NODE_ENV == 'production' ){
    config = require('./config-production.js').default
}
else{
    config = require('./config-production.js').default
}


export default config