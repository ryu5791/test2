var showDialog = function(id){
//    alert("OK");
    app.slidingMenu.setMainPage('page2.html', {closeMenu: true});


};

document.addEventListener("pageinit", function(e) {
  if (e.target.id == "my-page") {
//    document.getElementById("my-content").innerHTML = "Item A<br>";
        makeDailyTbl();
        
  }else if(e.target.id == "detailPage")
  {
        var page = dailyNavi.getCurrentPage();
        makeDetailTbl(page.options.param1);
  }
}, false);

/* 日毎マスター画面作成 */
function makeDailyMasterDisplay(dailyRslt)
{
        var onsList = document.getElementById('ons-list');
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            var onsListItem = document.createElement("ons-list");
            $rslt = dailyRslt[i];
//              var onsListItem = document.createElement("my-content");
//            onsListItem.innerHTML = "<ons-row onclick = 'goToDailyDetailDisplay($rslt, this)'>" +
            onsListItem.innerHTML = "<ons-row id = dailyRow"+i+">" +
                                        "<ons-col>"+
                                            "<header>"+dailyRslt[i].date
                                                    +" 試合数："
                                                    +dailyRslt[i].gameNum
                                                    +
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
        }
        
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            (function (n) {
                $("#dailyRow" + i).click(function(){
                    goToDailyDetailDisplay(dailyRslt[n]);
                });
            })(i);
        }
    
}

/* 詳細画面へ移行 */
function goToDailyDetailDisplay(rslt)
{
    var options = {param1: rslt};
    dailyNavi.pushPage("page3.html", options);
}

/* 詳細画面作成 */
function makeDetailDisplay(detailRslt)
{
//    alert("a" + detailRslt.count);
    var name = ["","","",""];
    var gamePt = [0,0,0,0];

    var onsList = document.getElementById('detail-list');
    for( var i = 0; i< detailRslt.length; i++ )
    {
        if(detailRslt[i].row != null)       //★nullのとき
        {
            var num = Number(detailRslt[i].ID);
//alert(num);
            name[detailRslt[i].row] = get_NameFromTbl(num);   //★テーブルないとき
//alert(name[detailRslt[i].row]);
            gamePt[detailRslt[i].row] = detailRslt[i].gamePt;
        }
        else
        {
            
        }
        

        
        /* 4データで１ゲーム分の記述 */
        if(i%4 == 3)
        {
            var onsListItem = document.createElement("detail-list");
            onsListItem.innerHTML = "<ons-row>" +
                                        "<ons-col>"+
                                            "<header>"+"NO." + (i+1)/4 +
                                            "</header>" +
                                            "<header>"+"上段ゲーム数 = "
                                                    +gamePt[0]
                                                    + " |" 
                                                    +name[0]+"さん,"
                                                    +name[1]+"さん" +
                                            "</header>"+
                                            "<header>" +"下段ゲーム数 = "
                                                    +gamePt[2]
                                                    + " |" 
                                                    +name[2]+"さん,"
                                                    +name[3]+"さん"
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
        }
    }
}