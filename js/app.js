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
            url: 'http://api.wunderground.com/api/53e53b9fc73ee335/conditions/q/"+latitude+","+longitude+".json',
            dataType: 'json'

            }).done(function(data) {

                var placeWeather = data.current_observation;
                console.log(placeWeather);

            }).fail(function(error) {
                alert("error");
            });
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM