var app = angular.module('app', []);
app.run(function($rootScope) {
  $rootScope.yourName = 'demo';
  // console.log($rootScope);
});
app.controller('appController', function($scope) {
  $scope.person = {
    // name: 'Parent and Child controller'
  };
});
app.controller('ParentController', function($scope) {
  $scope.person = {
    greeted: false,
    a: 1,
    b: 2
  };
});
app.controller('ChildController', function($scope) {
  $scope.extend = true;
  $scope.person.date = Date.now();
  $scope.init = function() {
    // $scope.person.greeted = true;
    $scope.personExtend = $scope.personExtend || $scope.person;
    $scope.person = {
      init: true
    };
    $scope.extend = false;
    $scope.extend = $scope.personExtend === $scope.person;
  }
  $scope.hello = function() {
    // $scope.person.greeted = true;
    $scope.person.init = false;
    $scope.person.hello = 'hello';
    $scope.extend = $scope.personExtend === $scope.person;
  }
  $scope.extendParent = function() {
    $scope.person = $scope.personExtend;
    $scope.extend = $scope.personExtend === $scope.person;
  }
  var updateClock = function() {
    $scope.person.date = Date.now();
  };
  $scope.timer = function() {
    $scope.timerInterval = $scope.timerInterval || undefined;
    clearInterval($scope.timerInterval);
    $scope.timerInterval = setInterval(function() {
      $scope.$apply(updateClock);
    }, 1000);
    updateClock();
  }
});
app.controller('ButtonController', ['$scope',
  function($scope) {
    var buttonContainer = document.getElementById('buttonContainer');
    $scope.buttonLi = [];
    $scope.buttonLiNum = $scope.buttonLiNum || 0;
    var newChild = function() {
      var li = document.createElement('li');
      var button = document.createElement('button');
      li.appendChild(button);
      button.className = 'btn btn-primary';
      button.innerHTML = $scope.buttonLiNum++;
      $scope.buttonLi.push(li);
      return li;
    }
    var removeChild = function() {
      if ($scope.buttonLiNum > 0) {
        $scope.buttonLiNum--;
        buttonContainer.removeChild($scope.buttonLi.pop());
      }
    }
    $scope.append = function() {
      buttonContainer.appendChild(newChild());
    };
    $scope.remove = function() {
      removeChild();
    };
  }
]);
app.controller('FunctionArgusController', ['$scope',
  function($scope) {
    $scope.addClickNum = 1;
    $scope.resuceClickNum = 1;
    $scope.total = 0;
    $scope.add = function(i) {
      $scope.addClickNum++;
      $scope.total += i;
    }
    $scope.reduce = function(i) {
      $scope.resuceClickNum++;
      $scope.total -= i;
    }
  }
]);
app.controller('AjaxController', ['$scope', '$http',
  function($scope, $http, $templateCache) {
    window.callbackFunction = function(data) {
      console.log(data);
      // window.callbackFunction = null;
    }
    $scope.ajax = function() {
      $scope.code = null;
      $scope.response = null;
      $http({
        method: 'JSONP',
        url: 'http://api.npr.org/query?id=61&fields=relatedLink,title,byline,text,audio,image,pullQuote,all&output=JSON&callback=JSON_CALLBACK',
        cache: $templateCache
      }).success(function(data, status) {
        console.log('success', data, status);
        // callbackFunction(date, status);
      }).error(function(data, status) {
        console.log('error', data, status);
      });
    }
  }
])

function FetchCtrl($scope, $http, $templateCache) {
  $scope.method = 'GET';
  $scope.url = './index.html';
  $scope.fetch = function() {
    $scope.code = null;
    $scope.response = null;
    $http({
      method: $scope.method,
      url: $scope.url,
      cache: $templateCache
    }).success(function(data, status) {
      $scope.status = status;
      $scope.data = data;
      console.log("success");
    }).error(function(data, status) {
      $scope.data = data || "Request failed";
      $scope.status = status;
      console.log('error');
    });
  };
  $scope.updateModel = function(method, url) {
    $scope.method = method;
    $scope.url = url;
  };
}
/********************************************/
var app2 = angular.module('app2', []);
app2.run(function($rootScope) {
  $rootScope.yourNameApp2 = 'APP2';
  // console.log($rootScope);
});