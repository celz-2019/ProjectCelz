var connection = require("../config/connection.js");

var orm = {
    selectAll: function (query, cb) {
        var queryString = "SELECT * FROM ??;";
        connection.query(queryString, [query.table], function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    join: function (query, cb) {
        //SELECT * FROM recipes INNER JOIN ratings ON ratings.rating_id = recipes.recipe_id;
        var queryString = "SELECT * FROM ?? INNER JOIN ?? ON ??";
        connection.query(
            queryString,
            [query.tableOne, query.tableTwo, query.on[0]],
             function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
            console.log(result.sql)
        });
    },

    create: function (query, cb){
        //INSERT INTO recipes (name, status, link, type) VALUES ('test', 1, 'www.w2schools.com', 'test');
        var queryString = "INSERT INTO ?? SET ?";
        var insertQuery = connection.query(
            queryString,
            [query.table, query.values],
            function (err, result) {
                console.log("Insert Query", insertQuery.sql);
                if (err) {
                    throw err;
                }
                cb(result);
                console.log(result);
            });
    },
<<<<<<< HEAD
=======

    update: function (query, cb){
      //UPDATE ratings SET rating = 3, comments = 'meh', favorite = 1 WHERE rating_id = 1;;
      var queryString = "UPDATE ?? SET ? WHERE ??";
      var insertQuery = connection.query(
        queryString,
        [query.table, query.set[0], query.where[0]],
        function(err, result) {
          console.log("Insert Query", insertQuery.sql);
          if (err) {
            throw err;
          }
          cb(result);
          console.log(result);
        });
    },

    delete: function (query, cb){
      //UPDATE ratings SET rating = 3, comments = 'meh', favorite = 1 WHERE rating_id = 1;;
      var queryString = "DELETE FROM ?? WHERE ?";
      var insertQuery = connection.query(
        queryString,
        [query.table, query.where[0]],
        function(err, result) {
          console.log("Insert Query", insertQuery.sql);
          if (err) {
            throw err;
          }
          cb(result);
          console.log(result);
        });
    }
>>>>>>> f6b539067675f983e2f5f736bfd835b307c7aab7
}

// orm.selectRated("recipes", "ratings", "rating_id", function(){});
// orm.create("celz", "recipes", "Waffles", "website", "breakfast", function(){});
// orm.create("celz", "recipes", "('waffles', 1, 'website', 'breakfast')", function(){});



module.exports = orm;