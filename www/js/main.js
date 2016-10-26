//mobile backendのAPIキーを設定
//↓本番
//var ncmb = new NCMB("bb0194930176053bea3ec03024dc1962234cb96d0b372352234b17e25f525a9e","8960c3d8602554b25f6eb59a117ac883ee26a245eaab5553eecd610eea450ba0");
//↓テスト
var ncmb = new NCMB("15c1b1aa62fb0128a2b013dd7480250f71e00a80177d53e1cab99457a7dab5a4","85490ef92f820b634523453cc9353ea8068faec84ef3894c6cb1a193bfcdb7f1");

const ThisScoreTbl = "Score2016_2";

// ゲーム数、人数 //
const GAME_WIN_POINT = 4;
const GAME_MAX = (GAME_WIN_POINT*2)-1;

// ゲーム結果 //
const GAME_RESULT_EMPTY = 0;
const GAME_RESULT_UP = 1;
const GAME_RESULT_DN = 2;

/***********************************************************
 * @brief    
 * @param	
 * @return	
 * @note	
 **********************************************************/
var showDialog = function(id){
//	  alert("OK");
	app.slidingMenu.setMainPage('page2.html', {closeMenu: true});


};

/***********************************************************
 * @brief	ページ移動時の初動関数読み込み
 * @param
 * @return
 * @note
 **********************************************************/
document.addEventListener("pageinit", function(e) 
{
	if(e.target.id == "rank-page")
	{
		gmrk_startMakeRankDisplay();
	}
	else if(e.target.id == "person-page")
	{
		var page = rankNavi.getCurrentPage();
		gmps_startPersonDisplay(page.options.param1);
	}

//	if (e.target.id == "my-page")
//	{
//		  manageDailyTbl(function(rslt){ CB_makeDailyTbl_forDisp(rslt) });
//	}
//	else if(e.target.id == "detailPage")
//	{
//		  var page = dailyNavi.getCurrentPage();
//		  makeDetailTbl(page.options.param1);
//	}
//	else if(e.target.id == "ranking-page")
//	{
////	  makeRankTbl();
//		  manageRankTbl(function(rslt){ CB_makeRankTbl_forDisp(rslt); });
//	}
}, false);

