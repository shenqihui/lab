###* 
 * drag an elem, and the elem will follow the mouse,move the size you drag.
 * use like var dragFollowObj = new DragFollowClass("elemId"),
 * and then drag the elem ,the elem will follow the pointer of the mouse.
 * it have no regulation so you can drag it every in the html.
 * and if you need , change it into something like dragging in a container,
 * and i havan't finish it in this way.
 ###
"use strict"
###
  @author:shenqi
  @home:shaobing.sinaapp.com
  @mail:shenqihui0920@gmial.com
  @date:20130916
  @version:0.1
###
class DragFollowClass extends DragBaseClass
  doStart: (event) ->
    this._cssLeft = parseFloat this._dragElem.style.left
    this._cssTop = parseFloat this._dragElem.style.top
    return
  ###*
    i thought it will be something happen when drag so fast.this we just call it bug.So,do it again when stop.
    when the scroll exist,do it when moving,if calculate the scroll , it will be harm for the performance,so i bring it into the stop function.
  ###
  doMove: (event) ->
    left = this._cssLeft + event.clientX - this._startX
    top = this._cssTop + event.clientY - this._startY
    if top is 0 and left is 0
      return
    this._dragElem.style.left = "#{left}px"
    this._dragElem.style.top = "#{top}px"
    return
  doStop: (event) ->
    ###
      thinking about the scroll.
    ###
    this._stopScrollX = window.scrollX 
    this._stopScrollY = window.scrollY 
    left = this._cssLeft + event.clientX - this._startX + this._stopScrollX - this._startScrollX
    top = this._cssTop + event.clientY - this._startY + this._stopScrollY - this._startScrollY
    if top is 0 and left is 0
      return
    this._dragElem.style.left = "#{left}px"
    this._dragElem.style.top = "#{top}px"
    return