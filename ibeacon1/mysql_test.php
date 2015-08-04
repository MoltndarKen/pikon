var mysql = require('mysql');

var connection = mysql.createConnection({
  // host     : 'localhost', //接続先ホスト
  // user     : 'hoge',      //ユーザー名
  // password : 'piyopiyo',  //パスワード
  // database : 'piyo_db'    //DB名
   host     : 'localhost', //接続先ホスト
   user     : 'root',      //ユーザー名
   password : 'root',  //パスワード
   database : 'piyo_db'    //DB名
});

//SQL文を書く
var sql = 'SELECT * FROM piyotable WHERE UserNO = ?;';
//プレースホルダに差し込むデータ
var userId = '012345678';

//接続します
connection.connect();

//プレースホルダー使ってSQL発行
var query = connection.query(sql, [userId]);

//あとはイベント発生したらそれぞれよろしくねっ
query
  //エラー用
  .on('error', function(err) {
    console.log('err is: ', err );
  })

  //結果用
  .on('result', function(rows) {
    console.log('The res is: ', rows );
  })

  //終わったよう～
  .on('end', function() {
    console.log('end');
    connection.destroy(); //終了
  });