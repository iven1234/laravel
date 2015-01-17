angular.module('starter.controllers', [])

.controller('LoginCtrl',function($scope, User, $state){

  $scope.user = {
    email: 'woo@126.com',
    password: '12121212',
    first_name: 'johne',
    last_name: 'iven'
  };  

  $scope.login = function(user){
    // if success then go state
    $state.go('main.timeline');
  }

})

.controller('MainCtrl',function($scope, $state, $ionicModal){
  $scope.isTimeline = $state.$current.name == 'main.timeline';

  $scope.show = function(){
    console.log(12112);
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.createContact = function(u) {        
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

})

.controller('TimelineCtrl',function($scope, $state){
  
})

.controller('DashCtrl', function($scope) {

  $scope.num = 3;
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
