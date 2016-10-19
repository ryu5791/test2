/**
 * @brief   メンバーテーブル管理
 * @note    
 */

/** グローバル変数宣言
-------------------------------------*/
var gbl_mngMemberTbl_MemberTbl;          // メンバーテーブル結果

/**
 * @brief   メンバーテーブル取得
 * @param   コールバック関数
 * @return  
 * @note    非同期関数（コールバックあり）
 */
function getAsMemberTbl(CB_func)
{
    if( gbl_mngMemberTbl_MemberTbl != null )
    {
        CB_func( gbl_mngMemberTbl_MemberTbl );
    }
    else
    {
        getAsMemberTblFromDtbs( CB_func );
    }
}

/**
 * @brief   メンバーテーブルをデータベースから取得
 * @param   コールバック関数
 * @return  
 * @note    非同期関数（コールバックあり）
 */
function getAsMemberTblFromDtbs(CB_func)
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
            alert("getAsMemberTblFromDtbs err:" + err);
        });
}
