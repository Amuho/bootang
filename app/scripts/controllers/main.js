'use strict';

/**
 * @ngdoc function
 * @name bootangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bootangApp
 */
angular.module('bootangApp')
        .controller('MainCtrl', function ($scope, $http) {
            console.log('loaded.....');
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

            $scope.headerClicked = function ($index) {
                $scope.status.messagesAndPasswordsButtonsHidden = !$scope.status.messagesAndPasswordsButtonsHidden;
                $scope.checkButtons($scope.groups[$index].isOpen);
            };

            $scope.checkButtons = function (intentionToClose) {
                console.log('checkButtons ==================> ' + intentionToClose);
                if (intentionToClose) {
                    var isOneOpen = false;
                    for (var i = 0; i < $scope.groups.length && !isOneOpen; i++) {

                        if ($scope.groups[i].isOpen) {
                            isOneOpen = true;
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




            var test1 = '<a href=\"http://twitter.com\">Twitter</a>';
            $scope.groups = [
                {
                    title: 'Dynamic Group Header - 1',
                    isOpen: true,
                    content: test1
                },
                {
                    title: 'Dynamic Group Header - 2',
                    isOpen: false,
                    content: 'Dynamic Group Body - 2'
                },
                {
                    title: 'Dynamic Group Header - 3',
                    isOpen: false,
                    content: '<a href=\"http://twitter.com\">Twitter</a>'
                },
                {
                    title: 'Dynamic Group Header - 4',
                    isOpen: false,
                    content: 'Dynamic Group Body - 4'
                },
                {
                    title: 'Dynamic Group Header - 5',
                    isOpen: false,
                    content: 'Forum jest miejscem wymiany opinii użytkowników, myśli, informacji, komentarzy, nawiązywania kontaktów i rodzenia się inicjatyw. Dlatego eliminowane będą wszelkie wpisy wielokrotne, zawierające wulgarne słowa i wyrażenia, groźby karalne, obrzucanie się obelgami, obrażanie forumowiczów, członków redakcji i innych osób. Bezwzględnie będziemy zwalczali trollowanie, wszczynanie awantur i prowokowanie. Jeśli czyjaś opinia nie została dopuszczona, to znaczy, że zaliczona została do jednej z wymienionych kategorii. Uwagi i reklamacje kierowane do nas należy kierować na adres: straznik(at)niezalezna.pl Jednocześnie podkreślamy, iż rozumiemy, że nasze środowisko chce mieć miejsce odreagowywania wielu lat poniżania i ciągłej nagonki na nas przez obóz "miłości", ale nie upoważnia to do stosowania wulgarnego języka. Dopuszczalna jest natomiast nawet najostrzejsza krytyka, ale bez wycieczek osobistych. Komunikaty ukazujące się na blogu Morusa są rozwinięciem niniejszego regulaminu. Dynamic Group Body - 5'
                },
                {
                    title: 'Dynamic Group Header - 6',
                    isOpen: false,
                    content: '<b>Forum</b> jest miejscem wymiany opinii <H2>użytkowników</H2>, myśli, informacji, komentarzy, nawiązywania kontaktów i rodzenia się inicjatyw. Dlatego eliminowane będą wszelkie wpisy wielokrotne, zawierające wulgarne słowa i wyrażenia, groźby karalne, obrzucanie się obelgami, obrażanie forumowiczów, członków redakcji i innych osób. Bezwzględnie będziemy zwalczali trollowanie, wszczynanie awantur i prowokowanie. Jeśli czyjaś opinia nie została dopuszczona, to znaczy, że zaliczona została do jednej z wymienionych kategorii. Uwagi i reklamacje kierowane do nas należy kierować na adres: straznik(at)niezalezna.pl Jednocześnie podkreślamy, iż rozumiemy, że nasze środowisko chce mieć miejsce odreagowywania wielu lat poniżania i ciągłej nagonki na nas przez obóz "miłości", ale nie upoważnia to do stosowania wulgarnego języka. Dopuszczalna jest natomiast nawet najostrzejsza krytyka, ale bez wycieczek osobistych. Komunikaty ukazujące się na blogu Morusa są rozwinięciem niniejszego regulaminu. - 6'
                }
            ];
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
                collapseAllButtonHidden: false,
                expandAllButtonHidden: false
            };

            $scope.selected = undefined;
            $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            // Any function returning a promise object can be used to load values asynchronously
            $scope.getLocation = function (val) {
                return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: val,
                        sensor: false
                    }
                }).then(function (response) {
                    return response.data.results.map(function (item) {
                        return item.formatted_address;
                    });
                });
            };

            
            $scope.statesWithFlags = [{'name': 'Alabama', 'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'}, {'name': 'Alaska', 'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'}, {'name': 'Arizona', 'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'}, {'name': 'Arkansas', 'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'}, {'name': 'California', 'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'}, {'name': 'Colorado', 'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'}, {'name': 'Connecticut', 'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'}, {'name': 'Delaware', 'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'}, {'name': 'Florida', 'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'}, {'name': 'Georgia', 'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'}, {'name': 'Hawaii', 'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'}, {'name': 'Idaho', 'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'}, {'name': 'Illinois', 'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'}, {'name': 'Indiana', 'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'}, {'name': 'Iowa', 'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'}, {'name': 'Kansas', 'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'}, {'name': 'Kentucky', 'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'}, {'name': 'Louisiana', 'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'}, {'name': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'}, {'name': 'Maryland', 'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'}, {'name': 'Massachusetts', 'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'}, {'name': 'Michigan', 'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'}, {'name': 'Minnesota', 'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'}, {'name': 'Mississippi', 'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'}, {'name': 'Missouri', 'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'}, {'name': 'Montana', 'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'}, {'name': 'Nebraska', 'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'}, {'name': 'Nevada', 'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'}, {'name': 'New Hampshire', 'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'}, {'name': 'New Jersey', 'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'}, {'name': 'New Mexico', 'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'}, {'name': 'New York', 'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'}, {'name': 'North Carolina', 'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'}, {'name': 'North Dakota', 'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'}, {'name': 'Ohio', 'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'}, {'name': 'Oklahoma', 'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'}, {'name': 'Oregon', 'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'}, {'name': 'Pennsylvania', 'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'}, {'name': 'Rhode Island', 'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'}, {'name': 'South Carolina', 'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'}, {'name': 'South Dakota', 'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'}, {'name': 'Tennessee', 'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'}, {'name': 'Texas', 'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'}, {'name': 'Utah', 'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'}, {'name': 'Vermont', 'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'}, {'name': 'Virginia', 'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'}, {'name': 'Washington', 'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'}, {'name': 'West Virginia', 'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'}, {'name': 'Wisconsin', 'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'}, {'name': 'Wyoming', 'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'}];
            var wikiAutoCompleteUrl = 'http://en.m.wikipedia.org/w/api.php';
            
            $scope.getAutoComplete = function (val) {
                return $http.jsonp('http://en.m.wikipedia.org/w/api.php', {
                    params: {
                        callback: 'jQuery19105356172174757828_1437769356614',
                        format: "json",
                        action: "query",
                        generator: "prefixsearch",
                        gpssearch: val,
                        gpsnamespace: "0",
                        gpslimit: "15",
                        prop: "pageimages",
                        piprop: "thumbnail",
                        pithumbsize: "80",
                        pilimit: "15"
                    }
                }).then(function (response) {
//                    return response.data.results.map(function (item) {
//                        return item.formatted_address;
//                    });
                   console.log('getAutoComplete is: ' + response);
                });
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
                    var result = [[]];
                    var counter = 0;
                    for (var key in json) {
                         result[counter]= [];
                         result[counter].push(json[key].title);
                         if(json[key].thumbnail!=null){
                              result[counter].push(json[key].thumbnail.source);
                         }
                         counter++;
                    }
                    return result;
                });
            };

        });
