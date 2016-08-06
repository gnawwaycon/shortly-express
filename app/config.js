// const Sequelize = require('sequelize');
//
// const sequelize = new Sequelize('postgres://postgres@localhost/shortly');
// sequelize.authenticate()
//   .then(() => console.log('database is connected'))
//   .catch(err => console.error(err));
//
// module.exports = sequelize;
//
// const Url = sequelize.define('url', {
//   url: {type: Sequelize.STRING, unique: true},
//   baseUrl: {type: Sequelize.STRING, unique true},
//   code: {type: Sequelize.STRING, unique true},
//   title: {type: Sequelize.STRING, unique true},
//   visits: {type: Sequelize.INTEGER, unique true},
// })
//
// const Clicks = sequelize.define('click', {
//   numClick: {sequelize.INTEGER}
// })
//
//
// module.exports = {
//   Url,
//   Clicks
// }

var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

db.knex.schema.hasTable('clicks').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('clicks', function (click) {
      click.increments('id').primary();
      click.integer('linkId');
      click.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

/************************************************************/
// Add additional schema definitions below
/************************************************************/


module.exports = db;
