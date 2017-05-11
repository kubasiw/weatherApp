jQuery(document).ready(function(){
    
    
    
    
        $.ajax({
            type: 'GET',
            url: '//freegeoip.net/json/?callback=',
            dataType: 'json'

        }).done(function(data) {
            
            var latitude = data.latitude;
            var longitude = data.longitude;
            
            console.log(latitude);
            console.log(longitude);
            
            
            $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude +'&lon='+longitude +'&units=metric&APPID=40422780428bbcebba3ef9843cd2666a&lang=pl',
            dataType: 'json',

            }).done(function(data) {
                
                console.log(data);
                
                var place = data.name;
                var temp = data.main.temp;
                var pressure = data.main.pressure;
                var humidity = data.main.humidity;
                var wind = data.wind.speed;
                var windDeg = data.wind.deg+180;
                var country = data.sys.country;
                var countryS = data.sys.country.toLowerCase();
                
                
                var today = new Date();
                
                var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                
                var descript = data.weather[0].description;
                var icon = data.weather[0].icon;
                
                var head = jQuery('header .row div');
                
                var unixSunrise = data.sys.sunrise;
                var unixSunset = data.sys.sunset;
                
                var sunriseTime;
                var sunsetTime;
                
                function sunrise() {
                    // Create a new JavaScript Date object based on the timestamp
                    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                    var date = new Date(unixSunrise*1000);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    var seconds = "0" + date.getSeconds();

                    // Will display time in 10:30:23 format
                    sunriseTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);  
                };
                sunrise();
                
                function sunset() {
                    // Create a new JavaScript Date object based on the timestamp
                    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
                    var date = new Date(unixSunset*1000);
                    // Hours part from the timestamp
                    var hours = date.getHours();
                    // Minutes part from the timestamp
                    var minutes = "0" + date.getMinutes();
                    // Seconds part from the timestamp
                    var seconds = "0" + date.getSeconds();

                    // Will display time in 10:30:23 format
                    sunsetTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);  
                };
                sunset();

                function header() {
                    head.prepend('<div>' + 'Current weather in ' + ' ' + '<span>' +place+ '</span>' + ', ' + '<span>' +country+ '</span>' + ' ' + '<span>' + '<img id="flag" src="http://openweathermap.org/images/flags/'+countryS+'.png" />' + '</span>' + '</div>');
                };
                header();
                
                function boxWeather() {
                    var table = jQuery('tbody');
                    
                    table.append('<tr>' + '<td>' + '<img id="icon" src="http://openweathermap.org/img/w/'+icon+'.png" />' + '<span>' +temp+ '&deg C' + '</span>' + '</td>' + '<td>' + '<span>' +descript+ '</span>' + '</td>' + '</tr>');
                    table.append('<tr>' + '<td>' + 'wilgotność:' + '</td>' + '<td>' +humidity+ '%' + '</td>' + '</tr>');
                    table.append('<tr>' + '<td>' + 'ciśnienie:' + '</td>' + '<td>' +pressure+ ' hPa' + '</td>' + '</tr>');
                    table.append('<tr>' + '<td>' + 'wiatr:' + '</td>' + '<td>' +wind+ ' m/s' + '<i class="fa fa-long-arrow-up" aria-hidden="true">' + '</td>' + '</tr>');
                    table.append('<tr>' + '<td>' + 'wschód:' + '</td>' + '<td>' +sunriseTime+ '</td>' + '</tr>');
                    table.append('<tr>' + '<td>' + 'zachód:' + '</td>' + '<td>' +sunsetTime+ '</td>' + '</tr>');
                    
                
                    var arrow = jQuery('.fa-long-arrow-up');
                    arrow.css({ WebkitTransform: 'rotate(' + windDeg + 'deg)'})
                         .css('margin-left', '1em');
                    
                    jQuery('tbody tr:nth-child(1) > td:nth-child(1)').addClass('d-flex align-items-center');
                    
                
                };
                boxWeather();
                
                
                
            }).fail(function(error) {
                alert("error");
            });
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM