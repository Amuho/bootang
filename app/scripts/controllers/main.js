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
            $scope.test = function () {
                alert('click');
            };
            $scope.groups = [
                {
                    title: 'Dynamic Group Header - 1',
                    isOpen: true,
                    content: 'yDnamic Group Body - 1'
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
                    content: '"<b>"Forum</b> jest miejscem wymiany opinii użytkowników, myśli, informacji, komentarzy, nawiązywania kontaktów i rodzenia się inicjatyw. Dlatego eliminowane będą wszelkie wpisy wielokrotne, zawierające wulgarne słowa i wyrażenia, groźby karalne, obrzucanie się obelgami, obrażanie forumowiczów, członków redakcji i innych osób. Bezwzględnie będziemy zwalczali trollowanie, wszczynanie awantur i prowokowanie. Jeśli czyjaś opinia nie została dopuszczona, to znaczy, że zaliczona została do jednej z wymienionych kategorii. Uwagi i reklamacje kierowane do nas należy kierować na adres: straznik(at)niezalezna.pl Jednocześnie podkreślamy, iż rozumiemy, że nasze środowisko chce mieć miejsce odreagowywania wielu lat poniżania i ciągłej nagonki na nas przez obóz "miłości", ale nie upoważnia to do stosowania wulgarnego języka. Dopuszczalna jest natomiast nawet najostrzejsza krytyka, ale bez wycieczek osobistych. Komunikaty ukazujące się na blogu Morusa są rozwinięciem niniejszego regulaminu. - 6'
                }
            ];
            $scope.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };


        });
