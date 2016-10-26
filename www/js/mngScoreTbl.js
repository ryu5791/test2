/**
 * @brief    スコアテーブル管理
 * @note	接頭語：nst
 */

/** 定数宣言
 * @note	NSTはmngScoreTblの接頭語
-------------------------------------*/
const NST_RSLT_SCORE_BUF_MAX = 10;
const NST_SORT_ID = 0;
const NST_SORT_DATE = 1;

/** グローバル変数宣言
-------------------------------------*/
var gbl_mngScoreTbl_ScoreTbl_id		= new Array();
var gbl_mngScoreTbl_ScoreTbl_date	= new Array();
var gbl_mngScoreTbl_dtbsBuf_id		= new Array(NST_RSLT_SCORE_BUF_MAX);
var gbl_mngScoreTbl_dtbsBuf_date	= new Array(NST_RSLT_SCORE_BUF_MAX);

/***********************************************************
 ===========================================================
 * @brief	スコアテーブル取得(IDでソート)
 * @param	コールバック関数
 * @return	
 * @note	非同期関数（コールバックあり）
 ===========================================================
 **********************************************************/
function gnst_getAsScoreTbl_id(CB_func)
{
	if( gbl_mngScoreTbl_ScoreTbl_id[0] != null )
	{
		CB_func( gbl_mngScoreTbl_ScoreTbl_id );
	}
	else
	{
		lnst_getAsScoreTblFromDtbs( CB_func, NST_SORT_ID );
	}
}

/***********************************************************
 ===========================================================
 * @brief	スコアテーブル取得(日付でソート)
 * @param	コールバック関数
 * @return	
 * @note	非同期関数（コールバックあり）
 ===========================================================
 **********************************************************/
function gnst_getAsScoreTbl_date(CB_func)
{
	if( gbl_mngScoreTbl_ScoreTbl_date[0] != null )
	{
		CB_func( gbl_mngScoreTbl_ScoreTbl_date );
	}
	else
	{
		lnst_getAsScoreTblFromDtbs( CB_func, NST_SORT_DATE );
	}
}

/***********************************************************
 * @brief	スコアテーブル取得(データベースから)
 * @param	コールバック関数
 * @return	
 * @note	非同期関数（コールバックあり）
 **********************************************************/
function lnst_getAsScoreTblFromDtbs( CB_func, sort )
{
	var rslt0 = new Promise(function(resolve, reject){
		lnst_getScoreDt(0, resolve, 0, sort);
	});
	var rslt1000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(1000, resolve, 1, sort);
	});
	var rslt2000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(2000, resolve, 2, sort);
	});
	var rslt3000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(3000, resolve, 3, sort);
	});
	var rslt4000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(4000, resolve, 4, sort);
	});
	var rslt5000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(5000, resolve, 5, sort);
	});
	var rslt6000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(6000, resolve, 6, sort);
	});
	var rslt7000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(7000, resolve, 7, sort);
	});
	var rslt8000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(8000, resolve, 8, sort);
	});
	var rslt9000 = new Promise(function(resolve, reject){
		lnst_getScoreDt(9000, resolve, 9, sort);
	});
	
	Promise.all([rslt0, rslt1000, rslt2000, rslt3000, rslt4000, rslt5000, rslt6000, rslt7000, rslt8000, rslt9000]).then(function(value){
		if(sort == NST_SORT_ID)
		{
        	var max = gbl_mngScoreTbl_dtbsBuf_id[0].count;
            
	    	gbl_mngScoreTbl_ScoreTbl_id.count = max;
			for(var i=0, num=0; i<NST_RSLT_SCORE_BUF_MAX ; i++)
			{
				for(var j=0; j<1000; j++, num++)
				{
					if(num>=max)
					{
						break;
					}
					gbl_mngScoreTbl_ScoreTbl_id[num] = $.extend( true, {}, gbl_mngScoreTbl_dtbsBuf_id[i][j] );
				}
			}
			CB_func(gbl_mngScoreTbl_ScoreTbl_id);
		}
		else // if(sort == NST_SORT_DATE)
		{
            var max = gbl_mngScoreTbl_dtbsBuf_date[0].count;
            
	    	gbl_mngScoreTbl_ScoreTbl_date.count = max;
			for(var i=0, num=0; i<NST_RSLT_SCORE_BUF_MAX ; i++)
			{
				for(var j=0; j<1000; j++, num++)
				{
					if(num>=max)
					{
						break;
					}
					gbl_mngScoreTbl_ScoreTbl_date[num] = $.extend( true, {}, gbl_mngScoreTbl_dtbsBuf_date[i][j] );
				}
			}
			CB_func(gbl_mngScoreTbl_ScoreTbl_date);
		}
	}, function(value){
		alert("err:" + value);
	});

}

/**
 * @brief	スコアテーブル1000ずつ取得(データベースから)
 * @param	
 * @return	
 * @note	非同期関数（コールバックあり）
 *			ID順、または日付順にソート
 **********************************************************/
function lnst_getScoreDt(startPos, func, pt, sort)
{
	var Score = ncmb.DataStore( ThisScoreTbl );
	
	if(sort == NST_SORT_ID)
	{
		Score
		.order("ID").order("date").order("gameNo")
		.count()
		.limit(1000)
		.skip(startPos)
		.fetchAll()
		.then(function(rslt){
			func();
			gbl_mngScoreTbl_dtbsBuf_id[pt] = $.extend(true, {}, rslt);
		})
		.catch(function(err){
			func();
		});
	}
	else // if(sort == NST_SORT_DATE)
	{
		Score
		.order("date").order("gameNo")
		.count()
		.limit(1000)
		.skip(startPos)
		.fetchAll()
		.then(function(rslt){
			func();
			gbl_mngScoreTbl_dtbsBuf_date[pt] = $.extend(true, {}, rslt);
		})
		.catch(function(err){
			func();
		});
	}
}





