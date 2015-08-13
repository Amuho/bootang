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
            $scope.selections = [ '3', '0' ];
           

            $scope.wikiArticles = [];
            $scope.items = [[ 'This article has been already added!',   'Sorry, certain wiki aricle should not be repeated to generate password or exchange messages' ]];
            $scope.tabs = [{'id': 'readMessages',  'title': 'Read messages', 'label': 'label label-default', 'disable': true, 'resultAsText':'' }, 
                           {'id': 'leaveMessage',  'title': 'Leave Message', 'label': 'label label-default', 'disable': true, 'resultAsText':'' },
                           {'id': 'generatePassword',  'title': 'Generate password', 'label': 'label label-default', 'disable': true, 'resultAsText':'' },  
                           {'id': 'wikiArticleSelection',  'title': 'Wiki article(s)', 'label': 'label label-info', 'disable': false, 'resultAsText':'' }
                          ];
            
          
            
            $scope.vos = [
                {'id': '0', 'message':'4 weeks', 'minutes': 40320},//0
                {'id': '1', 'message':'1 week', 'minutes': 10080},//1
                {'id': '2', 'message':'1 day', 'minutes': 1440},//2
                {'id': '3', 'message':'1 hour', 'minutes': 60},//3
                {'id': '4', 'message':'30 minutes', 'minutes': 30},//4
                {'id': '5', 'message': '15 minutes', 'minutes': 15},//5
                {'id': '6', 'message': '5 minutes', 'minutes': 5},//6
                {'id': '7', 'message': '1 minute', 'minutes': 1}//7
            ];
            //allowed number of reads
            $scope.anors = [
                {'id': '0', 'message':'Unlimited number of times', 'minutes': 0},//0
                {'id': '1', 'message':'10 times', 'minutes': 10},//1
                {'id': '2', 'message':'2 times', 'minutes': 2},//2
                {'id': '3', 'message':'1 time', 'minutes': 1}//3
            ];
           
          
            
            $scope.headerClicked = function ($index) {
                $scope.checkButtons($scope.wikiArticles[$index].isOpen);
            };
            
            $scope.refreshGroupAfterAddingNewArticle = function () {
                for (var i = 0; i < $scope.wikiArticles.length - 1; i++) {

                    $scope.wikiArticles[i].isOpen = false;

                }
                 $scope.status.collapseAllButtonHidden = false;
                 $scope.status.expandAllButtonHidden = false;
            };
            
            $scope.checkIfArticleIsAlreadyAdded = function(query) {
                var result = false;
                 for (var i = 0; i < $scope.wikiArticles.length && !result; i++) {

                        if ($scope.wikiArticles[i].id===query) {
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
                    $scope.wikiArticles.push(wikiArticleObject);
                    $scope.refreshGroupAfterAddingNewArticle();
                    $scope.activateFeatureTabs();
                    $scope.tabs[3].resultAsText = ': ' + $scope.wikiArticles.length;

                });
              }else{
                   $scope.createModalAlert(['This article is already added!', 'Sorry certain article may be used only once.'], 'sm');
              }
            };
            $scope.activateFeatureTabs = function(){
                $scope.tabs[0].disable = false;
                $scope.tabs[1].disable = false;
                $scope.tabs[2].disable = false;
                $scope.tabs[0].label = 'label label-primary';
                $scope.tabs[1].label = 'label label-primary';
                $scope.tabs[2].label = 'label label-primary';
                
            };
            $scope.deactivateFeatureTabs = function(){ 
                $scope.tabs[0].disable = true;
                $scope.tabs[1].disable = true;
                $scope.tabs[2].disable = true;
                $scope.tabs[0].label = 'label label-default';
                $scope.tabs[1].label = 'label label-default';
                $scope.tabs[2].label = 'label label-default';
                
            };
             $scope.selectMe = function(tabNumber){ 
                $scope.tabs[tabNumber].label = 'label label-info';
                for(var i = 0; i < $scope.tabs.length; i++){
                    if(i!==tabNumber){
                        if($scope.tabs[i].disable==false){
                           $scope.tabs[i].label = 'label label-primary';
                     }else{
                         $scope.tabs[i].label = 'label label-default';

                     }
                    }
                }
                
            };
            $scope.checkButtons = function (intentionToClose) {
                console.log('checkButtons ==================> ' + intentionToClose);
                if (intentionToClose) {
                    var isOneOpen = false;
                    for (var i = 0; i < $scope.wikiArticles.length && !isOneOpen; i++) {

                        if ($scope.wikiArticles[i].isOpen) {
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

                $scope.wikiArticles[$index].isOpen = false;
                var tempArray = [];
                for (var i = 0; i < $scope.wikiArticles.length; i++) {
                    if ($index !== i) {
                        tempArray.push($scope.wikiArticles[i]);
                    }

                }
                $scope.wikiArticles = tempArray;
                $scope.tabs[3].resultAsText = ': ' + $scope.wikiArticles.length;
                if ($scope.wikiArticles.length === 0) {
                    $scope.status.collapseAllButtonHidden = true;
                    $scope.status.expandAllButtonHidden = true;
                    $scope.deactivateFeatureTabs();
                    $scope.tabs[3].resultAsText = '';
                }

            };


           
            $scope.collapseAll = function () {

                for (var i = 0; i < $scope.wikiArticles.length; i++) {

                    $scope.wikiArticles[i].isOpen = false;

                }
                $scope.status.collapseAllButtonHidden = true;
            };

            $scope.expandAll = function () {
                var tempwikiArticles = $scope.wikiArticles;
                for (var i = 0; i < $scope.wikiArticles.length; i++) {

                    tempwikiArticles[i].isOpen = true;

                }
                $scope.wikiArticles = tempwikiArticles;
                $scope.status.collapseAllButtonHidden = false;
            };

            $scope.status = {
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