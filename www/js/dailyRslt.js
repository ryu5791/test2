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
//alert(page.options.param1.date);
        makeDetailTbl(page.options.param1);
  }
  else if(e.target.id == "period-page")
  {
      makeRankTbl();
  }
}, false);

// 成績表画面作成 //
function makeRankDisplay(rankRslt)
{
        var onsList = document.getElementById('rank-list');
        var onsListItem = document.createElement("rank-list");
        for( var i = 0; i< rankRslt.length; i++ )
        {
            onsListItem = document.createElement("rank-list");
            onsListItem.innerHTML = "<ons-row id = dailyRow"+i+">" +
                                        "<ons-col>"+
                                            "<header>"+rankRslt[i].ID
                                                    +" gross："
                                                    +((rankRslt[i].gamePt/rankRslt[i].gameNum).toFixed(3))
                                                    +"勝率"
                                                    +(rankRslt[i].winNum/rankRslt[i].gameNum).toFixed(3) +
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>";
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
        }
}


/* 日毎マスター画面作成 */
function makeDailyMasterDisplay(dailyRslt)
{
        var onsList = document.getElementById('ons-list');
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            var onsListItem = document.createElement("ons-list");
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
//    alert(rslt.date);
    var options = {param1: rslt};
    dailyNavi.pushPage("page3.html", options);
}

/* 詳細画面作成 */
function makeDetailDisplay(detailRslt)
{
//  alert("a" + detailRslt.count);
    var name = ["","","",""];
    var gamePt = [0,0,0,0];
    
    var onsBar = document.getElementById('detail-toolbar');
    var onsBarItem = document.createElement("detail-list");
//    onsBarItem.innerHTML = "<div class='center'>" + detailRslt[0].date +"</div>";
    onsBarItem.innerHTML = detailRslt[0].date;
    onsBar.appendChild(onsBarItem);
    ons.compile(onsBarItem);

    var onsList = document.getElementById('detail-list');
    for( var i = 0; i< detailRslt.length; i++ )
    {
        if(detailRslt[i].row != null)
        {
            name[detailRslt[i].row] = get_NameFromID(detailRslt[i].ID);
            gamePt[detailRslt[i].row] = detailRslt[i].gamePt;
        }
        else
        {
            switch(+(detailRslt[i].serveTurn))
            {
                case 1:
                    name[0] = get_NameFromID(detailRslt[i].ID);
                    gamePt[0] = detailRslt[i].gamePt;
                    break;
                case 2:
                    name[2] = get_NameFromID(detailRslt[i].ID);
                    gamePt[2] = detailRslt[i].gamePt;
                    break;
                case 3:
                    name[1] = get_NameFromID(detailRslt[i].ID);
                    gamePt[1] = detailRslt[i].gamePt;
                    break;
                case 4:
                    name[3] = get_NameFromID(detailRslt[i].ID);
                    gamePt[3] = detailRslt[i].gamePt;
                    break;
            }
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