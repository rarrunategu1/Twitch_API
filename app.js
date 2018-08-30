//stream and channel api variables grab the urls for twitch api on streams and channels
//channels is just an array of people who stream regularly
var streamapi="https://wind-bow.glitch.me/twitch-api/streams/";
var channelapi="https://wind-bow.glitch.me/twitch-api/channels/";
var channels=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

$(function(){ //document ready function

    //calling all streamcall function on every channel
    channels.forEach(function(channel){
        allStreamCall(channel);// will call twitch APIs to get streaming and channel info about that channel
    
    //show all channels when all button is clicked    
    $('#all').click(function(){
        var all=$('.res .row'); //select all divs with class row in result div
        all.each(function(index){ //go through each one and show them
            $(this).css({'display': 'block'});
        });
    });
    
    //show only online streaming channels and hide the offline ones.
    $('#online').click(function(){
        var online=$('.res .row');
        online.each(function(index){
            var toggle=$(this).attr('id'); //take id attr of that row to check if it is online
            if(toggle=='online'){
                $(this).css({'display': 'block'});
            }
            else if(toggle=='offline'){
                $(this).css({'display': 'none'});
            }
        });
    });
    
    //show only offline channels
    $('#offline').click(function(){
        var offline=$('.res .row');
        offline.each(function(index){
            var toggle=$(this).attr('id');
            if (toggle=='online'){
                $(this).css({'display': 'none'});
            }
            else if (toggle=='offline') {
                $(this).css({'display': 'block'});
            }
        });
    });
        
        
    }); 
});

function allStreamCall(streamchannel) { //
    var logo, name, game, status, statusdesc, channel_link;
    
    var streamchannel_url=streamapi+streamchannel+"?callback=?";
    var channel_url=channelapi+streamchannel+"?callback=?";
    
    
   //call streaming channels API to see if it is streaming or not and if yes, what is it streaming about
    $.getJSON(streamchannel_url, function(data){
        if(data.status=='404'){ //if user not found
          game=data.message;
          status="offline";
          statusdesc="";
        }
        else if (data.status=='442') { //if user unavailable or closed their account
        game=data.message;
        status="offline";
        statusdesc="";
        }
        else {
            data=data.stream;
            if(data===null) {//user is offline
            game="offline";
            status="offline";
            statusdesc="";
            logo="http://www.gravatar.com/avatar/3c069b221c94e08e84aafdefb3228346?s=47&d=http%3A%2F%2Fwww.techrepublic.com%2Fbundles%2Ftechrepubliccore%2Fimages%2Ficons%2Fstandard%2Ficon-user-default.png";
    
        }
        else {
            game=data.channel.game;
            status="online";
            statusdesc=":"+data.channel.status;
        }
        }
        
        //call channels api to get channel informations like channel display name, logo, and link, etc.
        $.getJSON(channel_url,function(data){
            name=data.display_name;
            logo=data.logo;
            channel_link=data.url;
            if(data.status=='404') {//if channel not found
            name=streamchannel;
            channel_link="#";
            logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
     
            }
            else if(data.status=='422') {
                name=streamchannel;
                channel_link="#";
                logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
            }
            else if (logo===null){
                logo="https://openclipart.org/image/2400px/svg_to_png/211821/matt-icons_preferences-desktop-personal.png";
     
            }
            
            //prepare a row for the result in html
            var result ="<a href='"+channel_link+"'><div class='row' id='"+status+"'><div class='col-md-3 col-xs-4'> <span class='logo'><img class='img img-circle' src='"+logo+"'></span> <span class='name text-center'>"+name+"</span></div><div class='col-md-9 col-xs-8 text-center' id='statusdescription'><span class='game'>"+game+"</span><span class='status'>"+statusdesc+"</span></div></div></a>";
            
            if(status==='offline')
            $('.res').append(result);
            else
            $('.res').prepend(result);
        });
    });
}


