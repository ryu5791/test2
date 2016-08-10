//mobile backendのAPIキーを設定
var ncmb = new NCMB("393df630e14da8cd6fae4850b326ed3abf88afb2ab3067dc858ce24ddb9bbb9c","d7051f8f5d410f7added420e088715b687a7429a74cf5ad31e7aabaa516d13a9");

//データをmobile backendに保存するメソッド
function saveData(){

    alert("test");
//    //クラス名を指定して新規クラスを作成
//    var Data = ncmb.DataStore("Data");
//
//    //Dataクラスのインスタンスを作成
//    var data = new Data();
//
//    //作成したインスタンスのaisatsuというフィールドに文字データを設定
//    data.set("aisatsu", "hello, world!");
//
//    //設定したデータをmobile backendに保存
//    data.save()
//        .then(function(object) {
//              //成功する時の処理
//              $("#message").html("<p>データ保存に成功!</p>");
//          })
//        .catch(function(error) {
//              //エラーが発生する時の処理
//              $("#message").html("error:" + error.message);          
//          });
} 

//mobile backendへの会員登録を行うメソッド
function login (){
    //テキストボックスからユーザー名とパスワードを取得
    var userName = $("#user_name").val();
    var password = $("#password").val();

    //ユーザークラスのインスタンスを作成
    var user = new ncmb.User();

    //インスタンスにユーザー名とパスワードを設定
    user.set("userName", userName)
        .set("password", password);

    //会員登録を行うsignUpByAccountメソッドを実行
    user.signUpByAccount()
        .then(function (object){
            //成功する時の処理
            ncmb.User.login(userName, password)
                     .then(function(data){
                        // ログイン後処理
                        getCurrentUser();              
                     })
                     .catch(function(err){
                        // エラー処理
                        console.log("error:" + error.message);
                     });
        })
        .catch(function (error){
            //エラーが発生する時の処理
            console.log("error:" + error.message);
        });
}

//ログイン中のユーザー名を取得して画面に表示する
function getCurrentUser(){
    //ログイン中の会員を取得
    var user = ncmb.User.getCurrentUser();

    //取得した会員のユーザー名を表示する
    $("#current_user").text("ログイン中のユーザー名："　+ user.get("userName"));
}

//$(function() {
//  // 3候補リストに表示するデータを配列で準備
//  var data = [
//    "accepts",
//    "action_name",
//    "add",
//    "add_column",
//    "add_index",
//    "add_timestamps",
//    "after_create",
//    "after_destroy",
//    "after_filter",
//    "all",
//  ];
//
//  // 2オートコンプリート機能を適用
//  $("#txtKeywd").autocomplete({
//    source: data,
//    autoFocus: true,
//    delay: 500,
//    minLength: 2
//  });
//});
//
//var dataList = [
//    ['とうきょうとしんじゅくく', '東京都新宿区'],
//    ['とうきょうとしながわく',   '東京都品川区'],
//    ['とうきょうとすぎなみく',   '東京都杉並区']
//];
//
//$(function() {
//    /* input要素にオートコンプリートを適用 */
//    $('input[name=address]').autocomplete({
//        source : function(request, response) {
//            var re   = new RegExp('^(' + request.term + ')'),
//                list = [];
// 
//            $.each(dataList, function(i, values) {
//                if(values[0].match(re) || values[1].match(re)) {
//                    list.push(values[1]);
//                }
//            });
//            response(list);
//        }
//    });
//});
//

