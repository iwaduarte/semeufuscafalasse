module.exports = {
    "local-dev": {
        dbHost: process.env["DBHOST-LOCAL"],
        dbName: process.env["DBNAME-LOCAL"],
        dbUser: process.env["DBUSER-LOCAL"],
        dbPass: process.env["DBPASS-LOCAL"],
        dbPort: process.env["DBPORT-LOCAL"],
        dbSSL: false,

    },
    "remote": {
        dbHost: process.env.DBHOST,
        dbName: process.env.DBNAME,
        dbUser: process.env.DBUSER,
        dbPort: process.env.DBPORT,
        //only used locally if set in .env for test purposes
        dbPass: process.env.DBPASS,
        dbSSL: true,

    },


};