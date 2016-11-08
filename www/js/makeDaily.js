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

/***********************************************************
 ===========================================================
 * @brief   デイリー画面表示開始
 * @param    
 * @return    
 * @note    
 ===========================================================
 **********************************************************/
function gmdl_startMakeDailyDisplay()
{
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
    var Score = ncmb.DataStore( ThisScoreTbl );
    var TotalTbl = ncmb.DataStore( "TotalManageTbl" );
    
    Score
    .order("updateDate", true)
    .count()
    .limit(1)
	.fetchAll()
	.then(function(resultScore){
        gbl_makeDaily_bkScoreLatest = resultScore[0].updateDate;
    	TotalTbl
		.count()
		.fetchAll()
		.then(function(resultManage){
            gbl_makeDaily_totalMngTbl = $.extend(true, {}, resultManage);
            if( ( resultManage.count == 0 )
             || ( gbl_makeDaily_bkScoreLatest != resultManage[0].dailyLatest ) )
            {   // 更新ありならば
                gnst_getAsScoreTbl_date(function(rslt){ lmdl_deleteAsDailyTbl(rslt) });    	// next!
            }
            else
            {   // 更新なしならば
                lmdl_getAsDailyTbl();
            }
		})
        .catch(function(err){
            alert("lmdl_chkAsRenewScoreTbl_daily2 err:"+err);
        });
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
    var DailyScore = ncmb.DataStore( "Daily" );
    
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
				lmdl_remakeAsTotalManageTbl_daily();							 // next!
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
    var DailyScore = ncmb.DataStore( "Daily" );
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
 * @brief    トータル管理テーブル保存
 * @param	
 * @return	
 * @note	メンバデータ作成後に実施
 **********************************************************/
function lmdl_remakeAsTotalManageTbl_daily()
{
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
}

/***********************************************************
 * @brief    デイリーテーブル取得
 * @param	
 * @return	
 * @note	
 **********************************************************/
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

/***********************************************************
 * @brief   デイリーテーブル取得(データベースから)
 * @param	
 * @return	
 * @note	
 **********************************************************/
function lmdl_getAsDailyTblFromDtbs()
{
    var DailyScore = ncmb.DataStore( "Daily" );
    
    DailyScore
    .order("date")
    .count()
    .limit(1000)
    .fetchAll()
    .then(function(rslt){
        gbl_makeDaily_DailyTbl = rslt;
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
    dailyNavi.pushPage("pageDailyDtl.html", options);
}

