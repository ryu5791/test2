/**
 * @brief    メンバーテーブル、HDCPテーブル管理
 * @note    接頭語：nmt
 */

/** グローバル変数宣言
-------------------------------------*/
var gbl_mngMemberTbl_MemberTbl;    		 // メンバーテーブル結果
var gbl_mngMemberTbl_MemberTbl_addHdcp;
var gbl_mngMemberTbl_currentHdcpTblName;

/***********************************************************
 ===========================================================
 * @brief	メンバーテーブル取得
 * @param	コールバック関数
 * @return	
 * @note	非同期関数（コールバックあり）
 ===========================================================
 **********************************************************/
function gnmt_getAsMemberTbl(CB_func)
{
	if( gbl_mngMemberTbl_MemberTbl != null )
	{
		CB_func( gbl_mngMemberTbl_MemberTbl );
	}
	else
	{
		lnmt_getAsMemberTblFromDtbs( CB_func );
	}
}

/***********************************************************
 * @brief	メンバーテーブルをデータベースから取得
 * @param	コールバック関数
 * @return	
 * @note	非同期関数（コールバックあり）
 **********************************************************/
function lnmt_getAsMemberTblFromDtbs(CB_func)
{
	var Member = ncmb.DataStore("member");
	
	Member
		.order("ID")
		.limit(1000)
		.count()
		.fetchAll()
		.then(function(results){
			gbl_mngMemberTbl_MemberTbl = $.extend(true, {}, results);
			CB_func( gbl_mngMemberTbl_MemberTbl );
		})
		.catch(function(err){
			alert("lnmt_getAsMemberTblFromDtbs err:" + err);
		});
}
