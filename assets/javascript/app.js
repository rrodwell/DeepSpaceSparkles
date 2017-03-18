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


 var config = {
   apiKey: "AIzaSyB7C05zBpbSGSUEAabZFNOiUPjX0ZYM9xI",
   authDomain: "beerme-73beb.firebaseapp.com",
   databaseURL: "https://beerme-73beb.firebaseio.com",
   storageBucket: "beerme-73beb.appspot.com",
   messagingSenderId: "364897926231"
 };
 firebase.initializeApp(config);

 



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