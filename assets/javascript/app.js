// Initialize Firebase
 var config = {
   apiKey: "AIzaSyB7C05zBpbSGSUEAabZFNOiUPjX0ZYM9xI",
   authDomain: "beerme-73beb.firebaseapp.com",
   databaseURL: "https://beerme-73beb.firebaseio.com",
   storageBucket: "beerme-73beb.appspot.com",
   messagingSenderId: "364897926231"
 };
 firebase.initializeApp(config);

//var wCondition = ["shower rain", "rain" , "thunderstorm" , "snow" , "mist" ,"clear sky", "few clouds","scattered clouds", "broken clouds"]; 
var fStandard = 273.15; 
var windPower = 0 ;
var code = "";
var WindStandard = 10.8 ;
var stonghumidity = 70; 
 // API key for open weather
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

       
       
       if( response.main.temp <= fStandard){
         code = code+"1";   
       }else{
         code = code+"0";
       }

       if( response.wind.speed >= WindStandard){
         code = code+"1";   
       }else{
         code = code+"0";
       }

        if( response.main.humidity >= stonghumidity){
         code = code+"1";   
       }else{
         code = code+"0";
       }


       
       console.log(code);
       // Transfer content to HTML
       $(".city").html("<h1>" + response.name + " Weather Details</h1>");
       $(".wind").html("Wind Speed: " + response.wind.speed);
       $(".humidity").html("Humidity: " + response.main.humidity);
       $(".temp").html("Temperature (F) " + response.main.temp);

       // Log the data in the console as well
       console.log("Wind Speed: " + response.wind.speed);
       console.log("Humidity: " + response.main.humidity);
       console.log("Temperature (F): " + response.main.temp);
     });
   


   });
