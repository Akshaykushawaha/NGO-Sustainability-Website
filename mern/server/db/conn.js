const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (databaseName, callback) {
    const allowedDatabases = ["productinfo", "userinfo", "donationdb"];
    if (!allowedDatabases.includes(databaseName)) {
      return callback(new Error(`Invalid database name: ${databaseName}`));
    }

    client.connect(function (err, db) {
      if (db) {
        _db = db.db(databaseName);
        console.log(`Successfully connected to MongoDB database: ${databaseName}`);
      }
      return callback(err);
    });
  },
  getDb: function () {
    return _db;
  },

};