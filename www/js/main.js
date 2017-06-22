//mobile backendのAPIキーを設定
//↓本番
//var ncmb = new NCMB("bb0194930176053bea3ec03024dc1962234cb96d0b372352234b17e25f525a9e","8960c3d8602554b25f6eb59a117ac883ee26a245eaab5553eecd610eea450ba0");
//↓テスト
var ncmb = new NCMB("9aa42fae63cd02970831cab4933f2819f4e83c9b3b21c810ec7d7403a21c1250","3e491d5ac914c76d1d2b1d6deef65f76f368c62f55df1e568a77675644040b36");


/** 定数宣言
-------------------------------------*/
const VER_NO = "ver 0.70.02";

// ゲーム数、人数 //
const GAME_WIN_POINT = 4;
const GAME_MAX = (GAME_WIN_POINT*2)-1;

// ゲーム結果 //
const GAME_RESULT_EMPTY = 0;
const GAME_RESULT_UP = 1;
const GAME_RESULT_DN = 2;

// 戻り値：データなし //
const DATA_NON = -1;

/***********************************************************
 * @brief	ページ移動時の初動関数読み込み
 * @param
 * @return
 * @note
 **********************************************************/
document.addEventListener("pageinit", function(e) 
{
    if(e.target.id == "preRank-page")
	{
        var options = {param1: 0};
        preNavi.pushPage("pageRank.html", options);
	}
    if(e.target.id == "preDaily-page")
    {
        var options = {param1: 0};
        preNavi.pushPage("pageDaily.html", options);
	}
    if(e.target.id == "preEtc-page")
    {
        var options = {param1: 0};
        preNavi.pushPage("pageEtc.html", options);
    }
	if(e.target.id == "rank-page")
	{
        var page = preNavi.getCurrentPage();
        gmrk_startMakeRankDisplay(page.options.param1);
	}
    else if(e.target.id == "daily-page")
    {
        var page = preNavi.getCurrentPage();
        gmdl_startMakeDailyDisplay(page.options.param1);
    }
    else if(e.target.id == "etc-page")
    {
        var page = preNavi.getCurrentPage();
        gmet_startMakeEtc(page.options.param1);
    }
	else if(e.target.id == "person-page")
	{
		var page = Navi1.getCurrentPage();
		gmps_startPersonDisplay(page.options.param1);
	}
    else if(e.target.id == "detail-page")
	{
		var page = Navi1.getCurrentPage();
		gmdd_startMakeDetailTbl(page.options.param1);
	}
    else if(e.target.id == "past-page")
    {
		gmpt_startPastDisplay();
	}
    else if(e.target.id == "etcData-page")
    {
        var page = Navi1.getCurrentPage();
        gmetDt_startMakeEtcData(page.options.param1);
    }
    else if(e.target.id == "etcChm1-page")
    {
        gmetChm1_startChemistry();
    }
    else if(e.target.id == "etcChm2-page")
    {
        var page = Navi2.getCurrentPage();
        gmetChm2_startChemistry(page.options.param1);
    }
    else if(e.target.id == "etcChm3-page")
    {
        var page = Navi3.getCurrentPage();
        gmetChm3_startChemistry(page.options.param1, page.options.param2, page.options.param3);
    }

}, false);

