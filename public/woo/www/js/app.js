// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'directiveModule', 'angularMoment', 'akoenig.deckgrid', 'ngCordova'])

.constant('angularMomentConfig', {
    // preprocess: 'utc', // optional
    timezone: 'Asia/Shanghai' // optional
})

.run(function($ionicPlatform, amMoment) {

  amMoment.changeLocale('zh-cn');

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($ionicConfigProvider, $stateProvider, $urlRouterProvider, $httpProvider) {


  $ionicConfigProvider.backButton.text('');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

   .state('login',{
    url: '/login',
    templateUrl: 'templates/frontpage.html',
    controller: 'LoginCtrl'
  })

   .state('signin',{
    url: '/signin',
    templateUrl: 'templates/login2.html',
    controller: 'SigninCtrl'
  })

   .state('main',{
    url: '/main',
    abstract: true,
    templateUrl: 'templates/main.html',
    controller: 'MainCtrl'
   })

   .state('main.timeline',{
    url: '/timeline',
    views: {
        'menuContent' :{
          templateUrl: "templates/timeline2.html",
          controller: 'TimelineCtrl'
        }
    }
   })

   .state('main.newline',{
    url: '/newline',
    views: {
        'menuContent' :{
          templateUrl: "templates/newline.html",
          controller: 'NewLineCtrl'
        }
    }
   })

   .state('main.friends',{
    url: '/friends',
    views: {
        'menuContent' :{
          templateUrl: "templates/friends.html",
          controller: 'FriendCtrl'
        }
    }
   })

   .state('main.share',{
    url: '/share',
    views: {
        'menuContent' :{
          templateUrl: "templates/share.html",
          controller: 'ShareCtrl'
        }
    }
   })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
