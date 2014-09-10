$(document).foundation();

$(document).ready(function(){
    $('.slick-carousel').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        easing: 'easeOutQuart',
        arrows: false
    });
});



var tag = document.createElement('script');
var signupBtn = document.getElementById('signup-button');
var email = $("#email");
var subscriptionModalCloseBtn = $("#subscription-modal-close-btn");
var adNextSessionButton = $("#ad-next-session-button");
var preRegistrationBtn = $("#pre-registration-btn");
var preRegistrationCloseBtn = $("#pre-registration-close-btn");
var preRegistrationConfirmation = $("#pre-registration-confirmation");
var preRegistrationContainer = $("#pre-registration-container");


email.focus();

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {  
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}


function onPlayerReady(event) {
  //event.target.playVideo();
}

function onPlayerStateChange(event) {
  
  if (event.data == YT.PlayerState.PLAYING) {
    ga('send', 'event', 'video', 'play');
  }
}
function stopVideo() {
  player.stopVideo();
}

var onSignupComplete = function(error) {
  if (error) {
    //signupError.innerHTML = 'Sorry. Could not signup.';
    ga('send', 'event', 'subscribe', 'error');
    console.log('Error !');
  } else {
    $("#subscribe-confirmation").foundation('reveal', 'open');
    email.value = "";
    ga('send', 'event', 'subscribe', 'complete');
  }
};
function signup(formObj) {
  ga('send', 'event', 'subscribe', 'click');
  var myFirebaseRef = new Firebase("https://handsonio.firebaseio.com/contacts");
  myFirebaseRef.push({
    email: formObj.email.value,
  }, onSignupComplete);
  
  return false;
}
function preRegister(formObj) {
  ga('send', 'event', 'pre-registration', 'click');
  var myFirebaseRef = new Firebase("https://handsonio.firebaseio.com/registrations");
  myFirebaseRef.push({
    firstName : formObj.firstName.value,
    lastName : formObj.lastName.value,
    email: formObj.prEmail.value,
    address : formObj.address.value,
    zip : formObj.zip.value,
    city : formObj.city.value
  }, onPreRegistrationComplete);
  
  return false;

}
var onPreRegistrationComplete = function(error) {
  if (error) {
    //signupError.innerHTML = 'Sorry. Could not signup.';
    ga('send', 'event', 'pre-registration', 'error');
    console.log('Error !');
  } else {
    //$("#pre-registration-modal").foundation('reveal', 'close');
    preRegistrationContainer.toggle();
    preRegistrationConfirmation.toggle();
    ga('send', 'event', 'pre-registration', 'complete');
  }

};
subscriptionModalCloseBtn.click(function(event) {
  ga('send', 'event', 'subscribe-modal', 'close');
});

adNextSessionButton.click(function(event) {
  ga('send', 'event', 'subscribe-modal', 'ad-next-session');
  $("#subscribe-confirmation").foundation('reveal', 'close');
});

preRegistrationBtn.click(function(event) {
  ga('send', 'event', 'pre-registration', 'click');
  $("#pre-registration-modal").foundation('reveal', 'open');
});

preRegistrationCloseBtn.click(function(event) {
  ga('send', 'event', 'pre-registration', 'complete-close');
  $("#pre-registration-modal").foundation('reveal', 'close');
} );