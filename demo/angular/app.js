var app = angular.module('myApp', []);
app.run(function($rootScope) {
  $rootScope.yourName = 'demo';
  // console.log($rootScope);
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
      // updateClock();
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
app.controller('RepeatController',function($scope) {
  $scope.people = [
    {name: 'A', age: 12},
    {name: 'B', age: 13},
    {name: 'C', age: 14},
    {name: 'D', age: 15},
    {name: 'E', age: 16},
    {name: 'F', age: 17}
  ];
  $scope.log = function(data) {
    console.log(data);
  }
})
app.controller('PropertyController',function($scope) {
  $scope.people = {
    "A": 13,
    "B": 14,
    "C": 15
  }
  $scope.log = function(data1,data2) {
    console.log(data1,data2);
  }
})
// app.controller('ServiceController',function($scope) {
//   $scope.events='init';
// })
angular.module('myApp.services', []).factory('githubService', ['$service',function($service) {
  var serviceInstance = {};
  // Our first service
  return serviceInstance;
}]);
angular.module('myApp.services', []).factory('githubService', ['$http', function($http) {
  var doRequest = function(username, path) {
    return $http({
      method: 'JSONP',
      url: 'https://api.github.com/users/' + username + '/' + path + '?callback=JSON_CALLBACK'
    });
  }
  return {
    events: function(username) { return doRequest(username, 'events'); },
  };
}]);
app.controller('ServiceController', ['$scope', function($scope) {

}]);
// app.controller('ServiceController', ['$scope', 'githubService',
//     function($scope, githubService) {
//     // Watch for changes on the username property.
//     // If there is a change, run the function
//     $scope.$watch('username', function(newUsername) {
//             // uses the $http service to call the GitHub API
//             // and returns the resulting promise
//       githubService.events(newUsername)
//         .success(function(data, status, headers) {
//                     // the success function wraps the response in data
//                     // so we need to call data.data to fetch the raw data
//           $scope.events = data.data;
//         })
//     });
// }]);
// app.controller('ServiceController', ['$scope', '$timeout', 'githubService',
//     function($scope, $timeout, githubService) {
// }]);
// app.controller('ServiceController', ['$scope', '$timeout', 'githubService', function($scope, $timeout, githubService) {
//   // The same example as above, plus the $timeout service
//   var timeout;
//   $scope.$watch('username', function(newVal) {
//     if (newVal) {
//       if (timeout) $timeout.cancel(timeout);
//       timeout = $timeout(function() {
//         githubService.events(newVal)
//         .success(function(data, status) {
//           $scope.events = data.data;
//         });
//       }, 350);
//     }
//   });
// }]);
// angular.module('app.services', []).factory('githubService', ['$http', function($http) {
//   var githubUsername;
//   var doRequest = function(path) {
//     return $http({
//       method: 'JSONP',
//       url: 'https://api.github.com/users/' + githubUsername + '/' + path + '?callback=JSON_CALLBACK'
//     });
//   }
//   return {
//     events: function() { return doRequest('events'); },
//     setUsername: function(newUsername) { githubUsername = newUsername; }
//   };
// }]);















/********************************************/
// var app2 = angular.module('app2', []);
// app2.run(function($rootScope) {
//   $rootScope.yourNameApp2 = 'APP2';
//   // console.log($rootScope);
// });