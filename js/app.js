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
                    head.prepend('<div>' + 'Weather in ' + ' ' + '<span>' +place+ '</span>' + ', ' + '<span>' +country+ '</span>' + ' ' + '<span>' + '<img id="flag" src="http://openweathermap.org/images/flags/'+countryS+'.png" />' + '</span>' + '</div>');
                };
                header();
                
                function boxWeather() {
                    var table1 = jQuery('.current');
                    
                    table1.append('<tr>' + '<td>' + '<span>' + '<img id="icon" src="http://openweathermap.org/img/w/'+icon+'.png" />' + temp + '&deg  C' + '</span>' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'wilgotność:' + '</td>' + '<td>' +humidity+ '%' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'ciśnienie:' + '</td>' + '<td>' +pressure+ ' hPa' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'wiatr:' + '</td>' + '<td>' +wind+ ' m/s' + '<i class="fa fa-long-arrow-up arrow1" aria-hidden="true">' + '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'wschód:' + '</td>' + '<td>' +sunriseTime+ '</td>' + '</tr>');
                    table1.append('<tr>' + '<td>' + 'zachód:' + '</td>' + '<td>' +sunsetTime+ '</td>' + '</tr>');
                    
                
                    var arrow1 = jQuery('.fa-long-arrow-up');
                    arrow1.css({ '-webkit-transform': 'rotate(' + windDeg + 'deg)',
                                 '-moz-transform': 'rotate(' + windDeg + 'deg)',
                                 '-ms-transform': 'rotate(' + windDeg + 'deg)',
                                 '-o-transform': 'rotate(' + windDeg + 'deg)',
                                 'transform': 'rotate(' + windDeg + 'deg)',})
                          .css('margin-left', '1em');
                    
                    jQuery('.current tr:nth-child(1) > td:nth-child(1)').attr("colspan", 2);
                    jQuery('.today').before('<h1>' + 'Current weather' +'</h1>');
                    
                    
                
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
                
//                function tableDays() {
//                    var sevenDays = data.list;
//                    console.log(sevenDays);
//                    
//                    tr = jQuery('<tr/>');
//                    tr.append('<th>' + 'dzień' + '</th>');
//                    tr.append('<th>' + 'warunki' + '</th>');
//                    tr.append('<th>' + '&deg  C (max / min)' + '</th>');
//                    tr.append('<th>' + 'wilgotność' + '</th>');
//                    tr.append('<th>' + 'ciśnienie' + '</th>');
//                    tr.append('<th>' + 'wiatr' + '</th>');
//                    
//                    jQuery('thead').append(tr);
//                    jQuery('.day').before('<h1>' + 'Weather in next days' +'</h1>');
//
//                    for (var i=1; i<sevenDays.length; i++) {
//                        
//                        var date = new Date(sevenDays[i].dt*1000);
//                        var dayName = date.getUTCDay();
//                        var week = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];
//                        
//                        tr = jQuery('<tr/>');
//                        tr.append('<td>' + week[dayName] + '</td>');
//                        tr.append('<td>' + '<img id="icon" src="http://openweathermap.org/img/w/'+sevenDays[i].weather[0].icon+'.png" />' + '</td>');
//                        tr.append('<td>'+ sevenDays[i].temp.max.toFixed(1) + ' / ' + ' ' + sevenDays[i].temp.min.toFixed(1) + '</td>');
//                        tr.append('<td>'+ sevenDays[i].humidity + ' %' + '</td>');
//                        tr.append('<td>'+ sevenDays[i].pressure.toFixed(0) + ' hPa' + '</td>');
//                        tr.append('<td>'+ +sevenDays[i].speed.toFixed(1) + ' m/s' + '<i class="fa fa-long-arrow-up arrow2" aria-hidden="true">' + '</td>');
//                        
//                        jQuery('.arrow2').css({ WebkitTransform: 'rotate(' + sevenDays[i].deg + 'deg)'})
//                                         .css('margin-left', '1em');
//                        
//                        jQuery('.days').append(tr);
//                        
//                        jQuery('.days img').addClass('fifty');
//                        jQuery('.days').addClass('align-self-center justify-content-center');
//                    };
//                };
//                tableDays();
                
                function loopFor6days() {

                    for (var i=0; i<6; i++) {

                        function forecast() {
                            var day = data.list[i+1];
                            //console.log(day);

                            var date = new Date(day.dt*1000);
                            var dayName = date.getUTCDay();
                            var week = ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'];

                            tableBox = jQuery('<div/>');
                            tableBox.addClass('col-xl-2 col-lg-2 col-md-4 col-sm-4 col-6 tableBox padZero');
                            table = jQuery('<table/>');
                            

                            table.append('<tr>'+'<td>'+ week[dayName] +'</td>'+'</tr>');
                            table.append('<tr>'+'<td>' + '<img id="icon" src="http://openweathermap.org/img/w/'+day.weather[0].icon+'.png" />' + 'max. ' + day.temp.max.toFixed(1) + '&deg  C' + ' ' + '/' + ' ' + 'min. ' + day.temp.min.toFixed(1) + '&deg  C' + '</td>'+'</tr>');
                            table.append('<tr>'+'<td>'+ day.humidity + ' ' + '%' + '</td>'+'</tr>');
                            table.append('<tr>'+'<td>'+ day.pressure.toFixed(0) + ' ' + 'hPa' +'</td>'+'</tr>');
                            table.append('<tr>'+'<td>'+ day.speed.toFixed(1) + ' m/s' + '<i class="fa fa-long-arrow-up" aria-hidden="true">' + '</td>'+'</tr>');

                            tableBox.append(table);
                            jQuery('.test').append(tableBox);
                            jQuery('.test i').css({ WebkitTransform: 'rotate(' + day.deg + 'deg)'})
                                              .css('margin-left', '1em');
                        };
                        forecast();
                    };
                    
                    jQuery('.test').addClass('d-flex');
                    jQuery('.secFor').prepend('<h1>' + 'Forecast for next days:' +'</h1>');
                };
                loopFor6days();
                
            jQuery('table').addClass('table table-inverse table-striped table-bordered');
             
            }).fail(function(error) {
                alert("error");
            });
            // 5 DAYS FORECAST END
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM