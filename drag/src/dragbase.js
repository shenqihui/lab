"use strict";
/*
  @author:shenqi
  @home:shaobing.sinaapp.com
  @mail:shenqihui0920@gmial.com
  @date:20130916
  @version:0.1
  @insprie:http://www.cnblogs.com/cloudgamer/archive/2008/11/17/Drag.html
*/

var DragBaseClass;

DragBaseClass = (function() {
  var _bind;

  _bind = function(object, fun) {
    return function() {
      return fun.apply(object, arguments);
    };
  };

  function DragBaseClass() {
    this.initialize.apply(this, arguments);
    return;
  }

  /* initialize or declare the class's all attribute that we need
    @param {string} drag the elem's id if null or undefined or not an elem's id,do nothing.Or initialize the drag class
  */


  DragBaseClass.prototype.initialize = function(drag) {
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
    this._dragElem.style.position = "absolute";
    eventBase.addEventHandler(this._dragElem, "mousedown", eventBase.bindAsEventListener(this, this.start));
    this.initDragFunc();
  };

  DragBaseClass.prototype.initDragFunc = function() {};

  DragBaseClass.prototype.start = function(event) {
    this._startScrollX = window.scrollX;
    this._startScrollY = window.scrollY;
    this._moveSizeY = 0;
    this._moveSizeX = 0;
    this._moveStateY = 0;
    this._moveStateX = 0;
    this._startX = event.clientX;
    this._startY = event.clientY;
    eventBase.addEventHandler(document, "mousemove", this._domMoveFunc);
    eventBase.addEventHandler(document, "mouseup", this._domStopFunc);
    this.doStart(event);
  };

  DragBaseClass.prototype.doStart = function(event) {};

  DragBaseClass.prototype.move = function(event) {
    this._moveStateX = event.clientX;
    this._moveStateY = event.clientY;
    this.doMove(event);
  };

  DragBaseClass.prototype.doMove = function(event) {};

  DragBaseClass.prototype.stop = function(event) {
    this._stopScrollX = window.scrollX;
    this._stopScrollY = window.scrollY;
    eventBase.removeEventHandler(document, "mousemove", this._domMoveFunc);
    eventBase.removeEventHandler(document, "mouseup", this._domStopFunc);
    this.doStop(event);
  };

  DragBaseClass.prototype.doStop = function(event) {};

  return DragBaseClass;

})();
