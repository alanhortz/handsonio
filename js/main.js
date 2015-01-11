$(document).foundation();

$(document).ready(function(){

    var $signupForm = $("#signup-form");

    $('.topics').slick({
      dots: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 2000
    });    

    $('.slick-carousel').slick({
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        easing: 'easeInExpo',
        arrows: false,
        fade: false
    });

    $('#signup-form input[type="submit"]').bind('click', function ( event ) {
        if ( event ) event.preventDefault();
        signup($signupForm);
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
var preRegistrationForm = $("pre-registration-form");
var menuBlogItem = $("#menu-blog-item");


//email.focus();

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
  } else {
    
    email.val("");
    
    ga('send', 'event', 'subscribe', 'complete');
    $("#subscribe-confirmation").foundation('reveal', 'open');
  }
};
function signup($form) {
  
  ga('send', 'event', 'subscribe', 'click');

  $.ajax({
    type: $form.attr('method'),
    url: $form.attr('action'),
    data: $form.serialize(),
    cache       : false,
    dataType    : 'jsonp',
    jsonp       : 'c',
    contentType: "application/json; charset=utf-8",
    error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
    success     : function(data) {
        if (data.result != "success") {
            // Something went wrong, do something to notify the user. maybe alert(data.msg);
        } else {
            var myFirebaseRef = new Firebase("https://handsonio.firebaseio.com/contacts");
            myFirebaseRef.push({
              email: $form[0].email.value,
            }, onSignupComplete);
        }
    }
  });
}

function preRegister(formObj) {
  ga('send', 'event', 'pre-registration', 'click');
  var myFirebaseRef = new Firebase("https://handsonio.firebaseio.com/registrations");
  myFirebaseRef.push({
    firstName : formObj.firstName.value,
    lastName : formObj.lastName.value,
    email: formObj.prEmail.value
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
  ga('send', 'event', 'registration', 'click');
  //$("#pre-registration-modal").foundation('reveal', 'open');
});

preRegistrationCloseBtn.click(function(event) {
  ga('send', 'event', 'pre-registration', 'complete-close');
  $("#pre-registration-modal").foundation('reveal', 'close');
} );

menuBlogItem.click(function(event) {
  ga('send', 'event', 'menu-blog-item', 'click');
});

