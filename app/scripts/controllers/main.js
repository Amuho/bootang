'use strict';

/**
 * @ngdoc function
 * @name bootangApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bootangApp
 */
angular.module('bootangApp')
        .controller('MainCtrl', function ($scope) {
            console.log('loaded.....');
            this.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];
           
            $scope.headerClicked = function ($index) {
                //reversed order because headerClicked is called before isOpen value is chanded
                //so when $scope.groups[$index].isOpen === true  means that the user's intention is to close 
                //so when $scope.groups[$index].isOpen === false means that the user's intention is to open
                $scope.status.messagesAndPasswordsButtonsHidden = !$scope.status.messagesAndPasswordsButtonsHidden;
                $scope.checkButtons($scope.groups[$index].isOpen);
//                if($scope.groups[$index].isOpen){
//                    console.log('headerClicked ' + $index + ' open!!! ');
//                    $scope.checkButtons($scope.groups[$index].isOpen);
//                }else{
//                    console.log('headerClicked ' + $index + ' closed!!! ');
//                }
            };
            
            $scope.checkButtons = function(intentionToClose){
                console.log('checkButtons ==================> ' + intentionToClose);
                if(intentionToClose){
                    var isOneOpen = false;
                    for (var i = 0; i < $scope.groups.length && !isOneOpen; i++) {

                       if($scope.groups[i].isOpen){
                           isOneOpen = true;
                       }

                    }
                    if(isOneOpen){
                        $scope.status.collapseAllButtonHidden = false;
                        console.log('$scope.checkButtons intentionToClose true should be false  ' + $scope.collapseAllButtonHidden);
                    }else{
                        $scope.status.collapseAllButtonHidden = true;
                        console.log('$scope.checkButtons should be true  ' + $scope.collapseAllButtonHidden);
                    }
                }else{
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


        });
