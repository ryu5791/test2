var showDialog = function(id){
//    alert("OK");
    app.slidingMenu.setMainPage('page2.html', {closeMenu: true});


};

document.addEventListener("pageinit", function(e) {
  if (e.target.id == "my-page") {
//    document.getElementById("my-content").innerHTML = "Item A<br>";
        var onsList = document.getElementById('ons-list');
        for( var i = 0; i< 5; i++ )
        {
            var onsListItem = document.createElement("ons-list");
            onsListItem.innerHTML = "<ons-row>"+
                                        "<ons-col class = 'ons-col' width='20px' align='center'>"+
                                            "<ons-icon class='item-icon' icon='fa fa-building-o' size='20px'></ons-icon>"+
                                        "</ons-col>"+
                                        "<ons-col>"+
                                            "<header>"+
                                                "<span class='item-title' id='item-title'>"+i+"</span><br>"
                                            "</header>"+
                                        "</ons-col>"+
                                    "</ons-row>"
            onsList.appendChild(onsListItem);
            ons.compile(onsListItem);
            
        }
        
  }
}, false);




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