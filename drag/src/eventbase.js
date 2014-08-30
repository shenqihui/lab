"use strict";
/*
  @author:shenqi
  @home:shaobing.sinaapp.com
  @mail:shenqihui0920@gmial.com
  @date:20130916
  @version:0.1
  @insprie:http://www.cnblogs.com/cloudgamer/archive/2008/11/17/Drag.html
*/

/*
  event class,the most inportant function to the website if you want to biuld an easy interactive website.
*/

var EventBaseClass, eventBase;

EventBaseClass = (function() {
  var addEventHandler, bindAsEventListener, removeEventHandler, stopBubble, stopBubbleHandle;

  function EventBaseClass() {}

  /* 
    bindAsEventListener:bing the function's run environment to dom,so the variable this === dom,return the function binding with the arguments dom.
    @param:{dom object} dom,a dom element,in this function ,it will active when the event happen.
    @param:{function} fun,the event handling function.
  */


  bindAsEventListener = function(dom, fun) {
    return function(event) {
      return fun.call(dom, event || window.event);
    };
  };

  /*
    addEventHandler:bind the event to the dom element.
    @param:{dom object} dom,the event's target.
    @param:{event} event,the dom's event.
    @param:{function} listenFunc,the event handling function.
    @param:{boolean} bubbleOrCapture,when false,the event will be catch as bubble method.when true ,as capture,if default as false value.
    @param:{boolean} stopEvent,the flag to stop event's bubble or capture,default as false,if true,then stop event.
  */


  addEventHandler = function(dom, event, listenFunc, bubbleOrCapture, stopEvent) {
    bubbleOrCapture = bubbleOrCapture || false;
    stopEvent = stopEvent || false;
    if (dom.addEventListener) {
      dom.addEventListener(event, listenFunc, bubbleOrCapture);
    } else if (dom.attachEvent) {
      dom.attachEvent("on" + event, listenFunc);
    } else {
      dom["on" + event] = listenFunc;
    }
    if (stopEvent === true) {
      stopBubbleHandle(dom, event);
    }
  };

  /*
    removeEventHandler:rmove the dom's event handling function
    @param:{dom object} dom,the event's target.
    @param:{event} event,the dom's event.
    @param:{function} listenFunc,the event handling function.
    @param:{boolean} bubbleOrCapture,when false,the event will be catch as bubble method.when true ,as capture,if default as false value.
  */


  removeEventHandler = function(dom, event, listenFunc, bubble) {
    bubble = bubble || false;
    if (dom.removeEventListener) {
      dom.removeEventListener(event, listenFunc, bubble);
    } else if (dom.detachEvent) {
      dom.detachEvent("on" + event, listenFunc);
    } else {
      dom["on" + event] = null;
    }
  };

  /*
    stopBubble:stop the event's propagation.
    @param:{event} event,dom event.
  */


  stopBubble = function(event) {
    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
  };

  /*
    stopBubbleHandle:stop the dom's event propagation.
    @param:{dom object} dom,the dom element.
    @param:{event} event,the dom's event
  */


  stopBubbleHandle = function(dom, event) {
    return addEventHandler(dom, event, bindAsEventListener(this, stopBubble));
  };

  /*
  out put the method
  */


  EventBaseClass.prototype.bindAsEventListener = bindAsEventListener;

  EventBaseClass.prototype.addEventHandler = addEventHandler;

  EventBaseClass.prototype.removeEventHandler = removeEventHandler;

  /* output the method if you want*/


  return EventBaseClass;

})();

eventBase = new EventBaseClass();
