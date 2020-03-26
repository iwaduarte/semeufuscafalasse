const models = require('./index');

// Is used to UPDATE the database. Is a quick alternative to migrations. Every database change (column add, delete)
// is performed when this file is required. Use with caution.
models.sequelize.sync({
    alter: true,
    logging: true
}).then(status => {
    if (status) console.dir(status.models, {depth: 0});

}).catch(error => console.log(error));

