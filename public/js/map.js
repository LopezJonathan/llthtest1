// Initialize Firebase
var config = {
	apiKey: "AIzaSyBi8HNIbweZnYK0RE3oEt0gjj9zpnV9TJo",
	authDomain: "llth-firebasetest.firebaseapp.com",
	databaseURL: "https://llth-firebasetest.firebaseio.com",
	projectId: "llth-firebasetest",
	storageBucket: "llth-firebasetest.appspot.com",
	messagingSenderId: "212300061606"
};
firebase.initializeApp(config);

//Get elements
const txtName = document.getElementById('txtName');
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtLogin = document.getElementById('btnLogin');
const txtSignUp = document.getElementById('btnSignUp');
const txtLogout = document.getElementById('btnLogout');

const map = document.getElementById('map');
const btnFind = document.getElementById('btnFind');
const LoginMessage = document.getElementById('LoginMessage');

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        LoginMessage.classList.add('hide');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
        map.classList.remove('hide');
        btnFind.classList.remove('hide');
    } else {
        console.log('not Logged in');
        LoginMessage.classList.remove('hide');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
        map.classList.add('hide');
        btnFind.classList.add('hide');
    }
});

//to redirect iframe src
//document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,' + 'geolocation';

function errorCallback(error) {
    alert('ERROR(' + error.code + '): ' + error.message);
};

//Button to find your current location.
btnFind.addEventListener('click', e => {
        var output = document.getElementById("");

        if (!navigator.geolocation) {
            output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
            return;
        }

        function success(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var found = longitude + "," + latitude;
            document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,' + found + '&level=18&marker=' + found;

            var radlat1 = Math.PI * latitude / 180;
            var radlat2 = Math.PI * (latitude + .0002) / 180;
            var theta = longitude - (longitude + .0002);
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            distFinal = dist * 5280;
        }

        function error() {
            document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,-122.3463,47.8138';
        }

        navigator.geolocation.getCurrentPosition(success, error);
    },

    function prompt(window, pref, message, callback) {
        let branch = Components.classes["@mozilla.org/preferences-service;1"]
            .getService(Components.interfaces.nsIPrefBranch);

        if (branch.getPrefType(pref) === branch.PREF_STRING) {
            switch (branch.getCharPref(pref)) {
                case "always":
                    return callback(true);
                case "never":
                    return callback(false);
            }
        }

        let done = false;

        function remember(value, result) {
            return function() {
                done = true;
                branch.setCharPref(pref, value);
                callback(result);
            }
        }

        let self = window.PopupNotifications.show(
            window.gBrowser.selectedBrowser,
            "geolocation",
            message,
            "geo-notification-icon", {
                label: "Share Location",
                accessKey: "S",
                callback: function(notification) {
                    done = true;
                    callback(true);
                }
            }, [{
                    label: "Always Share",
                    accessKey: "A",
                    callback: remember("always", true)
                },
                {
                    label: "Never Share",
                    accessKey: "N",
                    callback: remember("never", false)
                }
            ], {
                eventCallback: function(event) {
                    if (event === "dismissed") {
                        if (!done) callback(false);
                        done = true;
                        window.PopupNotifications.remove(self);
                    }
                },
                persistWhileVisible: true
            });
    });