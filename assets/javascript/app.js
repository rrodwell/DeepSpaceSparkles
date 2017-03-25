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

      var humidityDesc = "";
      if (dataList.hairType == 35) {
          if (dataList.humidity < 0.35) {
              humidityDesc = "Looks like the humidity is just right to keep your hair from puffing up like a blowfish.";
          } else {
              humidityDesc = "Looks like the humidity is a little high for your texture. If you got a blowout recently you better grab your favorite pashmina and make like an old Russian Orthodox lady. Otherwise today is a great day to try a cute bun or a braid.";
          }
      }

      if (dataList.hairType == 50) {
          if (dataList.humidity < 0.5) {
              humidityDesc = "The humidity today is just right to keep any style your heart desires.";
          } else {
              humidityDesc = "The humidity is a little high today. If your hair frizzes easily you might want to try an anti humectant.";
          }
      }

      if (dataList.hairType == 40) {
          if (dataList.humidity < 0.5) {
              humidityDesc = "The humidity is just right for your hair today. Try some curls or waves.";
          } else {
              humidityDesc = "The humidity is bit high for your hair. You know barrel curls will not be hanging around today. Might be a good day to embrace your straight hair or even try a messy bun.";
          }
      }

      if (dataList.wind < 10) {
          windDesc = "The wind today seems just right.";
      } else {
          windDesc = "The wind will try your patience today. Don't forget a hair tie.";
      }

      if (dataList.temperature < 55) {
          tempDesc = "The temperature is cold today but it shouldn't be a problem for your style, unless we have a beanie situation. Just try not to keep it on too long. ";
      } else if (dataList.temperature < 76) {
          tempDesc = "The temperature is very nice today.";
      } else {
          tempDesc = "The temperature will be pretty warm today. Sweat might mess with your style. Try and stay cool or maybe try a cute updo!";
      }

      var videoLink = "";
      var productLink = "";

      if(dataList.hairType == 35 && dataList.humidity < 0.35) {
          videoLink = "https://www.youtube.com/watch?v=hjeuIy844o4";
          productLink = "https://www.amazon.com/ALTERNA-BAMBOO-Smooth-Kendi-Treatment/dp/B0045WBFAI/ref=sr_1_4_a_it?ie=UTF8&qid=1489868795&sr=8-4&keywords=bamboo+oil";
      } else if(dataList.hairType == 35 && dataList.humidity > 0.35) {
          videoLink = "https://www.youtube.com/watch?v=HABlHpjxAOs&t=133s"
          productLink =  "https://www.amazon.com/Alterna-Bamboo-Smooth-Anti-Humidity-Unisex/dp/B004O2PQK4/ref=sr_1_1_a_it?ie=UTF8&qid=1490207397&sr=8-";
      }

      if(dataList.hairType == 50 && dataList.humidity < 0.5) {
          videoLink = "https://www.youtube.com/watch?v=5t6x7SekDVw";
          productLink = "https://www.amazon.com/ALTERNA-BAMBOO-Smooth-Kendi-Treatment/dp/B0045WBFAI/ref=sr_1_4_a_it?ie=UTF8&qid=1489868795&sr=8-4&keywords=bamboo+oil";
      } else if(dataList.hairType == 50 && dataList.humidity > 0.5) {
          videoLink = "https://www.youtube.com/watch?v=HABlHpjxAOs&t=133s"
          productLink =  " https://www.amazon.com/Pureology-Purevolume-Blowdry-Amplifier-Ounce/dp/B0073XP3M2/ref=sr_1_12_a_it?ie=UTF8&qid=1490207620&sr=8-12&keywords=blow+dry+lotion";
      }

      if(dataList.hairType == 40 && dataList.humidity < 0.5) {
          videoLink = "https://www.youtube.com/watch?v=5t6x7SekDVw";
          productLink = "https://www.amazon.com/ALTERNA-BAMBOO-Smooth-Kendi-Treatment/dp/B0045WBFAI/ref=sr_1_4_a_it?ie=UTF8&qid=1489868795&sr=8-4&keywords=bamboo+oil";
      } else if(dataList.hairType == 40 && dataList.humidity > 0.5) {
          videoLink = "https://www.youtube.com/watch?v=K4fbsdCWQz4"
          productLink =  "  https://www.amazon.com/Its-10-Miracle-Volumizer-Ounce/dp/B007L5IB0I/ref=sr_1_3_a_it?ie=UTF8&qid=1490207747&sr=8-3&keywords=volumizing+blow+dry";
      }


      $("#humidityDesc").html(humidityDesc);
      $("#windDesc").html(windDesc);
      $("#tempDesc").html(tempDesc);

      $("#videoLink").attr("href", videoLink);
      $("#productLink").attr("href", productLink);

  }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
 };






 function mainTask(hairType) {
     //var wCondition = ["shower rain", "rain" , "thunderstorm" , "snow" , "mist" ,"clear sky", "few clouds","scattered clouds", "broken clouds"];
     // API key for open weather
     var code = "";

     var APIKey = "da2fd5126cda625878969d8aa3d25d93";

     navigator.geolocation.getCurrentPosition(function(position) {

       console.log(position);
       var lat = position.coords.latitude;
       var lng = position.coords.longitude;

       // Here we are building the URL we need to query the database
       var queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&appid=" + APIKey+ "&units=imperial";
       // Here we run our AJAX call to the OpenWeatherMap API
       $.ajax({
               url: queryURL,
               method: "GET"
           })
           // We store all of the retrieved data inside of an object called "response"
           .done(function(response) {

               database.ref("HairMan").set({
                   humidity: response.main.humidity,
                   wind: response.wind.speed,
                   temperature: response.main.temp,
                   hairType: hairType
               });
               console.log("code : " + code);
               // Log the data in the console as well
               console.log("Wind Speed: " + response.wind.speed);
               console.log("Humidity: " + response.main.humidity);
               console.log("Temperature (F): " + response.main.temp);
               console.log("Hair Type: " + response.main.hairType);
               window.location.href = 'results.html';
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
       $(".chooseHair").html("Try a hat.");
   });

   $(document).on('click', '.CurlyButton', function() {
       mainTask(35);
   });

   $(document).on('click', '.wavyButton', function() {
       mainTask(50);
   });

   $(document).on('click', '.StraightButton', function() {
       mainTask(40);

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

          // TO DO: Use a setTimeout to run displayImage after 1 second.
          setTimeout(displayImage, 1000);
          // TO DO: If the count is the same as the length of the image array, reset the count to 0.
          if (count === images.length) {
              count = 0;
          }
      }

      function startSlideshow() {
          //TO DO: Use showImage to hold the setInterval to run nextImage.
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
          console.log(idpasswordS);
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

          };


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
});

    //--------------Google Sign In ------------------//

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    };

    function onSuccess(googleUser) {
        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    };

    function onFailure(error) {
        console.log(error);
    };

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
    };

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
            console.log('User signed out.');
        });
    };
