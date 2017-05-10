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
                
                var descript = data.weather[0].description;
                var icon = data.weather[0].icon;
                
                var div1 = jQuery('section .row div:nth-child(1)');
                var div2 = jQuery('section .row div:nth-child(2)');
                var div3 = jQuery('section .row div:nth-child(3)');
                var div4 = jQuery('section .row div:nth-child(4)');
                
                console.log(descript);
                
                
                div1.prepend('<div>' + '<img id="icon" src="http://openweathermap.org/img/w/'+icon+'.png" />' + '</div>'
                            + '<div>' +descript+  '</div>');

                jQuery('section > .row > div:nth-child(1)').addClass('d-flex flex-column align-items-center');
                jQuery('section > .row > div:nth-child(1) > div:nth-child(2)').addClass('text-center');
                
            }).fail(function(error) {
                alert("error");
            });
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM