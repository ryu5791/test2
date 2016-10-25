/**
 * @brief   スコアテーブル管理
 * @note    
 */

/** 定数宣言
-------------------------------------*/
const RSLT_SCORE_BUF_MAX = 10;

/** グローバル変数宣言
-------------------------------------*/
//var gbl_mngScoreTbl_ScoreTbl = new Array(RSLT_SCORE_BUF_MAX*1000);          // スコアテーブル結果
var gbl_mngScoreTbl_ScoreTbl = new Array();
var gbl_mngScoreTbl_dtbsBuf = new Array(RSLT_SCORE_BUF_MAX);

/***********************************************************
 * @brief   スコアテーブル取得
 * @param   コールバック関数
 * @return  
 * @note    非同期関数（コールバックあり）
 **********************************************************/
function getAsScoreTbl(CB_func)
{
    if( gbl_mngScoreTbl_ScoreTbl[0] != null )
    {
        CB_func( gbl_mngScoreTbl_ScoreTbl );
    }
    else
    {
        getAsScoreTblFromDtbs( CB_func );
    }
}

/***********************************************************
 * @brief   スコアテーブル取得(データベースから)
 * @param   コールバック関数
 * @return  
 * @note    非同期関数（コールバックあり）
 **********************************************************/
function getAsScoreTblFromDtbs( CB_func )
{
    var rslt0 = new Promise(function(resolve, reject){
        getScoreDt(0, resolve, 0);
    });
    var rslt1000 = new Promise(function(resolve, reject){
        getScoreDt(1000, resolve, 1);
    });
    var rslt2000 = new Promise(function(resolve, reject){
        getScoreDt(2000, resolve, 2);
    });
    var rslt3000 = new Promise(function(resolve, reject){
        getScoreDt(3000, resolve, 3);
    });
    var rslt4000 = new Promise(function(resolve, reject){
        getScoreDt(4000, resolve, 4);
    });
    var rslt5000 = new Promise(function(resolve, reject){
        getScoreDt(5000, resolve, 5);
    });
    var rslt6000 = new Promise(function(resolve, reject){
        getScoreDt(6000, resolve, 6);
    });
    var rslt7000 = new Promise(function(resolve, reject){
        getScoreDt(7000, resolve, 7);
    });
    var rslt8000 = new Promise(function(resolve, reject){
        getScoreDt(8000, resolve, 8);
    });
    var rslt9000 = new Promise(function(resolve, reject){
        getScoreDt(9000, resolve, 9);
    });
    
    Promise.all([rslt0, rslt1000, rslt2000, rslt3000, rslt4000, rslt5000, rslt6000, rslt7000, rslt8000, rslt9000]).then(function(value){
        var max = gbl_mngScoreTbl_dtbsBuf[0].count;
        gbl_mngScoreTbl_ScoreTbl.count = max;
        for(var i=0, num=0; i<RSLT_SCORE_BUF_MAX ; i++)
        {
            for(var j=0; j<1000; j++, num++)
            {
                if(num>=max)
                {
                    break;
                }
                gbl_mngScoreTbl_ScoreTbl[num] = $.extend( true, {}, gbl_mngScoreTbl_dtbsBuf[i][j] );
            }
        }
        CB_func(gbl_mngScoreTbl_ScoreTbl);
    }, function(value){
        alert("err:" + value);
    });

}

/**
 * @brief   スコアテーブル1000ずつ取得(データベースから)
 * @param   
 * @return  
 * @note    非同期関数（コールバックあり）
 *          ID順にソート
 **********************************************************/
function getScoreDt(startPos, func, pt)
{
    var Score = ncmb.DataStore( ThisScoreTbl );
    
    Score
    .order("ID").order("date").order("gameNo")
    .count()
    .limit(1000)
    .skip(startPos)
    .fetchAll()
    .then(function(rslt){
        func();
        gbl_mngScoreTbl_dtbsBuf[pt] = $.extend(true, {}, rslt);
    })
    .catch(function(err){
        func();
    });
    
}





