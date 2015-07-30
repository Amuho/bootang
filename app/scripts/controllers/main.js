'use strict';

/**
 * @ngdoc function
 * @name bootangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bootangApp
 */
angular.module('bootangApp')
        .controller('MainCtrl', function ($scope, $http, $sce, $modal) {
            console.log('loaded.....');
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
          
            $scope.headerClicked = function ($index) {
//                $scope.status.messagesAndPasswordsButtonsHidden = !$scope.status.messagesAndPasswordsButtonsHidden;
                $scope.checkButtons($scope.groups[$index].isOpen);
            };
            
            $scope.refreshGroupAfterAddingNewArticle = function () {
                for (var i = 0; i < $scope.groups.length - 1; i++) {

                    $scope.groups[i].isOpen = false;

                }
                 $scope.status.collapseAllButtonHidden = false;
                 $scope.status.expandAllButtonHidden = false;
            };
            
            $scope.checkIfArticleIsAlreadyAdded = function(query) {
                var result = false;
                 for (var i = 0; i < $scope.groups.length && !result; i++) {

                        if ($scope.groups[i].id===query) {
                            result = true;
                        }

                 }
                return result;
                
            };
            
            $scope.createModalAlert = function (message, size) {
                console.log('createModalAlert ==================> start');
//                console.log('addAlert ==================>   $scope.alerts.length: ' + $scope.alerts.length);
               
                var modalInstance = $modal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: size,
                    resolve: {
                        items: function () {
                            console.log('addAlert ==================>   $scope.items.title: ' + $scope.items.title);
                            console.log('addAlert ==================>   $scope.items.message: ' + $scope.items.message);
                            return $scope.items;
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
//                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
            
            $scope.corectAllHrefs = function(content) {
                var outString = content;

                content.replace('<a href=\"', '<a target=\"_blank\"  href=\"https://en.m.wikipedia.org');
                while (true) {
                    var idx = outString.indexOf('<a href=\"');
                    if (idx == -1) {
                        break;
                    }
                    outString = outString.replace('<a href=\"', '<a target=\"_blank\"  href=\"https://en.m.wikipedia.org');
                }
                return outString;

            };
            
            $scope.onSelect = function ($item, $model, $label) {
               var query = $model.replace(/\s/g, "_");
               if(!$scope.checkIfArticleIsAlreadyAdded( query)){
               return $http.jsonp('http://en.m.wikipedia.org/w/api.php?callback=JSON_CALLBACK', {
                    params: {
                        format: "json",
                        action : "parse",
			prop : 'text|images',
			page : query

                    }

                }).then(function (response) {
                    var json = response['data']['parse']['text']['*'];
                    json = $scope.corectAllHrefs(json);
                    var content = $sce.trustAsHtml( '<div>' + json + '</div>');
                    var wikiArticleObject = {'title': $model, id:query,  isOpen: true, content: content };
                    $scope.groups.push(wikiArticleObject);
                    $scope.refreshGroupAfterAddingNewArticle();
//                    
                });
              }else{
                   $scope.createModalAlert(['This article is already added!', 'Sorry certain article may be used only once.'], 'sm');
              }
            };
            
            $scope.checkButtons = function (intentionToClose) {
                console.log('checkButtons ==================> ' + intentionToClose);
                if (intentionToClose) {
                    var isOneOpen = false;
                    for (var i = 0; i < $scope.groups.length && !isOneOpen; i++) {

                        if ($scope.groups[i].isOpen) {
                            isOneOpen = true;
                            break;
                        }

                    }
                    if (isOneOpen) {
                        $scope.status.collapseAllButtonHidden = false;
                        console.log('$scope.checkButtons intentionToClose true should be false  ' + $scope.collapseAllButtonHidden);
                    } else {
                        $scope.status.collapseAllButtonHidden = true;
                        console.log('$scope.checkButtons should be true  ' + $scope.collapseAllButtonHidden);
                    }
                } else {
                    $scope.status.collapseAllButtonHidden = false;
                    $scope.status.expandAllButtonHidden = false;
                    console.log('$scope.checkButtons intentionToClose false should be true  ' + $scope.collapseAllButtonHidden);
                }

            };

            $scope.delete = function ($index) {

                $scope.groups[$index].isOpen = false;
                var tempArray = [];
                for (var i = 0; i < $scope.groups.length; i++) {
                    if ($index !== i) {
                        tempArray.push($scope.groups[i]);
                    }

                }
                $scope.groups = tempArray;
                if ($scope.groups.length === 0) {
                    $scope.status.collapseAllButtonHidden = true;
                    $scope.status.expandAllButtonHidden = true;
                    $scope.status.messagesAndPasswordsButtonsHidden = true;
                }

            };


            $scope.groups = [];
            $scope.items = [[ 'This article has been already added!',   'Sorry, certain wiki aricle should not be repeated to generate password or exchange messages' ]];
            
            $scope.collapseAll = function () {

                for (var i = 0; i < $scope.groups.length; i++) {

                    $scope.groups[i].isOpen = false;

                }
                $scope.status.collapseAllButtonHidden = true;
            };

            $scope.expandAll = function () {
                var tempgroups = $scope.groups;
                for (var i = 0; i < $scope.groups.length; i++) {

                    tempgroups[i].isOpen = true;

                }
                $scope.groups = tempgroups;
                $scope.status.collapseAllButtonHidden = false;
            };

            $scope.status = {
                messagesAndPasswordsButtonsHidden: true,
                collapseAllButtonHidden: true,
                expandAllButtonHidden: true
            };

            

            $scope.getAutoComplete = function (val) {
                return $http.jsonp('http://en.m.wikipedia.org/w/api.php?callback=JSON_CALLBACK', {
                    params: {
                        format: "json",
                        action: "query",
                        generator: "prefixsearch",
                        gpssearch: val,
                        gpsnamespace: "0",
                        gpslimit: "15",
                        prop: "pageimages",
                        piprop: "thumbnail",
                        continue: '',
                        pithumbsize: "80",
                        pilimit: "15"

                    }

                }).then(function (response) {
                    var json = response['data']['query']['pages'];
                    var result = [];
                    for (var key in json) {
                        var pairObject;
                        if (json[key].thumbnail != null) {

                            pairObject = {'name': json[key].title, 'flag': json[key].thumbnail.source};

                        } else {
                            pairObject = {'name': json[key].title, 'flag': 'images/whitespace.png'};
                        }

                        result.push(pairObject);
                    }
                    return result;
                });
            };

        });
angular.module('bootangApp').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});