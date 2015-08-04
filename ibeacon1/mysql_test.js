var mysql = require('mysql');
function getItems(shop,item_id){
  var connection = mysql.createConnection({
    // host     : 'localhost', //接続先ホスト
    // user     : 'hoge',      //ユーザー名
    // password : 'piyopiyo',  //パスワード
    // database : 'piyo_db'    //DB名
     host     : 'localhost', //接続先ホスト
     port : '8889',
     user     : 'root',      //ユーザー名
     password : 'root',  //パスワード
     database : 'item_db'    //DB名
  });

  //SQL文を書く
  // SELECT * FROM `items` WHERE `shop` = '?' AND `item_id` = '?'
  var sql = "SELECT * FROM `items` WHERE `shop` = ? AND `item_id` = ?;";
  //プレースホルダに差し込むデータ
  // var shopId = 'A';
  // var itemId = 'mc01';
    var shopId= shop
    var itemId= item_id
  //接続します
  connection.connect();

  //プレースホルダー使ってSQL発行
  var query = connection.query(sql, [shopId,itemId]);

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
      connection.destroy();
      // 複数しかセッション数にも01こしか腫れない11人目が入って揚げない。なので解放する。コネクションを切る
       //終了
    });
    //結局sqlのレスポンスはハッシュってことがわかった。
}
getItems('A','mc01')