
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
 var hairQuestion = ["Naturally Curly", "Wavy", "Straight"] ;
 var img_url = ["assets/images/curly1.png", "assets/images/wavy1.png", "assets/images/straight1.png"];
 var imgClass = ["CurlyButton" , "wavyButton", "StraightButton"];
  var config = {
    apiKey: "AIzaSyC6o7t2PclsAkkXhFu4AklfNy1DqacBrT0",
    authDomain: "firstproject-7e549.firebaseapp.com",
    databaseURL: "https://firstproject-7e549.firebaseio.com",
    storageBucket: "firstproject-7e549.appspot.com",
    messagingSenderId: "741139754501"
  };
 firebase.initializeApp(config);
var database = firebase.database();
var idpasswordS= [] ;

function ipMan(id, password){
  this.email = id;
  this.pass = password;

}




database.ref("userInput").on("value", function(snapshot) {
    var dataStorage = snapshot.val();
    console.log(dataStorage);
    if(dataStorage != null){
       var keyG = Object.keys(dataStorage);
        for(var i = 0 ; i < keyG.length ; i++){
        var infoMan = new ipMan (dataStorage[keyG[i]].emailC , dataStorage[keyG[i]].passwordC);
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






   function generateResult(){



     database.ref("HairMan").on("value", function(snapshot) {
     var dataList = snapshot.val();

     console.log(dataList.humidity);

     $("#humiditySection").html(dataList.humidity+"%");
     $("#tempSection").html(dataList.temperature);
     $("#windspdSection").html(dataList.wind);


    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });



   }




   function mainTask(Humidity){
//var wCondition = ["shower rain", "rain" , "thunderstorm" , "snow" , "mist" ,"clear sky", "few clouds","scattered clouds", "broken clouds"];

         // API key for open weather
           var code = "";

           var testHuidity = Humidity;

           //console.log(Humidity);
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




               console.log(response);
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

               database.ref("HairMan").set({
               humidity : response.main.humidity ,
               wind : response.wind.speed ,
               temperature : response.main.temp,
               codeMan : code,
               test : "hi"
               });


               console.log("code : " + code );
               // Log the data in the console as well
               console.log("Wind Speed: " + response.wind.speed);
               console.log("Humidity: " + response.main.humidity);
               console.log("Temperature (F): " + response.main.temp);
               window.location.href='result.html';

             });



           });




   }

 $( document ).on( 'click', '#answer3', function () {
   console.log("Choose Your Hairstyle");
   $(".chooseHair").html("What type of hair do you have?");


   for( var i = 0 ; i < 3 ; i++){
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

       $(".chooseHair").append( space);



   }



 });
  $( document ).on( 'click', '#answer4', function () {
   console.log("I am so sorry....... ");
   $(".chooseHair").html("I am so sorry but you are bald. Why should you need us?");



 });

   $( document ).on( 'click', '.CurlyButton', function () {

     mainTask(35);


 });
    $( document ).on( 'click', '.wavyButton', function () {

     mainTask(50);



 });
     $( document ).on( 'click', '.StraightButton', function () {

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
$(document).ready(function(){
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
$(document).ready(function(){
  $("#modal1").modal();
  $("#modal2").modal();
});


function checkingMan(email, password) {
        var checkingCondition = 0;

        if(email == "")  checkingCondition = 1;
        if(password == "")  checkingCondition = 2;
        if((email == "") && (password == "") )  checkingCondition = 3;



       return checkingCondition;


}



$( document ).on( 'click', '#registerMan', function () {
  //TrainNamen = $("#Train-Name").val().trim();
  //console.log("hi");
   console.log(idpasswordS)
   //console.log(idpasswordS.length);
   var checkingID = false;
   var noSameID = true;
   event.preventDefault();
   var emailCheck=  $("#emailR").val().trim();
   console.log(emailCheck);

   var passewordCon = $("#passwordR").val().trim();
   console.log(passewordCon);

   var conditionCheking = checkingMan(emailCheck, passewordCon);
   console.log(conditionCheking);


   if(conditionCheking == 0){
     checkingID = true;

   }


   if(checkingID = true){
         if (idpasswordS.length == 0){
           database.ref("userInput").push({
                                           emailC : emailCheck ,
                                           passwordC : passewordCon
                                            });
           window.location.href='hairQuestions.html';


         }else{
            for( var i = 0  ; i < idpasswordS.length; i++){
               if(emailCheck == idpasswordS[i].email)
               noSameID = false ;
               console.log("There is same ID");
            }

         }




   }

  if(noSameID == true && conditionCheking == 0 ){
            database.ref("userInput").push({
                                           emailC : emailCheck ,
                                           passwordC : passewordCon
                                            });
            window.location.href='hairQuestions.html';

  }



});




$( document ).on( 'click', '#doitLogin', function () {
  //TrainNamen = $("#Train-Name").val().trim();
  //console.log("hi");
   console.log(idpasswordS)
   //console.log(idpasswordS.length);
   var checkingID = false;
   var checkingI = false;
   var chekcingP = false;
   event.preventDefault();
   var emailCheck=  $("#emailL").val().trim();
   console.log(emailCheck);

   var passewordCon = $("#passwordL").val().trim();
   console.log(passewordCon);

   var conditionCheking = checkingMan(emailCheck, passewordCon);
   console.log(conditionCheking);


   if(conditionCheking == 0){
     checkingID = true;

   }


   if(checkingID = true){
         if (idpasswordS.length == 0){

              console.log("there is no uesrInput");

         }else{
            for( var i = 0  ; i < idpasswordS.length; i++){
               if(emailCheck == idpasswordS[i].email)
               checkingI = true ;
               if(passewordCon == idpasswordS[i].pass)
               chekcingP = true ;
               console.log("There is same ID");
            }

         }




   }

  if(checkingI  == true && chekcingP == true ){

            window.location.href='hairQuestions.html';

  }



});
