src = "https://www.gstatic.com/firebasejs/4.2.0/firebase.js";
// Initialize Firebase
 
var config = {
    apiKey: "AIzaSyC42UIRETC_VVO7cXGqo9ru8TlfDi_-El8",
    authDomain: "test-project-4d8c5.firebaseapp.com",
    databaseURL: "https://test-project-4d8c5.firebaseio.com",
    projectId: "test-project-4d8c5",
    storageBucket: "test-project-4d8c5.appspot.com",
    messagingSenderId: "591336136232"
};
firebase.initializeApp(config);

//Get elements
const preObject = document.getElementById('object');
const ulList = document.getElementById('list');

// Create reference
const dbRefObject = firebase.database().ref();
const dbRefList = dbRefObject.child('stuff');


////
////Early work I did to pull specific data from the objects in the database.
////
//const dbLat = dbRefObject.child('eggs').child('egg' + i).child('latitude');
//const dbLong = dbRefObject.child('eggs').child('egg' + i).child('longitude');

//for (var i = 1; i < 11; i++) {
// const dbLat = dbRefObject.child('eggs').child('egg' + i).child('latitude');
//dbLat.on('value', snap => {
//console.log("Latitude " + JSON.stringify(snap.val(), null, 3) + "  latArray Length: " + latArray.length);
// });

//const dbLong = dbRefObject.child('eggs').child('egg' + i).child('longitude');
// dbLong.on('value', snap => {
//console.log("Longitude " + JSON.stringify(snap.val(), null, 3) + "  lonArray Length: " + lonArray.length);
// });
//}

//Bellow is a program to log out snap values from the firebase database 
//only if it is within a certian range of latitudes and longitudes.

var nRef = firebase.database().ref();
var eggs = nRef.child('eggs');

//eggs.orderByChild('latitude').startAt(47.8182).endAt(47.8184).on('child_added', function(snap) {
//if (snap.val().longitude >= -122.2776 && snap.val().longitude <= -122.2775) { console.log(snap.val()) }
//});

// Sync Object Changes
dbRefObject.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 3);
});

// Sync List Changes
dbRefList.on('child_added', snap => {

    const li = document.createElement('li');
    li.innerText = snap.val();
    li.id = snap.key;
    ulList.appendChild(li);
});

dbRefList.on('child_changed', snap => {

    const liChanged = document.getElementById(snap.key);
    liChanged.innerText = snap.val();

});

dbRefList.on('child_removed', snap => {

    const liToRemove = document.getElementById(snap.key);
    liToRemove.remove();

});

//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const txtLogin = document.getElementById('btnLogin');
const txtSignUp = document.getElementById('btnSignUp');
const txtLogout = document.getElementById('btnLogout');

const LoginMessage = document.getElementById('LoginMessage');
const btnScan = document.getElementById('btnScan')

//Add Login Event
btnLogin.addEventListener('click', e => {
    //Get email and pass
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//Add signup event
btnSignUp.addEventListener('click', e => {
    //Get email and pass
    //TODO: Check for real Emails
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    //Sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});

//
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});

const name = document.getElementById('name');
const email2 = document.getElementById('email2');
const btnSend = document.getElementById('btnSend');

//Add a realtime Listner
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        console.log(firebaseUser.uid);
        btnSend.addEventListener('click', e => {
            const dbUserRef = firebase.database().ref();
            const UserName = name.value;
            const Email = email.value;
            const Egg5Bool = false;
            const packet = { UserName, Email, timeStamp: new Date().toString(), Lat: 'Lat', Long: 'Long', EggBools: { Egg5Bool } };
            const nkey = firebaseUser.uid;
            dbUserRef.child('users').child(nkey.toString()).set(packet);
            console.log("  key: " + nkey);  
        });
        LoginMessage.classList.add('hide');
        btnLogout.classList.remove('hide');
        btnLogin.classList.add('hide');
        btnSignUp.classList.add('hide');
    } else {
        console.log('not Logged in');
        LoginMessage.classList.remove('hide');
        btnLogout.classList.add('hide');
        btnLogin.classList.remove('hide');
        btnSignUp.classList.remove('hide');
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
                    //document.getElementById('map').src = 'https://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,' + found + '&level=18&marker=' + found;

                    eggs.orderByChild('latitude').startAt(47.8182).endAt(47.8184).on('child_added', function(snap) {
                        if (snap.val().longitude >= -122.2776 && snap.val().longitude <= -122.2775) {
                            console.log('Egg' + snap.val().egg + 'Bool')
                            console.log(latitude, longitude)
                            const dbUserRef = firebase.database().ref();
                            dbUserRef.child('users').child(firebaseUser.uid).child('EggBools').child('Egg' + snap.val().egg + 'Bool').set('true');
                        }
                    });

                    //var radlat1 = Math.PI * latitude / 180;
                    //var radlat2 = Math.PI * (latitude + .0002) / 180;
                    //var theta = longitude - (longitude + .0002);
                    //var radtheta = Math.PI * theta / 180;
                    //var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                    //dist = Math.acos(dist);
                    //dist = dist * 180 / Math.PI;
                    //dist = dist * 60 * 1.1515;
                    //distFinal = dist * 5280;

                    //console.log("   Distance between two Geolocations:  " + distFinal);
                }

                function error() {
                    // document.getElementById('map').src = 'http://lynnwoodwa.maps.arcgis.com/apps/StoryMapBasic/index.html?appid=9da6d2bdffa144d99748e259e417176c&extent=-122.3463,47.8138,-122.3463,47.8138';
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


firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        //More stuff
        //showing the egg
        const EC5 = document.getElementById('EC5')
        const dbUserRef = firebase.database().ref();
        const dbEggRef = dbUserRef.child('users').child(firebaseUser.uid).child('EggBools');
        dbEggRef.child('Egg5Bool').on('value', snap => {
            if (snap.val() == "true") {
                EC5.classList.remove('hide');
            } else {
                EC5.classList.add('hide');
            }
            console.log(snap.val())
        });
    }
});