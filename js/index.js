"use strict";

var android = (cordova.platformId === 'android'),
    windowsphone = (cordova.platformId === 'windowsphone'),
    bb10 = (cordova.platformId === 'blackberry10'),
    sampleData;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        app.shareMessage();
    },

    shareMessage: function(){

        var mimeType = 'text/pg';
        var record = ndef.uriRecord("https://hunear.com/nfc-touch");

        nfc.share(
            [record],
            function () {
                if (bb10) {
                    // Blackberry calls success as soon as the Card appears
                    
                } else if (windowsphone) {
                    
                    // Windows phone calls success immediately. Bug?
                    alert('WP: sharing.');
                    navigator.notification.vibrate(100);
                } else {
                    
                    // Android call the success callback when the message is sent to peer
                    Alert("Sent Message to Peer");
                    navigator.notification.vibrate(100);
                }
            }, function (reason) {
                
                alert("Failed to share tag " + reason);
                navigator.notification.vibrate(100);
            }
        );

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
