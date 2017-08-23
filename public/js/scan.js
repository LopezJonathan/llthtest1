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

const LoginMessage = document.getElementById('LoginMessage');
const map = document.getElementById('map');
const btnScan = document.getElementById('btnScan');

const nRef = firebase.database().ref();
const eggs = nRef.child('eggs');

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        LoginMessage.classList.add('hide');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
        btnScan.classList.remove('hide');
    } else {
        console.log('not Logged in');
        LoginMessage.classList.remove('hide');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
        btnScan.classList.add('hide');
    }
});


firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {

        function errorCallback(error) {
            alert('ERROR(' + error.code + '): ' + error.message);
        };

        btnScan.addEventListener('click', e => {
                var output = document.getElementById("");

                if (!navigator.geolocation) {
                    output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                    return;
                }

                function success(position) {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    var found = longitude + "," + latitude;
                    const map = document.getElementById('map');
                    const dbUserRef = firebase.database().ref();
                    map.src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,' + found + '&level=18&marker=' + found;

                    eggs.orderByChild('latitude').startAt(latitude - 0.0001).endAt(latitude + 0.0001).on('child_added', function(snap) {
                        if (snap.val().longitude >= (longitude - 0.0001) && snap.val().longitude <= (longitude + 0.0001)) {
                            console.log('Egg' + snap.val().egg + 'Bool')
                            console.log(latitude, longitude)
                            const dbUserRef = firebase.database().ref();
                            dbUserRef.child('users').child(firebaseUser.uid).child('eui').child('e' + snap.val().egg + 'ui').set({ bool: "true", eggNum: snap.val().egg, timeStamp: new Date().toString() });
                        }
                    });
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
    }
});