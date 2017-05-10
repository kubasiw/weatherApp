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
                var country = data.sys.country;
                var countryS = data.sys.country.toLowerCase();
                
                var today = new Date();
                
                
                
                var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
                
                console.log(date);
                
                var descript = data.weather[0].description;
                var icon = data.weather[0].icon;
                
                var div1 = jQuery('section .row div:nth-child(1)');
                var div2 = jQuery('section .row div:nth-child(2)');
                var div3 = jQuery('section .row div:nth-child(3)');
                var div4 = jQuery('section .row div:nth-child(4)');
                
                
                
                function box1() {
                    div1.prepend('<div>' + '<img id="icon" src="http://openweathermap.org/img/w/'+icon+'.png" />' + '<span>' +temp+ '&deg C' + '</span>' + '</div>'
                            + '<div>' +descript+  '</div>');

                    jQuery('section > .row > div:nth-child(1)').addClass('d-flex flex-column align-items-center');
                    jQuery('section > .row > div:nth-child(1) > div:nth-child(1)').addClass('d-flex align-items-center');
                    jQuery('section > .row > div:nth-child(1) > div:nth-child(2)').addClass('text-center');
                }
                box1();
                
                function box2() {
                    
                    div2.prepend('<div>' + '<span>' + '<img id="flag" src="http://openweathermap.org/images/flags/'+countryS+'.png" />' + '</span>' + ' ' +place+ ', ' + '<span>' +country+ '</span>' + '</div>'
                                + '<div>' +date+ '</div>');
                    
                    jQuery('section > .row > div:nth-child(2)').addClass('d-flex flex-column align-items-center justify-content-around');
                    
                    
                }
                box2();
                
                
                
            }).fail(function(error) {
                alert("error");
            });
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM