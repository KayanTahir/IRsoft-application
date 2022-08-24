var oracledb = require('oracledb');
var config = require('./config.js');

function get(req, res, next) {
    oracledb.getConnection(
        config.database,
        function(err, connection){
            if (err) {
                return next(err);
            }

            connection.execute(
                `SELECT user_master_id,user_master_name,user_master_pwd,user_master_email
                FROM tbl_user_master`,
                {},
                {
                    outFormat: oracledb.OBJECT
                },

                function(err, results){
                    if (err) {
                        connection.release(function(err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });

                        return next(err);
                    }

                    res.status(200).json(results.rows);

                    connection.release(function(err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                });

            }
            );
        }
        
        module.exports.get = get;