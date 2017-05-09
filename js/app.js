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
                
                console.log(place);
                console.log(temp);
                console.log(pressure);
                console.log(humidity);
                
                
                

            }).fail(function(error) {
                alert("error");
            });
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM