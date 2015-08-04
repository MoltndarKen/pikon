node server1.js


コメントアウトの部分はしっかり改善する。



node server1.js

起動後はhttp://localhost:8888/
にアクセス
http://localhost:8888/db/
ここでなにかしらの文字を入れて送信するといい感じに送ることができる
http://localhost:8888/db/?mise=A&syohin=mc01


そして






参考url


ibeaconの受信のjsコード
http://qiita.com/Morikuma_Works/items/c2899e548da1c5e2c28e

////////////////////////////////
nodejsのバージョン変更(v0.12.24として書く)

http://qiita.com/sinmetal/items/154e81823f386279b33c
//////////////////////////////
node.jsのバージョンをibleaconのページの作成者と同じバージョンに揃える作業を行ったurl扱
http://l.facebook.com/l.php?u=http%3A%2F%2Fqiita.com%2Fsinmetal%2Fitems%2F154e81823f386279b33c&h=pAQGjW9oo&s=1

/////////////////////////////////////
Node.jsでWebSocketサーバを作ってみる。これのserver.jsにibeaconの受信のコードを組み込んでしゅつりょくしてやれば結果をみられます。(if分websocket.send("....")の部分です)

http://blog.codebook-10000.com/entry/20130610/1370844721
///////////////////////////////////////////////

