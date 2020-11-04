const env = {
    webPort: process.env.PORT || 1337,
    webUrl: process.env.WEB_URL || `http://localhost:1337`,
    dbHost: process.env.DB_HOST || 'localhost',
    dbPort: process.env.DB_PORT || '',
    dbUser: process.env.DB_USER || '',
    dbPassword: process.env.DB_PASSWORD || '',
    dbDatabase: process.env.DB_DATABASE || 'shorturls'
}

const dbUrl = process.env.NODE_ENV === 'production' ?
              'mongodb://' + env.dbUser + ':' + env.dbPassword + '@' + env.dbHost + ':' + env.dbPort + '/' + env.dbDatabase :
              'mongodb://localhost/' + env.dbDatabase

const corsOptions = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'application/json']
};

module.exports = {
    env,
    dbUrl,
    corsOptions
}