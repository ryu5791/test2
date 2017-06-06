/**
 * @brief   トータルマネージテーブル管理
 * @note    接頭語：ntt
 */

/** 定数宣言
-------------------------------------*/

/** グローバル変数宣言
-------------------------------------*/
var gbl_mngTotalManageTbl_tbl;      // トータル管理テーブル結果

/***********************************************************
 ===========================================================
 * @brief	トータルマネージテーブル指定取得
 * @param	id_pos: 今回使用するテーブルは昇順にソートされた何番目のID
 * @return	
 * @note	非同期関数（コールバックあり）
 ===========================================================
 **********************************************************/
function gntt_getAsTotalManageTbl(id_pos, CB_func)
{
    if( gbl_mngTotalManageTbl_tbl != null )
	{
		CB_func( gbl_mngTotalManageTbl_tbl[id_pos] );
	}
	else
	{
		lntt_getAsTotalManageTblFromDtbs(id_pos, CB_func );
	}
}

/***********************************************************
 * @brief   トータル管理テーブルをデータベースから取得
 * @param	コールバック関数
 * @return	
 * @note	非同期関数（コールバックあり）
 **********************************************************/
function lntt_getAsTotalManageTblFromDtbs(id_pos, CB_func)
{
    var TotalTbl = ncmb.DataStore( "TotalManageTbl" );

    TotalTbl
        .order("ID")
        .count()
        .fetchAll()
        .then(function(results){
            gbl_mngTotalManageTbl_tbl = $.extend(true, {}, results);
            CB_func( gbl_mngTotalManageTbl_tbl[id_pos] );
        })
    	.catch(function(err){
			alert("lntt_getAsTotalManageTblFromDtbs err:" + err);
		});
}

/***********************************************************
 ===========================================================
 * @brief   全トータルマネージテーブル取得
 * @param	
 * @return	
 * @note	前提として、トータルマネージテーブル取得済み
 ===========================================================
 **********************************************************/
function gntt_getTotalManageTblAll()
{
	return( gbl_mngTotalManageTbl_tbl );
}


