/** 
 * drag an elem, and the elem will follow the mouse,move the size you drag.
 * use like var dragFollowObj = new DragFollowClass("elemId"),
 * and then drag the elem ,the elem will follow the pointer of the mouse.
 * it have no regulation so you can drag it every in the html.
 * and if you need , change it into something like dragging in a container,
 * and i havan't finish it in this way.
*/

"use strict";
/*
  @author:shenqi
  @home:shaobing.sinaapp.com
  @mail:shenqihui0920@gmial.com
  @date:20130916
  @version:0.1
*/

var DragFollowClass, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DragFollowClass = (function(_super) {
  __extends(DragFollowClass, _super);

  function DragFollowClass() {
    _ref = DragFollowClass.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DragFollowClass.prototype.doStart = function(event) {
    this._cssLeft = parseFloat(this._dragElem.style.left);
    this._cssTop = parseFloat(this._dragElem.style.top);
  };

  /**
    i thought it will be something happen when drag so fast.this we just call it bug.So,do it again when stop.
    when the scroll exist,do it when moving,if calculate the scroll , it will be harm for the performance,so i bring it into the stop function.
  */


  DragFollowClass.prototype.doMove = function(event) {
    var left, top;
    left = this._cssLeft + event.clientX - this._startX;
    top = this._cssTop + event.clientY - this._startY;
    if (top === 0 && left === 0) {
      return;
    }
    this._dragElem.style.left = "" + left + "px";
    this._dragElem.style.top = "" + top + "px";
  };

  DragFollowClass.prototype.doStop = function(event) {
    /*
      thinking about the scroll.
    */

    var left, top;
    this._stopScrollX = window.scrollX;
    this._stopScrollY = window.scrollY;
    left = this._cssLeft + event.clientX - this._startX + this._stopScrollX - this._startScrollX;
    top = this._cssTop + event.clientY - this._startY + this._stopScrollY - this._startScrollY;
    if (top === 0 && left === 0) {
      return;
    }
    this._dragElem.style.left = "" + left + "px";
    this._dragElem.style.top = "" + top + "px";
  };

  return DragFollowClass;

})(DragBaseClass);
