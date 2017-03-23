// Initialize Firebase
 var fStandard = 273.15;
 var windPower = 0 ;
 var code = "";
 var WindStandard = 10.8 ;
 var waryhumidity = 50;
 var normalhumidity = 40 ;
 var baldTest =false;
 var minTemperature = 285.95;
 var maxTemperature = 297.59;


 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyASY7NBwl2uKMKjmaQ-docJJAEzhz0N4tg",
    authDomain: "stylecast-be501.firebaseapp.com",
    databaseURL: "https://stylecast-be501.firebaseio.com",
    storageBucket: "stylecast-be501.appspot.com",
    messagingSenderId: "911214775223"
  };
  firebase.initializeApp(config);


<<<<<<< HEAD

=======
>>>>>>> 80a53355441f693f9df8feb0667d7c848ef3b6d5



   function mainTask(Humidity){
//var wCondition = ["shower rain", "rain" , "thunderstorm" , "snow" , "mist" ,"clear sky", "few clouds","scattered clouds", "broken clouds"];

         // API key for open weather
           var code = "";

           var testHuidity = Humidity;


           var APIKey = "da2fd5126cda625878969d8aa3d25d93";

           navigator.geolocation.getCurrentPosition(function(position) {


            console.log(position);
            var lat = position.coords.latitude;
            var lng = position.coords.longitude;


           // Here we are building the URL we need to query the database
           var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lng+"&appid="+APIKey;
           // Here we run our AJAX call to the OpenWeatherMap API
           $.ajax({
               url: queryURL,
               method: "GET"
             })
             // We store all of the retrieved data inside of an object called "response"
             .done(function(response) {


               if(response.main.humidity > testHuidity   ){
               code = code + "H";}
               else{code = code + "X";}



               if(response.wind.speed > WindStandard  ){
               code = code + "W";}
               else{code = code + "N";}


               if(response.main.temp < minTemperature  ){
               code = code + "1";
               }else if ( response.main.temp > maxTemperature){
               code = code + "3";
               }else{
               code = code + "2";
               }


               console.log("code : " + code );
               // Log the data in the console as well
               console.log("Wind Speed: " + response.wind.speed);
               console.log("Humidity: " + response.main.humidity);
               console.log("Temperature (F): " + response.main.temp);
             });



           });

   }
   $(document).ready(function() {
       $("#modal1").modal();
       $("#modal2").modal();

       $("#index-card").hide();
       $("#index-card").show(1000);


 $( document ).on( 'click', '#yesButton', function () {
   console.log("Choose Your Hairstyle");

   baldTest = false ;
   console.log(baldTest );

 });
  $( document ).on( 'click', '#noButton', function () {
   console.log("I am so sorry....... ");
    baldTest = true ;
    console.log(baldTest );

 });

   $( document ).on( 'click', '#CurlyButton', function () {
    if( baldTest == false ){
     mainTask(40);
    }else{
     alert("You are bald. So you don't need my advice! ");
    }


 });
    $( document ).on( 'click', '#wavy', function () {
     if( baldTest == false ){
     mainTask(50);
    }else{
     alert("You are bald. So you don't need my advice! ");
    }


 });
     $( document ).on( 'click', '#Straight', function () {
     if( baldTest == false ){
     mainTask(40);
     }else{
     alert("You are bald. So you don't need my advice! ");
     }

 });
<<<<<<< HEAD

 //--------------Google Sign In ------------------//

  function onSignIn(googleUser) {
   var profile = googleUser.getBasicProfile();
   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
   console.log('Name: ' + profile.getName());
   console.log('Image URL: ' + profile.getImageUrl());
   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
 }

 function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.auth2.init({
      client_id: '676416527258-61om5nlj7brpvd563v0hcs5vbqcnd3k8.apps.googleusercontent.com'
    }).then( () => {
        gapi.signin2.render('g-signin2', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
      });
    });
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }

  //-----------Facebook Login----------------------//
  // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }

    window.fbAsyncInit = function() {
    FB.init({
      appId      : '1117802821682653',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
      });
    }
=======
>>>>>>> 80a53355441f693f9df8feb0667d7c848ef3b6d5
