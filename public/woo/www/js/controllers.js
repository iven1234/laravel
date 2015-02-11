angular.module('starter.controllers', [])

.controller('LoginCtrl',function($scope, User, $state, $localstorage){

  $scope.user = {
    email: 'jzf500@126.com',
    password: '123456'  
  };  

  $scope.sigin= function(){
    $state.go('signin');
  };

  $scope.login = function(){
    // if success then go state
    User.login($scope.user, function(response){

      if(response['notice']){

        $localstorage.setObject('user', $scope.user);

        $state.go('main.timeline');
      }
    });
  }

  $scope.register = function(user){
    // if success then go state
    User.register($scope.user, function(response){

        console.log('register!');
    });
  }

})

.controller('SigninCtrl', function($scope, $state){
  $scope.signIn = function() {
    $state.go('main.timeline');
  };
})

.controller('MainCtrl',function($scope, $state, $ionicModal, Timeline, $rootScope){
  $scope.isTimeline = $state.$current.name == 'main.timeline';

  $scope.show = function(){
    console.log(12112);
  }

  $ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.create = function(timeline){
    Timeline.save(timeline).$promise.then(function(data){
      if(data.notice == 'success'){

        $rootScope.$broadcast('lineToRoot', 'saveLine');
        $scope.modal.hide();
      }
    });
  };
  
  $scope.createContact = function(u) {        
    $scope.contacts.push({ name: u.firstName + ' ' + u.lastName });
    $scope.modal.hide();
  };

})

.controller('FriendCtrl', function($scope){
  $scope.friends = [{
    text: 'haha'
  }];
})

.controller('TimelineCtrl',function($scope, $state, User){
 
  $scope.profile = {
        bg: 'bg2.jpg',
        name: '贝律铭'
      };

  var lines = User.query({verb: 'timeline'}, function(){
    $scope.lines = lines;
  });

  $scope.type = 'vertical';

  $scope.changeType = function(type){
    $scope.type = type;
  };

  $scope.photos = [
      {id: 'photo-1', name: 'Awesome photo', src: 'http://lorempixel.com/400/300/abstract'},
      {id: 'photo-2', name: 'Great photo', src: 'http://lorempixel.com/450/400/city'},
      {id: 'photo-3', name: 'Strange photo', src: 'http://lorempixel.com/400/300/people'},
      {id: 'photo-4', name: 'A photo?', src: 'http://lorempixel.com/400/300/transport'},
      {id: 'photo-5', name: 'What a photo', src: 'http://lorempixel.com/450/300/fashion'},
      {id: 'photo-6', name: 'Silly photo', src: 'http://lorempixel.com/400/300/technics'},
      {id: 'photo-7', name: 'Weird photo', src: 'http://lorempixel.com/410/350/sports'},
      {id: 'photo-8', name: 'Modern photo', src: 'http://lorempixel.com/400/300/nightlife'},
      {id: 'photo-9', name: 'Classical photo', src: 'http://lorempixel.com/400/300/nature'},
      {id: 'photo-10', name: 'Dynamic photo', src: 'http://lorempixel.com/420/300/abstract'},
      {id: 'photo-11', name: 'Neat photo', src: 'http://lorempixel.com/400/300/sports'},
      {id: 'photo-12', name: 'Bumpy photo', src: 'http://lorempixel.com/400/300/nightlife'},
      {id: 'photo-13', name: 'Brilliant photo', src: 'http://lorempixel.com/400/380/nature'},
      {id: 'photo-14', name: 'Excellent photo', src: 'http://lorempixel.com/480/300/technics'},
      {id: 'photo-15', name: 'Gorgeous photo', src: 'http://lorempixel.com/400/300/sports'},
      {id: 'photo-16', name: 'Lovely photo', src: 'http://lorempixel.com/400/300/nightlife'},
      {id: 'photo-17', name: 'A "wow" photo', src: 'http://lorempixel.com/400/300/nature'},
      {id: 'photo-18', name: 'Bodacious photo', src: 'http://lorempixel.com/400/300/abstract'}
  ];

 
 $scope.add = function(){
  $state.go('main.newline');
 };
  // var lineQuery = function(){
  //   Timeline.query().$promise.then(function(data){
  //     $scope.lines = data;
  //   });
  // };

  // lineQuery();
  

  // $scope.$on('lineToRoot', function(event, data){
  //   lineQuery();
  // })

})

.controller('NewLineCtrl', function($scope, $cordovaCamera, $cordovaImagePicker, $ionicActionSheet){
 
// var posOptions = {timeout: 10000, enableHighAccuracy: false};
// $cordovaGeolocation.getCurrentPosition(posOptions).then(function(position) {
//        var lat  = position.coords.latitude
//        var long = position.coords.longitude
//      }, function(err) {
//        // error
//      });

 $scope.showActionsheet = function(){

  console.log('click show showActionsheet');

    $ionicActionSheet.show({
        buttons: [
           { text: '拍照' },
           { text: '从手机相册选择' },
        ],
        cancelText: '取消',
        cancel: function() {
           console.log('CANCELLED');
        },
        buttonClicked: function(index) {
           switch(index){
                case 0:
                console.log('BUTTON CLICKED', index);
                break;
                case 1:
                pickImage();
                break;
           }
           return true;
        },
        destructiveButtonClicked: function() {
           console.log('DESTRUCT');
           return true;
        }
      });
 };

 //image picker 
 var pickImage = function () { 
      var options = { 
           maximumImagesCount: 1, 
           width: 800, 
           height: 800, 
           quality: 80 
      }; 
       
      $cordovaImagePicker.getPictures(options) 
           .then(function (results) { 
                  
                $scope.cover = results[0]; 
                  
           }, function (error) { 
                // error getting photos 
      }); 
 }; 

 $scope.choose = function(){
      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        $scope.imgURI  = "data:image/jpeg;base64," + imageData;
      }, function(err) {
        // error
      });
  };
})

.controller('ShareCtrl', function($scope){

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
