var pg = require('pg');
var config = {
  user: 'postgres',
  password: 'khoapham',
  host: 'localhost',
  port: 5432,
  database: 'EmployeeDB',
  max: 1000,
  idleTimeoutMillis: 1000
}

var pool = new pg.Pool(config);

function queryDB(sql, cb){
  pool.connect((err, client, done)=> {
    if(err){
      console.log('Loi ket noi');
    }
    done();
    client.query(sql, cb);
  });
}

function getGirl(id, cb){
  queryDB(`SELECT * FROM "Girls" WHERE id = ${id}`, (err, result) => {
    cb(result.rows[0]);
  });
}

function likeGirl(id, cb){
  queryDB(`
    WITH rows AS
      (
      	UPDATE "Girls" SET nlike = nlike + 1 WHERE id = ${id} RETURNING *
      )
    SELECT * FROM rows`, (err, result) => {
      cb(result.rows[0].nlike);
    });
}

module.exports = {likeGirl, getGirl};
