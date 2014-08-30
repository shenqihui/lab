"use strict";
/*
  @author:shenqi
  @home:shaobing.sinaapp.com
  @mail:shenqihui0920@gmial.com
  @date:20130916
  @version:0.1
  @insprie:http://www.cnblogs.com/cloudgamer/archive/2008/11/17/Drag.html
*/

/** 
 * drag an elem, and it will return the size you drag .
 * use like var dragSizeObj = new DragSizeClass("elemId"),
 * and if you need , change it into something like dragging in a container,
 * so it return will be in a section but i havan't finish it in this way.
*/

var DragSizeClass, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

DragSizeClass = (function(_super) {
  __extends(DragSizeClass, _super);

  function DragSizeClass() {
    _ref = DragSizeClass.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  DragSizeClass.prototype.initialize = function(drag, callback) {
    this._dragElem = document.getElementById(drag);
    if (this._dragElem === null) {
      return;
    }
    this._startX = 0;
    this._startY = 0;
    this._moveSizeX = 0;
    this._moveSizeY = 0;
    this._moveStateX = 0;
    this._moveStateY = 0;
    this._startScrollX = 0;
    this._startScrollY = 0;
    this._stopScrollX = 0;
    this._stopScrollY = 0;
    this._domMoveFunc = eventBase.bindAsEventListener(this, this.move);
    this._domStopFunc = _bind(this, this.stop);
    this._callback = typeof callback === "funtion" ? callback : function() {};
    this._dragElem.style.position = "absolute";
    eventBase.addEventHandler(this._dragElem, "mousedown", eventBase.bindAsEventListener(this, this.start));
    this.initDragFunc();
  };

  DragSizeClass.prototype.initDragFunc = function() {
    var elem, noDrag, _i, _len, _ref1;
    this._noDrag = [];
    noDrag = function(parent) {
      var item, _i, _len, _ref1, _result;
      _result = [];
      _ref1 = parent.children;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        item = _ref1[_i];
        if (item.attributes["noListen"].value) {
          _result.push(item);
        }
      }
      return _result;
    };
    _ref1 = this._noDrag;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      elem = _ref1[_i];
      eventBase.addEventHandler(elem, "mousedown", eventBase.bindAsEventListener(this, eventBase.stopBubble));
    }
  };

  DragSizeClass.prototype.doStop = function(event) {
    /*
      return the thing
    */

    this._moveSizeX = this._moveStateX - this._startX + this._stopScrollX - this._startScrollX;
    this._moveSizeY = this._moveStateY - this._startY + this._stopScrollY - this._startScrollY;
    if ((this._moveStateX === 0 && this._moveStateY === 0) || (this._moveSizeX === 0 && this._moveSizeY === 0)) {
      return;
    }
    /*
      actually this return haven't any means,so,do the think you want here.
      so u need to init the obj like this
      var dragSizeObj = new DragSize("elemId",function(moveObj){
        #the call back function when stop dragging
        # code todo 
      })
      the moveObj just like {moveX:this._moveSizeX, moveY:this._moveSizeY }
    */

    this._callback({
      moveX: this._moveSizeX,
      moveY: this._moveSizeY
    });
  };

  return DragSizeClass;

})(DragBaseClass);
