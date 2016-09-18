var showDialog = function(id){
//    alert("OK");
    app.slidingMenu.setMainPage('page2.html', {closeMenu: true});


};

document.addEventListener("pageinit", function(e) {
  if (e.target.id == "my-page") {
//    document.getElementById("my-content").innerHTML = "Item A<br>";
        makeDailyTbl();
        
  }else if(e.target.id == "detail.html")
  {
        
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
            onsListItem.innerHTML = "<ons-row onclick = 'goToDailyDetailDisplay($rslt)'>" +
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
    
}

function goToDailyDetailDisplay(rslt)
{
    var options = {param1: rslt};
    dailyNavi.pushPage("page3.html", options);
}