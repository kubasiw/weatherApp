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
            
            // CURRENT WEATHER
            $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude +'&lon='+longitude +'&units=metric&APPID=40422780428bbcebba3ef9843cd2666a&lang=pl',
            dataType: 'json',

            }).done(function(data) {
                
                //console.log(data);
                
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
                    var table1 = jQuery('.current');
                    
                    table1.append('<tr>' + '<td>' + '<span>' + '<img id="icon" src="http://openweathermap.org/img/w/'+icon+'.png" />' + temp + '&deg  C' + '</span>' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'wilgotność:' + '</td>' + '<td>' +humidity+ '%' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'ciśnienie:' + '</td>' + '<td>' +pressure+ ' hPa' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'wiatr:' + '</td>' + '<td>' +wind+ ' m/s' + '<i class="fa fa-long-arrow-up" aria-hidden="true">' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'wschód:' + '</td>' + '<td>' +sunriseTime+ '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'zachód:' + '</td>' + '<td>' +sunsetTime+ '</td>' + '</tr>');
                    
                
                    var arrow = jQuery('.fa-long-arrow-up');
                    arrow.css({ WebkitTransform: 'rotate(' + windDeg + 'deg)'})
                         .css('margin-left', '1em');
                    
                    jQuery('.current tr:nth-child(1) > td:nth-child(1)').attr("colspan", 2);
                    
                    
                
                };
                boxWeather();
                  
            }).fail(function(error) {
                alert("error");
            });
            // CURRENT WEATHER END
            
            // 5 DAYS FORECAST
            $.ajax({
            type: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+latitude +'&lon='+longitude +'&units=metric&APPID=40422780428bbcebba3ef9843cd2666a&lang=pl',
            dataType: 'json',

            }).done(function(data) {
                
                console.log(data);
                
                //console.log(data.list[0]);
                
                function whichDay() {
                    
                    var d = new Date();
                    var n = d.getDay();
                    var dayIs;
                    
                    if (n == 0) {
                        dayIs = 'Niedziela';
                    };
                    if (n == 1) {
                        dayIs = 'Poniedziałek';
                    };
                    if (n == 2) {
                        dayIs = 'Wtorek';
                    };
                    if (n == 3) {
                        dayIs = 'Środa';
                    };
                    if (n == 4) {
                        dayIs = 'Czwartek';
                    };
                    if (n == 5) {
                        dayIs = 'Piątek';
                    };
                    if (n == 6) {
                        dayIs = 'Sobota';
                    };
                    
                    console.log(dayIs);  
                };
                whichDay();
                
                function table5Days() {
                    var fiveDays = data.list;
                    console.log(fiveDays);
                    
                    tr = jQuery('<tr/>');
                    tr.append('<th>' + 'dzień' + '</th>');
                    tr.append('<th>' + 'warunki' + '</th>');
                    tr.append('<th>' + 'temp.(max / min)' + '</th>');
                    tr.append('<th>' + 'wilgotność' + '</th>');
                    tr.append('<th>' + 'ciśnienie' + '</th>');
                    tr.append('<th>' + 'wiatr' + '</th>');
                    tr.append('<th>' + 'wschód / zachód' + '</th>');
                    
                    jQuery('thead').append(tr);

                    for (var i=0; i<fiveDays.length; i++) {
                        
                        tr = jQuery('<tr/>');
                        tr.append('<td>' + 'dupa' + '</td>');
                        tr.append('<td>'+ 'max:' + ' ' + fiveDays[i].temp.max + ' ' + '/' + ' ' + 'min:' + ' ' + fiveDays[i].temp.min + '&deg  C' + '</td>');
                        tr.append('<td>'+ 'zbita' +'</td>');

                        jQuery('.days').append(tr);
                    };
                };
                table5Days();
                
                
                
                
//                tr = jQuery('<tr/>');
//                tr.append("<th>" + (i+1) + "</th>");
//                tr.append("<td>" + dataArray2[i].currency + "</td>");
//                tr.append("<td>" + dataArray2[i].code + "</td>");
//                tr.append("<td>" + dataArray2[i].mid.toFixed(3) + "</td>");
//                // and we place whole created table row in table body:
//                jQuery('tbody').append(tr);
                
                
//                function boxWeatherDay1() {
//                    var tableD1 = jQuery('.day1 table');
//                    
//                    tableD1.append('<tr>' + '<td>' + '<span>' + '<img id="icon" src="http://openweathermap.org/img/w/'+icon+'.png" />' + temp + '&deg  C' + '</span>' + '</tr>');
//                    tableD1.append('<tr>' + '<td>' + 'wilgotność:' + '</td>' + '<td>' +humidity+ '%' + '</td>' + '</tr>');
//                    tableD1.append('<tr>' + '<td>' + 'ciśnienie:' + '</td>' + '<td>' +pressure+ ' hPa' + '</td>' + '</tr>');
//                    tableD1.append('<tr>' + '<td>' + 'wiatr:' + '</td>' + '<td>' +wind+ ' m/s' + '<i class="fa fa-long-arrow-up" aria-hidden="true">' + '</td>' + '</tr>');
//                    tableD1.append('<tr>' + '<td>' + 'wschód:' + '</td>' + '<td>' +sunriseTime+ '</td>' + '</tr>');
//                    tableD1.append('<tr>' + '<td>' + 'zachód:' + '</td>' + '<td>' +sunsetTime+ '</td>' + '</tr>');
//                    
//                
//                    var arrow = jQuery('.fa-long-arrow-up');
//                    arrow.css({ WebkitTransform: 'rotate(' + windDeg + 'deg)'})
//                         .css('margin-left', '1em');
//                    
//                    jQuery('tbody tr:nth-child(1) > td:nth-child(1)').attr("colspan", 2);
//                    
//                    
//                
//                };
//                boxWeatherDay1();
                
                
                           
            }).fail(function(error) {
                alert("error");
            });
            // 5 DAYS FORECAST END
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM