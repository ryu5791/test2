/**
 * @brief   デイリー画面表示
 * @note    接頭語：mdl
 */

/** グローバル変数宣言
-------------------------------------*/
var gbl_makeDaily_DailyTbl;
var gbl_makeDaily_totalMngTbl;
var gbl_makeDaily_bkScoreLatest;
var gbl_makeDaily_scoreTbl;

var gbl_makeDaily_currentTotalTbl;        // 現在使用中の管理テーブル
var gbl_makeDaily_currentDailyTblName;
var gbl_makeDaily_id_pos;

/***********************************************************
 ===========================================================
 * @brief   デイリー画面表示開始 前準備1
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmdl_startMakeDailyDisplay(id_pos)
{
    gbl_makeDaily_id_pos = id_pos;
    gntt_getAsTotalManageTbl(id_pos, function(rslt){gmdl_start2MakeDailyDisplay(rslt)});
}

/***********************************************************
 ===========================================================
 * @brief   デイリー画面表示開始 前準備1
 * @param    
 * @return    
 * @note    過去成績からBack押下時
 ===========================================================
 **********************************************************/
function gmdl_startMakeDailyDisplay_back()
{
    gntt_getAsTotalManageTbl(gbl_makeDaily_id_pos, function(rslt){gmdl_start2MakeDailyDisplay(rslt)});
}

/***********************************************************
 * @brief   デイリー画面表示開始 前準備2
 * @param    
 * @return    
 * @note    
 **********************************************************/
function gmdl_start2MakeDailyDisplay(currentTbl)
{
    gbl_makeDaily_currentTotalTbl = $.extend(true, {}, currentTbl);
    lmdl_chkAsRenewScoreTbl_daily();
}

/***********************************************************
 * @brief  デイリーテーブルに対し、スコア更新チェック
 * @param    
 * @return    
 * @note    
 **********************************************************/
function lmdl_chkAsRenewScoreTbl_daily()
{
    var Score = ncmb.DataStore( gbl_makeDaily_currentTotalTbl.scoreTbl );

    Score
    .order("updateDate", true)
    .count()
    .limit(1)
	.fetchAll()
	.then(function(resultScore){
        gbl_makeDaily_bkScoreLatest = resultScore[0].updateDate;
        if( (gbl_makeDaily_currentDailyTblName == gbl_makeDaily_currentTotalTbl.dailyTbl)
         && (gbl_makeDaily_bkScoreLatest == gbl_makeDaily_currentTotalTbl.dailyLatest))
        {   // テーブル取得済みで更新なしならば
            lmdl_makeDailyDisplay(gbl_makeDaily_DailyTbl);        		// next!	表示！
        }
        else if( gbl_makeDaily_bkScoreLatest != gbl_makeDaily_currentTotalTbl.dailyLatest)
    	{	// 更新ありならば
            gnst_getAsScoreTbl_date(gbl_makeDaily_currentTotalTbl.scoreTbl, function(rslt){ lmdl_deleteAsDailyTbl(rslt) });
		}
		else
		{	// 更新なしならば
			lmdl_getAsDailyTblFromDtbs();							// next!
		}
	})
    .catch(function(err){
        alert("lmdl_chkAsRenewScoreTbl_daily1 err:"+err);
    });
}

/***********************************************************
 * @brief   デイリーテーブル削除
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmdl_deleteAsDailyTbl(scoreRslt)
{
    var DailyScore = ncmb.DataStore( gbl_makeDaily_currentTotalTbl.dailyTbl );

    gbl_makeDaily_scoreTbl = $.extend(true, {}, scoreRslt);
    DailyScore
    .fetchAll()
    .then(function(results){
		for(var i=0; i<results.length; i++)
		{
			results[i].delete();
		}
        lmdl_startMakeAsDailyTbl();
    })
    .catch(function(err){
    	alert("lmdl_deleteAsDailyTbl err:" + err);
    });
}

/***********************************************************
 * @brief   デイリーテーブル作成開始
 * @param    
 * @return	
 * @note	
 **********************************************************/
function lmdl_startMakeAsDailyTbl()
{
    var tblInfo = new Object();

    tblInfo.ptrNum = 0;		// 解析中ポインタ
	tblInfo.gameNum = 0;

    scoreRslt = $.extend(true, {}, gbl_makeDaily_scoreTbl);
    
    lmdl_addUpAsDailyTbl( tblInfo, scoreRslt );
}

/***********************************************************
 * @brief   デイリーテーブル集計（デイリーテーブル作成のために）
 * @param    
 * @return    
 * @note	
 **********************************************************/
function lmdl_addUpAsDailyTbl( tblInfo, scoreRslt )
{
    do{
        tblInfo.gameNum++;    								// 試合数
        tblInfo.ptrNum++;
    	// ID変化あり、または終了時はデータベースへ保存
		if( ( tblInfo.ptrNum >= scoreRslt.count )
		 || ( scoreRslt[tblInfo.ptrNum-1].date != scoreRslt[tblInfo.ptrNum].date))
		{
    		lmdl_saveDailyData( tblInfo, scoreRslt );
    		if( tblInfo.ptrNum >= scoreRslt.count )
			{	// 集計終了時
				lmdl_restoreAsTotalManageTbl_daily();							 // next!
			}
			else
			{	// 集計継続
				tblInfo.gameNum = 0;
			}
		}

    }while(tblInfo.ptrNum < scoreRslt.count);
}

/**
 * @brief    集計情報をデータベースへ保存
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmdl_saveDailyData( tblInfo, scoreRslt )
{
    var DailyScore = ncmb.DataStore( gbl_makeDaily_currentTotalTbl.dailyTbl );
	var dailyScore = new DailyScore();	

    dailyScore
    .set("date", scoreRslt[tblInfo.ptrNum-1].date)
    .set("gameNum", tblInfo.gameNum/4)
    .save()
    .catch(function(err){
        alert("lmdl_saveDailyData error : " + err);
    });
}

/***********************************************************
 * @brief    デイリーテーブル保存日時更新
 * @param	
 * @return	
 * @note	メンバデータ作成後に実施
 **********************************************************/
function lmdl_restoreAsTotalManageTbl_daily()
{
    var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
    var totalTbl = new TotalTbl();

    totalTbl.set("objectId", gbl_makeDaily_currentTotalTbl.objectId);
    totalTbl.set("dailyLatest", gbl_makeDaily_bkScoreLatest).update()
    .then(function(rslt){
        gbl_makeDaily_currentTotalTbl.dailyLatest = rslt.dailyLatest;
        lmdl_getAsDailyTblFromDtbs();
    })
    .catch(function(err){
        alert("lmrk_remakeAsTotalManageTbl_daily err:" + err);
    });


/*
    var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
	var totalTbl = new TotalTbl();
	var bkRankLatest = null;
    
    if(gbl_makeDaily_totalMngTbl.count != 0)
	{
		bkRankLatest = gbl_makeDaily_totalMngTbl[0].rankLatest;
        for(var i=0; i<gbl_makeDaily_totalMngTbl.count; i++)
        {
    		gbl_makeDaily_totalMngTbl[i].delete();
        }
	}
    
    totalTbl
	.set("rankLatest", bkRankLatest)
	.set("dailyLatest", gbl_makeDaily_bkScoreLatest)
	.save()
	.then(function(rslt){
		lmdl_getAsDailyTblFromDtbs();
	})
	.catch(function(err){
		alert("lmdl_remakeAsTotalManageTbl_daily err:"+err);
	});
*/
}

/***********************************************************
 * @brief    デイリーテーブル取得
 * @param	
 * @return	
 * @note	
 **********************************************************/
/*
function lmdl_getAsDailyTbl()
{
    if(gbl_makeDaily_DailyTbl == null)
    {
        lmdl_getAsDailyTblFromDtbs();
    }
    else
    {
        lmdl_makeDailyDisplay(gbl_makeDaily_DailyTbl);    			// next!	表示！
    }
}
*/

/***********************************************************
 * @brief   デイリーテーブル取得(データベースから)
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmdl_getAsDailyTblFromDtbs()
{
    var DailyScore = ncmb.DataStore( gbl_makeDaily_currentTotalTbl.dailyTbl );
    
    DailyScore
    .order("date")
    .count()
    .limit(1000)
    .fetchAll()
    .then(function(rslt){
        gbl_makeDaily_DailyTbl = rslt;
        gbl_makeDaily_currentDailyTblName = gbl_makeDaily_currentTotalTbl.dailyTbl;
        lmdl_makeDailyDisplay(gbl_makeDaily_DailyTbl);       		// next!	表示！
    })
    .catch(function(err){
        alert("lmdl_getAsDailyTblFromDtbs err:" + err);
    });
}

/***********************************************************
 * @brief    デイリーテーブル表示
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmdl_makeDailyDisplay(dailyRslt)
{
    // タイトル表示
    //----------------------------------
    var onsList = document.getElementById('daily-toolbar');
    var onsListItem = document.createElement("daily-toolbar");
    
    if( gbl_makeDaily_id_pos == 0 )
    {
        onsListItem.innerHTML = "デイリー";
    }
    else
    {
        onsListItem.innerHTML = gbl_makeDaily_currentTotalTbl.disp;
    }

    onsList.appendChild(onsListItem);
	ons.compile(onsListItem);

    // 表の表示
    //----------------------------------

    var onsList = document.getElementById('daily-list');
    for( var i = 0; i< dailyRslt.length; i++ )
    {
        var onsListItem = document.createElement("daily-list");
        onsListItem.innerHTML = "<ons-row id = dailyRow"+i+">" +
                                    "<ons-col>"+
                                        "<header>"+dailyRslt[i].date
                                                +"  試合数："
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
                lmdl_goToDailyDetailDisplay(dailyRslt[n]);
            });
        })(i);
    }
}

/***********************************************************
 * @brief    デイリー詳細画面へ移行
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmdl_goToDailyDetailDisplay(rslt)
{
    var options = {param1: rslt};
    Navi.pushPage("pageDailyDtl.html", options);
}

/***********************************************************
 ===========================================================
 * @brief   トータル管理用ID取得
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmdl_get_id_pos()
{
    return gbl_makeDaily_id_pos;
}

/***********************************************************
 ===========================================================
 * @brief   現在のスコアテーブル取得
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmdl_get_current_scoreTbl()
{
    return gbl_makeDaily_currentTotalTbl.scoreTbl;
}

/***********************************************************
 ===========================================================
 * @brief   個人画面からBack押下でランク画面へ移行時
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmdl_back_to_daily()
{
    if(gbl_makeDaily_id_pos == 0)
    {
        showDialog('pageDaily');
    }
    else
    {
        showDialog('backDaily');
    }
}
