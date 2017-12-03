Page({
  data: {
    x: 0,
    y: 0,
    hidden: true,
    width:0,
    height:0,
    canvWidth: 0,
    canvHeight: 0,
  },
  touchStart: function (e) {
    // this.setData({
    //   hidden: false,
    //   x: e.touches[0].x,
    //   y: e.touches[0].y
    // })
    console.log(e)
    // console.log(this.data.x);
    // console.log(this.data.y);
  },
  touchMove: function (e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
    console.log(this.data.x);
    console.log(this.data.y);
  },
  touchEnd: function (e) {
    this.setData({
      hidden: true
    })
    console.log(this.data.x);
    console.log(this.data.y);
  },
  touchError:function(err){
    console.log(err);
  },
  onReady:function(e){

  },
  onLoad: function () {
    try {
      var res = wx.getSystemInfoSync()
      var width = res.windowWidth
      var height = res.windowHeight
      this.setData({
        width: width,
        height: height,
        canvWidth: width,
        canvHeight: height,
      })
      // console.log(width)
      // console.log(height)


      var sudoku = wx.createCanvasContext('sudoku')
      // sudoku.fillRect(0, (height-width)/2, width, width);
      // sudoku.draw();

      // sudoku.setFillStyle('red')
      // sudoku.fillRect(0, 0, width, height)
      // sudoku.draw()
      this.drawBoard(sudoku);
    } catch (e) {
      // Do something when catch error
      console.error(e)
    }
  },
  drawBoard:function(canvas){
    let startx = 0;
    let starty = (this.data.height - this.data.width) / 2;
    let boardw = this.data.width;
    let boardh = this.data.width;
    let bold_line = 6;
    let thin_line = 1;
    canvas.setLineWidth(bold_line)
    //边框
    canvas.strokeRect(startx, starty, boardw, boardh);
    //横两条 竖两条 粗线
    for(var i = 0 ; i < 2 ; i ++){
      //竖线
      canvas.moveTo(startx + (i+1) * (boardw) / 3, starty);
      canvas.lineTo(startx + (i+1) * (boardw) / 3, starty + boardh);
      //横线
      canvas.moveTo(startx ,starty+ (i + 1) * (boardw) / 3 );
      canvas.lineTo(startx + boardw,starty + (i + 1) * (boardw) / 3);
    }
    canvas.stroke();
    // 细线
    canvas.setLineWidth(thin_line)
    for(var i = 0 ;i < 10 ; i++){
      if(i == 0|| i == 3||i == 6||i == 10){
        continue;
      }
      //竖线
      canvas.moveTo(startx + i * (boardw) / 9, starty);
      canvas.lineTo(startx + i * (boardw) / 9, starty + boardh);
      //横线
      canvas.moveTo(startx, starty + i * (boardw) / 9);
      canvas.lineTo(startx + boardw, starty + i * (boardw) / 9);
    }
    canvas.stroke();
    canvas.draw();
  }
})
