var streamapi="https://wind-bow.glitch.me/twitch-api/streams/";
var channelapi="https://wind-bow.glitch.me/twitch-api/channels/";
var channels=["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohuff", "ESL_SC2", "OgamingSC2", "comster404", "brunofin"];

$(function(){
    //calling all streamcall function on every channel
    channels.forEach(function(channel){
        allStreamCall(channel);
    });
});