// Initialize Firebase
var fStandard = 273.15;
var windPower = 0;
var code = "";
var WindStandard = 10.8;
var waryhumidity = 50;
var normalhumidity = 40;
var baldTest = false;
var minTemperature = 285.95;
var maxTemperature = 297.59;
var hairQuestion = ["Naturally Curly", "Wavy", "Straight"];
var img_url = ["assets/images/curly1.png", "assets/images/wavy1.png", "assets/images/straight1.png"];
var imgClass = ["CurlyButton", "wavyButton", "StraightButton"];
var config = {
    apiKey: "AIzaSyC6o7t2PclsAkkXhFu4AklfNy1DqacBrT0",
    authDomain: "firstproject-7e549.firebaseapp.com",
    databaseURL: "https://firstproject-7e549.firebaseio.com",
    storageBucket: "firstproject-7e549.appspot.com",
    messagingSenderId: "741139754501"
};
firebase.initializeApp(config);
var database = firebase.database();
var idpasswordS = [];

function ipMan(id, password) {
    this.email = id;
    this.pass = password;
};




database.ref("userInput").on("value", function(snapshot) {
    var dataStorage = snapshot.val();
    console.log(dataStorage);
    if (dataStorage != null) {
        var keyG = Object.keys(dataStorage);
        for (var i = 0; i < keyG.length; i++) {
            var infoMan = new ipMan(dataStorage[keyG[i]].emailC, dataStorage[keyG[i]].passwordC);
            idpasswordS.push(infoMan);
        }
    }
    /*
    if(dataUpdate != null){
         var keyG = Object.keys(dataUpdate);
         for(var i = 0 ; i < keyG.length ; i++){
         console.log(email == dataUpdate[keyG[i]].emailC);
         if( email == dataUpdate[keyG[i]].emailC ){
             samID = true;
           }
        }
            }
            if(sameID = false){
              database.ref("userInput").push({
              emailC : emailCheck ,
              passwordC : passewordCon
              });

             }else{
               console.log("There is same ID !");
             }
    */

}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


function generateResult() {



    database.ref("HairMan").on("value", function(snapshot) {
        var dataList = snapshot.val();

        console.log(dataList.humidity);

        $("#humiditySection").html(dataList.humidity + "%");
        $("#tempSection").html(dataList.temperature);
        $("#windspdSection").html(dataList.wind);


    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


}


function mainTask(Humidity) {
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
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + APIKey;
        // Here we run our AJAX call to the OpenWeatherMap API
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            // We store all of the retrieved data inside of an object called "response"
            .done(function(response) {


                if (response.main.humidity > testHuidity) {
                    code = code + "H";
                } else {
                    code = code + "X";
                }



                if (response.wind.speed > WindStandard) {
                    code = code + "W";
                } else {
                    code = code + "N";
                }


                if (response.main.temp < minTemperature) {
                    code = code + "1";
                } else if (response.main.temp > maxTemperature) {
                    code = code + "3";
                } else {
                    code = code + "2";
                }

                database.ref("HairMan").set({
                    humidity: response.main.humidity,
                    wind: response.wind.speed,
                    temperature: response.main.temp,
                    codeMan: code,
                    test: "hi"
                });


                console.log("code : " + code);
                // Log the data in the console as well
                console.log("Wind Speed: " + response.wind.speed);
                console.log("Humidity: " + response.main.humidity);
                console.log("Temperature (F): " + response.main.temp);
                window.location.href = 'result.html';

            });

    });

}
$(document).ready(function() {
            $("#modal1").modal();
            $("#modal2").modal();

            $("#index-card").hide();
            $("#index-card").show(1000);


            $(document).on('click', '#answer3', function() {
                console.log("Choose Your Hairstyle");
                $(".chooseHair").html("What type of hair do you have?");


                for (var i = 0; i < 3; i++) {
                    var space = $("<div>");
                    var letter = $("<p>");
                    var inputforP = hairQuestion[i];
                    letter.text(inputforP);
                    letter.addClass("col m12 center");
                    letter.addClass("materialboxed");
                    letter.addClass("ArrangeMan");
                    letter.css("fontSize", 20);
                    var imgFile = $("<img>");
                    imgFile.attr('src', img_url[i]);
                    imgFile.attr('height', '65px');
                    imgFile.attr('width', '50px');
                    imgFile.addClass(imgClass[i]);
                    space.append(imgFile);
                    space.addClass("SecondA");
                    space.append(letter);

                    $(".chooseHair").append(space);



                }




            });
            $(document).on('click', '#answer4', function() {
                console.log("I am so sorry....... ");
                $(".chooseHair").html("I am so sorry but you are bald. Why should you need us?");



            });

            $(document).on('click', '.CurlyButton', function() {

                mainTask(35);

            });
            $(document).on('click', '.wavyButton', function() {

                mainTask(50);

            });
            $(document).on('click', '.StraightButton', function() {

                mainTask(40);

                /*
     if( baldTest == false ){
     mainTask(40);
     baldTest == true;
     }else{
     alert("You are bald. So you don't need my advice! ");
     }
    */
            });

            var images = ["assets/images/sunny1.png", "assets/images/rainy1.png", "assets/images/windy1.png", "assets/images/snowy1.png"];
            // Variable showImage will hold the setInterval when we start the slideshow
            var showImage;
            // Count will keep track of the index of the currently displaying picture.
            var count = 0;
            // This function will replace display whatever image it's given
            // in the 'src' attribute of the img tag.
            function displayImage() {
                $("#image-holder").html("<img src=" + images[count] + " height='100px'>");
            }

            function nextImage() {
                //Increment the count by 1.
                count++;

                // TODO: Use a setTimeout to run displayImage after 1 second.
                setTimeout(displayImage, 1000);
                // TODO: If the count is the same as the length of the image array, reset the count to 0.
                if (count === images.length) {
                    count = 0;
                }
            }

            function startSlideshow() {
                // TODO: Use showImage to hold the setInterval to run nextImage.
                showImage = setInterval(nextImage, 1000);
            }
            startSlideshow();
            //on click function for modals
            $(document).ready(function() {
                $("#modal1").modal();
                $("#modal2").modal();
            });




            generateResult();


            var images = ["assets/images/sunny1.png", "assets/images/rainy1.png", "assets/images/windy1.png", "assets/images/snowy1.png"];
            // Variable showImage will hold the setInterval when we start the slideshow
            var showImage;
            // Count will keep track of the index of the currently displaying picture.
            var count = 0;
            // This function will replace display whatever image it's given
            // in the 'src' attribute of the img tag.
            function displayImage() {
                $("#image-holder").html("<img src=" + images[count] + " height='100px'>");
            }

            function nextImage() {
                //Increment the count by 1.
                count++;

                // TODO: Use a setTimeout to run displayImage after 1 second.
                setTimeout(displayImage, 1000);
                // TODO: If the count is the same as the length of the image array, reset the count to 0.
                if (count === images.length) {
                    count = 0;
                }
            }

            function startSlideshow() {
                // TODO: Use showImage to hold the setInterval to run nextImage.
                showImage = setInterval(nextImage, 1000);
            }
            startSlideshow();
            //on click function for modals
            $(document).ready(function() {
                $("#modal1").modal();
                $("#modal2").modal();
            });


            function checkingMan(email, password) {
                var checkingCondition = 0;

                if (email == "") checkingCondition = 1;
                if (password == "") checkingCondition = 2;
                if ((email == "") && (password == "")) checkingCondition = 3;



                return checkingCondition;


            }



            $(document).on('click', '#registerMan', function() {
                //TrainNamen = $("#Train-Name").val().trim();
                //console.log("hi");
                console.log(idpasswordS)
                //console.log(idpasswordS.length);
                var checkingID = false;
                var noSameID = true;
                event.preventDefault();
                var emailCheck = $("#emailR").val().trim();
                console.log(emailCheck);

                var passewordCon = $("#passwordR").val().trim();
                console.log(passewordCon);

                var conditionCheking = checkingMan(emailCheck, passewordCon);
                console.log(conditionCheking);


                if (conditionCheking == 0) {
                    checkingID = true;

                }


                if (checkingID = true) {
                    if (idpasswordS.length == 0) {
                        database.ref("userInput").push({
                            emailC: emailCheck,
                            passwordC: passewordCon
                        });
                        window.location.href = 'hairQuestions.html';


                    } else {
                        for (var i = 0; i < idpasswordS.length; i++) {
                            if (emailCheck == idpasswordS[i].email)
                                noSameID = false;
                            console.log("There is same ID");
                        }

                    }




                }

                if (noSameID == true && conditionCheking == 0) {
                    database.ref("userInput").push({
                        emailC: emailCheck,
                        passwordC: passewordCon
                    });
                    window.location.href = 'hairQuestions.html';

                }



            });




            $(document).on('click', '#doitLogin', function() {
                //TrainNamen = $("#Train-Name").val().trim();
                //console.log("hi");
                console.log(idpasswordS)
                //console.log(idpasswordS.length);
                var checkingID = false;
                var checkingI = false;
                var chekcingP = false;
                event.preventDefault();
                var emailCheck = $("#emailL").val().trim();
                console.log(emailCheck);

                var passewordCon = $("#passwordL").val().trim();
                console.log(passewordCon);

                var conditionCheking = checkingMan(emailCheck, passewordCon);
                console.log(conditionCheking);


                if (conditionCheking == 0) {
                    checkingID = true;

                }


                if (checkingID = true) {
                    if (idpasswordS.length == 0) {

                        console.log("there is no uesrInput");

                    } else {
                        for (var i = 0; i < idpasswordS.length; i++) {
                            if (emailCheck == idpasswordS[i].email)
                                checkingI = true;
                            if (passewordCon == idpasswordS[i].pass)
                                chekcingP = true;
                            console.log("There is same ID");
                        }

                    }




                }

                if (checkingI == true && chekcingP == true) {

                    window.location.href = 'hairQuestions.html';

                }



            });

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
                }).then(() => {
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
                auth2.signOut().then(function() {
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
            };

            window.fbAsyncInit = function() {
                FB.init({
                    appId: '1117802821682653',
                    cookie: true, // enable cookies to allow the server to access
                    // the session
                    xfbml: true, // parse social plugins on this page
                    version: 'v2.8' // use graph api version 2.8
                });

                FB.getLoginStatus(function(response) {
                    statusChangeCallback(response);
                });

            };

            // Load the SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            function testAPI() {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Successful login for: ' + response.name);
                    document.getElementById('status').innerHTML =
                        'Thanks for logging in, ' + response.name + '!';
                });
            }
