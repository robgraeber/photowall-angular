var photoWall = angular.module('photoWall', []);

photoWall.directive("photoWall", function(){
  var template = '<div class="photos">'+
                   '<img fx-enter hide-on-err ng-repeat="item in photoItems" class="photoImg" ng-src="{{item.medium_url}}" />'+
                 '</div>';
  return {
    restrict: 'E',
    template: template,
    scope: {
        photoDataStr: '@photoData',
    },
    controller:function($scope, $window){
      $scope.photoData = eval($scope.photoDataStr);
      $scope.photoItems = $scope.photoData.slice(0,60);

      $(window).scroll(function(){
        var topHeight = $("body").height() - window.innerHeight;
        if(topHeight - $(window).scrollTop() < 1000){
          var len = $scope.photoItems.length;
          $scope.photoItems = $scope.photoItems.concat($scope.photoData.slice(len, len+15));
          $scope.$apply();
        }
      }.bind(this));
    },
    link:function(scope, element, attrs){
      console.log("asdf", scope.photoDataStr);
    }
  };
});

photoWall.directive("hideOnErr", function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('error', function(e) {
        e.target.style.display = 'none';
      });
    }
  };
});
photoWall.directive("fxEnter", function(){
  var isScrolledIntoView = function(el){
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(el).offset().top;
    var elemBottom = elemTop + $(el).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  };
  var animateCheck = function(el){
    if(isScrolledIntoView(el)){
      TweenMax.from(el, 1.2, {rotationY:500, scale:0.1, ease:Power1.easeOut});
    }
  };
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      animateCheck(element);
    }
  };
});
