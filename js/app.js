jQuery(document).ready(function(){
    

        $.ajax({
            type: 'GET',
            url: '//freegeoip.net/json/?callback=',
            dataType: 'json'

        }).done(function(data) {
            
            var ip = data.ip;
            
            console.log(ip);
            
        }).fail(function(error) {
            alert("error");
        });  
    
    
    
}); // end of DOM