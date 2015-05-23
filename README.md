# pdf.js sample  

## 内容  
* pdf.jsを使ったサンプルで動きの確認。  
* 日本語系のPDFを読み込ませたときなどに動的にフォントファイルを見に行くことを確認。  
  フォントファイルを見に行くための設定値の確認。
* Rangeで区切って分割してリクエストする場合としない場合の確認。  
  設定によって、動きが変わることを確認。  
* サーバサイドの実装によって、リクエストの飛ばし方が変わることの確認。

## 確認方法  
* gulp serverして、各htmlファイルにリクエストを投げて確認。
* mockServerを立ち上げて、各htmlファイルにリクエストを投げて確認。
