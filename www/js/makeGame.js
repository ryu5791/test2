/**
 * @brief    ランク画面表示
 * @note    接頭語：mgm
 */

/** 定数宣言
-------------------------------------*/
// ゲーム数、人数 //
const MGM_GAME_WIN_POINT = 4;
const MGM_GAME_MAX = (MGM_GAME_WIN_POINT*2)-1;

// ゲーム結果 //
const MGM_GAME_RESULT_EMPTY = 0;
const MGM_GAME_RESULT_UP = 1;
const MGM_GAME_RESULT_DN = 2;


/***********************************************************
 ===========================================================
 * @brief    個人画面表示開始  前準備1
 * @param    
 * @return    
 * @note	ID格納、メンバーテーブル取得
 ===========================================================
 **********************************************************/
function gmgm_gameDetailDisplay(strTitle, dispRslt)
{
    alert(  strTitle + dispRslt[0].date + "  No." + dispRslt[0].gameNo + "\n"
            + lmgm_dispNameAddSpace(dispRslt[0].name, 6) + lmgm_dispPersonScore(dispRslt[0], 0) + "\n"
            + lmgm_dispNameAddSpace(dispRslt[1].name, 6) + lmgm_dispPersonScore(dispRslt[1], 1) + "\n"
            + lmgm_get_dispGameScore(dispRslt) +"\n"
            + lmgm_dispNameAddSpace(dispRslt[2].name, 6) + lmgm_dispPersonScore(dispRslt[2], 2) + "\n"
            + lmgm_dispNameAddSpace(dispRslt[3].name, 6) + lmgm_dispPersonScore(dispRslt[3], 3)
            );
}

/**
 * @brief   空白つきの名前表示
 * @param   strNum: 表示文字数(半角)
 * @return    
 * @note    
 **********************************************************/
function lmgm_dispNameAddSpace(name, strNum)
{
    var enCnt = 0;

    for (var i = 0;  i < name.length; i++) {
        enCnt += name.charCodeAt(i) <= 255 ? 1 : 2;
        if (enCnt > strNum) 
        {
            return name.substr(0, i);
        }
    }

    if( enCnt != strNum ){
        for(;enCnt<strNum; enCnt=enCnt+2)   // 半角２つと全角では大きさが異なるため空白は全角を使用
        {
            name = name+"　";
        }
    }
    return name;
}

/**
 * @brief   個人のスコア表示
 * @param   
 * @return    
 * @note    
 **********************************************************/
function lmgm_dispPersonScore(rslt, row)
{
    var str = "|";
    
    for(var i=0; i<MGM_GAME_MAX; i++)
    {
        //サーブ1巡目
        if(i<4)
        {
            if(i==(rslt.serveTurn-1))
            {
                if(rslt.serve1st==1)
                {
                    str += "○";
                }
                else
                {
                    str += "Ｘ";
                }
            }
            else
            {
                str += "　";
            }
        }
        else
        {//サーブ2巡目
            if(i==(rslt.serveTurn-1+4))
            {
                if(rslt.serve2nd==1)
                {
                    str += "○";
                }
                else if(rslt.serve2nd==0)
                {
                    str += "Ｘ";
                }
                else
                {
                    str += "　";
                }
            }
            else
            {
                str += "　";
            }
        }
    }
    
    str += "|";
    return str;
}

/**
 * @brief   ゲームのスコア表示（上下段両方）
 * @param   
 * @return    
 * @note    
 **********************************************************/
function lmgm_get_dispGameScore(rslt)
{
    var str = "－－－|";
    var score = new Array(MGM_GAME_MAX);

    // ゲーム経過結果取得
    for(var i=0; i<MGM_GAME_MAX; i++)
    {
        score[i] = lmgm_get_columnGame(rslt, i);
    }

    // 上段結果表示
    for(var i=0; i<MGM_GAME_MAX; i++)
    {
        if(score[i]==MGM_GAME_RESULT_UP)
        {
            str += "◎";
        }
        else
        {
            str += "　";
        }
    }
    
    str += ("| " + rslt[0].gamePt + "\n" + "－－－|");
    
    // 下段結果
    for(var i=0; i<MGM_GAME_MAX; i++)
    {
        if(score[i]==MGM_GAME_RESULT_DN)
        {
            str += "◎";
        }
        else
        {
            str += "　";
        }
    }
    
    str += ("| " + rslt[2].gamePt);
    
    return(str);
}



/**
 * @brief   ゲーム経過結果、1列分取得
 * @param   
 * @return    
 * @note    
 **********************************************************/
function lmgm_get_columnGame(rslt, col)
{
    var ret = MGM_GAME_RESULT_EMPTY;

    if( (col == (MGM_GAME_MAX-1))           // 7ゲーム目（タイブレも考慮）
      &&((rslt[0].gamePt+rslt[2].gamePt)==8) )
    {
        if(rslt[0].gamePt == 5)
        {
            ret = MGM_GAME_RESULT_UP;
        }
        else
        {
            ret = MGM_GAME_RESULT_DN;
        }
    }
    else
    {
        for(var i=0; i<4; i++)
        {
            if((col%4)==(rslt[i].serveTurn-1))     // サーブ順が一致
            {
                if(col<4)                       // サーブ一巡目
                {
                    if(i<2)                     // 上段
                    {
                        if(rslt[i].serve1st==1)
                        {
                            ret = MGM_GAME_RESULT_UP;
                        }
                        else if(rslt[i].serve1st==0)
                        {
                            ret = MGM_GAME_RESULT_DN;
                        }
                    }
                    else                        // 下段
                    {
                        if(rslt[i].serve1st==1)
                        {
                            ret = MGM_GAME_RESULT_DN;
                        }
                        else if(rslt[i].serve1st==0)
                        {
                            ret = MGM_GAME_RESULT_UP;
                        }
                    }
                }
                else                            // サーブ２巡目
                {
                    if(i<2)                     // 上段
                    {
                        if(rslt[i].serve2nd==1)
                        {
                            ret = MGM_GAME_RESULT_UP;
                        }
                        else if(rslt[i].serve2nd==0)
                        {
                            ret = MGM_GAME_RESULT_DN;
                        }
                    }
                    else                        // 下段
                    {
                        if(rslt[i].serve2nd==1)
                        {
                            ret = MGM_GAME_RESULT_DN;
                        }
                        else if(rslt[i].serve2nd==0)
                        {
                            ret = MGM_GAME_RESULT_UP;
                        }
                    }
                }
            }
        }
    }
    return ret;
}





