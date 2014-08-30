"use strict"
###
  @author:shenqi
  @home:shaobing.sinaapp.com
  @mail:shenqihui0920@gmial.com
  @date:20130916
  @version:0.1
  @insprie:http://www.cnblogs.com/cloudgamer/archive/2008/11/17/Drag.html
###
# use eventBase.class
class DragBaseClass
  # bind the function with the object
  _bind = (object, fun) ->
    return () ->
      return fun.apply object, arguments
  # the class's constructor
  constructor:() ->
    # run the initlize func to bing the start function
    this.initialize.apply this,arguments
    return

  ### initialize or declare the class's all attribute that we need
    @param {string} drag the elem's id if null or undefined or not an elem's id,do nothing.Or initialize the drag class
  ###
  initialize: (drag) ->
    this._dragElem = document.getElementById drag 
    if this._dragElem is null
      return
    this._startX = 0 #Start state's x coordinate
    this._startY = 0 #Start state's y coordinate
    this._moveSizeX = 0 #the move size of x coordinate,calculate from move start to move stop
    this._moveSizeY = 0 #the move size of y coordinate,calculate from move start to move stop
    this._moveStateX = 0 #Move state's x coordinate
    this._moveStateY = 0 #Move state's y coordinate

    # save the original scroll and the last scroll in case the situation that the drag will change window's scroll,it's a common bug,also the jquery ui has this bug too
    this._startScrollX = 0 #Start state's scroll x
    this._startScrollY = 0 #Start state's scroll y
    this._stopScrollX = 0 #Stop state's scroll x
    this._stopScrollY = 0 #Stop state's scroll y

    # bind the move func to the dom elem's move func
    this._domMoveFunc = eventBase.bindAsEventListener this, this.move
    this._domStopFunc = _bind this, this.stop
    # change the elem's style to absolute in case the elem's style isnt absolute
    this._dragElem.style.position = "absolute"
    eventBase.addEventHandler this._dragElem, "mousedown", eventBase.bindAsEventListener this, this.start
    this.initDragFunc()
    # console.log debugCount
    # debugCount += 1
    return

  # init func when new a drag obj,in super is empty,you need to change it into useful and meanful when you want to do something when init a drag obj
  initDragFunc: () ->
    # console.log "DragBaseClass"
    return

  # beginning the move,just the time you mouse down
  start: (event) ->
    # this._x = event.clientX - this._dragElem.offsetLeft
    # this._y = event.clientY - this._dragElem.offsetTop

    # when it is start ,we need to initlize some varable ,it will be use in this obj's other method,every time start drag,initlize it,because it will change everytime and this will be wrong if not initlize.
    this._startScrollX = window.scrollX 
    this._startScrollY = window.scrollY 
    this._moveSizeY = 0
    this._moveSizeX = 0
    this._moveStateY = 0
    this._moveStateX = 0
    this._startX = event.clientX
    this._startY = event.clientY
    eventBase.addEventHandler document, "mousemove", this._domMoveFunc
    eventBase.addEventHandler document, "mouseup", this._domStopFunc
    # console.log "mousedown"
    this.doStart(event)
    return
  # the function will be call when start drag in start function,so if you need,change it into useful.
  doStart: (event) ->
    return
  # draging the elem
  move: (event) ->
    this._moveStateX = event.clientX
    this._moveStateY = event.clientY
    this.doMove event    
    return
  # move state's 函数，用于覆盖
  # the function will be call when dragging in move function,so if you need,change it into useful.
  doMove : (event) ->
    return
  # //停止拖动
  stop: (event) ->
    # 鉴于以下这条语句较为消耗性能，所以暂时放在Stop里面，如有需求，需要放在Move里面。
    this._stopScrollX = window.scrollX 
    this._stopScrollY = window.scrollY 
    
    eventBase.removeEventHandler document, "mousemove", this._domMoveFunc
    eventBase.removeEventHandler document, "mouseup", this._domStopFunc
    this.doStop event
    return
  # the function will be call when drag it stop when mouseup in stop function,so if you need,change it into useful.
  doStop: (event) ->
    return