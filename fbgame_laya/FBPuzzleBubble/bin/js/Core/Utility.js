    
    /**
     * 泡泡移动速度
     */
     var BUBBLE_SPEED = 30;
     /**
      * 泡泡半径
      */
     var BUBBLE_RADIUS = 40;
     /**
      * 最大行数
      */
     var MAX_ROWS = 1500;
     /**
      * 最大列数
      */
     var MAX_COLS = 9;
     /**
      * 相同个数删除
      */
     var REMOVE_COUNT = 3;
   
    /**
     * 获得两个坐标差值
     */
    function PointSub(v1,v2){
        return new Point(v1.x - v2.x, v1.y - v2.y);
    }
    //根据行列获得坐标
    function getPosByRowAndCol(row,col)
    {
        var posX, posY;


        posX = col * 2 * BUBBLE_RADIUS + BUBBLE_RADIUS + (row % 2) * BUBBLE_RADIUS;
        posY = row * 2 * BUBBLE_RADIUS * Math.sin(Math.PI/3) + BUBBLE_RADIUS ;

        return new Point(posX, posY);
    }

    //根据坐标获得行列
    function GetRowColByPos( nPosX, nPosY)
    {
        var nRow, nCol;
        //需要四舍五入

        nRow = ( nPosY -BUBBLE_RADIUS )/( 2 *BUBBLE_RADIUS *Math.sin ( Math.PI/3 ) ) +0.5;

        nCol = ( nPosX - ( nRow % 2 ) * BUBBLE_RADIUS - BUBBLE_RADIUS ) * 1.0 /(  2 *BUBBLE_RADIUS ) + 0.5;
        
        nRow = parseInt(nRow);
        nCol = parseInt(nCol);
        if(nCol < 0){
            nCol = 0;
        }
        if(nCol > MAX_COLS - 1){
            nCol = MAX_COLS - 1;
        }
        if (nRow % 2 != 0) {
            if(nCol > MAX_COLS - 2){
                nCol = MAX_COLS - 2;
            }
        }
        // console.debug("------nrow="+nRow+",ncol="+nCol);
        return new Point( nRow, nCol );
    }
    //@获得周围停靠位置的列表nRow,nCol为要计算的停靠位置，vecPos返回它周围的位置
    function GetAround(nRow, nCol, vecPos )
    {
        if (!IsValidPos(nRow, nCol))
        {
            return;
        }

        //同一行
        if (IsValidPos(nRow, nCol - 1))
        {
            vecPos.push(new Point(nRow, nCol - 1));
        }
        if (IsValidPos(nRow, nCol + 1))
        {
            vecPos.push(new Point(nRow, nCol + 1));
        }

        //左斜线
        if (IsValidPos(nRow - 1, nCol))
        {
            vecPos.push(new Point(nRow - 1, nCol));
        }
        if (IsValidPos(nRow + 1, nCol))
        {
            vecPos.push(new Point(nRow + 1, nCol));
        }

        //如果是单行
        var curCol;
        if (nRow % 2 == 0)
            curCol = nCol - 1;
        else
            curCol = nCol + 1;

        //右斜线
        if (IsValidPos(nRow - 1, curCol))
        {
            vecPos.push(new Point(nRow - 1, curCol));
        }
        if (IsValidPos(nRow + 1, curCol))
        {
            vecPos.push(new Point(nRow + 1, curCol));
        }

    }

    //@一个位置是否有效的停靠点
    function IsValidPos(nRow, nCol )
    {
        if (nRow < 0 || nCol < 0)
        {
            return false;
        }
        // if (nRow >= MAX_ROWS || nCol >= MAX_COLS - nRow % 2)
        if (nCol >= MAX_COLS - nRow % 2)
        {
            return false;
        }

        return true;
    }