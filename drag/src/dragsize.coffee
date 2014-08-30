"use strict"
###
  @author:shenqi
  @home:shaobing.sinaapp.com
  @mail:shenqihui0920@gmial.com
  @date:20130916
  @version:0.1
  @insprie:http://www.cnblogs.com/cloudgamer/archive/2008/11/17/Drag.html
###
###* 
 * drag an elem, and it will return the size you drag .
 * use like var dragSizeObj = new DragSizeClass("elemId"),
 * and if you need , change it into something like dragging in a container,
 * so it return will be in a section but i havan't finish it in this way.
 ###
class DragSizeClass extends DragBaseClass
  initialize: (drag,callback) ->
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
    # do the callback function when dragSize
    this._callback = if typeof callback is "funtion" then callback else ()->
    # change the elem's style to absolute in case the elem's style isnt absolute
    this._dragElem.style.position = "absolute"
    eventBase.addEventHandler this._dragElem, "mousedown", eventBase.bindAsEventListener this, this.start
    this.initDragFunc()
    # console.log debugCount
    # debugCount += 1
    return

  initDragFunc:()->  
    this._noDrag = []
    noDrag = (parent) ->
      _result = []
      for item in parent.children
        if item.attributes["noListen"].value
          _result.push item
      return _result

    eventBase.addEventHandler elem, "mousedown", eventBase.bindAsEventListener this, eventBase.stopBubble for elem in this._noDrag      
    return
  doStop:(event)->
    ###
      return the thing
    ###
    this._moveSizeX = this._moveStateX - this._startX + this._stopScrollX - this._startScrollX
    this._moveSizeY = this._moveStateY - this._startY + this._stopScrollY - this._startScrollY
    if (this._moveStateX is 0 and this._moveStateY is 0) or (this._moveSizeX is 0 and this._moveSizeY is 0)
      return 
    ###
      actually this return haven't any means,so,do the think you want here.
      so u need to init the obj like this
      var dragSizeObj = new DragSize("elemId",function(moveObj){
        #the call back function when stop dragging
        # code todo 
      })
      the moveObj just like {moveX:this._moveSizeX, moveY:this._moveSizeY }

    ###
    this._callback {moveX:this._moveSizeX, moveY:this._moveSizeY }
    return 
    # {
    #   moveX:this._moveSizeX,
    #   moveY:this._moveSizeY
    # }