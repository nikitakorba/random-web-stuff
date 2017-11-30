var apiURL = "https://fcc-weather-api.glitch.me/api/current?";
var tempUnit = 'C';
var currentTempInCelsius;

$(document).ready(function () {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = "lat=" + position.coords.latitude;
        var lon = "lon=" + position.coords.longitude;
        console.log('Lat=' + position.coords.latitude);
        console.log('Lon=' + position.coords.longitude);
        getWeather(lat, lon);
    },function error(msg){alert('Please enable your GPS position future.');

        }, {maximumAge:600000, timeout:5000, enableHighAccuracy: true});
} else {
    console.log("Geolocation is not supported by this browser.");
}
    var timeNow = new Date().getHours();
    // Checkbox change handling
    if (timeNow > 18 && timeNow < 24 || timeNow >= 0 && timeNow < 3 ) {
        $("#greeting").text("Good evening!");
    }
    else if (timeNow < 18 && timeNow > 12) {
        $("#greeting").text("Good afternoon!");
    }
    else {
        $("#greeting").text("Good morning!");
    }
function getWeather(latitude,longtitude) {
    var urlWithData = apiURL + latitude+ '&' + longtitude;
    $.ajax({
        url:urlWithData, success: function (response) {
            $('.container').removeClass('hide');
            $('.loader').addClass('hide');
            $("#location").text(response.name + ', ' + response.sys.country);
            currentTempInCelsius = Math.round(response.main.temp * 10) / 10;
            $("#weather").text(currentTempInCelsius);
            $("#tempunit").text(tempUnit + String.fromCharCode(176));
            $(".checkbox").change(function() {
                if(this.checked) {
                    $("#weather").text(currentTempInCelsius * 1.8 + 32);
                    $("#tempunit").text('F' + String.fromCharCode(176));
                }
                else {
                    $("#weather").text(currentTempInCelsius);
                    $("#tempunit").text(tempUnit + String.fromCharCode(176));
                }
            });
            var icon = $('.icon');
            switch (response.weather[0].main){
                case 'Rain':
                    icon.addClass('wi-day-rain');
                    break;
                case 'Drizzle':
                    icon.addClass('wi-day-sleet');
                    break;
                case 'Snow':
                    icon.addClass('wi-day-snow');
                    break;
                case 'Clear':
                    icon.addClass('wi-day-sunny');
                    break;
                case 'Thunderstorm':
                    icon.addClass('wi-day-storm-showers');
                    break;
                case 'Mist':
                    icon.addClass('wi-day-fog');
                    break;
                case 'Clouds':
                    icon.addClass('wi-day-cloudy');
                    break;

            }
            $("#description").text(response.weather[0].main);
            $("#windspeed").text('Wind speed is ' + response.wind.speed + ' km/h');
        }
    });
}
});
