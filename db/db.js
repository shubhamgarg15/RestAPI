let sql = require('mssql');

const config = {
    user: 'routemaxapp',
    password: 'optym123',
    server: 'localhost',
    database: 'NodeCRUD',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

exports.executeQuery = function(query, callback){
        
    sql.connect(config)
    .then(function(){
        var request = new sql.Request()
        request.query(query)
        .then(function(result){
                callback(result);
            })
        .catch(function(err){
                console.log(err);
                callback(null, err);
            });
    })
    .catch(function(err){
        console.log(err);
        callback(null, err);
    });
         
}
