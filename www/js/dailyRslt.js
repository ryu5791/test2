var showDialog = function(id){
//    alert("OK");
    app.slidingMenu.setMainPage('page2.html', {closeMenu: true});


};

document.addEventListener("pageinit", function(e) {
  if (e.target.id == "my-page") {
//    document.getElementById("my-content").innerHTML = "Item A<br>";
        makeTbl();
        
  }
}, false);

/* 日毎マスター画面作成 */
function makeDailyMasterDisplay(dailyRslt)
{
        var onsList = document.getElementById('ons-list');
        for( var i = 0; i< dailyRslt.length; i++ )
        {
            var onsListItem = document.createElement("ons-list");
//              var onsListItem = document.createElement("my-content");
            onsListItem.innerHTML = "<ons-row onclick=alert("+"'OK!'"+")>"+
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


/*
ons.ready(function() {

  var infiniteList = document.getElementById('infinite-list');

  infiniteList.delegate = {
    createItemContent: function(i) {
      return ons._util.createElement(
        '<ons-list-item>Item ' + i + '</ons-list-item>'
      );
    },
    countItems: function() {
      return 10000;
    },
    calculateItemHeight: function() {
      return ons.platform.isAndroid() ? 48 : 44;
    }
  };

  infiniteList.refresh();
});
*/